import React, { useState } from "react";
import {
  Container,
  Form,
  Button,
  Image,
  Col,
  Alert,
  Badge,
} from "react-bootstrap";
import Router from "next/router";
import { updateEvent } from "@/lib/evnet/upateEvent";

const EditEventPage = () => {
  const router = Router;
  const event = JSON.parse(router.query.event);
  const [title, setTitle] = useState(event.title || "");
  const [description, setDescription] = useState(event.description || "");
  const [categories, setCategories] = useState(event.categories || []);
  const [categoryInput, setCategoryInput] = useState("");
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [error, setError] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!title || !description) {
      setError("Title and description are required.");
      return;
    }

    setError("");

    let sendData = {
      title,
      description,
      categories,
    };

    if (file !== null) {
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
        return;
      }
    } else {
      sendData.imageUrl = event.imageUrl || "";
    }

    try {
      const data = await updateEvent(event._id, sendData);
      router.push({
        pathname: `/user/events/${data._id}`,
        query: { event: JSON.stringify(data) },
      });
    } catch (err) {
      console.log(err);
      setError("An error occurred during event update.");
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

  return (
    <Container>
      <h1>Edit Event</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleUpdate}>
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
              <Badge key={index} bg="secondary" className="me-1">
                {category} &times;
              </Badge>
            ))}
          </div>
        </Form.Group>

        {event.imageUrl && (
          <div className="mb-3">
            <p className="text-muted">Current Image</p>
            <Col md={6}>
              <Image
                src={event.imageUrl}
                alt="Current Image"
                thumbnail
                style={{ height: "45vh" }}
              />
            </Col>
          </div>
        )}

        <Form.Group controlId="formFile">
          <Form.Label>Image</Form.Label>
          {filePreview && (
            <div className="mb-3">
              <Col md={6}>
                <Image
                  src={filePreview}
                  alt="Preview"
                  thumbnail
                  style={{ height: "45vh" }}
                />
              </Col>
            </div>
          )}

          <Form.Control type="file" onChange={handleFileChange} />
          {file && (
            <Button
              variant="danger"
              onClick={handleFileRemove}
              className="mt-2"
            >
              Remove File
            </Button>
          )}
        </Form.Group>

        <Button variant="primary" type="submit" className="my-2">
          Update Event
        </Button>
      </Form>
    </Container>
  );
};

export default EditEventPage;
