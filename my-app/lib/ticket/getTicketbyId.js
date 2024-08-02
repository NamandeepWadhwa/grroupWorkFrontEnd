import { gettingUser } from "../gettingUser";
const getTicketById = async (id) => {
  const token = gettingUser().token;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKENDURL}/getTicket/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `JWT ${token}`,
        },
      }
    );
    if (res.status === 404) {
      alert("Ticket not found");
      return null;
    }
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    alert("Error getting ticket");
    return null;
  }
};

module.exports = { getTicketById };