import React, {useState} from "react";

const ProductFilterPanel = (props) => {

    const groupsFilterRef = React.createRef();

    const [name,setName] = useState("");
    const [description,setDescription] = useState("");
    const [manufacturer,setManufacturer] = useState("");
    const [minPrice,setMinPrice] = useState("");
    const [maxPrice,setMaxPrice] = useState("");
    const [minQuantity,setMinQuantity] = useState("");
    const [maxQuantity,setMaxQuantity] = useState("");
    const [groups,setGroups] = useState([]);

    const clearInputs = () => {
        setName("");
        setDescription("");
        setManufacturer("");
        setMinPrice("");
        setMaxPrice("");
        setMinQuantity("");
        setMaxQuantity("");
        setGroups([]);
        groupsFilterRef.current.firstChild.childNodes.forEach(it => {
            it.firstChild.checked = false;
        })
    }

    const submitFilterForm = (e) => {
        e.preventDefault();
        const criteria = [name,description,manufacturer,minPrice,maxPrice,minQuantity,maxQuantity,groups];
        console.log(criteria);
        props.filter(criteria);
    }

    return (
        <div className="ProductFilterPanel border rounded">
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
                        <label htmlFor="manufacturer">Text in manufacturer</label>
                        <input className="form-control" type="text" id="manufacturer" name="manufacturer"
                               value={manufacturer}
                               onChange={(e) => setManufacturer(e.target.value)}/>
                    </div>
                    <div className="form-group mb-2">
                        <label htmlFor="description">Text in description</label>
                        <input className="form-control" type="text" id="description" name="description"
                               value={description}
                               onChange={(e) => setDescription(e.target.value)}/>
                    </div>
                    <div className="accordion" id="accordionExample">
                        <div className="card my-2">
                            <div className="card-header" style={{cursor: "pointer"}} id="headingOne"
                                onClick={() => {
                                    if(groupsFilterRef.current.classList.contains("show")){
                                        groupsFilterRef.current.classList.remove("show");
                                        groupsFilterRef.current.classList.add("collapse");
                                    }else{
                                        groupsFilterRef.current.classList.remove("collapse");
                                        groupsFilterRef.current.classList.add("show");
                                    }
                                }}>
                                <p className="mb-0 text-center">Groups</p>
                            </div>
                            <div id="collapseOne" ref={groupsFilterRef} className="collapse" data-parent="#accordionExample">
                                <div className="card-body">
                                    {props.groups.map(it => (
                                        <div className="form-check" key={it.id}>
                                            <input className="form-check-input" type="checkbox" value="" id={it.id}
                                                onChange={(e) => {
                                                    const list = groups;
                                                    if(e.target.checked){
                                                        list.push(it.id);
                                                        setGroups(list);
                                                        console.log("pushed")
                                                    }else {
                                                        const index = list.indexOf(it.id);
                                                        if(index>-1) list.splice(index,1);
                                                    }
                                                }}/>
                                                <label className="form-check-label" htmlFor={it.id}>
                                                    {it.name}
                                                </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
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
                        props.filter(["","","","","","","",""]);
                        clearInputs();
                    }}>
                        Clear
                    </button>
                </div>
            </form>
        </div>
    );
 }

export default ProductFilterPanel;