import React, {useEffect, useState} from "react";
import {getAllProducts} from "../apiQueries";
import Product from "./Product";

const ProductsMain = () => {

    const [products,setProducts] = useState([]);

    const getProducts = async () => {
        return await getAllProducts();
    }

    useEffect(() => {
        getProducts().then( result => {
            if(result.status===200){
                setProducts(result.result);
            } else {
                setProducts([]);
            }
            console.log(result);
        });
    }, []);

    return(
        <div className="ProductsMain">
            <div className="productsContainer">
                {products.map((it) => (
                    <div key={it.id} className="m-3">
                        <Product product={it}/>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductsMain;