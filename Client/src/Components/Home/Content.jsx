import React from "react";
import { Card, Row, Col, Container, Dropdown } from "react-bootstrap";
import { useParams, useHistory, Link } from "react-router-dom";
import homeHeroImage from "../../Images/homeHeroImage.png";
import listBook from "../../Dummy/Book.json";

function Content() {
  const { id } = useParams();
  const history = useHistory();
  const data = listBook.filter((item) => item.id === parseInt(id));

  return (
    <div>
      <Container>
        <div id="homeHeroImageContainer">
          <img class="homeHeroImage" src={homeHeroImage} alt="" />
        </div>
        <br />
        <hr />
        <div>
          <div className="contentHeader d-flex justify-content-between">
            <h1
              style={{
                fontFamily: "Times New Roman",
                fontWeight: "bold",
                fontSize: 30,
                lineHeight: "37px",
              }}
            >
              List Book
            </h1>
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="filterButton">
                Filter{" "}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#">Romance</Dropdown.Item>
                <Dropdown.Item href="#">Computer</Dropdown.Item>
                <Dropdown.Item href="#">Sci-Fi</Dropdown.Item>
                <Dropdown.Item href="#">History</Dropdown.Item>
                <Dropdown.Item href="#">Biography</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <Card style={{ border: "none" }}>
            <Card.Body>
              <Row>
                {listBook.map((data) => (
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
        </div>
      </Container>
    </div>
  );
}

export default Content;
