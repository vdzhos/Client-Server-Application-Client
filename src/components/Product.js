import React from "react";

const Product = ({ product }) => {
    return(
        <div className="Product border rounded p-3" style={{cursor: "pointer"}}
            onClick={() => window.location = `${window.location}/${product.id}`}>
            <h5><b>{product.name}</b></h5>
            <h6><i>Group:</i> {product.groupName}</h6>
            <p className="mb-1"><i>Manufacturer:</i> {product.manufacturer}</p>
            <p className="mb-1"><i>Price:</i> {product.price}</p>
            <p className="mb-1"><i>Quantity:</i> {product.quantity}</p>
            <p className="mb-1"><i>Description:</i> {product.description}</p>
        </div>
    );
}

export default Product;