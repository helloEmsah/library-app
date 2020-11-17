import React, { useState, useContext } from "react";
import { Button, Container, Form, Modal } from "react-bootstrap";
import { TiDocumentAdd } from "react-icons/ti";
import { useMutation, useQuery } from "react-query";
import { API } from "../Config/api";
import { LoginContext } from "../Context/LoginContext";
import Spinner from "../Components/Spinner";

function AddBookFormAdmin() {
  const [state, dispatch] = useContext(LoginContext);

  const [showAddModal, setShowAddModal] = useState(false);

  const [fileName, setFileName] = useState("");

  const [formData, setFormData] = useState({
    userId: `${state.user.id}`,
    categoryId: "",
    title: "",
    author: "",
    publication: "",
    page: "",
    isbn: "",
    thumbnail: "",
    about: "",
    file: "",
    status: "Approved",
  });

  const {
    userId,
    categoryId,
    title,
    author,
    publication,
    page,
    isbn,
    file,
    status,
    thumbnail,
    about,
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

  const [addLiterature] = useMutation(async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const formData = new FormData();

      formData.append("userId", userId);
      formData.append("categoryId", categoryId);
      formData.append("title", title);
      formData.append("author", author);
      formData.append("publication", publication);
      formData.append("page", page);
      formData.append("isbn", isbn);
      formData.append("thumbnail", thumbnail);
      formData.append("file", file);
      formData.append("status", status);
      formData.append("about", about);

      const body = JSON.stringify({
        userId,
        categoryId,
        title,
        author,
        publication,
        page,
        isbn,
        file,
        status,
        thumbnail,
        about,
      });

      const res = await API.post("/book", formData, config);

      setFormData({
        userId: `${state.user.id}`,
        categoryId: "",
        title: "",
        author: "",
        publication: "",
        page: "",
        isbn: "",
        file: "",
        status: "Approved",
        thumbnail: "",
        about: "",
      });

      setShowAddModal(true);

      console.log(res);
      return res;
    } catch (error) {
      console.log(error);
    }
  });

  const handleCoverChange = (e) => {
    if (
      e.target.files &&
      e.target.files.length > 0 &&
      e.target.files[0].type.match("image")
    ) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.addEventListener(
        "load",
        () => {
          setFormData({
            ...formData,
            thumbnail: reader.result,
          });
        },
        false
      );

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  };

  return isLoading || !categoryData ? (
    <Spinner />
  ) : (
    <>
      <Container id="addForm">
        <h1 className="text-title">Add Book</h1>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            addLiterature();
          }}
        >
          <br />
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
              name="categoryId"
              value={categoryId}
              onChange={(e) => handleChange(e)}
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
              placeholder="Thumbnail"
              name="thumbnail"
              value={thumbnail}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Control
              as="textarea"
              rows="5"
              placeholder="About"
              name="about"
              value={about}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>

          {/* <Form.Group>
            <Form.Control
              type="text"
              placeholder="File"
              name="file"
              value={file}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group> */}

          {/* <Form.Group>
            <div
              className="form-control"
              onClick={() => document.getElementsByName("thumbnail")[0].click()}
              style={{ width: "max-content", cursor: "pointer" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {file ? file.name : "Attach Thumbnail"}
                <TiDocumentAdd size="20px" className="ml-1" />
              </div>
            </div>
            <Form.File
              name="thumbnail"
              accept="image/*"
              label="Text"
              onChange={(e) => {
                setFormData({
                  ...formData,
                  file: !e.target.files[0] ? file : e.target.files[0],
                });
              }}
              style={{ display: "none" }}
            />
          </Form.Group> */}

          <Form.Group>
            <div
              className="form-control"
              onClick={() => document.getElementsByName("file")[0].click()}
              style={{ width: "max-content", cursor: "pointer" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {file ? file.name : "Attach File"}
                <TiDocumentAdd size="20px" className="ml-1" />
              </div>
            </div>
            <Form.File
              name="file"
              accept=".epub"
              onChange={(e) => {
                setFormData({
                  ...formData,
                  file: !e.target.files[0] ? file : e.target.files[0],
                });
              }}
              style={{ display: "none" }}
            />
          </Form.Group>

          {/* <Form.Group>
            <Form.Control
              type="text"
              placeholder="User Id"
              name="userId"
              value={userId}
              onChange={(e) => handleChange(e)}
              hidden
            />
          </Form.Group> */}

          {/* <Form.Group>
            <Form.Control
              type="text"
              placeholder="Status"
              name="status"
              value={status}
              onChange={(e) => handleChange(e)}
              hidden
            />
          </Form.Group> */}

          <div className="d-flex justify-content-between">
            <Button type="submit" onClick={() => setShowAddModal(true)}>
              Add Book <TiDocumentAdd />
            </Button>
          </div>
        </Form>
        <Modal
          centered
          size="lg"
          show={showAddModal}
          onHide={() => setShowAddModal(false)}
        >
          <Modal.Body>
            <div
              className="addModalBook"
              style={{
                fontSize: 18,
                textAlign: "center",
              }}
            >
              <p>Thank you for adding your paperwork</p>
              <p>please wait 1 x 24 hours for our admin to verify </p>
            </div>
          </Modal.Body>
        </Modal>
      </Container>
    </>
  );
}
export default AddBookFormAdmin;
