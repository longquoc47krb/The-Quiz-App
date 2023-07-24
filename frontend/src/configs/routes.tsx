import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import DashboardPage from "../pages/DashboardPage";
import { Navigate, Route, Routes } from "react-router-dom";
import RegisterPage from "../pages/RegisterPage";
import QuizPage from "../pages/QuizPage";
import { getTokenFromCookies } from "../utils";

const routes = () => {
  const token = getTokenFromCookies();
  console.log({ token });
  return (
    <>
      {token ? (
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/quiz/:quizId" element={<QuizPage />} />
          {/* Add more routes for other pages */}
          <Route
            path="*"
            element={<Navigate to="/home" replace={true} />}
          />{" "}
        </Routes>
      ) : (
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<RegisterPage />} />
          {/* Add more routes for other pages */}
          <Route
            path="*"
            element={<Navigate to="/login" replace={true} />}
          />{" "}
        </Routes>
      )}
    </>
  );
};

export default routes;
