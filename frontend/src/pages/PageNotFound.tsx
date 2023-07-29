import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    // Clear the interval when the component unmounts to avoid memory leaks
    return () => clearInterval(intervalId);
  }, []);
  useEffect(() => {
    if (countdown <= 0) {
      navigate("/");
    }
  }, [countdown]);
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div>
        <h1 className="text-gray-100 font-semibold text-2xl text-center">
          404 - Page Not Found
        </h1>
        <p className="text-gray-100 font-normal text-xl text-center">
          Oops! The page you are looking for does not exist.
        </p>
        <p className="text-blue-500 font-normal text-center">
          Automatically redirect to homepage in <span>{countdown}</span>{" "}
          second(s)
        </p>
      </div>
    </div>
  );
};

export default PageNotFound;
