import classes from "./LiveChat.module.css";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookMessenger } from "@fortawesome/free-brands-svg-icons";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { faFaceSmile } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const LiveChat = () => {
  // Tạo state ban đầu khi biểu tượng chat chưa được click là false
  const [displayLivechat, setDisplayLivechat] = useState(false);

  const messageIconClickHandler = () => {
    // Khi biểu tượng chat được click, toggle state hiện tại để thực hiện bât tắt
    setDisplayLivechat(!displayLivechat);
  };
  return (
    <>
      {displayLivechat && (
        <div className={classes.livechat}>
          <div className="row p-2">
            <div className="col-lg-8 p-0">
              <p>
                <strong>Customer Support</strong>
              </p>
              <div className={classes.flexend}>
                <p className={classes.customerText}>Xin chào</p>
              </div>
              <div className={classes.flexend}>
                <p className={classes.customerText}>
                  Làm thế nào để xem các sản phẩm
                </p>
              </div>
              <div className={classes.flex}>
                <FontAwesomeIcon
                  icon={faUserTie}
                  style={{ marginRight: "10px" }}
                />
                <p className={classes.adminText}>ADMIN: Chào bạn</p>
              </div>
              <div className={classes.flex}>
                <FontAwesomeIcon
                  icon={faUserTie}
                  style={{ marginRight: "10px" }}
                />
                <p className={classes.adminText}>
                  ADMIN: Bạn có thể vào mục Shop để xem các sản phẩm
                </p>
              </div>
            </div>
            <div className="col-lg-4 p-0">
              <p
                style={{
                  fontSize: "11px",
                  backgroundColor: "var(--color-primary-grey)",
                  padding: "4px",
                  textAlign: "center",
                }}
              >
                <i> Let's Chat App</i>
              </p>
            </div>
          </div>
          <div className="flex" style={{ marginTop: "60px" }}>
            <div className="flex">
              <FontAwesomeIcon
                icon={faUserTie}
                style={{ marginRight: "10px" }}
              />
              <p>Enter Message!</p>
            </div>
            <div className="flex">
              <FontAwesomeIcon className={classes.icon} icon={faPaperclip} />
              <FontAwesomeIcon className={classes.icon} icon={faFaceSmile} />
              <FontAwesomeIcon
                className={classes.icon}
                icon={faPaperPlane}
                style={{ color: "var( --color-primary-blue)" }}
              />
            </div>
          </div>
        </div>
      )}
      <div className={classes.livechatIcon} onClick={messageIconClickHandler}>
        <FontAwesomeIcon
          icon={faFacebookMessenger}
          style={{ height: "30px" }}
        />
      </div>
    </>
  );
};

export default LiveChat;
