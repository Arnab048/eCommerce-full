import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";

const Layout = ({ children }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>BOT Commerce</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "80vh" }}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
