import React from "react";
import Header from "../components/header";
import Recently from "../sections/Recently";

const HomePage: React.FC = () => {
  const user = {
    name: "Nguyen Quoc Long",
    email: "longquoc47krb@gmail.com",
    avatar:
      "https://lh3.googleusercontent.com/a/AAcHTtfnNEmo9EzoVW9yGE4Yi7p23pSFmesZfqQOICRW=s96-c?sz=150",
  };
  return (
    <div>
      <Header user={user} />
      <div className="home-container">
        <Recently />
      </div>
      {/* Add your content here */}
    </div>
  );
};

export default HomePage;
