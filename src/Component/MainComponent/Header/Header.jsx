import Cart from "../../../image/cart.png";
import Logo from "../../../image/cheifkitchen.png";
import itc from "../HomePage/itc.png";
import "../Header/Header.css";
import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "react-bootstrap";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../ThemeContext";
import { FaToggleOn, FaToggleOff } from "react-icons/fa"; // Import toggle icons
import {
  Card,
  Row,
  Col,
  Button,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import axios from "axios";
import { useData } from "../../../DataContext";
import { useSidebar } from "../../../SidebarContext";
import NotificationSound from "../../Transaction/OrderList/mixkit-happy-bells-notification-937.wav";
import "react-toastify/dist/ReactToastify.css";
import { Toaster, toast } from "react-hot-toast";
// import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
function Header({ id }) {
  const navigate = useNavigate();
  const { primaryColor, secondaryColor } = useTheme();
  const { apiLinks } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const [showMenu, setShowMenu] = useState(false);

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setShowMenu(false); // Hide the menu after navigation
  };
  const handleLogout = () => {
    localStorage.removeItem("user_id");
    navigate("/login");
  };

  function AddNotification(lastRow) {
    const data = {
      from: lastRow.tcstnam,
      to: "Admin",
      msg: `New Order Received from ${lastRow.tcstnam} of amount ${lastRow.tordamt}`,
      orderList_id: lastRow.id,
    };
    const formData = new URLSearchParams(data).toString();

    axios
      .post(
        `https://crystalsolutions.com.pk/chef_kitchen/AddNotification.php`,
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((response) => {
        if (response.data.error === 200) {
          // getnotification();
        } else {
          console.log(response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  function ReadNotification(lastRow) {
    const data = {
      id: lastRow.id,
    };
    const formData = new URLSearchParams(data).toString();

    axios
      .post(
        `https://crystalsolutions.com.pk/chef_kitchen/ReadNotification.php`,
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((response) => {
        if (response.data.error === 200) {
          // getnotification();
        } else {
          console.log(response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  const getnotification = async () => {
    try {
      const response = await fetch(
        "https://crystalsolutions.com.pk/chef_kitchen/GetNotification.php"
      );
      const jsonData = await response.json();

      if (Array.isArray(jsonData)) {
        for (let i = 0; i < jsonData.length; i++) {
          const notification = jsonData[i];
          console.log("Notification: ", notification);
          showToast(notification);

          await new Promise((resolve) => setTimeout(resolve, 5000));
        }
      } else {
        console.warn("Unexpected data format: ", jsonData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////
  ////////////CART ICON KA OPER ITEM NUMBER ///////////////////////////////
  /////////////////////////////////////////////////////////////////////////
  const { orderData } = useData();
  const [getUser, setUser] = useState();
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));

    if (userData) {
      setUser(userData);
      console.log(userData);
      console.log("user id is", userData.userid); // Updated to access the 'id' property
    } else {
      const redirectTimer = setTimeout(() => {
        navigate("/login");
      }, 100);

      return () => clearTimeout(redirectTimer);
      // Handle cases when user data is not available
    }
  }, []);

  // Use a side effect to log the value of user whenever it changes

  const [totalItems, settotalItem] = useState([]);
  const totalItem = totalItems; // Replace with your actual total item count
  const [isSidebarToggled, setIsSidebarToggled] = useState(false); // State variable for toggling sidebar
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const toggleSidebarr = () => {
    toggleSidebar(); // Call the toggleSidebar function from SidebarContext
  };

  // const [neworderdata, setNewOrderData] = useState([]);
  const audioPlayer = useRef(null);

  function playAudio() {
    audioPlayer.current.play();
  }
  const [toastshow, setShowToast] = useState(false);

  let isInitialLoad = true;
  let previousLength = 0;
  const fetchDataNewFunction = async () => {
    try {
      const response = await fetch(
        "https://crystalsolutions.com.pk/chef_kitchen/OrderList.php"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();
      const lastRow = jsonData[0];
      console.log("lastRow", lastRow);
      if (Array.isArray(jsonData) && jsonData.length > previousLength) {
        if (!isInitialLoad) {
          const newOrders = jsonData.slice(previousLength);
          newOrders.forEach((order) => {
            AddNotification(lastRow);
            // showToast(lastRow);
            // playAudio();
          });
        }
        previousLength = jsonData.length;
      }
      isInitialLoad = false; // Set the flag to false after the initial load
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const fetchData = () => {
      console.log("Fetching data... dispatching every 1 seconds");
      getnotification();
      fetchDataNewFunction();
    };
    fetchData();
    const intervalId = setInterval(fetchData, 60000);
    return () => clearInterval(intervalId);
  }, []);

  const showToast = (neworderdata) => {
    playAudio();
    let toastId = null;

    const showCustomToast = () => {
      toastId = toast.success(
        (t) => (
          <div
            className="custom-toast"
            onClick={() => ReadNotification(neworderdata)}
          >
            <div className="toast-content">
              <div className="row toast-header">
                <div className="col-10">
                  <h4 className="toast-title">{neworderdata.froms}</h4>
                </div>
                <div className="col-2">
                  <button
                    style={{
                      backgroundColor: "red",
                      border: "none",
                      color: "white",
                    }}
                    className="close-toast-btn"
                    onClick={() => {
                      toast.dismiss(t.id);
                    }}
                  >
                    &times;
                  </button>
                </div>
              </div>
              <div className="toast-body">
                <p>{neworderdata.msg}</p>
              </div>
            </div>
          </div>
        ),
        {
          onClose: () => {
            toastId = null;
          },
        }
      );
    };

    if (toastId !== null) {
      toast.dismiss(toastId);
    }

    showCustomToast();
  };
  return (
    <>
      <audio ref={audioPlayer} src={NotificationSound} />
      <Toaster
        position="top-right"
        autoClose={60000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "5px",
          // backgroundColor: "rgb(235, 235, 235)",
          backgroundColor: primaryColor,
        }}
      >
        {/* <button className="toggle-btn" onClick={toggleSidebar}>
          <i className="lni lni-grid-alt">
            {isSidebarToggled ? <FaToggleOn /> : <FaToggleOff />}
          </i>
        </button> */}
        {/* <button onClick={toggleSidebarr}>Toggle Sidebar</button> */}

        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={Logo}
            alt="Company Logo"
            style={{ height: "50px", marginRight: "20px", marginLeft: "70px" }}
          />
          <h1
            style={{
              fontSize: "22px",
              margin: "0",
              color: secondaryColor,
              fontWeight: "bold",
            }}
          >
            NOSH GRILL'S{" "}
          </h1>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <h5 style={{ fontSize: "12px", margin: "0", marginLeft: "10px" }}>
            {moment().format("L")}
          </h5>
          <div
            className="menu-container"
            style={{
              display: "flex",
              // alignItems: "end",
              // justifyContent: "end",
              // marginTop: "12px",
              marginRight: "20px",
              marginLeft: "10px",
            }}
          >
            <FontAwesomeIcon
              icon={faEllipsisV}
              className="three-dot-icon"
              onClick={handleMenuToggle}
              title="Menu"
            />
            {showMenu && (
              <div
                className="menu"
                style={{ backgroundColor: primaryColor, fontSize: "12px" }}
              >
                <div>{getUser && getUser.tusrid}</div>
                <div onClick={() => handleNavigation("/Login")}>Logout</div>
              </div>
            )}
          </div>
          {/* <div>
            <Dropdown>
              <Dropdown.Toggle
                variant=""
                id="dropdown-basic"
                style={{ border: "none" }}
              >
                <FontAwesomeIcon className="text-dark" icon={faEllipsisV} />
              </Dropdown.Toggle>
              <Dropdown.Menu className="logout-menu">
                <Dropdown.Item className="ancher-class" href="#">
                  {getUser && getUser.tusrid}
                </Dropdown.Item>
                <Dropdown.Item
                  className="ancher-class"
                  href="/login"
                  onClick={handleLogout}
                >
                  logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div> */}
        </div>
      </header>
    </>
  );
}

export default Header;
