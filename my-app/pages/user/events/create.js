import React, { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
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
  const [categories, setCategories] = useState([]);
  const [categoryInput, setCategoryInput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) {
      setError("Title and description are required.");
    } else {
      setError("");

      let sendData = {
        title,
        description,
        categories,
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
          console.log(err);
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
        setCategories([]);
        const event = res.event;
        alert("Event created successfully.");
        router.push({
          pathname: `/events/${event._id}`,
          query: { event: JSON.stringify(event) },
        });
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

  const handleAddCategory = () => {
    if (categoryInput.trim() !== "" && !categories.includes(categoryInput)) {
      setCategories([...categories, categoryInput]);
      setCategoryInput("");
    }
  };

  const handleRemoveCategory = (categoryToRemove) => {
    setCategories(
      categories.filter((category) => category !== categoryToRemove)
    );
  };

  if (role === "SSF Staff") {
    return (
      <Container>
        <Link href="/events">
          <Image
            src="/backArrowQuestions.png"
            width={50}
            height={50}
            alt="back arrow"
          />
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

          <Form.Group controlId="formCategories">
            <Form.Label>Categories</Form.Label>
            <div className="d-flex mb-2">
              <Form.Control
                type="text"
                placeholder="Add a category"
                value={categoryInput}
                onChange={(e) => setCategoryInput(e.target.value)}
              />
              <Button
                variant="primary"
                onClick={handleAddCategory}
                className="ms-2"
              >
                Add
              </Button>
            </div>
            <div>
              {categories.map((category, index) => (
                <Button
                  key={index}
                  variant="outline-secondary"
                  className="me-2 mb-2"
                  onClick={() => handleRemoveCategory(category)}
                >
                  {category} &times;
                </Button>
              ))}
            </div>
          </Form.Group>

          <Form.Group controlId="formFile">
            <Form.Label>File</Form.Label>
            <Form.Control type="file" onChange={handleFileChange} />
            {file && (
              <>
                <div className="mt-2">
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

          <Button
            variant="primary"
            type="submit"
            className="my-2"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Form>
      </Container>
    );
  } else {
    return <h1>Unauthorized</h1>;
  }
};

export default MyForm;
