import { useEffect } from "react";
import { useState } from "react";
import { gettingUser } from "@/lib/gettingUser";
export default function testing() {
  const sendingData={
    "title":"Testing question",
    "description":"this is a test question",
    "tags":["hakai","singh","test"]
  };
  const [data, setData] = useState({});
  console.log(process.env.NEXT_PUBLIC_BACKENDURL+'/createQuestion');
  useEffect(() => {
    console.log(gettingUser().token);
    
    const fetchData = async () => {
      const res=await fetch(process.env.NEXT_PUBLIC_BACKENDURL+'/createQuestion',{
        method:'POST',
        headers:{
          Authorization: `JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NmNjNzk2OTE3MGU0ODE3MTQzZmU5OCIsImVtYWlsIjoibndhZGh3YTJAbXlzZW5lY2EuY2EiLCJyb2xlIjoiU3R1ZGVudCIsImlhdCI6MTcxODQxOTU0Nn0.XtNhtp8-v5tzzzIr3uUHAN-0PKWNzX8rOYpAZrXlLeA`,
          'Content-Type':'application/json',
          
        },
        body:JSON.stringify(sendingData)
      });
      const datarec=await res.json();
      console.log(datarec);
      setData(datarec);
    };
    fetchData();
   
  }, []);
  return (
    <div>
      <h1>{data.id}</h1>
    </div>
  );
}