import { useEffect } from "react";
import { useState } from "react";
import { gettingUser } from "@/lib/gettingUser";
export default function testing() {
  const [data, setData] = useState({});
  useEffect(() => {
    const fetccData = async () => {
      const res=await fetch(process.env.NEXT_PUBLIC_BACKENDURL+'/testing',{
        method:'GET',
        headers:{
          'Content-Type':'application/json',
          Authorization: `JWT ${gettingUser().token}`,
        },
      });
      const datarec=await res.json();
      console.log(datarec);
      setData(datarec);
    };
    fetccData();
   
  }, []);
  return (
    <div>
      <h1>{data.message}</h1>
    </div>
  );
}