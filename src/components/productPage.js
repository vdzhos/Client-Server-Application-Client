import React, {useEffect, useState} from "react";
import {deleteProductById, getAllGroups, getProductById} from "../apiQueries";
import Product from "./Product";

const ProductPage = () => {

    const id = window.location.toString().split("/").slice(-1)[0];

    const [name,setName] = useState("");
    const [manufacturer,setManufacturer] = useState("");
    const [group,setGroup] = useState("");
    const [price,setPrice] = useState("");
    const [description,setDescription] = useState("");

    const [groups, setGroups] = useState([]);

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

    const getProduct = async (id) => {
        return await getProductById(id);
    }

    const getGroups = async () => {
        return await getAllGroups(["",""]);
    }

    const init = (id) => {
        Promise.all([getProduct(id),getGroups()]).then(results => {
            const res1 = results[0];
            const res2 = results[1];
            if(res1.status===200 && res2.status===200){
                const product = res1.result;
                const groupsRes = res2.result;
                setName(product.name);
                setManufacturer(product.manufacturer);
                setGroup(groupsRes.find(it => it.id===product.groupId).name);
                setPrice(product.price);
                setDescription(product.description);
                setGroups(groupsRes);
            } else {
                let error = "";
                if(res1.status===403 && res2.status===403){
                    error = res1.result;
                } else {
                    if(res1.status!==200) error+=res1.result;
                    if(res2.status!==200) {
                        if(error!=="") error+='\n';
                        error+=res2.result;
                    }
                }
                alert(error);
                window.location = "/products";
            }
            console.log(res1);
            console.log(res2);
        });
    }

    useEffect(() => {
        init(id);
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
                    <select required className="form-control" id="group" name="group"
                            value={group}
                            onChange={(e) => setGroup(e.target.value)}>
                        {groups.map((it) => (
                            <option key={it.id}
                            >{it.name}</option>
                        ))}
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