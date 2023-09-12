import { useNavigate } from "react-router-dom";
import banner1 from "../images/banner1.jpg";
import classes from "./Register.module.css";
import { useState, useEffect, useRef } from "react";

// Hàm kiểm tra ô input đã được nhập chưa, và hàm kiểm tra ô password phải nhập nhiều hơn 8 ký tự
const isEmpty = (value) => value.trim() === "";
const isGreaterThanEight = (value) => value.trim().length > 8;
// Regex kiểm tra phone = 10 số
const phoneNumberRegex =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
const validatePhoneNumber = (value) => phoneNumberRegex.test(value);

const Register = () => {
  const navigate = useNavigate();
  const [userArr, setUserArr] = useState([]);

  const [formInputValidity, setFormInputValidity] = useState({
    fullname: true,
    email: true,
    password: true,
    phone: true,
  });
  const [isExisting, setIsExisting] = useState(false);

  // Dùng ref để lấy ra input được nhập vào form
  const fullnameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const phoneInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    let isExist = false;
    setIsExisting(false);
    // Lấy giá trị nhập từ form
    const enteredFullname = fullnameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredPhone = phoneInputRef.current.value;
    console.log("test", enteredFullname, enteredEmail);

    // Tìm xem email đã tồn tại chưa
    const index = userArr.findIndex((user) => user.email === enteredEmail);

    // Nếu đã tồn tại set state về true
    if (index !== -1) {
      isExist = true;
      setIsExisting(true);
    }

    // Sử dụng các hàm và state để validate tính rỗng, tồn tại, số lượng ký tự của các input
    const enteredFullnameIsValid = !isEmpty(enteredFullname);
    const enteredEmailIsValid = !isEmpty(enteredEmail) && !isExist;
    const enteredPasswordIsValid = isGreaterThanEight(enteredPassword);
    const enteredPhoneIsValid = validatePhoneNumber(enteredPhone);

    setFormInputValidity({
      fullname: enteredFullnameIsValid,
      email: enteredEmailIsValid,
      password: enteredPasswordIsValid,
      phone: enteredPhoneIsValid,
    });

    // set state form hợp lệ khi cả 4 input hợp lệ
    const formValidity =
      enteredFullnameIsValid &&
      enteredEmailIsValid &&
      enteredPasswordIsValid &&
      enteredPhoneIsValid;

    // Nếu form không hợp lệ,kết thúc, không thực hiện các lệnh bên dưới
    if (!formValidity) {
      return;
    } else {
      // Nếu hợp lệ, đẩy các input hợp về vào newUser
      const newUser = {
        fullname: enteredFullname,
        email: enteredEmail,
        password: enteredPassword,
        phone: enteredPhone,
      };
      // Đẩy vào userArr và lưu xuống LocalStorage, chuyển hướng về trang login đồng thời set trạng thái tồn tại về ban đầu
      userArr.push(newUser);
      localStorage.setItem("userArr", JSON.stringify(userArr));
      navigate("/login");
    }
  };

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
        <h3>Sign up</h3>
        <div className="inputBlock">
          <div>
            <input
              placeholder="Full name"
              type="text"
              ref={fullnameInputRef}
              required
            />
          </div>
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
              placeholder="Password"
              type="password"
              ref={passwordInputRef}
              required
            />
          </div>
          <div>
            <input
              className={classes.lastInput}
              placeholder="Phone"
              type="tel"
              ref={phoneInputRef}
              required
            />
          </div>
        </div>
        {/* Sử dụng object formInputValidity để tham chiếu đến các thành phần bên trong để kiểm trai tính hợp lệ và render error tương ứng */}
        {!formInputValidity.fullname && (
          <p className="invalid">Please input valid Fullname!</p>
        )}
        {!formInputValidity.email && (
          <p className="invalid">Please input valid Email!</p>
        )}
        {isExisting && <p className="invalid">Email has been registered!</p>}
        {!formInputValidity.password && (
          <p className="invalid">
            Please input valid Password! (more than 8 digits)
          </p>
        )}
        {!formInputValidity.phone && (
          <p className="invalid">Please input valid phone! (10 numbers)</p>
        )}
        <button className="button-dark button-outline" type="submit">
          SIGN UP
        </button>
        <i>
          <p className={classes.loginNavigation}>
            Login?
            <span
              style={{ color: "var(--color-primary-blue)" }}
              onClick={() => navigate("/login")}
            >
              {" "}
              Click
            </span>
          </p>
        </i>
      </form>
    </div>
  );
};

export default Register;
