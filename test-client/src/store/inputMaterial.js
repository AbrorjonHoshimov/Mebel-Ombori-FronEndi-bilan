import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {API_PATH, tokenHeader} from "../component/Constants";
import {toast} from "react-toastify";
import {getMaterial} from "./material";

const inputMaterialSlice = createSlice({
    name: 'inMaterial',
    initialState: {
        inputMaterial: [],
        showModal: false,
        deleteModal: false
    },
    reducers: {
        getInputMaterial: ((state, action) => {
            state.inputMaterial = action.payload
        }),
        modalHandler: (state => {
            state.showModal = !state.showModal
        }),
        dltModalHandler: ((state, action) => {
            state.deleteModal = !state.deleteModal
        })
    }
})

export function getInputMaterial() {
    return function (dispatch) {
        axios.get(API_PATH + 'inputMaterial/list', tokenHeader).then((res) => {
            dispatch({
                type: "inMaterial/getInputMaterial",
                payload: res.data
            })
        })
    }
}
export function addInputMaterial(data) {
    return function (dispatch) {
        axios.post(API_PATH + 'inputMaterial/add', data, tokenHeader).then((res) => {
            dispatch(getInputMaterial())
            toast.success(res.data.message)
        }).catch((error) => {
            toast.error("xatolik")
        })
    }
}
export function editInputMaterial(id, data) {
    return function (dispatch) {
        axios.put(API_PATH + 'inputMaterial/' + id, data, tokenHeader).then((res) => {
            dispatch(getInputMaterial())
            toast.success(res.data.message)
        }).catch((error) => {
            toast.error("xatolik")
        })
    }
}
export function deleteInputMaterial(id) {
    return function (dispatch) {
        axios.delete(API_PATH + 'inputMaterial/' + id, tokenHeader).then((res) => {
            dispatch(getInputMaterial())
            toast.success(res.data.message)
        }).catch((error) => {
            toast.error("xatolik")
        })

    }
}
export function modalToggle() {
    return function (dispatch) {
        dispatch({
            type: 'inMaterial/modalHandler'
        })
    }
}
export function forDeleteModal() {
    return function (dispatch) {
        dispatch({
            type: 'inMaterial/dltModalHandler'
        })
    }
}

export default inputMaterialSlice.reducer