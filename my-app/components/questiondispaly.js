import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
export default function DisplayQuestion({question}) {
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
       { 'upvotes '+question.upVotesNumber}
       </Card.Text>
        <Card.Text>
       
          {formatDate(question.created_at)}
        </Card.Text>
        <Button variant="danger">view question</Button>
      </Card.Body>
    </Card>
  );


}


