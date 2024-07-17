import { gettingUser } from "../gettingUser";

const getEvents = async (newest = true, category = "") => {
  const token = gettingUser().token;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKENDURL}/getEvents?newest=${newest}&category=${category}`,
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
    alert("Error getting events");
  }
};

module.exports = { getEvents };
