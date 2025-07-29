import React, { useState, useEffect } from "react";
import { Modal, Button, Row, Col, Card } from "react-bootstrap";
import { useTheme } from "../../../../ThemeContext";
import axios from "axios";

const OrderDeliveryModal = ({
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
  const [address, setAddress] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "namee") {
      setName(value);
    } else if (name === "mobilee") {
      setMobile(value);
    } else if (name === "address") {
      setAddress(value);
    }
  };

  // Function to fetch customer data based on mobile number
  const fetchCustomerData = async (mobile) => {
    console.log(mobile, "mobile");
    const data = {
      number: mobile,
    };

    axios
      .post(
        `https://crystalsolutions.com.pk/nosh_grill/CustomerAddress.php`,
        JSON.stringify(data)
      )
      .then((response) => {
        console.log(response.data, "fsdlfjk");
        if (response.data) {
          setName(response.data.name);
          setAddress(response.data.address);
        } else {
          setName("");
          setAddress("");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    // Cleanup function to reset the name, mobile, and address fields when the modal is closed
    if (!show) {
      setName("");
      setMobile("");
      setAddress("");
    }
  }, [show]);

  useEffect(() => {
    if (mobile.length === 11) {
      fetchCustomerData(mobile);
    } else {
      setName("");
      setAddress("");
    }
  }, [mobile]);

  const handleWaiterSelection = (waiterId) => {
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
        <Modal.Title>Delivery Order</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Row>
          <Col md={5}>
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
                      height: "8vh",
                      cursor: "-webkit-grab",
                      marginBottom: "10px",
                      textAlign: "center",
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

          <Col md={7}>
            <Row>
              <Col xs={12} md={12} className="d-flex align-items-center">
                <table>
                  <tbody style={{ textAlign: "right" }}>
                    <tr>
                      <td style={{ color: "black", fontWeight: "bold" }}>
                        Customer Mobile:
                      </td>
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
                    <tr>
                      <td style={{ color: "black", fontWeight: "bold" }}>
                        Customer Name:
                      </td>
                      <td>
                        <input
                          type="text"
                          placeholder="Name"
                          name="namee"
                          value={name}
                          onChange={handleInputChange}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td style={{ color: "black", fontWeight: "bold" }}>
                        Customer Address:
                      </td>
                      <td>
                        <input
                          type="text"
                          placeholder="Address"
                          style={{ width: "240px" }}
                          name="address"
                          value={address}
                          onChange={handleInputChange}
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
          onClick={() => handleNewOrderClick(name, mobile, address)}
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

export default OrderDeliveryModal;
