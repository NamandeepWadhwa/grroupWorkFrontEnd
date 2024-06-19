import { gettingUser } from "../gettingUser";

async function gettingQuestionByUser() {
  console.log("i am here");
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/getQuestionsbyUser`, {
      method: 'GET',
      headers: {
        Authorization: `JWT ${gettingUser().token}`,
        contentType: 'application/json',
      }
    });

    const data = await res.json();

    return data;
  } catch (err) {
    console.log(err);
    alert('Error fetching questions:');
  }
}
export { gettingQuestionByUser };