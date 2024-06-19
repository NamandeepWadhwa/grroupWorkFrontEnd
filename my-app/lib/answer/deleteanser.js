import { gettingUser } from "../gettingUser";
const delteAnswer = async (id) => {
  console.log(id);
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/deleteAnswer/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `JWT ${gettingUser().token}`,
      },
    });
    const data = await res.json();
    if(res.status === 200) {
      alert('Answer deleted');
    }
  }
  catch (err) {
    console.log(err);
    alert('Error deleting answer:');
  }
}
export { delteAnswer };