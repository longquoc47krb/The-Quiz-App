import React from "react";
import { useEffect, useState } from "react";
import { User, UserDto } from "../interfaces/index";
import { getMe } from "../apis/userServices";
import Header from "../components/header";
import Footer from "../components/footer";
import LoadingPage from "./LoadingPage";
import { useFetchQuizzes } from "../apis/quizServices";

const HomePage: React.FC = () => {
  const [user, setUser] = useState<UserDto>();
  const { data: quizzes } = useFetchQuizzes();
  useEffect(() => {}, []);

  return (
    <div>
      <Header />
      <div className="w-full min-h-screen"></div>
      <Footer />
    </div>
  );
};

export default HomePage;
