import React, { useState, useEffect, useContext, Fragment } from "react";
import CreatorPlaceFeedCard from './CreatorPlaceFeedCard';
import useHttpRequest from "./../../shared/hooks/http-hook";


const PlaceFeedCard = (props) => {
    const { news } = props
    const [p, setP] = useState();
    const { isLoading, error, clearError, sendRequest } = useHttpRequest();
    const fetchUsers = async () => {

        try {
            const place = await sendRequest(`http://localhost:5000/api/places/${news.place}`)
            setP(place);

        } catch (err) {
            console.log("Error in fetching users!", err);
        }

    };
    useEffect(() => {
        fetchUsers();
    }, [sendRequest]);

    return (<Fragment>
        {p && <CreatorPlaceFeedCard place={p} />}
    </Fragment>
    )
}

export default PlaceFeedCard;