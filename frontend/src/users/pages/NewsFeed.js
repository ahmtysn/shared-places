import React, { useState, useEffect, useContext, Fragment } from "react";
import useHttpRequest from "./../../shared/hooks/http-hook";
import LoadingSpinner from "./../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "./../../shared/components/UIElements/Modal/ErrorModal";
import NewsFeedList from "../../users/components/NewsFeedList"
import AuthContext from '../../shared/context/auth-context';
const NewsFeed = () => {
    const auth = useContext(AuthContext);
    const [newsfeed, setNewsFeed] = useState([]);
    const { isLoading, error, clearError, sendRequest } = useHttpRequest();
    const removeDuplicates = (arr) => {
        let jsonObject = arr.map(JSON.stringify);
        let uniqueSet = new Set(jsonObject);
        let uniqueArray = Array.from(uniqueSet).map(JSON.parse);
        return uniqueArray;
    }
    const getNewsFeed = (friendsList, users, currentUserNewsfeed) => {

        let newsHomePage = currentUserNewsfeed
        friendsList.map(f =>
            newsHomePage = newsHomePage.concat(users.filter(u => u.id === f.id)[0].newsfeed)
        )
        newsHomePage = removeDuplicates(newsHomePage)
        return newsHomePage;
    }
    const fetchUsers = async () => {
        const url = "http://localhost:5000/api/users";
        try {
            const responseData = await sendRequest(url);
            const currentUserNewsFeed = responseData.filter(u => u.id === auth.userId)[0].newsfeed;
            const currentUserFriends = responseData.filter(u => u.id === auth.userId)[0].friends;
            const newsHomePage = getNewsFeed(currentUserFriends, responseData, currentUserNewsFeed);
            setNewsFeed(newsHomePage);
        } catch (err) {
            console.log("Error in fetching users!", err);
        }
    };
    
    // Fetch users before page loads, with empty [] only runs once
    useEffect(() => {
        fetchUsers();
    }, [sendRequest]);

    return (
        <Fragment>

            <ErrorModal error={error} onClear={clearError} />

            {isLoading ? <LoadingSpinner asOverlay /> : <NewsFeedList newsfeed={newsfeed} />}
        </Fragment>
    );


}

export default NewsFeed;