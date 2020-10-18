import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useParams, useHistory } from "react-router-dom";
import { useQuery } from "react-query";
import { API } from "../Config/api";
import style from "../Styles/styles";

function DetailBook() {
  const { id } = useParams();
  const history = useHistory();

  const { isLoading, error, data: detailBook } = useQuery("getDetail", () =>
    API.get(`/book/${id}`)
  );

  return isLoading || !detailBook ? (
    <h1>Loading...</h1>
  ) : error ? (
    <h1>Your Error : {error.message}</h1>
  ) : (
    <>
      <Container>
        <Row>
          <Col lg={5}>
            <div id="detailBookImageContainer">
              <img
                className="detailBookImage"
                src={detailBook.data.data.book.thumbnail}
                alt=""
              />
            </div>
          </Col>
          <Col lg={7} className="d-flex flex-column ">
            <div id="detailBookInfo">
              <h1 className="bookTitle">{detailBook.data.data.book.title}</h1>
              <p className="regularText" style={{ fontSize: "20px" }}>
                {detailBook.data.data.book.author}
              </p>
              <p className="boldText">Publication Date</p>
              <p className="regularText">
                {detailBook.data.data.book.publication}
              </p>
              <p className="boldText">Category</p>
              <p className="regularText">
                {detailBook.data.data.book.category.name}
              </p>
              <p className="boldText">Pages</p>
              <p className="regularText">{detailBook.data.data.book.page}</p>
              <p className="boldText" style={{ color: "#EE4622" }}>
                ISBN
              </p>
              <p className="regularText">{detailBook.data.data.book.isbn}</p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <hr />
            <br />
            <div id="detailBookAbout">
              <h1 className="about-desc">About This Book</h1>
              <p className="paragraph">{detailBook.data.data.book.about}</p>
            </div>
          </Col>
        </Row>
        <br />
        <div className="d-flex justify-content-end">
          <Button style={style.orangeButton}>Add Library</Button>
          <div className="mr-3" />
          <Button
            style={style.grayButton}
            onClick={() =>
              history.push(`/readbook/${detailBook.data.data.book.id}`)
            }
          >
            Read Book
          </Button>
        </div>
        <br />
        <br />
        <br />
      </Container>
    </>
  );
}

export default DetailBook;
