import React from "react";
import {jwtParam} from "../apiQueries";

const NavBar = () => {

    const clearLocalJwt = () => {
        localStorage.removeItem(jwtParam);
    }

    return(
        <nav className="navbar navbar-expand-md navbar-light bg-light">
            <a className="navbar-brand ms-4" href="/products">Storage</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"/>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="/products">Products</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/groups">Groups</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/statistics">Statistics</a>
                    </li>
                    <div className="d-flex align-items-center mx-2">
                        <div className="box" style={{width: 2 + `px`, height: 25+`px`, backgroundColor: `#aaaaaa`}}/>
                    </div>
                    <li className="nav-item">
                        <a className="nav-link" href="/create-product">Create product</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/create-group">Create group</a>
                    </li>
                </ul>
                <div className="ms-auto me-4">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="/login" onClick={() => clearLocalJwt()}>Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;