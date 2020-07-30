import React from "react";
import Button from '../../shared/components/FormElements/Button'
import useHttpClient from "../../shared/hooks/http-hook";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/Modal/ErrorModal";
import { Link } from "react-router-dom";
import './friendItem.css'
const RejectFriendReq = ({ receivedRequestId, userId, token }) => {

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const acceptRequest = async () => {

        try {
            await sendRequest(
                'http://localhost:5000/api/friends/requests/reject',
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
                    <Button classname="btn_friend" onClick={acceptRequest}>
                        {isLoading ? <LoadingSpinner /> : "Reject"}
                    </Button>
                </div>
            </Link>
        </React.Fragment>
    );
};
export default RejectFriendReq;