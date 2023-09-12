import React from "react";

import { faCartFlatbed } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Import và sử dụng thư viện Modal của React JS
import { Modal, Row, Col, Button } from "react-bootstrap";

const Popup = (props) => {
  function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  return (
    <Modal
      show={props.show}
      onHide={props.hidePopupHandler}
      size="lg"
      backdrop="true"
      centered
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <Row style={{ fontStyle: "italic" }}>
          <Col xs={12} md={6} lg={6}>
            <img style={{ width: "100%" }} src={props.image} alt={props.name} />
          </Col>
          <Col xs={12} md={6} lg={6}>
            <h3>{props.name}</h3>
            <p>{formatPrice(props.price)} VND</p>
            <p>{props.shortDesc}</p>
            <Button
              style={{ borderRadius: "0", padding: "8px 20px" }}
              className="btn-dark"
              onClick={props.hidePopupHandler}
            >
              <FontAwesomeIcon
                icon={faCartFlatbed}
                style={{
                  marginRight: "15px",
                  color: "var(--color-primary--light)",
                }}
              />
              View Details
            </Button>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default Popup;
