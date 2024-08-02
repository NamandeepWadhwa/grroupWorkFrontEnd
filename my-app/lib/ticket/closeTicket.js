import { gettingUser } from "../gettingUser";
const closeTicket = async (ticketId) => {
  const token = gettingUser().token;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKENDURL}/closeTicket/${ticketId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `JWT ${token}`,
        },
      }
    );
    const data = await res.json();
    alert(data.message);
  } catch (err) {
    console.log(err);
    alert("Error closing ticket");
  }
};
module.exports = { closeTicket };