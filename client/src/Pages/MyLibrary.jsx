import React, { useContext, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { Card, Col, Row, Container, Modal } from "react-bootstrap";
import { LoginContext } from "../Context/LoginContext";
import Spinner from "../Components/Spinner";
import { useQuery, useMutation } from "react-query";
import { API } from "../Config/api";
import TopNav from "../Components/Home/TopNav";
import Sidebar from "../Components/Home/Sidebar";

function MyLibrary() {
  const { id } = useParams();
  const history = useHistory();
  const [state, dispatch] = useContext(LoginContext);
  const [bookId, setBookId] = useState("");
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const userId = localStorage.getItem("id");

  const {
    isLoading,
    error,
    data: libraryData,
    refetch,
  } = useQuery("getLibrary", () => API.get(`/library/${state.user.id}`));

  console.log(libraryData);

  const [removeLibraryAction] = useMutation(async (bookId) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await API.delete(`/library/${bookId}`, config);
      setMessage(res.data.message);
      refetch();
    } catch (error) {
      console.log(error);
      setMessage(error.response.data.error.message);
    }
  });

  return isLoading || !libraryData ? (
    <Spinner />
  ) : (
    <Container fluid>
      <TopNav />
      <Row>
        <Col lg={2}>
          <Sidebar />
        </Col>
        <Col lg={10}>
          <div>
            <h1
              style={{
                fontFamily: "Times New Roman",
                fontWeight: "bold",
                fontSize: 30,
                lineHeight: "37px",
              }}
            >
              My Library
            </h1>
            <Card style={{ border: "none" }}>
              <Card.Body>
                <Row>
                  {libraryData.data.data.library.map((library) => (
                    <Col lg={3}>
                      <div
                        className="remove-icon"
                        style={{
                          cursor: "pointer",
                          zIndex: "1",
                          top: 25,
                          position: "relative",
                          right: 50,
                          marginLeft: "auto",
                          width: 20,
                          height: 20,
                          borderRadius: "50%",
                          backgroundColor: "grey",
                          color: "white",
                          textAlign: "center",
                        }}
                      >
                        <p
                          // style={{
                          //   cursor: "pointer",
                          //   zIndex: "-1",
                          //   top: 50,
                          //   position: "relative",
                          //   right: 40,
                          //   marginLeft: "auto",
                          //   width: 20,
                          //   height: 20,
                          //   borderRadius: "50%",
                          //   backgroundColor: "grey",
                          //   color: "white",
                          //   textAlign: "center",
                          // }}
                          className="d-flex justify-content-center align-items-center"
                          onClick={() => {
                            setShow(true);
                            removeLibraryAction(library.id);
                          }}
                        >
                          X
                        </p>
                      </div>
                      <Link
                        style={{ textDecoration: "none" }}
                        onClick={() =>
                          history.push(`/detail-book/${library.book.id}`)
                        }
                      >
                        <Card border="dark" id="bookImageCard">
                          <Card.Body style={{ padding: 0 }}>
                            <div class="bookImageContainer">
                              <img
                                className="bookImage"
                                src={library.book.thumbnail}
                                alt=""
                                srcset=""
                              />
                            </div>
                          </Card.Body>
                        </Card>
                        <div id="bookCardDescription">
                          <p style={{ color: "black" }} className="bookTitle">
                            {library.book.title}
                          </p>
                          <p className="bookAuthor">{library.book.author}</p>
                        </div>
                      </Link>
                    </Col>
                  ))}
                  <Modal centered show={show} onHide={() => setShow(false)}>
                    <Modal.Body>
                      Literature has been deleted from your collection
                    </Modal.Body>
                  </Modal>
                </Row>
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default MyLibrary;
