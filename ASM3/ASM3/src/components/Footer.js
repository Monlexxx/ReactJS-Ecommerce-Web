import { NavLink } from "react-router-dom";

import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={`container-fluid ${classes.footer}`}>
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <p>CUSTOMER SERVICES</p>
            <ul style={{ padding: "0" }}>
              <li>
                <NavLink to="#">Help & Contact Us</NavLink>
              </li>
              <li>
                <NavLink to="#">Returns & Refunds</NavLink>
              </li>
              <li>
                <NavLink to="#">Online Stores</NavLink>
              </li>
              <li>
                <NavLink to="#">Terms & Conditions</NavLink>
              </li>
            </ul>
          </div>
          <div className="col-lg-4">
            <p>COMPANY</p>
            <ul style={{ padding: "0" }}>
              <li>
                <NavLink to="#">What we do</NavLink>
              </li>
              <li>
                <NavLink to="#">Available Services</NavLink>
              </li>
              <li>
                <NavLink to="#">Lastest Post</NavLink>
              </li>
              <li>
                <NavLink to="#">FAQs</NavLink>
              </li>
            </ul>
          </div>
          <div className="col-lg-4">
            <p>SOCIAL MEDIA</p>
            <ul style={{ padding: "0" }}>
              <li>
                <NavLink to="#">Twitter</NavLink>
              </li>
              <li>
                <NavLink to="#">Instagram</NavLink>
              </li>
              <li>
                <NavLink to="#">Facebook</NavLink>
              </li>
              <li>
                <NavLink to="#">Pinterest</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
