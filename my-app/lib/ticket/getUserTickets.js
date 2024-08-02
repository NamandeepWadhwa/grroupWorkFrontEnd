import { gettingUser } from "../gettingUser";
const getUserTickets = async () => {
  const token = gettingUser().token;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKENDURL}/getTickets`,
      {
        method: "GET",
        headers: {
          Authorization: `JWT ${token}`,
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    alert("Error getting tickets");
  }
};
module.exports = { getUserTickets };