import React from "react";
import { useParams } from "react-router-dom";
import { ReactReader } from "react-reader";
import TopNav from "../Components/Home/TopNav";
import Spinner from "../Components/Spinner";
import { useQuery } from "react-query";
import { API, urlAsset } from "../Config/api";

function ReadBook() {
  const { id } = useParams();
  const { isLoading, error, data: readBook } = useQuery("getRead", () =>
    API.get(`/book/${id}`)
  );

  return isLoading || !readBook ? (
    <Spinner />
  ) : error ? (
    <h1>Your Error : {error.message}</h1>
  ) : (
    <>
      <TopNav />
      <div style={{ position: "relative", height: "100vh" }}>
        {" "}
        <ReactReader
          url={urlAsset.file + readBook.data.data.book.file}
          title={readBook.data.data.book.title}
          location={"epubcfi(/6/2[cover]!/6)"}
          locationChanged={(epubcifi) => console.log(epubcifi)}
        />
      </div>
    </>
  );
}

export default ReadBook;
