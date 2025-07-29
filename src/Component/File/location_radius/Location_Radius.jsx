import { Container, Row, Col, Form, Button, Nav } from "react-bootstrap";
import Alert from "@mui/material/Alert";
import PathHead from "../../MainComponent/PathHead/PathHead";
import Header from "../../MainComponent/Header/Header";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Category_Maintenance.css";
import Footer from "../../MainComponent/Footer/Footer";
import { HiRefresh } from "react-icons/hi";
import { FaArrowLeft } from "react-icons/fa6";
function Location_Radius() {
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState("Y");
  const [alertData, setAlertData] = useState(null);
  const primaryColor = "#1f2670";
  const secondaryColor = "white";
  const fontFamily = "verdana";
  const apiLinks = "https://crystalsolutions.com.pk/umair_electronic/web";

  //////////////////////// PRESS ENTER TO MOVE THE NEXT FIELD //////////////////
  const Id = useRef();
  const Latitude = useRef();
  const Longitude = useRef();
  const KM1 = useRef();
  const Price1 = useRef();
  const KM2 = useRef();
  const Price2 = useRef();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const upperCaseValue = value.toUpperCase();
    e.target.value = upperCaseValue;
  };
  const [Code, setCode] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://crystalsolutions.com.pk/umair_electronic/web/CategoryCode.php"
        );

        const data = await response.json();
        const Code = data.code;
        setCode(Code);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const [selectedImage1, setSelectedImage1] = useState(null);

  const handleImageChange1 = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage1(file);
      const imgElement = document.getElementById("pic-preview");
      imgElement.src = URL.createObjectURL(file);
    }
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const value = {
      catstss: selectedStatus,
    };

    // if (emptyFields.length > 0) {
    //   setAlertData({
    //     type: "error",
    //     message: "All fields are required. Please fill in all fields.",
    //   });
    //   setTimeout(() => {
    //     setAlertData(null);
    //   }, 3000);
    //   return;
    // }

    try {
      const formData = new FormData();
      // formData.append("FCtgDsc", Description.current.value);
      // formData.append("remarks", Remarks.current.value);
      formData.append("FCtgSts", value.catstss);
      formData.append("pic", selectedImage1);

      axios
        .post(`https://crystalsolutions.com.pk/chef_kitchen/add_category.php`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          if (response.data.error === 200) {
            setAlertData({
              type: "success",
              message: `${response.data.message}`,
            });
            setTimeout(() => {
              setAlertData(null);
              navigate("/Get_Category");
            }, 2000);
          } else {
            console.log(response.data.message);

            setAlertData({
              type: "error",
              message: `${response.data.message}`,
            });
            setTimeout(() => {
              setAlertData(null);
            }, 2000);
          }
        })
        .catch((error) => {
          // Handle errors
          console.error("Error:", error);
        });
    } catch (error) {
      console.error(error);
    }
    
  };

  // Function to handle Enter key press
  const handleEnterKeyPress = (ref, e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission on Enter key press
      if (ref && ref.current) {
        ref.current.focus();
      }
    }
  };
  const handlebackSubmit = (event) => {
    event.preventDefault();
    navigate("/Get_Category");
  };
  return (
    <>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {alertData && (
          <Alert
            severity={alertData.type}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "30%",
              marginLeft: "35%",
              zIndex: 1000,
              textAlign: "center",
            }}
          >
            {alertData.message}
          </Alert>
        )}
        <Header />
        {/* <header
          style={{
            width: "100%",
            height: "30px",
            backgroundColor: "#1f2670",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div style={{ marginLeft: "60px", marginRight: "20px" }}>
            <p
              style={{
                margin: "0",
                fontFamily: "Sans-serif",
                fontWeight: "700",
                fontSize: "15px",
                lineHeight: "1",
                textAlign: "left",
                color: "white",
              }}
            >
              Files &nbsp;&gt;&nbsp; Category Maintenance &nbsp;&gt;&nbsp; Add
              Category
            </p>
          </div>
        </header> */}

        <div
          className="col-12"
          style={{
            backgroundColor: "#F5F5F5",

            color: "black",
            fontWeight: "bold",
            fontFamily: fontFamily,
          }}
        >
          <div
            className="row"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "5px",
              // backgroundColor: "#f5f5f5",
              minHeight: "100vh",
              overflowY: "scroll",
              height: "calc(100vh - 200px)",
            }}
          >
            <div className="col-md-12 form-container-category">
              <Nav
                className="col-12 d-flex justify-content-between"
                style={{
                  backgroundColor: "#3368b5",
                  color: "#fff",
                  height: "24px",
                }}
              >
                <div
                  className="col-4 "
                  style={{ display: "flex", marginTop: "-1%" }}
                >
                  <Link onClick={handleFormSubmit}>
                    <i
                      className="fa-solid fa-paper-plane fa-md topBtn"
                      title="Next Page"
                    ></i>
                  </Link>

                  <i className="fa fa-refresh fa-md topBtn" title="Refresh"></i>
                </div>
                <div style={{ fontSize: "14px" }} className="col-4 text-center">
                  <strong>Location Radius</strong>
                </div>
                <div className="text-end col-4" style={{ marginTop: "-1%" }}>
                  <Link to="/MainPage" className="topBtn">
                    <i className="fa fa-close fa-2md crossBtn"></i>
                  </Link>
                </div>
              </Nav>
              <br />
              <Form onSubmit={handleFormSubmit}>
                <div className="row ">
                 
                  <div className="row">
                    <div className="col-md-2 category-field">Latitude:</div>
                    <div
                      className="col-md-4 input-category"
                      style={{ display: "flex" }}
                    >
                      <Form.Control
                        type="text"
                        id="code"
                        placeholder="Latitude"
                        name="Latitude"
                        className="form-control-category"
                        onChange={handleInputChange}
                        ref={Latitude}
                        onKeyDown={(e) => handleEnterKeyPress(Longitude, e)}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-2 category-field">Longitude:</div>
                    <div
                      className="col-md-4 input-category"
                      style={{ display: "flex" }}
                    >
                      <Form.Control
                        type="text"
                        id="Longitude"
                        placeholder="Longitude"
                        name="Longitude"
                        className="form-control-category"
                        onChange={handleInputChange}
                        ref={Longitude}
                        onKeyDown={(e) => handleEnterKeyPress(KM1, e)}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-2 category-field">KM:</div>
                    <div
                      className="col-md-4 input-category"
                      style={{ display: "flex" }}
                    >
                      <Form.Control
                        type="text"
                        id="KM"
                        placeholder="KM1"
                        name="KM"
                        className="form-control-category"
                        onChange={handleInputChange}
                        ref={KM1}
                        onKeyDown={(e) => handleEnterKeyPress(Price1, e)}
                      />
                    </div>


                    <div className="col-md-2 category-field">Price:</div>
                    <div
                      className="col-md-4 input-category"
                      style={{ display: "flex" }}
                    >
                      <Form.Control
                        type="text"
                        id="Price1"
                        placeholder="Price"
                        name="Price1"
                        className="form-control-category"
                        onChange={handleInputChange}
                        ref={Price1}
                        onKeyDown={(e) => handleEnterKeyPress(KM2, e)}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-2 category-field">KM:</div>
                    <div
                      className="col-md-4 input-category"
                      style={{ display: "flex" }}
                    >
                      <Form.Control
                        type="text"
                        id="KM2"
                        placeholder="KM"
                        name="KM2"
                        className="form-control-category"
                        onChange={handleInputChange}
                        ref={KM2}
                        onKeyDown={(e) => handleEnterKeyPress(Price2, e)}
                      />
                    </div>


                    <div className="col-md-2 category-field">Price:</div>
                    <div
                      className="col-md-4 input-category"
                      style={{ display: "flex" }}
                    >
                      <Form.Control
                        type="text"
                        id="Price2"
                        placeholder="Price"
                        name="Price2"
                        className="form-control-category"
                        onChange={handleInputChange}
                        ref={Price2}
                        onKeyDown={(e) => handleEnterKeyPress(KM2, e)}
                      />
                    </div>
                  </div>
                  
                </div>
                <br />
               
                <br />
                
              </Form>
            </div>
          </div>
          <br />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Location_Radius;
