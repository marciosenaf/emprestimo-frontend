import React from "react";
import Footer from "../footer/Footer";
import Header from "../header/Header";

const Layout = ({ children, title }) => {
  return (
    <>
      <Header title={title} />
      <div style={{ minHeight: "80vh" }} className="--pad">
        {children}
      </div>
      <Footer />
    </>
  );
};

export default Layout;
