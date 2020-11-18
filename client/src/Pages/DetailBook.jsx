import React, { useState } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { useParams, useHistory } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { API, urlAsset } from "../Config/api";
import TopNav from "../Components/Home/TopNav";
import Sidebar from "../Components/Home/Sidebar";
import Spinner from "../Components/Spinner";
import style from "../Styles/styles";

function DetailBook() {
  const { id } = useParams();
  const history = useHistory();
  const [showAddModal, setShowAddModal] = useState(false);
  const { isLoading, error, data: detailBook } = useQuery("getDetail", () =>
    API.get(`/book/${id}`)
  );
  const [message, setMessage] = useState("");

  const [addCollection] = useMutation(async (bookId) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify({ bookId: bookId });

      const res = await API.post(`/library/`, body, config);
      setMessage(res.data.message);
    } catch (err) {
      console.log(err);
      setMessage(err.response.data.error.message);
    }
  });

  return isLoading || !detailBook ? (
    <Spinner />
  ) : error ? (
    <h1>Your Error : {error.message}</h1>
  ) : (
    <>
      <Container fluid>
        <TopNav />
        <Row>
          <Col lg={2}>
            <Sidebar />
          </Col>
          <Col lg={10}>
            <div>
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
                    <h1 className="bookTitle">
                      {detailBook.data.data.book.title}
                    </h1>
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
                    <p className="regularText">
                      {detailBook.data.data.book.page}
                    </p>
                    <p className="boldText" style={{ color: "#EE4622" }}>
                      ISBN
                    </p>
                    <p className="regularText">
                      {detailBook.data.data.book.isbn}
                    </p>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <hr />
                  <br />
                  <div id="detailBookAbout">
                    <h1 className="about-desc">About This Book</h1>
                    <p className="paragraph">
                      {detailBook.data.data.book.about}
                    </p>
                  </div>
                </Col>
              </Row>
              <br />
              <div className="d-flex justify-content-end">
                <Button
                  style={style.orangeButton}
                  onClick={() => {
                    addCollection(detailBook.data.data.book.id);
                    setShowAddModal(true);
                  }}
                >
                  Add Library
                </Button>
                <div className="mr-3" />
                <Button
                  style={style.grayButton}
                  onClick={() =>
                    history.push(`/readbook/${detailBook.data.data.book.id}`)
                  }
                >
                  Read Book
                </Button>
                <Modal
                  centered
                  show={showAddModal}
                  onHide={() => setShowAddModal(false)}
                >
                  <Modal.Body>
                    Literature has been added to your collection
                  </Modal.Body>
                </Modal>
              </div>
              <br />
              <br />
              <br />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default DetailBook;
