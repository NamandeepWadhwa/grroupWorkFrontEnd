import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useAtom } from 'jotai';
import { emailAtom } from '@/usserJotai/email';
import Router from 'next/router';

export default function BasicExample() {
  const router = Router;
  
  const [email, setEmail] = useAtom(emailAtom);
  async function handleSubmit(e) {
    
    e.preventDefault();
    const emailRegex2 = /^[a-zA-Z0-9._%+-]+@ssfinc\.ca$/i;
    var emailRegex = /^[a-zA-Z0-9._%+-]+@myseneca\.ca$/;
    if(!emailRegex.test(email) && !emailRegex2.test(email)) {
      alert("Please enter a valid Seneca email address");
    }
  else {
    try {
      
      const response = await fetch(process.env.NEXT_PUBLIC_BACKENDURL+'/generate/otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
        router.push('/user/otp');
      
    } catch (error) {
      console.error('An error occurred', error);
  }
}

}
  return (
    <>
    <Form className='m-5 p-5' onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email"  value={email} onChange={(e) => setEmail(e.target.value)} />
        <Form.Text className="text-muted">
        Enter you Seneca email address
        </Form.Text>
      </Form.Group>

      
      <Button variant="danger" type="submit">
        Submit
      </Button>
    </Form>
    </>
  );
}

