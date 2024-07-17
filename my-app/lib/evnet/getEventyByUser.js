import { gettingUser } from "../gettingUser";
const getEventByUser = async () => {
const token= gettingUser().token;
try{
const res = await fetch(
  `${process.env.NEXT_PUBLIC_BACKENDURL}/getEventByUser`,
  {
    method: "GET",
    headers: {
      Authorization: `JWT ${token}`,
    },
  }
);
const data = await res.json();
return data;
}
catch(err){
console.log(err);
alert('Error getting events:');
}

};
module.exports = { getEventByUser };