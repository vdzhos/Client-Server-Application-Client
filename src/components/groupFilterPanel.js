import React, {useState} from "react";

const GroupFilterPanel = (props) => {

    const [name,setName] = useState("");
    const [description,setDescription] = useState("");

    const clearInputs = () => {
        setName("");
        setDescription("");
    }

    const submitFilterForm = (e) => {
        e.preventDefault();
        const criteria = [name,description];
        console.log(criteria);
        props.filter(criteria);
    }

    return (
        <div className="GroupFilterPanel border rounded">
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

                    <button className="btn btn-success w-100 mt-1 mb-2 font-weight-bold" type="submit">
                        Filter
                    </button>
                    <button className="btn btn-secondary w-100 mt-1 mb-3 font-weight-bold" type="reset" onClick={() => {
                        props.filter(["",""]);
                        clearInputs();
                    }}>
                        Clear
                    </button>
                </div>
            </form>
        </div>
    );
 }

export default GroupFilterPanel;