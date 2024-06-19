import { gettingUser } from "../gettingUser";

async function createQuestion(question) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/createQuestion`, {
      method: 'POST',
      headers: {
        Authorization: `JWT ${gettingUser().token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(question),
    });
  } catch (err) {
    console.log(err);
    alert('Error creating question:');
  }

}
module.exports = { createQuestion };
