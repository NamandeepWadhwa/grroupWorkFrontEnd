import { gettingUser } from "../gettingUser";

const postingAnswer = async (id,answer) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/createAnswer/${id}`, {
      method: 'POST',
      headers: {
        Authorization: `JWT ${gettingUser().token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ description: answer })
    });
   
   
  }
  catch (err) {
    console.log(err);
    alert('Error posting answer:');
  }
  alert('Answer posted');
};
module.exports = { postingAnswer };