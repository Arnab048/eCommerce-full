import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Spinner = ({ path = "login" }) => {
  const [cnt, setCnt] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCnt((prevCnt) => --prevCnt);
    }, 1000);
    cnt === 0 &&
      navigate(`/${path}`, {
        state: location.pathname,
      });
    return () => clearInterval(interval);
  }, [cnt, navigate, location]);
  return (
    <>
      <div
        className="d-flex flex-column justify-content-center align-items-center "
        style={{ height: "100vh" }}
      >
        <h1 className="text-cener">Unauthorize access</h1>
        <h1 className="text-cener">Redirecting to Login in {cnt} second(s)</h1>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
};

export default Spinner;
