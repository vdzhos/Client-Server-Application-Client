import React, {useEffect, useState} from "react";
import {
    createProduct,
    deleteProductById,
    getAllGroups,
    getProductById,
    redirectToLogin,
    updateProductById
} from "../apiQueries";
import QuantityPanel from "./quantityPanel";

const ProductPage = (props) => {

    const id = window.location.toString().split("/").slice(-1)[0];
    const form = React.createRef();
    const validate = React.createRef();

    const [name,setName] = useState("");
    const [manufacturer,setManufacturer] = useState("");
    const [group,setGroup] = useState("");
    const [price,setPrice] = useState("");
    const [quantity,setQuantity] = useState("");
    const [description,setDescription] = useState("");

    const [groups, setGroups] = useState([]);

    const validateForm = (e) => {
        e.preventDefault();
        return false;
    }

    const createNewProduct = async (product) => {
        return await createProduct(product);
    }

    const submitCreateProduct = (e) => {
        e.preventDefault();
        if(!form.current.checkValidity()) {
            validate.current.click();
            return;
        }
        const product = {
            name: name,
            manufacturer: manufacturer,
            description: description,
            price: price,
            quantity: 0,
            groupId: groups.find(it => it.name===group).id
        }
        console.log(product);
        createNewProduct(product).then(result => {
            if(result.status===201){
                alert("Product successfully created!");
                window.location = `/products/${result.result.id}`
            } else {
                alert(result.result);
                redirectToLogin(result);
            }
        })
    }

    const updateProduct = async (id, product) => {
        return await updateProductById(id, product);
    }

    const submitUpdateProduct = (e) => {
        e.preventDefault();
        if(!form.current.checkValidity()) {
            validate.current.click();
            return;
        }
        const product = {
            id: id,
            name: name,
            manufacturer: manufacturer,
            description: description,
            price: price,
            quantity: quantity,
            groupId: groups.find(it => it.name===group).id
        }
        console.log(product);
        updateProduct(id,product).then(result => {
            if(result.status===200){
                alert("Product successfully updated!");
            } else {
                alert(result.result);
                redirectToLogin(result);
            }
        });
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
               redirectToLogin(result);
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
        if(!props.create){
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
                    setQuantity(product.quantity);
                    setDescription(product.description);
                    setGroups(groupsRes);
                } else {
                    let error = "";
                    if(res1.status===403 && res2.status===403){
                        error = res1.result;
                        alert(error);
                        redirectToLogin(res1);
                    } else {
                        if(res1.status!==200) error+=res1.result;
                        if(res2.status!==200) {
                            if(error!=="") error+='\n';
                            error+=res2.result;
                        }
                        alert(error);
                        window.location = "/products";
                    }
                }
                console.log(res1);
                console.log(res2);
            });
        } else {
            getGroups().then(result => {
                if(result.status===200){
                    if(result.result.length===0){
                        alert("No groups created!");
                        window.location = "/products";
                    }else{
                        setGroups(result.result);
                        setGroup(result.result[0].name)
                    }
                } else {
                    alert(result.result);
                    if(result.status===403) {
                        redirectToLogin(result);
                    } else {
                        window.location = "/products";
                    }
                }
            });
        }
    }

    useEffect(() => {
        init(id);
    }, []);

    const getQuantity = () => {
        return quantity;
    }

    return(
        <div className="ProductPage">
            <div>
                {!props.create ?
                    <>
                        <h3 className="mx-5 mt-4">Manage product quantity in storage</h3>
                        <QuantityPanel setQuantity={setQuantity} id={id} getQuantity={getQuantity}/>
                        <h3 className="mx-5">Edit product information</h3>
                    </>
                    :
                    <>
                        <h3 className="mx-5 mt-4">Create a new product</h3>
                    </>
                }
                <form id="form" ref={form} className="mx-5 my-3" onSubmit={(e) => validateForm(e)}>
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
                    {!props.create ?
                        <div className="form-group mb-3">
                            <label htmlFor="quantity">Quantity</label>
                            <input disabled required name="quantity" type="number" step="0.01" min="0.01" className="form-control" id="quantity"
                                   value={quantity}
                                   onChange={(e) => setQuantity(e.target.value)} />
                        </div>
                        :
                        <></>
                    }
                    <div className="form-group mb-3">
                        <label htmlFor="description">Description</label>
                        <textarea required name="description" className="form-control" id="description" rows="5"
                                  placeholder="Enter description"
                                  value={description}
                                  onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div className="form-group d-flex justify-content-end">
                        {props.create ?
                            <button id="createBtn" className="btn btn-success mt-3" type="button"
                                    onClick={(e) => submitCreateProduct(e)}>
                                Create
                            </button>
                            :
                            <>
                                <button id="updateBtn" className="btn btn-success mt-3 me-2" type="button"
                                        onClick={(e) => submitUpdateProduct(e)}>
                                    Update
                                </button>
                                <button id="deleteBtn" className="btn btn-danger mt-3" type="button"
                                        onClick={(e) => submitDeleteProduct(e)}>
                                    Delete
                                </button>
                            </>
                        }
                        <button ref={validate} hidden type="submit">submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ProductPage;