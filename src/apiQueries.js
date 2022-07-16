const baseUrl = "https://localhost:8080/api/";
const productsBaseUrl = `${baseUrl}products`;
const groupsBaseUrl = `${baseUrl}groups`;
const jwt = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyIiwiaXNzIjoidWEuY29tLnN1cHJhLmRyaWZ0IiwiaWF0IjoxNjU3OTkxMzI0LCJleHAiOjE2NTc5OTIyMjR9.7zYdK1TbDn3aEUJoBWAreHj9t5NPRJlQzjHriyhmg2s';

const criteriaProductParams = ["textInName","textInDescription","textInManufacturer",
    "lowerPrice","upperPrice","lowerQuantity","upperQuantity"];
const criteriaProductLength = criteriaProductParams.length;

const criteriaGroupParams = ["textInName","textInDescription"];
const criteriaGroupLength = criteriaGroupParams.length;

function createGroupCriteria(filterArray){
    if(filterArray.length!==criteriaGroupLength) throw "Can't happen";
    let query = "";
    for (let i = 0; i < criteriaGroupLength; i++) {
        if(filterArray[i]!=="") query = appendToQuery(query,`${criteriaGroupParams[i]}=${filterArray[i]}`);
    }
    return query;
}

function createProductCriteria(filterArray){
    if(filterArray.length!==criteriaProductLength) throw "Can't happen";
    let query = "";
    for (let i = 0; i < criteriaProductLength; i++) {
        if(filterArray[i]!=="") query = appendToQuery(query,`${criteriaProductParams[i]}=${filterArray[i]}`);
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
    const criteria = createProductCriteria(filterArray);
    const url = productsBaseUrl + criteria;
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

export async function getProductById(id){
    const response = await fetch (productsBaseUrl + `/${id}`,
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
            result["result"] = json["product"];
        } else {
            result["result"] = json["error"];
        }
    }
    return result;
}

export async function deleteProductById(id){
    const response = await fetch (productsBaseUrl + `/${id}`,
        {
            method: 'DELETE',
            headers: {
                Jwt: jwt
            }
        });
    const result = { status: response.status };
    if(response.status===403){
        result["result"] = "Forbidden! Not Authorized!"
    } else {
        if(response.status!==204){
            const json = await response.json();
            result["result"] = json["error"];
        }
    }
    return result;
}

export async function updateProductById(id, product){
    const response = await fetch (productsBaseUrl + `/${id}`,
        {
            method: 'PUT',
            headers: {
                Jwt: jwt
            },
            body: JSON.stringify(product)
        });
    const result = { status: response.status };
    if(response.status===403){
        result["result"] = "Forbidden! Not Authorized!"
    } else {
        if(response.status!==200){
            const json = await response.json();
            result["result"] = json["error"];
        }
    }
    return result;
}

export async function getAllGroups(filterArray){
    const criteria = createGroupCriteria(filterArray);
    const url = groupsBaseUrl + criteria;
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
            result["result"] = json["groups"];
        } else {
            result["result"] = json["error"];
        }
    }
    return result;
}