import React from "react";
import { Table, Container, Button } from "react-bootstrap";
import TopNavAdmin from "../Components/Home/TopNavAdmin";
import { API } from "../Config/api";
import { useQuery, useMutation } from "react-query";
import { HiCheckCircle, HiXCircle } from "react-icons/hi";
import Spinner from "../Components/Spinner";

function Admin() {
  const userStateId = localStorage.getItem("id");

  const { data: categoryData } = useQuery("getCategory", () =>
    API.get("/category")
  );

  const { isLoading, error, data: bookData, refetch } = useQuery(
    "getBook",
    () => API.get("/books")
  );

  const [approveBook] = useMutation(async (id) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify({
        status: "Approved",
      });

      const res = await API.patch(`/book/${id}`, body, config);
      refetch();
      return res;
    } catch (error) {
      refetch();
      console.log(error);
    }
  });

  const [cancelBook] = useMutation(async (id) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify({
        status: "Cancelled",
      });

      const res = await API.patch(`/book/${id}`, body, config);
      refetch();
      return res;
    } catch (error) {
      refetch();
      console.log(error);
    }
  });

  return isLoading || !bookData ? (
    <Spinner />
  ) : error ? (
    <h1>Your error: {error.message}</h1>
  ) : (
    <div id="admin-page">
      <TopNavAdmin />
      <br />
      <Container>
        <h3 className="text-title">Book Verification</h3>
        <div className="admin-bg">
          <Table borderless hover>
            <thead>
              <tr>
                <th className="text-center">
                  <strong>No</strong>
                </th>

                <th className="text-center">
                  <strong>Author</strong>
                </th>
                <th className="text-center">
                  <strong>ISBN</strong>
                </th>
                <th className="text-center">
                  <strong>E-book</strong>
                </th>
                <th className="text-center">
                  <strong>Status</strong>
                </th>
                <th className="text-center">
                  <strong>Action</strong>
                </th>
              </tr>
            </thead>

            {bookData.data.data.book.map((book, index) => (
              <tbody striped>
                <tr>
                  <td>{index + 1}</td>

                  <td>{book.author}</td>
                  <td>{book.isbn}</td>
                  <td>{book.file}</td>
                  <td
                    style={{
                      color:
                        book.status === "Approved"
                          ? "#0ACF83"
                          : book.status === "Cancelled"
                          ? "#FF0742"
                          : "#F7941E",
                    }}
                  >
                    <strong>
                      {book.status === "Approved"
                        ? "Approved"
                        : book.status === "Cancelled"
                        ? "Cancelled"
                        : "Waiting"}
                    </strong>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {book.status === "Approved" ? (
                      <HiCheckCircle size={40} color="#3BB54A" />
                    ) : book.status === "Cancelled" ? (
                      <HiXCircle size={40} color="#FF0742" />
                    ) : (
                      <>
                        <Button
                          variant="danger"
                          size="sm"
                          style={{ marginRight: 5, width: 80 }}
                          onClick={() => cancelBook(book.id)}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="success"
                          size="sm"
                          style={{ marginLeft: 5, width: 80 }}
                          onClick={() => approveBook(book.id)}
                        >
                          Approve
                        </Button>
                      </>
                    )}
                    {/* <Button
                        variant="primary"
                        size="sm"
                        onClick={() => approveLiterature(literature.id)}
                      >
                        Approve
                      </Button>
                      <div
                        className="buttonActionSeparator"
                        style={{ marginLeft: "5px" }}
                      />
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => cancelLiterature(literature.id)}
                      >
                        Cancelled
                      </Button> */}
                  </td>
                </tr>
              </tbody>
            ))}
          </Table>
        </div>
      </Container>
    </div>
  );
}

export default Admin;
