import {configureStore} from "@reduxjs/toolkit"
import productType from "./productType";
import measurement from "./measurement";
import suplier from "./suplier";
import material from "./material";
import product from "./product";
import inputMaterial from "./inputMaterial";
import outputMaterial from "./outputMaterial";
import inputProduct from "./inputProduct";
import client from "./client";



export default configureStore({
    reducer:{
        productType,
        measurement,
        suplier,
        material,
        product,
        inputMaterial,
        outputMaterial,
        inputProduct,
        client
    }
})