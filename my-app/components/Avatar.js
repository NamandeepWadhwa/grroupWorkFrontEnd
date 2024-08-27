// components/Avatar.js
import React from "react";
import { Image } from "react-bootstrap";
import { useEffect, useState } from "react";
import { gettingUser } from "@/lib/gettingUser";

const Avatar = ({ id }) => {
  useEffect(() => {
    const token = gettingUser().token;
    const fetchData = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/getUser/${id}`, {
        method: "GET",
        headers: {
          Authorization: `JWT ${token}`,
        },
      });

      const data = await res.json();
      if(data!=null){
      if(data.profile_picture!=null  &&data.profile_picture.length>0 )
        {
      setImage(data.profile_picture);
      }
      
      setUserName(data.first_name);
    }
    };
    fetchData();
  }, []);
  const [image, setImage] = useState("/userProfile.png");
  const [userName, setUserName] = useState("Unknown");
  return (
    <div className="flex justify-start my-2">
      <div className=" w-12 h-12 ">
        <img src={image} className="object-cover rounded-full w-full h-full" />
       
      </div>

      <span className="ms-2">{userName}</span>
    </div>
  );
};

export default Avatar;
