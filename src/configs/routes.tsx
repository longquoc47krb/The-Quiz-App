import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import DashboardPage from "../pages/DashboardPage";
import { Navigate, Route, Routes } from "react-router-dom";
import RegisterPage from "../pages/RegisterPage";
import Quiz from "../pages/Quiz";

function getTokenFromCookie() {
  const cookies = document.cookie.split("; ");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].split("=");
    if (cookie[0] === "token") {
      return cookie[1];
    }
  }
  return null;
}
const routes = () => {
  // const token = getTokenFromCookie();
  const token = 1;
  return (
    <>
      {token ? (
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/quiz/:quizId" element={<Quiz />} />
          {/* Add more routes for other pages */}
          <Route
            path="*"
            element={<Navigate to="/home" replace={true} />}
          />{" "}
        </Routes>
      ) : (
        <Routes>
          <Route path="/log-in" element={<LoginPage />} />
          <Route path="/sign-up" element={<RegisterPage />} />
          {/* Add more routes for other pages */}
          <Route
            path="*"
            element={<Navigate to="/log-in" replace={true} />}
          />{" "}
        </Routes>
      )}
    </>
  );
};

export default routes;
