import { gettingUser } from "../gettingUser";
const getAnswers = async (id) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/getAnswers/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `JWT ${gettingUser().token}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    alert('Error getting answers:');
  }
}
module.exports = { getAnswers };