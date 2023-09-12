import classes from "./MainNavigation.module.css";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signedInActions } from "../store";
import { NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { faCartFlatbed } from "@fortawesome/free-solid-svg-icons";

const MainNavigation = () => {
  const dispatch = useDispatch();
  const isSignedIn = useSelector((state) => state.signIn.isSignedIn);
  const logOutHandler = () => {
    // Khi nút log out được click, thực hiện reducer isSignedOut
    dispatch(signedInActions.isSignedOut());
    // Đồng thời xóa activeuser khỏi localStorage
    localStorage.removeItem("activeUser");
  };
  const activeUser = JSON.parse(localStorage.getItem("activeUser"));
  useEffect(() => {}, [isSignedIn]);
  return (
    <div className="container mt-3">
      <div className={`flex ${classes.nav}`}>
        <div>
          <ul className={`flex ${classes.navitem}`} style={{ paddingLeft: 0 }}>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
                style={{ paddingLeft: 0 }}
                end
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/shop"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Shop
              </NavLink>
            </li>
          </ul>
        </div>
        <h3>BOUTIQUE</h3>
        <div>
          <ul className={`flex ${classes.navitem}`}>
            <li>
              <FontAwesomeIcon
                icon={faCartFlatbed}
                style={{
                  marginLeft: "20px",
                  color: "var(--color-icon-primary)",
                }}
              />
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Cart
              </NavLink>
            </li>
            {/* Kiểm tra nếu trạng thái đang không đăng nhập thì hiển thị nút login trên navbar */}
            {!isSignedIn && (
              <li>
                <FontAwesomeIcon
                  icon={faUser}
                  style={{
                    marginLeft: "20px",
                    color: "var(--color-icon-primary)",
                  }}
                />
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                >
                  Login
                </NavLink>
              </li>
            )}
            {/* Kiểm tra trang thái nếu đang đăng nhập thì render tên người đang đăng nhập và nút log out */}
            {isSignedIn && (
              <>
                <li>
                  <FontAwesomeIcon
                    icon={faUser}
                    style={{
                      marginLeft: "20px",
                      color: "var(--color-icon-primary)",
                    }}
                  />
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive ? classes.active : undefined
                    }
                  >
                    {activeUser.fullname}
                  </NavLink>
                  <FontAwesomeIcon
                    icon={faCaretDown}
                    style={{
                      marginRight: "20px",
                      color: "var(--color-icon-primary)",
                    }}
                  />
                </li>
                <li>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive ? classes.active : undefined
                    }
                    // Thực hiện hành động click vào nút logout
                    onClick={logOutHandler}
                  >
                    (Logout)
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MainNavigation;
