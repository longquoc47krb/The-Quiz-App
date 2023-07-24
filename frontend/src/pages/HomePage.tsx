import React from "react";
import { useEffect, useState } from "react";
import { User, UserDto } from "../interfaces/index";
import { getMe } from "../apis/userServices";
import Header from "../components/header";
import Footer from "../components/footer";

const HomePage: React.FC = () => {
  const [user, setUser] = useState<UserDto>();
  useEffect(() => {
    async function getUser() {
      const response = await getMe();
      setUser(response);
    }
    getUser();
  }, []);
  if (!user) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Header user={user} />
      <div className="home-container">{/* <Recently /> */}</div>
      <Footer />
    </div>
  );
};

export default HomePage;
