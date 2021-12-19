import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {API_PATH, tokenHeader} from "../component/Constants";
import {toast} from "react-toastify";
import data from "bootstrap/js/src/dom/data";
const materialSlice=createSlice({
    name:'material',
    initialState:{
        material:[],
        showModal:false,
        deleteModal:false
    },
    reducers:{
        getMaterial:((state, action) => {
            state.material=action.payload
        }),
        modalHandler:(state => {
            state.showModal=!state.showModal
        }),
        dltModalHandler:((state, action) => {
            state.deleteModal=!state.deleteModal
        })
    }

})
export function getMaterial(){
    return function (dispatch){
        axios.get(API_PATH+'material/list',tokenHeader).then((res)=>{
            dispatch({
                type:'material/getMaterial',
                payload:res.data
            })
        })
    }
}
export function addMaterial(data){
    return function (dispatch){
        axios.post(API_PATH+'material/add',data,tokenHeader).then((res)=>{
            dispatch(getMaterial())
            toast.success(res.data.message)
        }).catch((error)=>{
            toast.error("xatolik")
        })
    }
}
export function editMaterial(id,data){
    return function (dispatch){
        axios.put(API_PATH+'material/edit/'+id,data,tokenHeader).then((res)=>{
            dispatch(getMaterial())
            toast.success(res.data.message)
        }).catch((error)=>{
            toast.error("xatolik")
        })
    }
}
export function deleteMaterial(id){
    return function (dispatch){
        axios.delete(API_PATH+'material/'+id,tokenHeader).then((res)=>{
            dispatch(getMaterial())
            toast.success(res.data.message)
        }).catch((error)=>{
            toast.error("xatolik")
        })

    }
}
export function modalToggle(){
    return function (dispatch){
        dispatch({
            type:'material/modalHandler'
        })
    }
}
export function forDeleteModal(){
    return function (dispatch){
        dispatch({
            type:'material/dltModalHandler'
        })
    }
}


export default materialSlice.reducer