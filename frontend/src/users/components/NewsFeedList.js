import React, { Fragment } from "react";
import FriendsFeedCard from '../components/FriendsFeedCard'
import PlaceFeedCard from '../components/PlaceFeedCard'
import '../../places/components/PlaceList.css'
import { Feed, Icon } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import FriendFeedUI from  './FriendFeedUI'
import PlacesFeedUI from './PlacesFeedUI'
const NewsFeedList = (props) => {
    const { newsfeed } = props
    const sortedNewsByDate = newsfeed.sort((a, b) => (new Date(b.date + "," + b.time) - new Date(a.date + "," + a.time)))

    return (
        <ul className='place-list'>
            {sortedNewsByDate.map(news => {
                if (news.type === "Friends") {
                    return <FriendFeedUI news={news} />
                }
                else if (news.type === "Add New Place") {
                    return <PlacesFeedUI news={news} />
                }
            })}
        </ul>)
}


export default NewsFeedList;