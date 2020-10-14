import React from "react";
import { useParams } from "react-router-dom";
import fakeBook from "../Dummy/Book.json";
import { ReactReader } from "react-reader";
import TopNav from "../Components/Home/TopNav";

function ReadBook() {
  const { id } = useParams();
  const data = fakeBook.filter((item) => item.id == id);
  return (
    <>
      <TopNav />
      <div style={{ position: "relative", height: "100vh" }}>
        {" "}
        <ReactReader
          url={require(`../Dummy/epub/${data[0].file}`)}
          title={data[0].title}
          location={"epubcfi(/6/2[cover]!/6)"}
          locationChanged={(epubcifi) => console.log(epubcifi)}
        />
      </div>
    </>
  );
}

export default ReadBook;
