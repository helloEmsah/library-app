import React from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import fakeBook from "../Dummy/Book.json";
import { Card, Col, Row, Container } from "react-bootstrap";

function MyLibrary() {
  const { id } = useParams();
  const history = useHistory();
  const data = fakeBook.filter((item) => item.id === parseInt(id));

  return (
    <Container>
      <h1
        style={{ fontFamily: 'Times New Roman',
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
            {fakeBook.map((data) => (
              <Col lg={3}>
                <Link
                  style={{ textDecoration: "none" }}
                  onClick={() => history.push(`/detailbook/${data.id}`)}
                >
                  <Card border="dark" id="bookImageCard">
                    <Card.Body style={{ padding: 0 }}>
                      <div class="bookImageContainer">
                        <img
                          className="bookImage"
                          src={data.image}
                          alt=""
                          srcset=""
                        />
                      </div>
                    </Card.Body>
                  </Card>
                  <div id="bookCardDescription">
                    <p style={{ color: "black" }} className="bookTitle">
                      {data.title}
                    </p>
                    <p className="bookAuthor">{data.author}</p>
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
