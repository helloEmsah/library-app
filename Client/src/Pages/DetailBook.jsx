import React from "react";
import { Container, Row, Col,  Button } from "react-bootstrap";
import { useParams, useHistory } from "react-router-dom";
import fakeBook from "../Dummy/Book.json";
import style from "../Styles/styles";

function DetailBook() {
  const { id } = useParams();
  const history = useHistory();
  const data = fakeBook.filter((item) => item.id === parseInt(id));

  return (
    <>
      <Container>
        <Row>
          <Col lg={5}>
            <div id="detailBookImageContainer">
              <img className="detailBookImage" src={data[0].image} alt="" />
            </div>
          </Col>
          <Col lg={7} className="d-flex flex-column ">
            <div id="detailBookInfo">
              <h1 className="bookTitle">{data[0].title}</h1>
              <p className="regularText" style={{ fontSize: "20px" }}>
                {data[0].author}
              </p>
              <p className="boldText">Publication Date</p>
              <p className="regularText">{data[0].year}</p>
              <p className="boldText">Category</p>
              <p className="regularText">{data[0].category}</p>
              <p className="boldText">Pages</p>
              <p className="regularText">{data[0].pages}</p>
              <p className="boldText" style={{ color: "#EE4622" }}>
                ISBN
              </p>
              <p className="regularText">{data[0].ISBN}</p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <hr />
            <br />
            <div id="detailBookAbout">
              <h1 className="about-desc">About This Book</h1>
              <p className="paragraph">{data[0].about}</p>
            </div>
          </Col>
        </Row>
        <br />
        <div className="d-flex justify-content-end">
          <Button style={style.orangeButton}>Add Library</Button>
          <div className="mr-3" />
          <Button
            style={style.grayButton}
            onClick={() => history.push(`/readbook/${data[0].id}`)}
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
