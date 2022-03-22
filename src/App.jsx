import React from 'react';
import './App.css';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';

import { ChannelContainer, ChannelListContainer, Auth } from './components';
//adrianhajdin/ project_medical_pager
const cookies = new Cookies(); //the cookies help us to get the data that were inputed in the auth

const apiKey = 'vrv2hsj9676q';
//const authToken= false;
const authToken= cookies.get("token");

const client = StreamChat.getInstance(apiKey);

if(authToken){
  //create user.. we are fetching these information from cookies. connect our user so we get his messages
  client.connectUser({
        username: cookies.get('username'),
        name: cookies.get('fullName'),
        Id: cookies.get('userId'),
        phoneNumber: cookies.get('phoneNumber'),
        image: cookies.get('avatarURL'),
        hashedPassword: cookies.get('hashedPassword'),

  }, authToken)
}

const App = () => {
  if(!authToken) return <Auth /> //if there is no authtoken return auth but if there is, return what is below
  return (
    <div className="app__wrapper">
        <Chat client={client} theme = "team light">
          <ChannelListContainer />
          <ChannelContainer />
        </Chat>
    </div>
  )
}

export default App
