const baseUrl = "https://localhost:8080/api/";
const productsBaseUrl = `${baseUrl}products`;
// const groupsBaseUrl = `${baseUrl}groups`;
const jwt = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyIiwiaXNzIjoidWEuY29tLnN1cHJhLmRyaWZ0IiwiaWF0IjoxNjU3OTMyMTYzLCJleHAiOjE2NTc5MzMwNjN9.FGx4NienujPBVETRXYMGyg3F1XYYndDFpSGoGgaxubE';

export async function getAllProducts(){
    const response = await fetch (productsBaseUrl,
        {
            method: 'GET',
            headers: {
                Jwt: jwt
            }
        });
    const result = { status: response.status };
    if(response.status===403){
        result["result"] = "Forbidden! Not Authorized!"
    } else {
        const json = await response.json();
        if(response.status===200){
            result["result"] = json["products"];
        } else {
            result["result"] = json["error"];
        }
    }
    return result;
}