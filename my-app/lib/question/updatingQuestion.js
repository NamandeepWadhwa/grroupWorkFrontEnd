import { gettingUser } from "../gettingUser";
async function updatingQuestion (id,upadtedQuestion) {
  console.log(id);
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/updateQuetion/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `JWT ${gettingUser().token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(upadtedQuestion),
    });
  } catch (err) {
    console.log(err);
    alert('Error updating question:');
  }
}
export { updatingQuestion };