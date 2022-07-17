import React, {useEffect, useState} from "react";
import {createGroup, deleteGroupById, getGroupById, redirectToLogin, updateGroupById} from "../apiQueries";
import QuantityPanel from "./quantityPanel";

const GroupPage = (props) => {

    const id = window.location.toString().split("/").slice(-1)[0];
    const form = React.createRef();
    const validate = React.createRef();

    const [name,setName] = useState("");
    const [description,setDescription] = useState("");

    const validateForm = (e) => {
        e.preventDefault();
        return false;
    }

    const createNewGroup = async (group) => {
        return await createGroup(group);
    }

    const submitCreateGroup = (e) => {
        e.preventDefault();
        if(!form.current.checkValidity()) {
            validate.current.click();
            return;
        }
        const group = {
            name: name,
            description: description,
        }
        console.log(group);
        createNewGroup(group).then(result => {
            if(result.status===201){
                alert("Group successfully created!");
                window.location = `/groups/${result.result.id}`
            } else {
                alert(result.result);
                redirectToLogin(result);
            }
        })
    }

    const updateGroup = async (id, group) => {
        return await updateGroupById(id, group);
    }

    const submitUpdateGroup = (e) => {
        e.preventDefault();
        if(!form.current.checkValidity()) {
            validate.current.click();
            return;
        }
        const group = {
            name: name,
            description: description,
        }
        console.log(group);
        updateGroup(id,group).then(result => {
            if(result.status===200){
                alert("Group successfully updated!");
            } else {
                alert(result.result);
                redirectToLogin(result);
            }
        });
    }

    const deleteGroup = async (id) => {
        return await deleteGroupById(id);
    }

    const submitDeleteGroup = (e) => {
        e.preventDefault();
        deleteGroup(id).then(result => {
           if(result.status===204){
               alert("Group successfully deleted!");
               window.location = "/groups"
           } else {
               alert(result.result);
               redirectToLogin(result);
           }
        });
    }

    const getGroup = async (id) => {
        return await getGroupById(id);
    }

    const init = (id) => {
        if(!props.create){
            getGroup(id).then(result => {
                if(result.status===200){
                    setName(result.result.name);
                    setDescription(result.result.description);
                } else {
                    setName("");
                    setDescription("");
                    alert(result.result);
                    redirectToLogin(result);
                }
                console.log(result);
            });
        }
    }

    useEffect(() => {
        init(id);
    }, []);

    return(
        <div className="GroupPage">
            {!props.create ?
                <>
                    <h3 className="mx-5 mt-4">Edit group information</h3>
                </>
                :
                <>
                    <h3 className="mx-5 mt-4">Create a new group</h3>
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
                    <label htmlFor="description">Description</label>
                    <textarea required name="description" className="form-control" id="description" rows="5"
                              placeholder="Enter description"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="form-group d-flex justify-content-end">
                    {props.create ?
                        <button id="createBtn" className="btn btn-success mt-3" type="button"
                                onClick={(e) => submitCreateGroup(e)}>
                            Create
                        </button>
                        :
                        <>
                            <button id="updateBtn" className="btn btn-success mt-3 me-2" type="button"
                                    onClick={(e) => submitUpdateGroup(e)}>
                                Update
                            </button>
                            <button id="deleteBtn" className="btn btn-danger mt-3" type="button"
                                    onClick={(e) => submitDeleteGroup(e)}>
                                Delete
                            </button>
                        </>
                    }
                    <button ref={validate} hidden type="submit">submit</button>
                </div>
            </form>
        </div>
    );
}

export default GroupPage;