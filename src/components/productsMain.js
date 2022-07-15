import React, {useEffect, useState} from "react";
import {getAllProducts} from "../apiQueries";

const ProductsMain = () => {

    const [products,setProducts] = useState([]);

    const getProducts = async () => {
        const result = await getAllProducts();
        console.log(result)
    }

    useEffect(() => {
        getProducts();
    }, []);

    return(
        <div className="ProductsMain">
            <h1>ProductsMain</h1>
        </div>
    );
}

export default ProductsMain;