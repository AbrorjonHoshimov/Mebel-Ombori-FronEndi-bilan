import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {API_PATH, tokenHeader} from "../component/Constants";
import {toast} from "react-toastify";
const measurementSlice=createSlice({
    name:'measurement',
    initialState:{
        measurement:[],
        showModal:false,
        forDeleteModal:false
    },
    reducers:{
      getMeasurement:((state, action) => {
          state.measurement=action.payload
      }),
        modalHandler:((state => {
            state.showModal=!state.showModal
        })),
        forDltModal:(((state, action) => {
            state.forDeleteModal=!state.forDeleteModal
        }))
    }
})


export function getMeasurements(){
    return function (dispatch){
        axios.get(API_PATH+'measurement/list',tokenHeader).then((res)=>{
            dispatch({
                type:'measurement/getMeasurement',
                payload:res.data
            })
        })
    }
}
export function addMeasurement(data){
    return function (dispatch){
        axios.post(API_PATH+'measurement/add',data,tokenHeader).then((res)=>{
            dispatch(getMeasurements())
            toast.success(res.data.message)
        }).catch((error)=>{
            toast.error("xatolik")
        })
    }
}
export function editMeasurement(id,data){
    return function (dispatch){
        axios.put(API_PATH+'measurement/edit/'+id,data,tokenHeader).then((res)=>{
            dispatch(getMeasurements())
            toast.success("O'zgartirildi")
        }).catch((error)=>{
            toast.error("Xatolik")
        })
    }
}
export function deleteMeasurement(id){
    return function (dispatch){
        axios.delete(API_PATH+'measurement/'+id,tokenHeader).then((res)=>{
            dispatch(getMeasurements())
            toast.success(res.data.message)
        }).catch((error)=>{
            toast.error("xatolik")
        })
    }
}
export function forShowModal(){
    return function (dispatch){
        dispatch({
            type:'measurement/modalHandler'
        })
    }
}
export function forDeleteModall(){
    return function (dispatch){
        dispatch({
            type:'measurement/forDltModal'
        })
    }
}
export default measurementSlice.reducer