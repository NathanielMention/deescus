import React from "react";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import Wrapper from "../common/Wrapper";
import Chat from "../chat/Chat";
import "../../styles/Chat.scss";

const Home = () => {
  return (
    <>
      <Wrapper>
        <Navbar />
        <Sidebar />
        <Chat />
      </Wrapper>
    </>
  );
};

export default Home;
