import React from "react";
import "./Footer.scss";

const footer = (props) => (
  <footer className="footer footnote">
    © {new Date().getFullYear()} - {new Date().getFullYear() + 1} DOT{" "}
    <span className="text-muted d-none d-sm-inline-block float-right">
      Crafted with <i className="mdi mdi-heart text-danger" /> by SUN
    </span>
  </footer>
);

export default footer;
