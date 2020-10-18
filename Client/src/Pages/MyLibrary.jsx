import React, { useContext } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { Card, Col, Row, Container } from "react-bootstrap";
import { LoginContext } from "../Context/LoginContext";
import Spinner from "../Components/Spinner";
import { useQuery } from "react-query";
import { API } from "../Config/api";

function MyLibrary() {
  const { id } = useParams();
  const history = useHistory();
  const [state, dispatch] = useContext(LoginContext);

  const { isLoading, error, data: bookData, refetch } = useQuery(
    "getLibrary",
    () => API.get(`/library`)
  );

  return isLoading || !bookData ? (
    <Spinner />
  ) : (
    <Container>
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
            {bookData.data.data.book.map((book) => (
              <Col lg={3}>
                <Link
                  style={{ textDecoration: "none" }}
                  onClick={() => history.push(`/detailbook/${book.bookId}`)}
                >
                  <Card border="dark" id="bookImageCard">
                    <Card.Body style={{ padding: 0 }}>
                      <div class="bookImageContainer">
                        <img
                          className="bookImage"
                          src={book.image}
                          alt=""
                          srcset=""
                        />
                      </div>
                    </Card.Body>
                  </Card>
                  <div id="bookCardDescription">
                    <p style={{ color: "black" }} className="bookTitle">
                      {book.title}
                    </p>
                    <p className="bookAuthor">{book.author}</p>
                  </div>
                </Link>
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default MyLibrary;
