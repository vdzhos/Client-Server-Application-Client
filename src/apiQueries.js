const baseUrl = "https://localhost:8080/api/";
const totalPriceUrl = `${baseUrl}statistics/total_price`;
const productsBaseUrl = `${baseUrl}products`;
const groupsBaseUrl = `${baseUrl}groups`;
const jwt = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyIiwiaXNzIjoidWEuY29tLnN1cHJhLmRyaWZ0IiwiaWF0IjoxNjU4MDEyNjY1LCJleHAiOjE2NTgwMTM1NjV9.OsxYk2_rQCq0zMqVKrGoamKo84k80lrp8LiDDL0vHnw';

const criteriaProductParams = ["textInName","textInDescription","textInManufacturer",
    "lowerPrice","upperPrice","lowerQuantity","upperQuantity","groupIds"];
const criteriaProductLength = criteriaProductParams.length;

const criteriaGroupParams = ["textInName","textInDescription"];
const criteriaGroupLength = criteriaGroupParams.length;

function createProductCriteria(filterArray){
    if(filterArray.length!==criteriaProductLength) throw "Can't happen";
    let query = "";
    console.log(`groupIds: ${filterArray[7]}`)
    for (let i = 0; i < criteriaProductLength-1; i++) {
        if(filterArray[i]!=="") query = appendToQuery(query,`${criteriaProductParams[i]}=${filterArray[i]}`);
    }
    const last = criteriaProductLength-1;
    if(filterArray[last].length!==0) query = appendToQuery(query,`${criteriaProductParams[last]}=${filterArray[last]}`);
    return query;
}

function createGroupCriteria(filterArray){
    if(filterArray.length!==criteriaGroupLength) throw "Can't happen";
    let query = "";
    for (let i = 0; i < criteriaGroupLength; i++) {
        if(filterArray[i]!=="") query = appendToQuery(query,`${criteriaGroupParams[i]}=${filterArray[i]}`);
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

export async function createProduct(product){
    const response = await fetch (productsBaseUrl,
        {
            method: 'POST',
            headers: {
                Jwt: jwt
            },
            body: JSON.stringify(product)
        });
    const result = { status: response.status };
    if(response.status===403){
        result["result"] = "Forbidden! Not Authorized!"
    } else {
        const json = await response.json();
        if(response.status===201){
            result["result"] = json["product"];
        } else {
            result["result"] = json["error"];
        }
    }
    return result;
}

export async function getProductQuantity(id){
    const response = await fetch (productsBaseUrl + `/quantity/${id}`,
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
            result["result"] = json["quantity"];
        } else {
            result["result"] = json["error"];
        }
    }
    return result;
}

export async function increaseProductQuantity(id, quantity){
    const response = await fetch (productsBaseUrl + `/increase/${id}`,
        {
            method: 'POST',
            headers: {
                Jwt: jwt
            },
            body: JSON.stringify(quantity)
        });
    const result = { status: response.status };
    if(response.status===403){
        result["result"] = "Forbidden! Not Authorized!"
    } else {
        const json = await response.json();
        if(response.status===200){
            result["result"] = json["quantity"];
        } else {
            result["result"] = json["error"];
        }
    }
    return result;
}

export async function decreaseProductQuantity(id, quantity){
    const response = await fetch (productsBaseUrl + `/decrease/${id}`,
        {
            method: 'POST',
            headers: {
                Jwt: jwt
            },
            body: JSON.stringify(quantity)
        });
    const result = { status: response.status };
    if(response.status===403){
        result["result"] = "Forbidden! Not Authorized!"
    } else {
        const json = await response.json();
        if(response.status===200){
            result["result"] = json["quantity"];
        } else {
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

export async function getGroupById(id){
    const response = await fetch (groupsBaseUrl + `/${id}`,
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
            result["result"] = json["group"];
        } else {
            result["result"] = json["error"];
        }
    }
    return result;
}

export async function getGroupTotalPrice(id){
    const url = totalPriceUrl + (id !== null ? `/${id}` : "");
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
            result["result"] = json["total_price"];
        } else {
            result["result"] = json["error"];
        }
    }
    return result;
}

export async function createGroup(group){
    const response = await fetch (groupsBaseUrl,
        {
            method: 'POST',
            headers: {
                Jwt: jwt
            },
            body: JSON.stringify(group)
        });
    const result = { status: response.status };
    if(response.status===403){
        result["result"] = "Forbidden! Not Authorized!"
    } else {
        const json = await response.json();
        if(response.status===201){
            result["result"] = json["group"];
        } else {
            result["result"] = json["error"];
        }
    }
    return result;
}

export async function updateGroupById(id, group){
    const response = await fetch (groupsBaseUrl + `/${id}`,
        {
            method: 'PUT',
            headers: {
                Jwt: jwt
            },
            body: JSON.stringify(group)
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

export async function deleteGroupById(id){
    const response = await fetch (groupsBaseUrl + `/${id}`,
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