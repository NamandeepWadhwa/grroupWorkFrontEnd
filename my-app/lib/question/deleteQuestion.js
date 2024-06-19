import { gettingUser } from "../gettingUser";

async function deleteQuestion(questionId) {
  console.log(questionId,` ${process.env.NEXT_PUBLIC_BACKENDURL}/deleteQuestion/${questionId}`);
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/deleteQuestion/${questionId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `JWT ${gettingUser().token}`,
      },
    });
    const data = await res.json();
    
    alert('Question deleted');
  } catch (err) {
    console.log(err);
    alert('Error deleting question:');
  }
}
module.exports = { deleteQuestion };