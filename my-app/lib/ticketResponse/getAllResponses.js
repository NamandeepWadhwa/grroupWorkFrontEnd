import {gettingUser} from "../gettingUser";
const getAllResponses = async (ticketId) => {
  const token = gettingUser().token;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKENDURL}/getTicketResponses/${ticketId}`,
      {
        method: "GET",
        headers: {
          Authorization: `JWT ${token}`,
        },
      }
    );
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    alert("Error getting ticket responses");
  }
};
module.exports = { getAllResponses };