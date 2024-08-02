import { gettingUser } from "../gettingUser";
const createResponse = async (ticketId, response) => {
  console.log(ticketId, response);
  const token = gettingUser().token;
  try {
     const res=await fetch(
       `${process.env.NEXT_PUBLIC_BACKENDURL}/createTicketResponse/${ticketId}`,
       {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
           Authorization: `JWT ${token}`,
         },
         body: JSON.stringify({ response }),
       }
     );
     const data = await res.json();
      alert(data.message);
      
    
  } catch (err) {
    console.log(err);
    alert("Error creating response");
  }
}
module.exports = { createResponse };