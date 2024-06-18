import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Router from 'next/router';
import Image from 'next/image';
export default function DisplayQuestion({question}) {
  const router=Router;
  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0'); // Get day and pad with leading zero if needed
    return `${year}-${month}-${day}`;
  }
  return (
    <Card >
      <Card.Body>
        <Card.Title>{question.title.substr(0,50)}</Card.Title>
       <Card.Text>
        <Image src="/questionUpvote.png" width={20} height={20} alt="upvote image"></Image>
       {" "+question.upVotesNumber}
       </Card.Text>
        <Card.Text>
       
          {formatDate(question.created_at)}
        </Card.Text>
        <Button variant="danger" onClick={(e)=>{e.preventDefault();router.push(`./ask/${question._id}`)}} >View question</Button>
      </Card.Body>
    </Card>
  );


}


