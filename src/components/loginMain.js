import React, {useState} from "react";
import {hashPassword, login} from "../login";

const LoginMain = () => {

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");

    const form = React.createRef();
    const validate = React.createRef();

    const validateForm = (e) => {
        e.preventDefault();
        return false;
    }

    const processLogin = async (credentials) => {
        return await login(credentials);
    }


    const submitLogin = () => {
        if(!form.current.checkValidity()) {
            validate.current.click();
            return;
        }
        const credentials = {
            username: username,
            password: hashPassword(password)
        }
        processLogin(credentials).then(result => {
            if(result.status===200){
                window.location = "/";
            } else {
                alert(result.result);
            }
        });
    }

    return(
        <div className="vh-100" style={{ backgroundColor: "#eee"}}>
            <div className="container">
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-6">
                        <div className="card text-black  mt-5" style={{borderRadius: "25px"}}>
                            <div className="card-body p-3">
                                <div className="row justify-content-center">
                                    <div className="col-8 order-2 order-lg-1">

                                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Log In</p>
                                        <p className="text-center" style={{color:"red"}}/>
                                        <form className="mx-1 mx-md-4" ref={form} onSubmit={(e) => validateForm(e)}>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-user fa-lg me-3 fa-fw"/>
                                                <div className="form-outline flex-fill mb-0">
                                                    <label className="form-label"
                                                           htmlFor="form3Example1c">Username</label>
                                                    <input type="text" name="username" id="form3Example1c"
                                                           className="form-control"
                                                           required
                                                           value={username}
                                                           onChange={(e) => setUsername(e.target.value)}
                                                    />

                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-lock fa-lg me-3 fa-fw"/>
                                                <div className="form-outline flex-fill mb-0">
                                                    <label className="form-label"
                                                           htmlFor="form3Example4c">Password</label>
                                                    <input type="password" name="password" id="form3Example4c"
                                                           className="form-control"
                                                           required
                                                           value={password}
                                                           onChange={(e) => setPassword(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4 mt-2">
                                                <button type="button" className="btn btn-primary btn-lg"
                                                onClick={ () => submitLogin()}>Log In</button>
                                            </div>
                                            <button ref={validate} hidden type="submit">submit</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginMain;