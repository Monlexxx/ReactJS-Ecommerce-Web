import product1 from "../images/product_1.png";
import product2 from "../images/product_2.png";
import product3 from "../images/product_3.png";
import product4 from "../images/product_4.png";
import product5 from "../images/product_5.png";

import classes from "./Categories.module.css";

import { useNavigate } from "react-router-dom";

const Categories = () => {
  const navigate = useNavigate();

  //
  const shopNavigationHandler = () => {
    // Sử dụng navigate để điều hướng về shopPage khi các ảnh được clicked
    navigate("/shop");
  };

  return (
    <div className="container pt-5">
      <p
        style={{
          color: "var(--color-button-dark-100",
          fontStyle: "italic",
          textAlign: "center",
          fontWeight: "400",
          fontSize: "11px",
          marginBottom: "8px",
        }}
      >
        CAREFULLY CREATED COLLECTIONS
      </p>
      <p
        style={{
          color: "var(--color-button-dark)",
          fontStyle: "italic",
          textAlign: "center",
          fontWeight: "500",
        }}
      >
        BROWSE OUR CATEGORIES
      </p>

      <div className="row mt-4">
        <div
          className={`${classes.imageContainer} col-lg-6 g-4`}
          onClick={shopNavigationHandler}
        >
          <img src={product1} alt="product1"></img>
          <div className={classes.transition}></div>
        </div>
        <div
          className={`${classes.imageContainer} col-lg-6 g-4`}
          onClick={shopNavigationHandler}
        >
          <img src={product2} alt="product2"></img>
          <div className={classes.transition}></div>
        </div>
      </div>
      <div className="row mt-2">
        <div
          className={`${classes.imageContainer} col-lg-4 g-4`}
          onClick={shopNavigationHandler}
        >
          <img src={product3} alt="product3"></img>
          <div className={classes.transition}></div>
        </div>
        <div
          className={`${classes.imageContainer} col-lg-4 g-4`}
          onClick={shopNavigationHandler}
        >
          <img src={product4} alt="product4"></img>
          <div className={classes.transition}></div>
        </div>
        <div
          className={`${classes.imageContainer} col-lg-4 g-4`}
          onClick={shopNavigationHandler}
        >
          <img src={product5} alt="product5"></img>
          <div className={classes.transition}></div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
