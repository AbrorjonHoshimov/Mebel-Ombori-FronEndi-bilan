import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {API_PATH, tokenHeader} from "../component/Constants";
import {toast} from "react-toastify";

const suplierSlice =createSlice({
    name:'suplier',
    initialState:{
        suplier:[],
        showModal:false,
        deleteModal:false
    },
    reducers:{
      getSuplier:(((state, action) => {
          state.suplier=action.payload
      })),
        modalHandler:((state)=>{
            state.showModal=!state.showModal
        }),
        deleteModalHandler:((state => {
            state.deleteModal=!state.deleteModal
        }))
    }
})

export function getSuplier(){
    return function (dispatch){
        axios.get(API_PATH+'suplier/list',tokenHeader).then((res)=>{
            dispatch({
                type:'suplier/getSuplier',
                payload:res.data
            })
        })
    }
}
export function addSuplier(data){
    return function (dispatch){
        axios.post(API_PATH+'suplier/add',data,tokenHeader).then((res)=>{
            dispatch(getSuplier())
            toast.success(res.data.message)
        }).catch((error)=>{
            toast.error("xatolik")
        })
    }
}
export function editSuplier(id,data){
    return function (dispatch){
        axios.put(API_PATH+'suplier/edit/'+id,data,tokenHeader).then((res)=>{
            dispatch(getSuplier())
            toast.success(res.data.message)
        }).catch((error)=>{
            toast.error("xatolik")
        })
    }
}
export function deleteSuplier(id){
    return function (dispatch){
        axios.delete(API_PATH+"suplier/"+id,tokenHeader).then((res)=>{
            dispatch(getSuplier())
            toast.success(res.data.message)
        }).catch((error)=>{
            toast.error("xatolik")
        })
    }
}
export function forShowModal(){
    return function (dispatch){
        dispatch({
            type:'suplier/modalHandler'
        })
    }
}
export function forDeleteModal(){
    return function (dispatch){
        dispatch({
            type:'suplier/deleteModalHandler'
        })
    }
}


export default suplierSlice.reducer