import React, {useEffect, useState} from "react";
import {getAllGroups, getGroupTotalPrice} from "../apiQueries";
import GroupTotalPriceLine from "./groupTotalPriceLine";

const StatisticsMain = () => {

    const [groups,setGroups] = useState([]);
    const [total_price,setTotalPrice] = useState(0);


    const getGroups = async (filterArray) => {
        return await getAllGroups(filterArray);
    }

    const filterGroups = (filterArray) => {
        getGroups(filterArray).then( result => {
            if(result.status===200){
                setGroups(result.result);
            } else {
                setGroups([]);
            }
            console.log(result);
        });
    }

    const init = () => {
        filterGroups(["",""]);
        getGroupTotalPrice(null).then( result => {
            if(result.status===200){
                setTotalPrice(result.result);
            } else {
                setTotalPrice(-1);
                alert(result.result);
            }
            console.log(result);
        })
    }

    useEffect(() => {
        init();
    }, []);

    return(
        <div className="StatisticsMain">
            <table className="table table-striped table-bordered w-75 mt-2 mx-auto caption-top">
                <caption style={{fontSize:"large", color:"black"}}><strong>Total price of products in groups</strong></caption>
                <thead>
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Group Name</th>
                    <th scope="col">Total Price</th>
                </tr>
                </thead>
                <tbody>
                    {groups.map((it) => (
                        <tr key={it.id}>
                            <GroupTotalPriceLine group={it}/>
                        </tr>
                    ))}

                    <tr>
                        <th colSpan="2">Overall</th>
                        <td>{total_price}</td>
                    </tr>

                </tbody>
            </table>
        </div>
    );
}

export default StatisticsMain;