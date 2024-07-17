import React, { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { gettingUser } from "@/lib/gettingUser";
import { createEvent } from "@/lib/evnet/createEvent";
import Router from "next/router";
import Image from "next/image";
import Link from "next/link";

const MyForm = () => {
  const role = gettingUser().role;
  const router = Router;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) {
      setError("Title and description are required.");
    } else {
      setError("");

      let sendData = {
        title: title,
        description: description,
      };

      // Handle file upload if a file is provided
      if (file != null) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "events");
        formData.append("cloud_name", "dvw5kbnsi");

        try {
          const response = await fetch(process.env.NEXT_PUBLIC_IMAGESTORE, {
            method: "POST",
            body: formData,
          });
          const data = await response.json();
          sendData.imageUrl = data.secure_url;
        } catch (err) {
          setError("An error occurred during file upload.");
          return;
        }
      } else {
        sendData.imageUrl = "";
      }

      try {
        const res = await createEvent(sendData);
        setTitle("");
        setDescription("");
        setFile(null);
        setFilePreview(null);
        const event = res.event;
        alert("Event created successfully.");
        router.push(
          {
            pathname: `/events/${event._id}`,
            query: { event: JSON.stringify(event) },
          }
        )
      } catch (err) {
        setError("An error occurred during event creation.");
      }
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFilePreview(URL.createObjectURL(selectedFile));
  };

  const handleFileRemove = () => {
    setFile(null);
    setFilePreview(null);
    document.getElementById("formFile").value = null;
  };

  if (role === "SSF Staff") {
    return (
      <Container>
        <Link href="/events">
          <Image
            src="/backArrowQuestions.png"
            width={50}
            height={50}
            alt="back arrow image"
          ></Image>
        </Link>
        <h1>Submit Your Details</h1>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formFile">
            <Form.Label>File</Form.Label>
            <Form.Control type="file" onChange={handleFileChange} />
            {file && (
              <>
              <div  className="mt-2">
                <img
                  src={filePreview}
                  alt="Preview"
                  style={{ maxHeight: "200px", maxWidth: "100%" }}
                />
                </div>
                <Button
                  variant="danger"
                  onClick={handleFileRemove}
                  className="mt-2"
                >
                  Remove File
                </Button>
              
              </>
            )}
          </Form.Group>

          <Button variant="primary" type="submit" className="my-2">
            Submit
          </Button>
        </Form>
      </Container>
    );
  } else {
    return (
      <>
        <h1>Unauthorized</h1>
      </>
    );
  }
};

export default MyForm;
