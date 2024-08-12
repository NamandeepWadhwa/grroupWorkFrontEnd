import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useAtom } from 'jotai';
import { emailAtom } from '@/usserJotai/email';
import { useState } from 'react';
import { setToken, setEmailLocal, setRole } from '@/lib/storingUser';
import Router from 'next/router';

export default function BasicExample() {
  const router = Router;
  const [otp, setOtp] = useState('');
  
  const [email, setEmail] = useAtom(emailAtom);
  async function handleSubmit(e) {
    
    e.preventDefault();
    
      


  
    try {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@ssfinc\.ca$/i;
      let role = "Student";
      if(emailRegex.test(email)){
          role = "SSF Staff";
      }
     
      
      const response = await fetch(process.env.NEXT_PUBLIC_BACKENDURL+'/verify/otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email , otp,role}),
      });
  
      const data = await response.json();
      if(response.status === 200){
        setToken(data.token);
        const response2 = await fetch(process.env.NEXT_PUBLIC_BACKENDURL+'/getUser', {
          method: 'GET',
          headers: {
            Authorization: `JWT ${data.token}`,
          },
        });
        const data2 = await response2.json();
        console.log(data2);
        setEmailLocal(data2.email);
        setRole(data2.role);
        localStorage.setItem('userId', data.user._id);
        if(data.exists) {
          router.push('/');
        } else {
          router.push('/profile/create');
        }
      }
      else{
        alert(data.error);
      }
    } catch (error) {
      console.error('An error occurred', error);
     alert("An error occurred Please try again");
  }

}

  return (
    <>
    <Form className='m-2' onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Otp</Form.Label>
        <Form.Control  placeholder="OTP"  value={otp} onChange={(e) => setOtp(e.target.value)} />
        <Form.Text className="text-muted">
      Enter the OTP sent to your email (OPT is valid for 5 minutes)
        </Form.Text>
      </Form.Group>

      
      <Button variant="danger" type="submit">
        Submit
      </Button>
    </Form>
    </>
  );
}

