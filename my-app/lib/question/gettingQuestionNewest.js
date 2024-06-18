import { gettingUser } from "../gettingUser";  
async function gettingQuestions (order,tag='') {

try{
    const res=await fetch(
    `${process.env.NEXT_PUBLIC_BACKENDURL}/getQuestions?sort=${order}&tag=${tag}`, { // Adjusted the URL to match the backend route
      method: 'GET',
      headers: {
        Authorization: `JWT ${gettingUser().token}`,
      }
    }
  );
  
  const data=await res.json();
;
  return data;
}
catch(err){
  console.log(err);
  alert('Error fetching questions:');
}



}
export {gettingQuestions };