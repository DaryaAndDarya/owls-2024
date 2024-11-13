import React from "react";
import "ldrs/infinity";

export default function Loader({ children, isLoading }) {
  return isLoading ? (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}> 
      <l-infinity
        size="55"
        stroke="4"
        stroke-length="0.15"
        bg-opacity="0.1"
        speed="1.3"
        color="blue"
      ></l-infinity>
    </div>
  ) : (
    children
  );
}
