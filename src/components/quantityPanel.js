import React, {useState} from "react";
import {decreaseProductQuantity, getProductQuantity, increaseProductQuantity} from "../apiQueries";

const QuantityPanel = (props) => {

    const form = React.createRef();
    const validate = React.createRef();

    const [quantity,setQuantity] = useState("");

    const validateForm = (e) => {
        e.preventDefault();
        return false;
    }

    const getQuantity = async (id) => {
        return await getProductQuantity(id);
    }

    const increaseQuantity = async (id, quantity) => {
        return await increaseProductQuantity(id,quantity);
    }

    const decreaseQuantity = async (id, quantity) => {
        return await decreaseProductQuantity(id,quantity);
    }

    const submitIncreaseQuantity = (e) => {
        e.preventDefault();
        if(!form.current.checkValidity()) {
            validate.current.click();
            return;
        }
        getQuantity(props.id).then(result => {
            if(result.status===200){
                props.setQuantity(result.result);
                if(result.result===props.getQuantity()){
                    const obj = { quantity: quantity }
                    increaseQuantity(props.id, obj).then(result => {
                        if(result.status===200){
                            props.setQuantity(result.result);
                            alert("Quantity successfully changed!");
                        } else {
                            alert(result.result);
                        }
                        setQuantity("");
                    });
                } else {
                    alert("Somebody has changed quantity of this product before you!\n" +
                        "Check new value before performing this operation!");
                }
            } else {
                alert(result.result);
            }
        });

    }

    const submitDecreaseQuantity = (e) => {
        e.preventDefault();
        if(!form.current.checkValidity()) {
            validate.current.click();
            return;
        }
        getQuantity(props.id).then(result => {
            if(result.status===200){
                props.setQuantity(result.result);
                if(result.result!==props.getQuantity()){
                    alert("Somebody has changed quantity of this product before you!\n" +
                        "Check new value before performing this operation!");
                } else if(result.result<quantity){
                    alert("You can't withdraw more items than there are in storage!");
                } else {
                    const obj = { quantity: quantity }
                    decreaseQuantity(props.id, obj).then(result => {
                        if(result.status===200){
                            props.setQuantity(result.result);
                            alert("Quantity successfully changed!");
                        } else {
                            alert(result.result);
                        }
                        setQuantity("");
                    });
                }
            } else {
                alert(result.result);
            }
        });
    }

    return (
        <div className="QuantityPanel">
            <form id="form" ref={form} className="mx-5 my-3" onSubmit={(e) => validateForm(e)}>
                <div className="form-group mb-1">
                    <label htmlFor="quantity">Quantity</label>
                    <input required name="quantity" type="number" step="1" min="1" className="form-control" id="quantity"
                           placeholder="Enter quantity to add to or withdraw from store"
                           value={quantity}
                           onChange={(e) => {
                               setQuantity(e.target.value);
                           }} />
                </div>
                <div className="form-group d-flex justify-content-end">
                    <button id="addBtn" className="btn btn-success mt-3 me-2" type="button"
                            onClick={(e) => submitIncreaseQuantity(e)}>
                        Add
                    </button>
                    <button id="withdrawBtn" className="btn btn-danger mt-3" type="button"
                            onClick={(e) => submitDecreaseQuantity(e)}>
                        Withdraw
                    </button>
                    <button ref={validate} hidden type="submit">submit</button>
                </div>
            </form>
        </div>
    );
}

export default QuantityPanel;
