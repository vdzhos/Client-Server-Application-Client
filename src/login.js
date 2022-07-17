import {jwtParam} from "./apiQueries";
const md5 = require('md5');
const loginUrl = "https://localhost:8080/login";


export const hashPassword = (password) => {
    return md5(password);
}

export async function login(credentials){

    const response = await fetch (loginUrl,
        {
            method: 'POST',
            body: JSON.stringify(credentials)
        });
    const result = { status: response.status };

    if(response.status===200){
        localStorage.setItem(jwtParam, response.headers.get(jwtParam))
    } else {
        const json = await response.json();
        result["result"] = json["error"];
    }

    return result;
}