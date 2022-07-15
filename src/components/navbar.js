import React from "react";

const NavBar = () => {
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand ms-4" href="/">Storage</a>
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
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;