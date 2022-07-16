import React, {useEffect, useState} from "react";
import {getAllProducts} from "../apiQueries";
import Product from "./Product";
import ProductFilterPanel from "./productFilterPanel";

const ProductsMain = () => {

    const [products,setProducts] = useState([]);

    const getProducts = async (filterArray) => {
        return await getAllProducts(filterArray);
    }

    const filterProducts = (filterArray) => {
        getProducts(filterArray).then( result => {
            if(result.status===200){
                setProducts(result.result);
            } else {
                setProducts([]);
            }
            console.log(result);
        });
    }

    useEffect(() => {
        filterProducts(["","","","","","",""])
    }, []);

    return(
        <div className="ProductsMain">
            <div className="row p-3">
                <div className="col-12 col-md-6 col-lg-3">
                    <ProductFilterPanel filter={filterProducts}/>
                </div>
                <div className="col-12 col-md-6 col-lg-9">
                    <div className="productsContainer">
                        {products.map((it) => (
                            <div key={it.id} className="mb-3">
                                <Product product={it}/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductsMain;