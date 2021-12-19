import React from 'react';
import HeaderComponent from "./component/HeaderComponent";
import {Route, Routes} from "react-router-dom";
import Catalog from "./pages/Catalog";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import ProductType from "./pages/ProductType";
import Measurement from "./pages/Measurement";
import Product from "./pages/Product";
import Client from "./pages/Client";
import Supplier from "./pages/Supplier";
import Material from "./pages/Material";
import InputMaterial from "./pages/InputMaterial";
import WareHouseMaterial from "./pages/WareHouseMaterial";
import OutputMaterial from "./pages/OutputMaterial";
import ToProductPage from "./page to section/ToProductPage";
import InputProduct from "./pages/InputProduct";
import ProductWareHouse from "./pages/ProductWareHouse";
import OutputProduct from "./pages/OutputProduct";
import ToMaterial from "./page to section/ToMaterial";
import ToSuplier from "./page to section/ToSuplier";
import ToClient from "./page to section/ToClient";
import SuplierInformation from "./pages/SuplierInformation";
import ClientInformation from "./pages/ClientInformation";

const App = () => {
    return (
        <div>
            <Routes>
                <Route exact={true} path='/' element={<LoginPage/>}/>
                <Route  path='/catalog' element={<Catalog/>}/>
                <Route  path='/productType' element={<ProductType/>}/>
                <Route  path='/measurement' element={<Measurement/>}/>
                <Route  path='/product' element={<Product/>}/>
                <Route  path='/client' element={<Client/>}/>
                <Route  path='/suplier' element={<Supplier/>}/>
                <Route  path='/material' element={<Material/>}/>
                <Route  path='/inputMaterial' element={<InputMaterial/>}/>
                <Route  path='/outputMaterial' element={<OutputMaterial/>}/>
                <Route  path='/wareHouse' element={<WareHouseMaterial/>}/>
                <Route  path='/toProduct' element={<ToProductPage/>}/>
                <Route  path='/toMaterial' element={<ToMaterial/>}/>
                <Route  path='/inputProduct' element={<InputProduct/>}/>
                <Route  path='/productWareHouse' element={<ProductWareHouse/>}/>
                <Route  path='/outputProduct' element={<OutputProduct/>}/>
                <Route  path='/toSuplier' element={<ToSuplier/>}/>
                <Route  path='/toClient' element={<ToClient/>}/>
                <Route  path='/suplier/:id' element={<SuplierInformation/>}/>
                <Route  path='/client/:id' element={<ClientInformation/>}/>


            </Routes>

        </div>
    );
};

export default App;
