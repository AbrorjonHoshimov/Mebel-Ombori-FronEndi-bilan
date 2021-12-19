import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {API_PATH, tokenHeader} from "../component/Constants";
import {toast} from "react-toastify";
import {getInputMaterial} from "./inputMaterial";

const inputProductSlice =createSlice({
    name:'inProd',
    initialState:{
        inputProduct:[],
        showModal:false,
        deleteModal:false
    },
    reducers:{
        getInProd:((state, action) => {
            state.inputProduct=action.payload
        }),
        modalHandler: (state => {
            state.showModal = !state.showModal
        }),
        dltModalHandler: ((state, action) => {
            state.deleteModal = !state.deleteModal
        })
    }
})
export function getInputProduct() {
    return function (dispatch) {
        axios.get(API_PATH + 'inputProduct/list', tokenHeader).then((res) => {
            dispatch({
                type: "inProd/getInProd",
                payload: res.data
            })
        })
    }
}
export function addInputProduct(data) {
    return function (dispatch) {
        axios.post(API_PATH + 'inputProduct/add', data, tokenHeader).then((res) => {
            dispatch(getInputProduct())
            toast.success(res.data.message)
        }).catch((error) => {
            toast.error("xatolik")
        })
    }
}
export function editInputProduct(id, data) {
    return function (dispatch) {
        axios.put(API_PATH + 'inputProduct/' + id, data, tokenHeader).then((res) => {
            dispatch(getInputProduct())
            toast.success(res.data.message)
        }).catch((error) => {
            toast.error("xatolik")
        })
    }
}
export function deleteInputProduct(id) {
    return function (dispatch) {
        axios.delete(API_PATH + 'inputProduct/' + id, tokenHeader).then((res) => {
            dispatch(getInputProduct())
            toast.success(res.data.message)
        }).catch((error) => {
            toast.error("xatolik")
        })

    }
}
export function modalToggle() {
    return function (dispatch) {
        dispatch({
            type: 'inProd/modalHandler'
        })
    }
}
export function forDeleteModal() {
    return function (dispatch) {
        dispatch({
            type: 'inProd/dltModalHandler'
        })
    }
}


export default inputProductSlice.reducer