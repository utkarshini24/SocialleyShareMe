import React from 'react';
// import GoogleLogin from 'react-google-login';
import { useNavigate } from 'react-router-dom';
// import { FcGoogle } from 'react-icons/fc';
import { GoogleLogin } from '@react-oauth/google';
import shareVideo from '../assets/share.mp4';
import logo from '../assets/logowhite.png';
 
import { client } from '../client';
 
const Login = () => {
  const navigate = useNavigate();
 
  const createOrGetUser = async (response) => {
 
    var base64Url = response.credential.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
 
    const { name, picture, sub } = JSON.parse(jsonPayload);
 
    const user = {
      _id: sub,
      _type: "user",
      userName: name,
      image: picture,
    };
 
    client.createIfNotExists(user).then(() => {
      navigate("/", { replace: true });
    });
  };
 
  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className=" relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />
 
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0    bg-blackOverlay">
          <div className="p-5">
            <img src={logo} width="130px" />
          </div>
 
          <div className="shadow-2xl">
            <GoogleLogin
              clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}
 
              onError={(err) => console.log('error using google sigin', err)}
              onSuccess={(response) => createOrGetUser(response)}
              onFailure={(response) => createOrGetUser(response)}
              useOneTap
              // cookiePolicy="single_host_origin"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default Login;

