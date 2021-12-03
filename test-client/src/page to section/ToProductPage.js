import React from 'react';
import HeaderComponent from "../component/HeaderComponent";
import {Link} from "react-router-dom";
import ProductWareHouse from "../pages/ProductWareHouse";

const ToProductPage = () => {
    return (
        <div>
            <div>
                <nav className="navbar navbar-light bg-light">
                    <form className="form-inline m-auto" >
                        <button className="btn btn-outline-success" type="button"><Link to="/inputProduct"> Omborga Maxsulot Kirim Qilish </Link></button>

                        <button className="btn btn-outline-success" type="button"><Link to="/outputProduct"> Ombordan Maxsulot Chiqim Qilish </Link></button>

                    </form>
                </nav>

                <ProductWareHouse/>
            </div>
        </div>
    );
};

export default ToProductPage;