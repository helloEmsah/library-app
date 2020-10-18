import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

function Loader() {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
      }}
    >
      <ClipLoader
        css={{
          position: "absolute",
          top: "50%",
          left: "50%",
          //   marginRight: "-50%",
          //   transform: "translate(-50%, -50%)",
        }}
        size={50}
        color={"#16332D"}
        loading={true}
      />
    </div>
  );
}

export default Loader;
