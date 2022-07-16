import React, {useEffect, useState} from "react";
import {deleteProductById, getProductById} from "../apiQueries";

const ProductPage = () => {

    const id = window.location.toString().split("/").slice(-1)[0];

    const [name,setName] = useState("");
    const [manufacturer,setManufacturer] = useState("");
    const [price,setPrice] = useState("");
    const [description,setDescription] = useState("");

    const submitUpdateProduct = (e) => {
        e.preventDefault();
        console.log("Update!");
    }

    const deleteProduct = async (id) => {
        return await deleteProductById(id);
    }

    const submitDeleteProduct = (e) => {
        e.preventDefault();
        deleteProduct(id).then(result => {
           if(result.status===204){
               alert("Product successfully deleted!");
               window.location = "/products"
           } else {
               alert(result.result);
           }
        });
    }

    const getProduct = async (url) => {
        return await getProductById(url);
    }

    const getInitProduct = (url) => {
        getProduct(url).then(result => {
            if(result.status===200){
                const product = result.result;
                setName(product.name);
                setManufacturer(product.manufacturer);
                setPrice(product.price);
                setDescription(product.description);
            } else {
                alert(result.result);
                window.location = "/products"
            }
            console.log(result);
        });
    }

    useEffect(() => {
        getInitProduct(id);
    }, []);

    return(
        <div className="ProductPage">
            <form id="form" className="m-5">
                <div className="form-group mt-3 mb-3">
                    <label htmlFor="name">Name</label>
                    <input required name="name" type="text" className="form-control" id="name"
                           placeholder="Enter name"
                           value={name}
                           onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="group">Group</label>
                    <select className="form-control" id="group" name="group">
                        <option>1</option>
                        <option>2</option>
                    </select>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="manufacturer">Manufacturer</label>
                    <input required name="manufacturer" type="text" className="form-control" id="manufacturer"
                           placeholder="Enter manufacturer"
                           value={manufacturer}
                           onChange={(e) => setManufacturer(e.target.value)} />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="price">Price</label>
                    <input required name="price" type="number" step="0.01" min="0.01" className="form-control" id="price"
                           placeholder="Enter price"
                           value={price}
                           onChange={(e) => setPrice(e.target.value)} />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="description">Description</label>
                    <textarea required name="description" className="form-control" id="description" rows="5"
                              placeholder="Enter description"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="form-group d-flex justify-content-end">
                    <button id="updateBtn" className="btn btn-success mt-3 me-2" type="button"
                            onClick={(e) => submitUpdateProduct(e)}>
                        Update
                    </button>
                    <button id="deleteBtn" className="btn btn-danger mt-3" type="button"
                            onClick={(e) => submitDeleteProduct(e)}>
                        Delete
                    </button>
                    {/*<button type="submit" id="createBtn" className="btn btn-success mt-3" formAction="/settings/create"*/}
                    {/*        formMethod="post">Create*/}
                    {/*</button>*/}
                </div>
            </form>
        </div>
    );
}

export default ProductPage;