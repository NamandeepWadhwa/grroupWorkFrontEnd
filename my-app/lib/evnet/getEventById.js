import { gettingUser } from "../gettingUser";
 const getEventById = async (id) => {
  console.log(id);
    const token = gettingUser().token;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKENDURL}/getEvent/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `JWT ${token}`,
          },
        }
      );
      if(res.status === 404){
        alert("Event not found");
        return null;
      }
      const data = await res.json();
      console.log(data);
      return data;
    } catch (err) {
      
      console.log(err);

      alert("Error getting event");
      return null;
    }

 };
 module.exports = { getEventById };