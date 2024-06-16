import { gettingUser } from "../gettingUser";
async function getQuestionByOldest () {


try{
    const res=await fetch(
    `${process.env.NEXT_PUBLIC_BACKENDURL}/getQuestionByLOldest`, { // Adjusted the URL to match the backend route
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
export { getQuestionByOldest};