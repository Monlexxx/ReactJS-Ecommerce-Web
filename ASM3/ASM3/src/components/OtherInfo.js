import classes from "./OtherInfo.module.css";

const OtherInfo = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-4 p-5 background">
          <p className={classes[`text-1`]}>FREE SHIPPING</p>
          <p className={classes[`text-2`]}>Free shipping worldwide</p>
        </div>
        <div className="col-lg-4 p-5 background">
          <p className={classes[`text-1`]}>24 X 7 SERVICE</p>
          <p className={classes[`text-2`]}>Free shipping worldwide</p>
        </div>
        <div className="col-lg-4 p-5 background">
          <p className={classes[`text-1`]}>FESTIVAL OFFER</p>
          <p className={classes[`text-2`]}>Free shipping worldwide</p>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6 pt-5 pb-5">
          <p className={`${classes[`text-1`]} ${classes.text}`}>
            LET'S BE FRIENDS!
          </p>
          <p className={`${classes[`text-2`]} ${classes.text}`}>
            Nisi nisi tempor consequat liboris nisi
          </p>
        </div>
        <div className="col-lg-6 pt-5 pb-5">
          <input
            className={classes.input}
            placeholder="Enter your email address"
          ></input>
          <button className={`button-dark button-outline ${classes.button}`}>
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtherInfo;
