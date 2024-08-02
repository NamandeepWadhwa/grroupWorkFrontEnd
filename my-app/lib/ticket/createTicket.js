import { gettingUser } from "../gettingUser";

const createTicket = async (sendData) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/createTicket`, {
      method: 'POST',
      headers: {
        Authorization: `JWT ${gettingUser().token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sendData),
    });

    const created = await res.json();
    if(created==true){
      alert("Ticket created successfully.");
    }
  } catch (err) {
    console.log(err);
    alert('Error creating ticket:');
    return null;
  }

};
module.exports = { createTicket };