import React from "react";
import Search from "./search";
import MenuBar from "./navbar-menu";
import { HeaderProps } from "../interfaces";
import { useFetchQuizzes } from "../apis/quizServices";

const Header: React.FC<HeaderProps> = ({ user }) => {
  const { avatar } = user;
  const { data, isLoading } = useFetchQuizzes();
  const handleLogout = () => {
    // Handle logout logic here
  };

  const profileItems = [
    { label: "Edit Profile", onClick: () => console.log("Edit Profile") },
    { label: "Logout", onClick: handleLogout },
  ];
  return (
    <header>
      <h1 className="font-bold text-white text-3xl">Long</h1>
      <MenuBar profileItems={profileItems} />
      <Search data={data} />
      <img src={avatar} alt="avatar" className="w-12 h-12 rounded-full" />
      <ul className="dropdown-content">
        {profileItems.map((item, index) => (
          <li key={index}>
            <button onClick={item.onClick}>{item.label}</button>
          </li>
        ))}
      </ul>
    </header>
  );
};

export default Header;
