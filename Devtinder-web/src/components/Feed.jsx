import axios from 'axios';
import React, { useEffect } from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import Usercard from './Usercard';

const Feed = () => {
  const feed = useSelector((store) => store.feed)
  
  const dispatch = useDispatch();

  const getFeed = async () => {
    if(feed) return;
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
       withCredentials: true
      });
      dispatch(addFeed(res.data));
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getFeed();
  },[])

  return (
    feed && (
    <div className='flex justify-center my-30'>
      <Usercard user={feed[1]}/>
    </div>)
  )
}

export default Feed
