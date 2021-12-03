import React from 'react';
import {Link, NavLink} from "react-router-dom";
import {Nav, NavItem} from "reactstrap";

const HeaderComponent = () => {
    return (
        <div>


            <div>
            <nav className="navbar navbar-light bg-light">
                <form className="form-inline m-auto" >

                    <button className="btn btn-outline-success" type="button"><Link to="/InputMaterial"> Omborga Xomashyo Kirim Qilish </Link></button>

                    <button className="btn btn-outline-success" type="button"><Link to="/outputMaterial"> Ombordan Xomashyo Chiqim Qilish </Link></button>

                </form>
            </nav>
            </div>
        </div>
    );
};

export default HeaderComponent;