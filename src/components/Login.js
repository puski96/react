S
import React, { useState } from "react";
import FacebookLogin from "react-facebook-login";
import { Card, Image } from "react-bootstrap";
import "../App.css";

function App() {
  const [login, setLogin] = useState(false);
  const [data, setData] = useState({});
  const [picture, setPicture] = useState("");

  const responseFacebook = (response) => {
    console.log(response);
    setData(response);
    setPicture(response.picture.data.url);
    if (response.accessToken) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  };

  return (
    <div class="container">
      {!login && (
        <FacebookLogin
          appId="365931671440059"
          autoLoad={true}
          fields="name,email,picture"
          scope="public_profile,user_friends"
          callback={responseFacebook}
          icon="fa-facebook"
        />
      )}
      {login && (
        <div>
          <Image src={picture} roundedCircle />
        </div>
      )}
      {login && <div>{data.name}</div>}
    </div>
  );
}

export default App;