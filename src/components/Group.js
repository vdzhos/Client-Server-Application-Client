import React from "react";

const Group = ({ group }) => {
    return(
        <div className="Group border rounded p-3" style={{cursor: "pointer"}}
             onClick={() => window.location = `${window.location}/${group.id}`}>
            <h5><b>{group.name}</b></h5>
            <p className="mb-1"><i>Description:</i> {group.description}</p>
        </div>
    );
}

export default Group;