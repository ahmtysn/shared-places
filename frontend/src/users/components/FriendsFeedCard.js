import React, { useState, useEffect, useContext, Fragment } from "react";
import useHttpRequest from "./../../shared/hooks/http-hook";
import { Feed, Icon } from 'semantic-ui-react'
const FriendsFeedCard = (props) => {
    const { news } = props

    const [u1, setU1] = useState();
    const [u2, setU2] = useState();
    const { isLoading, error, clearError, sendRequest } = useHttpRequest();
    const fetchUsers = async () => {

        try {
            const user1 = await sendRequest(`http://localhost:5000/api/users/${news.user1}`);
            const user2 = await sendRequest(`http://localhost:5000/api/users/${news.user2}`);

            setU1(user1);
            setU2(user2);

        } catch (err) {
            console.log("Error in fetching users!", err);
        }

    };

    // Fetch users before page loads, with empty [] only runs once
    useEffect(() => {
        fetchUsers();
    }, [sendRequest]);



    return (u1 && u2 ? <h1>{u1.name} && {u2.name}  are friends now  </h1>
        : <h1>Not Found</h1>)
}

export default FriendsFeedCard;