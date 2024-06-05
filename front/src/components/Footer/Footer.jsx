import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <div>
      <footer className="footer">
        <div className="sym">
          <ul className="liste">
            <li>
              <h2>Crypto</h2>
            </li>
          </ul>
        </div>
        <div className="cols">
          <div className="col2">
            <ul className="liste">
              <li>
                <h3>Resources</h3>
              </li>
              <li>Site</li>
              <li>Market Data Api</li>
            </ul>
          </div>
          <div className="col3">
            <ul className="liste">
              <li>
                <h3>Destek</h3>
              </li>
              <li>email</li>
              <li>phone number</li>
            </ul>
          </div>
        </div>
        <div className="social">
            <ul>
                <li><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png" alt="" /></li>
                <li><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/584px-Logo_of_Twitter.svg.png" alt="" /></li>
                <li><img src="https://cdn-icons-png.flaticon.com/512/732/732200.png" alt="" /></li>
            </ul>
        </div>
      </footer>
      <div className="copy">
        <h5>© 2023  All Rights Reserved.</h5>
      </div>
    </div>
  );
};

export default Footer;