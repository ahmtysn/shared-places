import React, { Fragment } from "react";
import '../../places/components/PlaceList.css'
import Card from '../../shared/components/UIElements/Card'
import 'semantic-ui-css/semantic.min.css'
import FriendFeedUI from  './FriendFeedUI'
import PlacesFeedUI from './PlacesFeedUI'
import { Icon } from "semantic-ui-react";
import './newsfeedlist.css'
const NewsFeedList = (props) => {
    const { newsfeed,name } = props                          
   console.log(newsfeed)
    const sortedNewsByDate = newsfeed.sort((a, b) => (new Date(b.date + "," + b.time) - new Date(a.date + "," + a.time)))  //2 data arrangement alphabet
     
    return (
        <Fragment>
        
       <ul className='place-list'>                   
       {newsfeed.length===0 && <Card><h1 style={{color:'black'}}>Welcome Our New Member  <Icon name='like' color="red" /> {name}  <Icon name='like' color="red" /> </h1></Card>}  
            { sortedNewsByDate.map(news => {
                if (news.type === "Friends") {
                    return <Card className="newsfeed"><FriendFeedUI news={news} /></Card> //if data tybe ==friends send data to friendfeedui
                }
                else if (news.type === "Add New Place") {
                    return <Card className="newsfeed"> <PlacesFeedUI news={news} /></Card>   //or if data tybe new places send data to placesfeedui
                }
            }) }
        </ul>
        </Fragment>
        )
}


export default NewsFeedList;