import React from "react";
import { Dropdown, DropdownButton, Table, Container } from "react-bootstrap";
import TopNavAdmin from "../Components/Home/TopNavAdmin";
import transactionData from "../Dummy/Transaction.json";

function AdminPages() {
  return (
    <div id="admingPagesWrapper">
      <TopNavAdmin />
      <br />
      <Container>
        <h3>
          <strong>Book Verification</strong>
        </h3>
        <div className="admin-bg">
          <Table borderless hover>
            <thead>
              <tr>
                <th>
                  <strong>No</strong>
                </th>
                <th>
                  <strong>User / Author</strong>
                </th>
                <th>
                  <strong>ISBN</strong>
                </th>
                <th>
                  <strong>E-book</strong>
                </th>
                <th>
                  <strong>Status</strong>
                </th>
                <th>
                  <strong>Action</strong>
                </th>
              </tr>
            </thead>
            {transactionData.map((data) => (
              <tbody striped>
                <tr>
                  <td>{data.id}</td>
                  <td>{data.userOrAuthor}</td>
                  <td>{data.ISBN}</td>
                  <td>{data.ebook}</td>
                  <td
                    style={{
                      color:
                        data.status === 0
                          ? "#0ACF83"
                          : data.status === 1
                          ? "#FF0742"
                          : "#F7941E",
                    }}
                  >
                    <strong>
                      {data.status === 0
                        ? "Approve"
                        : data.status === 1
                        ? "Cancel"
                        : "Waiting to be verified"}
                    </strong>
                  </td>
                  <td>
                    <DropdownButton variant="info" title="Status">
                      <Dropdown.Item>Approve</Dropdown.Item>
                      <Dropdown.Item>Cancel</Dropdown.Item>
                    </DropdownButton>
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

export default AdminPages;
