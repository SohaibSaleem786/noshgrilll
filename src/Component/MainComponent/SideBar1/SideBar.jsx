import React, { useEffect, useState } from "react";
import "./Sidebarr.css";
import axios from "axios";
import { Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  FaFile,
  FaExchangeAlt,
  FaChartBar,
  FaTools,
  FaToggleOn,
  FaToggleOff,
} from "react-icons/fa";
import { useSidebar } from "../../../SidebarContext";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchMenu } from "../../Redux/action";
import CompanyName from "../../../image/logowithname.jpeg";
import CompanyInfo from "../../../image/Crystal_info.jpeg";
import { Doughnut, Radar, Pie, Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineController,
  BarController,
  PieController,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  ArcElement,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineController,
  BarController,
  PieController,
  Title,
  Tooltip,
  Legend
);
const SideBar1 = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.item);
  const userId = 1;
  useEffect(() => {
    console.log("datadatadatadatadatadata", data);
    setMenuData(data);

    dispatch(fetchMenu(userId));
  }, [dispatch, userId]);
  useEffect(() => {
    if (data) {
      // Make sure data is an array before sorting
      if (Array.isArray(data)) {
        setMenuData(data);
        menuData.sort((a, b) => a.tmencod.localeCompare(b.tmencod));
      } else {
        console.error("Data is not an array:", data);
      }
    }
  }, [data]);

  const [expanded, setExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsToggled(!isToggled);
    setExpanded(!expanded);
  };
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));

    if (userData) {
    } else {
    }
  }, []);

  const [isToggled, setIsToggled] = useState(false);

  const { isSidebarOpen, toggleSidebarr } = useSidebar();
  console.log("isSidebarOpen", isSidebarOpen);

  const [menuData, setMenuData] = useState([]);
  console.log("menuData", menuData);
  const menuUrl = "https://crystalsolutions.com.pk/nosh_grill/UserMenu.php";

  // useEffect(() => {
  //   fetchMenuData();
  // }, []);

  // function fetchMenuData() {
  //   const data = {
  //     userid: 1,
  //   };
  //   const formData = new URLSearchParams(data).toString();

  //   axios
  //     .post(menuUrl, formData, {
  //       headers: {
  //         "Content-Type": "application/x-www-form-urlencoded",
  //       },
  //     })
  //     .then((response) => {
  //     console.log("responserespons4356578765432576sponse",response.data);

  //       setMenuData(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("API Error:", error);
  //     });

  // }

  const customLinks = {
    // "1-01-00": "/AccountCode_Maintenance",
    // "1-03-01": "/Get_Group",
    // "1-03-02": "/Get_Area",
    // "1-03-03": "/Get_Collector",
    // "1-03-04": "/Get_Verifier",
    // "1-03-05": "/Get_Customer",
    // "1-02-01": "/Get_Company",
    "1-01-00": "/Get_Category",
    // "1-02-03": "/Get_Capacity",
    // "1-02-04": "/Get_ItemType",
    "1-02-00": "/Get_Item",
    "1-03-00": "/Location_Radius",
    "1-05-00": "/Get_Table",
    "1-04-00": "/Get_Waiter",
    "1-06-00": "/Account_Code_Maintenance",
    "1-07-00": "/Stock_Maintenance",
    "1-08-00": "/Receipe_Maintenance",
    "1-09-00": "/Raw_Material_Maintenance",

    // "1-04-00": "/Get_Booking",
    // "1-05-00": "/Get_Employee",
    // "2-07-00": "/Item_Sale",

    "2-01-00": "/OrderList_Info",
    "2-02-00": "/Order_Dashboard",
    "2-03-00": "/Cash_Payment_Voucher",
    "2-04-00": "/Cash_Receipt_Voucher",

    "2-05-00": "/Raw_Material_Purchase",

    // "3-02-08": "/DailySaleReport",
    // "3-02-07": "/DailyPurchaseReport",
    "3-02-00": "/Daily_Sale_Report",
    // "3-03-05": "/SupplierLedgerReport",
    // "3-03-06": "/CustomerLedgerReport",
    // "3-01-01": "/PriceListReport",
    // "3-01-02": "/CompanyListReport",
    // "3-01-03": "/CategoryListReport",
    // "3-01-07": "/ChartOfAccountList",
    // "3-01-05": "/LocationList",
    // "3-01-09": "/ItemListReport",
    // "3-03-01": "/GeneralLegerReport",
    // "3-03-03": "/ItemLegerReport",
    // "3-04-04": "/ItempurchaseReport",
    // "3-04-05": "/ItemsaleReport",
    // "3-02-10": "/Cash&BankReport",
    // "3-04-01": "/ItemStockReport",
    // "3-01-11": "/EmployeeList",
    // "3-04-02": "/ItemstatusReport",
    // "3-04-07": "/ItemmarginReport",
    // "3-04-08": "/SlowmovingReport",
  };

  // Sort the menuData array based on tmencod
  menuData.sort((a, b) => a.tmencod.localeCompare(b.tmencod));

  // Initialize an empty object to store the hierarchical menu data
  const hierarchicalMenuData = {};

  // Loop through the sorted menuData array
  menuData.forEach((item) => {
    const [topLevel, middleLevel, subLevel] = item.tmencod.split("-");

    // Create the top-level menu item if it doesn't exist
    if (!hierarchicalMenuData[topLevel]) {
      hierarchicalMenuData[topLevel] = {
        label: item.tmendsc,
        items: [],
      };
    }

    // Create the middle-level menu item if it doesn't exist
    if (!hierarchicalMenuData[topLevel].items[middleLevel]) {
      hierarchicalMenuData[topLevel].items[middleLevel] = {
        label: item.tmendsc,
        items: [],
      };
    }

    // Add the sub-level menu item
    hierarchicalMenuData[topLevel].items[middleLevel].items.push({
      label: item.tmendsc,
      to: customLinks[item.tmencod] || "#",
      disabled: item.tmenprm === "N",
    });
  });

  const renderSubSubDropdown = (topLevel) => {
    const middleLevelItems = hierarchicalMenuData[topLevel].items;

    // Sort middle level keys based on the middle digit of tmencod
    const sortedMiddleLevelKeys = Object.keys(middleLevelItems).sort((a, b) => {
      const middleDigitA = parseInt(a);
      const middleDigitB = parseInt(b);
      return middleDigitA - middleDigitB;
    });

    return sortedMiddleLevelKeys
      .map((middleLevel, index) => {
        const subSubItems = middleLevelItems[middleLevel].items;

        // Check if there are sub-sub-items
        if (subSubItems.length > 1) {
          // Filter out the first sub-sub-item
          const filteredSubSubItems = subSubItems.slice(1);

          return (
            <Dropdown
              key={middleLevel}
              className="custom-dropdown-button dropend"
            >
              <Dropdown.Toggle
                variant="transparent"
                id={`dropdown-${topLevel}-${middleLevel}`}
                className="sub-dropdown-toggle"
              >
                {middleLevelItems[middleLevel].label}
              </Dropdown.Toggle>
              <Dropdown.Menu style={{ marginTop: "0%" }}>
                {filteredSubSubItems.map((item, subIndex) => (
                  <Dropdown.Item
                    key={subIndex}
                    as={item.to !== "#" ? Link : undefined}
                    to={item.to}
                    disabled={item.disabled}
                    className="sub-dropdown-item"
                  >
                    {item.label}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          );
        } else if (subSubItems.length === 1) {
          // If there's only 1 sub-sub-item, render it as a regular dropdown item
          return (
            <Dropdown.Item
              key={middleLevel}
              as={subSubItems[0].to !== "#" ? Link : undefined}
              to={subSubItems[0].to}
              disabled={subSubItems[0].disabled}
              className={`custom-dropdown-item${
                index === 0 ? " hide-first-item" : ""
              }`}
            >
              {middleLevelItems[middleLevel].label}
            </Dropdown.Item>
          );
        }

        return null;
      })
      .filter(Boolean);
  };

  const [activeDropdown, setActiveDropdown] = useState(null);

  // Handler for mouse enter event on a top-level menu
  const handleMouseEnter = (menuKey) => {
    setActiveDropdown(menuKey);
  };

  // Handler for mouse leave event on a top-level menu
  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const totalAmount = 12000; // Example data
  const dailySales = 6500; // Example data
  const monthlySales = 45000; // Example data
  const inventory = 7000; // Example data
  const stock = 5000; // Example data
  const tableOccupancy = 85; // Example data (percentage)
  const customerSatisfaction = 4.5; // Example data (out of 5)
  const ordersFulfilled = 50; // Example data
  const pendingOrders = 10; // Example data
  const lowStockAlerts = 5; // Example data
  const supplierDeliveries = 3; // Example data
  const wasteManagement = 2; // Example data
  const popularItems = 3; // Example data
  const employeePerformance = 4.5; // Example data (out of 5)
  const reservations = 2; // Example data
  const specialOffers = 3; // Example data

  const barData = {
    labels: [
      "Total Amount",
      "Daily Sales",
      "Monthly Sales",
      "Inventory",
      "Stock",
    ],
    datasets: [
      {
        label: "Sales Data",
        data: [totalAmount, dailySales, monthlySales, inventory, stock],
        backgroundColor: [
          "#ff6980",
          "#42eaff",
          "#2eff2e",
          "#ffd700",
          "#ff6347",
        ],
      },
    ],
  };

  const lineData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Monthly Sales",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: "#007bff",
      },
    ],
  };
  const options = {
    maintainAspectRatio: false,
  };
  const doughnutData = {
    labels: ["Dine-In", "Takeaway", "Delivery"],
    datasets: [
      {
        data: [50, 30, 20],
        backgroundColor: ["#ff6980", "#42eaff", "#2eff2e"],
      },
    ],
  };

  const topSellingItems = [
    { id: 1, name: "Pizza", sales: 120 },
    { id: 2, name: "Burger", sales: 95 },
    { id: 3, name: "Pasta", sales: 80 },
  ];

  const recentOrders = [
    { id: 1, item: "Pizza", quantity: 2, status: "Delivered" },
    { id: 2, item: "Burger", quantity: 1, status: "Pending" },
    { id: 3, item: "Pasta", quantity: 3, status: "Delivered" },
  ];

  const customerFeedback = [
    { id: 1, name: "John Doe", feedback: "Great food and service!" },
    { id: 2, name: "Jane Smith", feedback: "Loved the ambiance." },
    { id: 3, name: "Mike Johnson", feedback: "Will visit again." },
  ];

  const upcomingReservations = [
    { id: 1, name: "John Doe", time: "7:00 PM", table: 5 },
    { id: 2, name: "Jane Smith", time: "8:00 PM", table: 3 },
  ];
  const navigate = useNavigate();
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.altKey) {
        switch (event.key.toLowerCase()) {
          case "c":
            navigate(customLinks["1-01-00"]);
            break;
          case "i":
            navigate(customLinks["1-02-00"]);
            break;
          case "l":
            navigate(customLinks["1-03-00"]);
            break;
          case "w":
            navigate(customLinks["1-04-00"]);
            break;
          case "t":
            navigate(customLinks["1-05-00"]);
            break;
          case "a":
            navigate(customLinks["1-06-00"]);
            break;
          case "s":
            navigate(customLinks["1-07-00"]);
            break;
          case "r":
            navigate(customLinks["1-08-00"]);
            break;
          case "e":
            navigate(customLinks["1-09-00"]);
            break;
          case "o":
            navigate(customLinks["2-02-00"]);
            break;
          case "cr":
            navigate(customLinks["2-03-00"]);
            break;
          case "cp":
            navigate(customLinks["2-04-00"]);
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigate]);

  return (
    <div className={`wrapper ${expanded ? "expand" : ""}`}>
      {/* <button onClick={toggleSidebarr}>Toggle Sidebar</button> */}
      <aside className="sidebar" style={{ marginTop: "-3%" }}>
        <button className="toggle-btn" style={{ marginTop: "-23px" }}>
          <i className="lni lni-grid-alt" onClick={toggleSidebar}>
            {isToggled ? <FaToggleOn /> : <FaToggleOff />}
          </i>
        </button>
        {isSidebarOpen && (
          <ul className="sidebar-nav">
            {Object.keys(hierarchicalMenuData).map((topLevel, index) => (
              <Dropdown
                key={topLevel}
                className="custom-dropdown-button"
                onMouseEnter={() => handleMouseEnter(topLevel)}
                onMouseLeave={handleMouseLeave}
                show={activeDropdown === topLevel} // Show dropdown only if activeDropdown matches current top-level menu
              >
                <li
                  className="sidebar-item"
                  style={{ position: "relative", marginLeft: "-43%" }}
                >
                  <Dropdown.Toggle
                    style={{ borderRadius: "0px", textTransform: "none" }}
                    variant="transparent"
                    id={`dropdown-${topLevel}`}
                    className={`${expanded ? "sidebar-menu" : "sidebar-menuu"}`}
                  >
                    <i className="lni lni-user">
                      {index === 0 && <FaFile />}
                      {index === 1 && <FaExchangeAlt />}
                      {index === 2 && <FaChartBar />}
                      {index === 3 && <FaTools />}
                    </i>
                    {expanded && hierarchicalMenuData[topLevel].label}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {renderSubSubDropdown(topLevel)}
                  </Dropdown.Menu>
                </li>
              </Dropdown>
            ))}
          </ul>
        )}
      </aside>
      {/* <div className="main p-3 Dashboard"> */}
      {/* <div className="row dashboard-name">NOSH GRILL </div>
        <div
          className="row "
          style={{ borderTop: "2px solid blue", width: "70%" }}
        >
          <div className="col-4 dashboard-okara">LAHORE</div>
          <div className="col-1"></div>
          <div className="col-7 dashboard-address">
            Depalpure Road,Near G.P.O ,Okara <br /> Phone #:0442-713888
          </div>
        </div>
        <div className="row" style={{ marginTop: "2%" }}>
          <div className="col-4 dashboard-companynameimage">
            <img src={CompanyName} alt="logo" />
          </div>
          <div className="col-4 dashboard-companyinfoimage">
            <img src={CompanyInfo} alt="logo" />
          </div>
        </div> */}
      <div className="dashboard">
        <div className="cardsss total-amount">
          <h2>Total Amount</h2>
          <p>${totalAmount}</p>
        </div>
        <div className="cardsss daily-sales">
          <h2>Daily Sales</h2>
          <p>${dailySales}</p>
        </div>
        <div className="cardsss monthly-sales">
          <h2>Monthly Sales</h2>
          <p>${monthlySales}</p>
        </div>
        <div className="cardsss inventory">
          <h2>Inventory</h2>
          <p>{inventory} items</p>
        </div>
        <div className="cardsss stock">
          <h2>Stock</h2>
          <p>{stock} items</p>
        </div>
        <div className="cardsss table-occupancy">
          <h2>Table Occupancy</h2>
          <p>{tableOccupancy}%</p>
        </div>

        <div className="chart-container">
          <div className="chart-wrapper">
            <Bar data={barData} />
          </div>
          <div className="chart-wrapper">
            <Line data={lineData} />
          </div>
          <div className="chart-wrapper doughnut-chart">
            <div style={{ width: "400px", height: "200px" }}>
              <Doughnut data={doughnutData} options={options} />
            </div>
          </div>
        </div>
        <div className="cardsss order-fulfillment">
          <h2>Orders Fulfilled</h2>
          <p>74</p>
        </div>
        <div className="cardsss pending-orders">
          <h2>Pending Orders</h2>
          <p>13</p>
        </div>
        <div className="cardsss low-stock-alerts">
          <h2>Low Stock Alerts</h2>
          <p>7</p>
        </div>
        <div className="cardsss supplier-deliveries">
          <h2>Supplier Deliveries</h2>
          <p>8</p>
        </div>
        <div className="cardsss reservations">
          <h2>Reservations</h2>
          <p>6</p>
        </div>
        <div className="cardsss special-offers">
          <h2>Special Offers</h2>
          <p>5</p>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default SideBar1;
