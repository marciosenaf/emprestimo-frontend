import React, { useState } from "react";
import "./Sidebar.scss";
import { HiMenuAlt3 } from "react-icons/hi";
import { AiOutlineArrowLeft } from "react-icons/ai";
import menu from "../../data/sidebar";
import SidebarItem from "./SidebarItem";
import { useNavigate } from "react-router-dom";
import {GiMoneyStack} from "react-icons/gi"
import { Link } from "react-router-dom";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const navigate = useNavigate();

  const goHome = () => {
    navigate(-1);
  };

  return (
    <div className="layout">
      <div className="sidebar" style={{ width: "40px" }}>
        <div className="top_section">
          <div className="logo" style={{ display: isOpen ? "block" : "none" }}>
            {/* <Link >
            <GiMoneyStack
              size={25}
              style={{ cursor: "pointer" }}
            />
          </Link> */}
          </div>

          <Link to="/inventory">
          <div
            className="bars"
            style={{ marginLeft: "-5px" }}
          >
      <GiMoneyStack>
      </GiMoneyStack>
      
          </div>
          </Link>
        </div>
        {menu.map((item, index) => {
          return <SidebarItem key={index} item={item} isOpen={isOpen} />;
        })}
      </div>

      <main
        style={{
          paddingLeft:"40px",
          transition: "all .5s",
        }}
      >
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
