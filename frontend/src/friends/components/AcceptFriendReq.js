import React, { useState } from "react";
import Button from '../../shared/components/FormElements/Button'
import useHttpClient from "../../shared/hooks/http-hook";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/Modal/ErrorModal";
import { Link } from "react-router-dom";
import Modal from '../../shared/components/UIElements/Modal/Modal'
import './friendItem.css'

const AcceptFriendReq = ({ receivedRequestId, userId, token }) => {

    const { isLoading, error, sendRequest, clearError } = useHttpClient();


    const acceptRequest = async () => {

        try {
            await sendRequest(
                'http://localhost:5000/api/friends/requests/accept',
                'PATCH',
                JSON.stringify({
                    friendId: receivedRequestId,
                    userId: userId
                }),
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token
                }
            );
      
        } catch (err) { }

    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <Link>
                <div className="friend_btn">
                    <Button friend onClick={acceptRequest}>
                        {isLoading ? <LoadingSpinner /> : "Accept"}
                    </Button>
                </div>
            </Link>
        </React.Fragment>
    );
};
export default AcceptFriendReq;