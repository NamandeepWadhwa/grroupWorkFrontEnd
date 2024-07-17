import { gettingUser } from "../gettingUser";
const deleteEvent = async (id) => {
  console.log(id);
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/deleteEvent/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `JWT ${gettingUser().token}`,
      },
    });
    const data = await res.json();
    
    if(res.status === 200) {
      alert('Event deleted');
    }
    return data;
  }
  catch (err) {
    console.log(err);
    alert('Error deleting event:');
  }
}
module.exports = { deleteEvent };