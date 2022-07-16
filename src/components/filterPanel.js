import React, {useState} from "react";

const FilterPanel = (props) => {

    const [name,setName] = useState("");
    const [description,setDescription] = useState("");
    const [manufacturer,setManufacturer] = useState("");
    const [minPrice,setMinPrice] = useState("");
    const [maxPrice,setMaxPrice] = useState("");
    const [minQuantity,setMinQuantity] = useState("");
    const [maxQuantity,setMaxQuantity] = useState("");

    const clearInputs = () => {
        setName("");
        setDescription("");
        setManufacturer("");
        setMinPrice("");
        setMaxPrice("");
        setMinQuantity("");
        setMaxQuantity("");
    }

    const submitFilterForm = (e) => {
        e.preventDefault();
        const criteria = [name,description,manufacturer,minPrice,maxPrice,minQuantity,maxQuantity];
        console.log(criteria);
        props.filter(criteria);
    }

    return (
        <div className="FilterPanel border rounded">
            <h4 className="label-form text-center mx-3 mt-3 p-2 font-weight-bold">Filter</h4>
            <form id="form" className="mx-3 mt-3" onSubmit={submitFilterForm}>
                <div className="w-100 d-flex flex-center flex-column" id="messages">
                    <div className="form-group mb-2">
                        <label htmlFor="name">Text in name</label>
                        <input className="form-control" type="text" id="name" name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className="form-group mb-2">
                        <label htmlFor="description">Text in description</label>
                        <input className="form-control" type="text" id="description" name="description"
                               value={description}
                               onChange={(e) => setDescription(e.target.value)}/>
                    </div>
                    <div className="form-group mb-2">
                        <label htmlFor="manufacturer">Text in manufacturer</label>
                        <input className="form-control" type="text" id="manufacturer" name="manufacturer"
                               value={manufacturer}
                               onChange={(e) => setManufacturer(e.target.value)}/>
                    </div>
                    <div className="form-group mb-2">
                        <label htmlFor="lowestPrice">Min price</label>
                        <input className="form-control" type="number" step="0.01" min="0.01" id="lowestPrice" name="lowestPrice"
                               value={minPrice}
                               onChange={(e) => setMinPrice(e.target.value)}/>
                    </div>
                    <div className="form-group mb-2">
                        <label htmlFor="highestPrice">Max price</label>
                        <input className="form-control" type="number" step="0.01" min="0.01" id="highestPrice" name="highestPrice"
                               value={maxPrice}
                               onChange={(e) => setMaxPrice(e.target.value)}/>
                    </div>
                    <div className="form-group mb-2">
                        <label htmlFor="lowestQuantity">Min quantity</label>
                        <input className="form-control" type="number" step="1" min="0" id="lowestQuantity" name="lowestQuantity"
                               value={minQuantity}
                               onChange={(e) => setMinQuantity(e.target.value)}/>
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="highestQuantity">Max quantity</label>
                        <input className="form-control" type="number" step="1" min="0" id="highestQuantity" name="highestQuantity"
                               value={maxQuantity}
                               onChange={(e) => setMaxQuantity(e.target.value)}/>
                    </div>
                    <button className="btn btn-success w-100 mt-1 mb-2 font-weight-bold" type="submit">
                        Filter
                    </button>
                    <button className="btn btn-secondary w-100 mt-1 mb-3 font-weight-bold" type="reset" onClick={() => {
                        props.filter(["","","","","","",""]);
                        clearInputs();
                    }}>
                        Clear
                    </button>
                </div>
            </form>
        </div>
    );
 }

export default FilterPanel;