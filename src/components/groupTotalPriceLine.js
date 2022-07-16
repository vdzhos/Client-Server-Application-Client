import React, {useEffect, useState} from "react";
import {getGroupTotalPrice} from "../apiQueries";

const GroupTotalPriceLine = (props) => {

    const [id, setId] = useState("");
    const [name,setName] = useState("");
    const [total_price,setTotalPrice] = useState(-1);

    useEffect(() => {
        init(props.group);
    }, []);

    const init = (group) => {
        setId(group.id);
        setName(group.name)
        getGroupTotalPrice(group.id).then( result => {
            if(result.status===200){
                setTotalPrice(result.result);
            } else {
                setTotalPrice(-1);
                alert(result.result);
            }
            console.log(result);
        })
    }

    return (
        <>
            <th scope="row">{id}</th>
            <td>{name}</td>
            <td>{total_price}</td>
        </>

    );
 }

export default GroupTotalPriceLine;