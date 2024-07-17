import { gettingUser } from "../gettingUser";
const createEvent = async (sendData) => {
  try {
  
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/createEvent`, {
      method: 'POST',
      headers: {
        Authorization: `JWT ${gettingUser().token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sendData),
    });

    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    alert('Error creating event:');
  }
}
module.exports = { createEvent };