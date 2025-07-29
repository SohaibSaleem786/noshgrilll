import React from "react";
import "../Footer/Footer.css";
import { useTheme } from "../../../ThemeContext";

function Footer() {
  const { primaryColor, secondaryColor } = useTheme();
  return (
    <footer
      className="fixed-bottom  "
      style={{ backgroundColor: primaryColor, color: secondaryColor }}
    >
      <div className="footer" style={{ color: "black" }}>
        <a className="text-dark " href="">
          Privacy Policy
        </a>{" "}
        |{" "}
        <a className="text-dark" href="">
          Terms of Use
        </a>{" "}
        | © 2024 Crystal Solution. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
