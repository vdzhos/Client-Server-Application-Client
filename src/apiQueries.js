const baseUrl = "https://localhost:8080/api/";
const productsBaseUrl = `${baseUrl}products`;
// const groupsBaseUrl = `${baseUrl}groups`;
const jwt = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyIiwiaXNzIjoidWEuY29tLnN1cHJhLmRyaWZ0IiwiaWF0IjoxNjU3OTgwMzk1LCJleHAiOjE2NTc5ODEyOTV9.NdnzAKPPMR8nRNKzB4JPwi2FyvAkYsWrW6AjA1DSKZQ';

const criteriaParams = ["textInName","textInDescription","textInManufacturer",
    "lowerPrice","upperPrice","lowerQuantity","upperQuantity"];
const criteriaLength = criteriaParams.length;

function createCriteria(filterArray){
    if(filterArray.length!==criteriaLength) throw "Can't happen";
    let query = "";
    for (let i = 0; i < criteriaLength; i++) {
        if(filterArray[i]!=="") query = appendToQuery(query,`${criteriaParams[i]}=${filterArray[i]}`);
    }
    return query;
}

function appendToQuery(query, str){
    if(query==="") query = "?";
    else query += "&";
    query+=str;
    return query;
}

export async function getAllProducts(filterArray){
    const criteria = createCriteria(filterArray);
    const url = productsBaseUrl + criteria;
    console.log(`Url: ${url}`);
    const response = await fetch (url,
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