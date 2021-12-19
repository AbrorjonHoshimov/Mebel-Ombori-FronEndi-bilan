import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {API_PATH, tokenHeader} from "../component/Constants";
import {toast} from "react-toastify";

const outputMaterialSlice=createSlice({
    name:'outMat',
    initialState:{
        outputMaterial:[],
        showModal:false,
        deleteModal:false
    },
  reducers:{
        getOutMat:((state, action) => {
            state.outputMaterial=action.payload
        }),
      modalHandler: (state => {
          state.showModal = !state.showModal
      }),
      dltModalHandler: ((state, action) => {
          state.deleteModal = !state.deleteModal
      })
  }
})

export function getOutputMaterial(){
    return function (dispatch){
        axios.get(API_PATH+'otputMaterial/list',tokenHeader).then((res)=>{
            dispatch({
                type:'outMat/getOutMat',
                payload:res.data
            })
        })
    }
}
export function addOutputMaterial(data) {
    return function (dispatch) {
        axios.post(API_PATH + 'otputMaterial/add', data, tokenHeader).then((res) => {
            dispatch(getOutputMaterial())
            toast.success(res.data.message)
        }).catch((error) => {
            toast.error("xatolik")
        })
    }
}
export function editOutputMaterial(id, data) {
    console.log(id,data)
    return function (dispatch) {
        axios.put(API_PATH + 'otputMaterial/' + id, data, tokenHeader).then((res) => {
            dispatch(getOutputMaterial())
            toast.success(res.data.message)
        }).catch((error) => {
            toast.error("xatolik")
        })
    }
}
export function deleteOutputMaterial(id) {
    return function (dispatch) {
        axios.delete(API_PATH + 'otputMaterial/' + id, tokenHeader).then((res) => {
            dispatch(getOutputMaterial())
            toast.success(res.data.message)
        }).catch((error) => {
            toast.error("xatolik")
        })

    }
}
export function modalToggle() {
    return function (dispatch) {
        dispatch({
            type: 'outMat/modalHandler'
        })
    }
}
export function forDeleteModal() {
    return function (dispatch) {
        dispatch({
            type: 'outMat/dltModalHandler'
        })
    }
}



export default outputMaterialSlice.reducer