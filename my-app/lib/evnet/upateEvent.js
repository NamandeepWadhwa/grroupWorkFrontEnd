import { gettingUser } from "../gettingUser";
const updateEvent = async (id, event) => {
  const token = gettingUser().token;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKENDURL}/updateEvent/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`,
        },
        body: JSON.stringify(event),
      }
    );
    const data = await res.json();
    if (res.status === 200) {
      alert('Event updated');
    }
    return data;
  } catch (err) {
    console.log(err);
    alert('Error updating event:');
  }
}
module.exports = { updateEvent };