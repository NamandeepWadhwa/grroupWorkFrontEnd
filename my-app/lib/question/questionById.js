import { gettingUser } from "../gettingUser";  
async function getQuesionById (id) {


try{
    const res=await fetch(
    `${process.env.NEXT_PUBLIC_BACKENDURL}/getQuestion/${id}`, { // Adjusted the URL to match the backend route
      method: 'GET',
      headers: {
        Authorization: `JWT ${gettingUser().token}`,
      }
    }
  );
  
  const data=await res.json();

  return data;
}
catch(err){
  console.log(err);
  alert('Error fetching questions:');
}



}
export {getQuesionById };