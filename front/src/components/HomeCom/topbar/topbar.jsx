import React from "react";
import "./topbar.css";
import { Button } from "@mui/material";

const Topbar = () => {
  return (
    <div style={{ display: "flex" }}>
      <div className="logo-section">
      <h1>CRYPTO</h1>
         </div>
      <div className="links">
        <ul className="list ">
          <li>
            <Button style={{ color: "white" }} href="/" className="btn">
              Home
            </Button>
          </li>
          <li>
            <Button style={{ color: "white" }} href="/News" className="btn">
             News
            </Button>
          </li>
          <li>
            <Button style={{ color: "white" }} href="/cryptos" className="btn">
              Table
            </Button>
          </li>
          <li>
            <Button style={{ color: "white" }}  href="/login" className="btn">
              Login
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Topbar;