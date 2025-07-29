import React, { useState, useEffect } from "react";
import { Modal, Button, Row, Col, Card } from "react-bootstrap";
import { useTheme } from "../../../../ThemeContext";

const TakeAwayOrderModal = ({
  show,
  onHide,
  handleNewOrderClick,
  getWaiter,
  handleWaiterChange1,
}) => {
  const [selectedWaiterId, setSelectedWaiterId] = useState(null);
  const { secondaryColor, primaryColor } = useTheme();
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "namee") {
      setName(value);
    } else if (name === "mobilee") {
      setMobile(value);
    }
  };
  useEffect(() => {
    // Cleanup function to reset the name and mobile fields when the modal is closed
    if (!show) {
      setName("");
      setMobile("");
    }
  }, [show]);
  const handleWaiterSelection = (waiterId) => {
    console.log(waiterId);
    setSelectedWaiterId(waiterId);
    handleWaiterChange1(waiterId);
  };
  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      size="lg"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.1) !important" }}
    >
      <Modal.Header
        closeButton
        style={{ backgroundColor: primaryColor, color: secondaryColor }}
      >
        <Modal.Title>Take Away Order</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Row>
          <Col md={6}>
            <Row>
              {getWaiter.map((item) => (
                <Col
                  key={item.w_id}
                  xs={6}
                  className="d-flex align-items-center"
                >
                  <Card
                    style={{
                      width: "100%",
                      height: "6vh",
                      cursor: "-webkit-grab",
                      marginBottom: "10px",
                      backgroundColor:
                        selectedWaiterId === item.w_id ? "gray" : primaryColor,
                      color: secondaryColor,
                    }}
                    onClick={() => handleWaiterSelection(item.w_id)}
                  >
                    <Card.Body>
                      <Card.Title style={{ fontSize: "12px" }}>
                        {item.w_name}
                      </Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>

          <Col md={6}>
            <Row>
              <Col xs={6} md={2} className="d-flex align-items-center">
                <table>
                  <tbody style={{ textAlign: "right" }}>
                    <tr>
                      <td>Mobile:</td>
                      <td>
                        <input
                          type="text"
                          placeholder="Mobile"
                          name="mobilee"
                          value={mobile}
                          onChange={handleInputChange}
                          maxLength={11}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Col>
            </Row>
          </Col>
        </Row>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={onHide}
          style={{
            borderRadius: "0px",
            backgroundColor: primaryColor,
            color: secondaryColor,
          }}
        >
          No
        </Button>
        <Button
          variant="danger"
          onClick={() => handleNewOrderClick(mobile)}
          style={{
            borderRadius: "0px",
            backgroundColor: primaryColor,
            color: secondaryColor,
          }}
        >
          Yes, Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TakeAwayOrderModal;
