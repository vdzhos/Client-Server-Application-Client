import React, {useEffect, useState} from "react";
import {getAllGroups, redirectToLogin} from "../apiQueries";
import Group from "./Group";
import GroupFilterPanel from "./groupFilterPanel";

const GroupsMain = () => {

    const [groups,setGroups] = useState([]);

    const getGroups = async (filterArray) => {
        return await getAllGroups(filterArray);
    }

    const filterGroups = (filterArray) => {
        getGroups(filterArray).then( result => {
            if(result.status===200){
                setGroups(result.result);
            } else {
                setGroups([]);
                alert(result.result);
                redirectToLogin(result);
            }
            console.log(result);
        });
    }

    useEffect(() => {
        filterGroups(["",""]);
    }, []);

    return(
        <div className="GroupsMain">
            <div className="row p-3">
                <div className="col-12 col-md-6 col-lg-3">
                    <GroupFilterPanel filter={filterGroups}/>
                </div>
                <div className="col-12 col-md-6 col-lg-9">
                    <div className="groupsContainer">
                        {groups.map((it) => (
                            <div key={it.id} className="mb-3">
                                <Group group={it}/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GroupsMain;