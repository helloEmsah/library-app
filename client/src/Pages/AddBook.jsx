import React, { useState } from "react";
import {
  Button,
  Container,
  DropdownButton,
  Form,
  Modal,
} from "react-bootstrap";
import { TiDocumentAdd } from "react-icons/ti";
import { useQuery, useMutation } from "react-query";
import { API } from "../Config/api";
import style from "../Styles/styles";

function AddBook() {
  const [addBookModal, setAddBookModal] = useState(false);

  const userStateId = localStorage.getItem("id");

  const [formData, setFormData] = useState({
    userId: `${userStateId}`,
    categoryId: "",
    title: "",
    author: "",
    publication: "",
    page: "",
    isbn: "",
    about: "",
    file: "",
    status: "Waiting",
    thumbnail: "",
  });

  const {
    userId,
    categoryId,
    title,
    author,
    publication,
    page,
    isbn,
    about,
    file,
    status,
    thumbnail,
  } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const {
    isLoading,
    error,
    data: categoryData,
    refetch,
  } = useQuery("getCategory", () => API.get("/category"));

  const [addBook] = useMutation(async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify({
        userId,
        categoryId,
        title,
        author,
        publication,
        page,
        isbn,
        about,
        file,
        status,
        thumbnail,
      });

      const res = await API.post("/book", body, config);

      setFormData({
        userId: `${userStateId}`,
        categoryId: "",
        title: "",
        author: "",
        publication: "",
        page: "",
        isbn: "",
        about: "",
        file: "",
        status: "Waiting",
        thumbnail: "",
      });

      setAddBookModal(true);
      return res;
    } catch (error) {
      console.log(error);
    }
  });

  return isLoading || !categoryData ? (
    <h1>Loading...</h1>
  ) : error ? (
    <h1>Your error: {error.message}</h1>
  ) : (
    <>
      <Container fluid>
        <h1
          style={{
            fontFamily: "Times New Roman",
            fontWeight: "bold",
            fontSize: 30,
            lineHeight: "37px",
          }}
        >
          Add Book
        </h1>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            addBook();
            refetch();
          }}
        >
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Title"
              name="title"
              value={title}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Publication Date"
              name="publication"
              value={publication}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Author"
              name="author"
              value={author}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="select"
              type="text"
              placeholder="Category"
              name="categoryId"
              value={categoryId}
              onChange={(e) => handleChange(e)}
              required
            >
              <option value="">Category</option>
              {categoryData.data.data.category.map((category) => (
                <option value={category.id}>{category.name}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Page"
              name="page"
              value={page}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="ISBN"
              name="isbn"
              value={isbn}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="textarea"
              rows="5"
              placeholder="About this book"
              name="about"
              value={about}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="File"
              name="file"
              value={file}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Thumbnail"
              name="thumbnail"
              value={thumbnail}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="userIdl"
              name="userId"
              value={userId}
              onChange={(e) => handleChange(e)}
              hidden
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="status"
              name="status"
              value={status}
              onChange={(e) => handleChange(e)}
              hidden
            />
          </Form.Group>
          <div className="d-flex justify-content-between">
            <DropdownButton variant="secondary" title="Add Book">
              <form action="/addbook" method="post">
                <input type="file" name="bookFile" />
              </form>
            </DropdownButton>

            <Button
              type="submit"
              style={style.orangeButton}
              onClick={() => setAddBookModal(true)}
            >
              Submit Book <TiDocumentAdd />
            </Button>
          </div>
        </Form>
        <Modal
          size="lg"
          show={addBookModal}
          onHide={() => setAddBookModal(false)}
        >
          <Modal.Body>
            <div
              className="addModalBook"
              style={{
                fontSize: 18,
                textAlign: "center",
              }}
            >
              <p>Thank you for adding your own book</p>
              <p>please wait 1 x 24 hours for our admin to verify </p>
            </div>
          </Modal.Body>
        </Modal>
      </Container>
    </>
  );
}

export default AddBook;
