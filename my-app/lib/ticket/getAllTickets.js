import { gettingUser } from "../gettingUser";
const getAllTickets = async () => {
  const token=gettingUser().token;
  console.log(token);
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKENDURL}/getAllTickets`,
      {
        method: "GET",
        headers: {
          Authorization: `JWT ${token}`,
        },
      }
    );
    if (res.status === 404) {
      alert("Tickets not found");
      return null;
    }
    const data = await res.json();

    return data;
  } catch (err) {
    console.log(err);
    alert("Error getting ticket");
    return null;
  }
};

module.exports = { getAllTickets };
