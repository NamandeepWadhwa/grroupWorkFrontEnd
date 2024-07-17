import { gettingUser } from "../gettingUser";
const getEvents = async () => {
  const token = gettingUser().token;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/getEvents`, {
      method: 'GET',
      headers: {
        Authorization: `JWT ${token}`,
      },
    });
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    alert('Error getting events:');
  }
}
module.exports = { getEvents };