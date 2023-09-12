import { useNavigate } from "react-router-dom";

import banner1 from "../images/banner1.jpg";
import classes from "./Banner.module.css";

const Banner = () => {
  const navigate = useNavigate();

  // Sử dụng navigate để điều hướng về trang shopPage khi button được clicked
  const shopNavigationHandler = () => {
    navigate("/shop");
  };

  return (
    <div className="container">
      <div className={classes.banner}>
        <div>
          <img
            className={classes[`banner-image`]}
            src={banner1}
            alt="banner"
          ></img>
        </div>
        <div className={classes[`banner-content`]}>
          <p>NEW INSPIRATION 2020</p>
          <h1>
            20% OFF ON NEW <br /> SEASON
          </h1>
          <button className="button-dark" onClick={shopNavigationHandler}>
            Browse collections
          </button>
        </div>
      </div>
    </div>
  );
};
export default Banner;
