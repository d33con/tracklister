import { Pathway_Extreme } from "next/font/google";
import React from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

const font = Pathway_Extreme({ subsets: ["latin"] });

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className={font.className}>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
