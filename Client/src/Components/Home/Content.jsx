import React, { useState, useContext } from "react";
import { Card, Row, Col, Container, Dropdown } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
import { API } from "../../Config/api";
import { useQuery, useMutation } from "react-query";
import homeHeroImage from "../../Images/homeHeroImage.png";

function Content() {
  const history = useHistory();

  const [categoryId, setCategoryId] = useState("");

  const { isLoading, error, data: bookData, refetch } = useQuery(
    "getBook",
    () => API.get(`/book/${categoryId}`)
  );

  const { data: categoryData } = useQuery("getCategory", () =>
    API.get("/category")
  );

  const { data: categorySelector } = useQuery("getCategorySelector", () =>
    API.get(`/category/${categoryId}`)
  );

  const [reload] = useMutation(async () => {
    refetch();
  });

  return isLoading || !bookData || !categoryData || !categorySelector ? (
    <h1>Loading...</h1>
  ) : error ? (
    <h1>Your Error : {error.message}</h1>
  ) : (
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
                <Dropdown.Item
                  onClick={() => {
                    setCategoryId("");
                    reload();
                  }}
                >
                  Clear Filter
                </Dropdown.Item>
                {categoryData.data.data.category.map((category) => (
                  <Dropdown.Item
                    onClick={() => {
                      setCategoryId(category.id);
                      reload();
                    }}
                  >
                    {category.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <Card style={{ border: "none" }}>
            <Card.Body>
              <Row>
                {bookData.data.data.book.map((book) => (
                  <Col lg={3}>
                    <Link
                      style={{ textDecoration: "none" }}
                      onClick={() => history.push(`/detailbook/${book.id}`)}
                    >
                      <Card border="dark" id="bookImageCard">
                        <Card.Body style={{ padding: 0 }}>
                          <div class="bookImageContainer">
                            <img
                              className="bookImage"
                              src={book.thumbnail}
                              alt=""
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
        </div>
      </Container>
    </div>
  );
}

export default Content;
