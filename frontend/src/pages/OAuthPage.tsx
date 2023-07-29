import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { EXPIRATION_DATE } from "../common/constants";
import useAuth from "../hooks/useAuth";

function OAuthPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const { setCookie } = useAuth();
  const navigate = useNavigate();
  // Get specific query parameter
  const accessToken = searchParams.get("token");
  useEffect(() => {
    setCookie("accessToken", accessToken, {
      path: "/",
      expires: EXPIRATION_DATE,
    });
    navigate("/");
  }, [accessToken]);
  return (
    <div>
      <p className="text-gray-200">
        Successfully Google login. Redirecting to homepage ...
      </p>
    </div>
  );
}

export default OAuthPage;
