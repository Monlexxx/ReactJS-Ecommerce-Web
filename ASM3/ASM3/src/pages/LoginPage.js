import banner1 from "../images/banner1.jpg";
import classes from "./Login.module.css";

import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { signedInActions } from "../store";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userArr, setUserArr] = useState([]);

  const [error, setError] = useState("");
  const [formInputValidity, setFormInputValidity] = useState({
    email: true,
    password: true,
  });

  // Sử dụng ref để lấy giá trị nhập vào từ form
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // Check xem email đã đang ký chưa
    const hasRegistered = userArr.findIndex(
      (user) => user.email === enteredEmail
    );

    // Nếu chưa đăng ký, hiển thị error cho người dùng
    if (hasRegistered === -1) {
      setError("Email has not been registered!");
    } else {
      // Nếu đã đăng ký, tìm trong hệ thống xem có trùng khớp thông tin email và password chưa
      const activeUser = userArr.find(
        (user) =>
          user.email === enteredEmail && user.password === enteredPassword
      );
      // Nếu activeUser đúng nghĩa là tìm thấy thông tin trùng khớp, lưu xuống localStorage, chuyển isSignedIn về true và điều hướng về shopPage
      if (activeUser) {
        localStorage.setItem("activeUser", JSON.stringify(activeUser));
        dispatch(signedInActions.isSignedIn());
        navigate("/shop");
      } else {
        // Nếu không tìm thấy thông tin trùng khớp nào, thông báo email hoặc password sai
        setError("Please check your email or password again!");
        // Set ô nhập password về rỗng
        passwordInputRef.current.value = "";
      }
    }
  };
  // Sử dụng useEffect để láy thông tin đã đăng ký tài khoản dưới localStorage mỗi khi component được reload
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("userArr")) || [];
    setUserArr(storedUsers);
  }, []);
  return (
    <div>
      <div className={classes.banner}>
        <img src={banner1} alt="Banner1" />
      </div>
      <form onSubmit={submitHandler} className={classes.form}>
        <h3>Sign in</h3>
        <div className="inputBlock">
          <div>
            <input
              placeholder="Email"
              type="email"
              ref={emailInputRef}
              required
            />
          </div>
          <div>
            <input
              className={classes.lastInput}
              placeholder="Password"
              type="password"
              ref={passwordInputRef}
              required
            />
          </div>
        </div>
        {error && <p className="invalid">{error}</p>}
        <button className="button-dark button-outline" type="submit">
          SIGN IN
        </button>
        <i>
          <p className={classes.signupNavigation}>
            Create an account?
            <span
              style={{ color: "var(--color-primary-blue)" }}
              onClick={() => navigate("/register")}
            >
              {" "}
              Sign up
            </span>
          </p>
        </i>
      </form>
    </div>
  );
};

export default Login;
