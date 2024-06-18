import { gettingUser } from "../gettingUser";
const updateUpVote = async (questionId,upVote) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/updateUpvote/${questionId}/upvote`, {
      method: 'PUT',
      headers: {
        Authorization: `JWT ${gettingUser().token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ upvote:upVote }),
    });

    const data = await res.json();
   
    return data;
  } catch (err) {
    console.log(err);
    alert('Error updating upvote:');
  }
}
module.exports = { updateUpVote };