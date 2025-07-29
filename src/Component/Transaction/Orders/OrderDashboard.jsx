import ReactToPrint from "react-to-print";
import Print from "../../../image/print.png";
import React, { useState, useEffect, useRef, ref } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBTable, MDBTableBody, MDBTableHead, MDBTableFoot } from "mdbreact";
import Footer from "../../MainComponent/Footer/Footer";
import PathHead from "../../MainComponent/PathHead/PathHead";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Modal from "react-bootstrap/Modal";
import { Card, Row, Col, Button, InputGroup } from "react-bootstrap";
import {
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@material-ui/core";
import { useTheme } from "../../../ThemeContext";
import Bin from "../../../image/bin.png";
import Typography from "@mui/material/Typography";
import "../Orders/OrderDashbored.css";
import CategoryCard from "./Category_Card/Category_Card.jsx";
import OrderDeliveryModal from "./Modal/Delivery_Modal.jsx";
import DiningOrderModal from "./Modal/Dining_Modal.jsx";
import CheckoutModal from "./CheckoutModal/Checkoutmodal.jsx";
import CarOrderModal from "./Modal/Car_Modal.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategory,
  fetchDelivery,
  fetchItemm,
  fetchKitchen,
  fetchTable,
  fetchWaiter,
  updateKitchenData,
  fetchPendingOrderlist,
  fetchTakeAwayOrderList,
  fetchDiningOrderList,
  fetchCarOrderList,
  fetchDeliveryOrderList,
} from "../../Redux/action.js";
import Receipt from "../print/Receipt";
import TakeAwayOrderModal from "./Modal/Take_Away.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

const Order_Dashboard = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setShowMenu(false); // Hide the menu after navigation
  };
  const dispatch = useDispatch();
  const categorydata = useSelector((state) => state.category);
  const tabledata = useSelector((state) => state.table);
  const itemdata = useSelector((state) => state.itemm);
  // console.log("itemmmm", itemdata);
  const waiterdata = useSelector((state) => state.waiter);
  const deliverydata = useSelector((state) => state.delivery);

  const PendingOrderListdata = useSelector((state) => state.pendingOrderList);
  // console.log("PendingOrderListdata", PendingOrderListdata);
  const DiningOrderListdata = useSelector((state) => state.diningOrderList);
  const TakeAwayOrderListdata = useSelector((state) => state.takeAwayOrderList);

  // console.log("DiningOrderListdata", DiningOrderListdata);

  const CarOrderListdata = useSelector((state) => state.carOrderList);
  const DeliveryOrderListdata = useSelector((state) => state.deliveryOrderList);
  // console.log("DeliveryOrderListdata", DeliveryOrderListdata);

  useEffect(() => {
    dispatch(fetchKitchen());
    dispatch(fetchTable());
    dispatch(fetchCategory());
    dispatch(fetchItemm());
    dispatch(fetchWaiter());
    dispatch(fetchDelivery());
    dispatch(fetchTakeAwayOrderList());
    dispatch(fetchPendingOrderlist());
    dispatch(fetchDiningOrderList());
    dispatch(fetchCarOrderList());
    dispatch(fetchDeliveryOrderList());
  }, [dispatch]);
  const [newOrderData, setNewOrderData] = useState(0);
  const navigate = useNavigate();
  const ref = useRef();
  const [searchText, setSearchText] = useState("");
  const [alertData, setAlertData] = useState(null);
  const [rowNumber, setRowNumber] = useState(0); // Initialize row number
  const { primaryColor } = useTheme();
  const secondaryColor = "black";
  const { apiLinks } = useTheme();
  const [getUser, setUser] = useState();
  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////
  /////////////////////////  CATEGORY FUNCTION  ////////////////////////////////
  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////
  const [data1, setData1] = useState();
  const [selectedTableIdd, setSelectedTableIddd] = useState();
  const [selectedwaiiiIdd, setSelectedwaaaaaIddd] = useState("");
  const [getTable, setDataTable] = useState([]);
  const [selectedWaiterId, setSelectedWaiterId] = useState("0");
  const [getWaiter, setDataWaiter] = useState([]);
  const [showOrderList, setShowOrderList] = useState(true);
  const [getorderlist, setorderlist] = useState({ columns: [], rows: [] });
  const [datadining, setDatadining] = useState([]);
  const [datatakeaway, setDatatakeaway] = useState([]);

  const [dataCar, setDataCar] = useState([]);
  const [dataDelivery, setDataDelivery] = useState([]);
  const [getwaiternamedata, setWaiterNamedata] = useState("");
  const handleWaiterChange1 = (waiterId) => {
    // console.log("selectedWaiterId===", selectedWaiterId);
    console.log("waiterId", waiterId);
    setSelectedWaiterId(waiterId);
    setWaiterNamedata(waiterId);
    // console.log("selectedWaiterId", selectedWaiterId);
  };
  const handleTableChange1 = (tableId) => {
    setSelectedwaaaaaIddd(tableId);
  };

  useEffect(() => {
    if (categorydata && categorydata.data) {
      setData1(categorydata?.data);
    }
    if (tabledata && tabledata.data) {
      setDataTable(tabledata.data);
    }
    if (waiterdata && waiterdata.data) {
      setDataWaiter(waiterdata.data);
    }
    if (PendingOrderListdata && PendingOrderListdata.data) {
      const transformedData = PendingOrderListdata.data.map((item) => ({
        id: item.id,
        tcstnam: item.tcstnam,
        tmobnum: item.tmobnum,
        w_name: item.w_name,
        dvdsc: item.dvdsc,
        totalAmt: item.totalAmt,
        address: item.address,
        order_sts: item.order_sts,
      }));
      const columns = [
        { label: "ID", field: "id", sort: "asc" },
        { label: "Name", field: "torddat", sort: "asc" },
        { label: "Mobile", field: "tordtim", sort: "asc" },
        { label: "W_Name", field: "tordadd", sort: "asc" },
        { label: "Type", field: "tmobnum", sort: "asc" },
        { label: "Amount", field: "tordamt", sort: "asc" },
        { label: "Show", field: "tordamt", sort: "asc" },
        { label: "Add", field: "tordamt", sort: "asc" },
        { label: "Print", field: "tordamt", sort: "asc" },
        { label: "-", field: "tordamt", sort: "asc" },
      ];
      const filteredData = transformedData.filter(
        (row) => row.order_sts !== "N"
      );

      setorderlist({ columns, rows: filteredData });
      setLength(filteredData.length);
    }
    if (DiningOrderListdata && DiningOrderListdata.data) {
      setDatadining(DiningOrderListdata.data);
    }
    if (TakeAwayOrderListdata && TakeAwayOrderListdata.data) {
      setDatatakeaway(TakeAwayOrderListdata.data);
    }
    if (CarOrderListdata && CarOrderListdata.data) {
      setDataCar(CarOrderListdata.data);
    }
    if (DeliveryOrderListdata && DeliveryOrderListdata.data) {
      setDataDelivery(DeliveryOrderListdata.data);
    }
  }, [
    categorydata,
    tabledata,
    waiterdata,
    PendingOrderListdata,
    DiningOrderListdata,
    CarOrderListdata,
    DeliveryOrderListdata,
  ]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUser(userData);
      // console.log(userData);
      fetchMenuItems();
      // console.log("user id is", userData.id);
    } else {
      // console.error("User data not available in local storage.");
    }
  }, []);
  const [getpayable, setnetpayable] = useState([]);
  const [tamtItems, settamtItems] = useState([]);
  const [totalItemmm, settotalItemm] = useState([]);
  const [detailItem, setDetailItem] = useState([]);
  const [Length, setLength] = useState("");
  //////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////
  ////////////////QUANTITY /////////////////////////
  ////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////

  const [filteredDataItem, setFilteredDataItem] = useState([]);

  const handleQuantityChange = (itemIndex, newValue) => {
    const updatedData = [...filteredDataItem];
    const parsedValue = parseInt(newValue, 10);
    if (!isNaN(parsedValue)) {
      updatedData[itemIndex].quantity = parsedValue;
      setFilteredDataItem(updatedData);
    }
  };

  const handleDecrement = (itemIndex) => {
    const updatedData = [...filteredDataItem];
    if (updatedData[itemIndex].quantity > 0) {
      updatedData[itemIndex].quantity -= 1;
      setFilteredDataItem(updatedData);
    }
  };

  const handleIncrement = (itemIndex) => {
    const updatedData = [...filteredDataItem];
    updatedData[itemIndex].quantity += 1;
    setFilteredDataItem(updatedData);
  };

  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////
  //////////////////////  CART ITEM FUNCTION  ///////////////////////////////
  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////

  const fetchMenuItems = () => {
    const apiUrl = `${apiLinks}/Cart_Item.php`;
    const formData = new URLSearchParams({
      orderid: newOrderData?.id,
    }).toString();
    // console.log("newOrderData?.id", newOrderData?.id);
    axios
      .post(apiUrl, formData)
      .then((response) => {
        settotalItemm(response.data.totalitem);
        settamtItems(response.data.totalAmt.toLocaleString());

        setDetailItem(response.data.detail);
        setnetpayable(response.data.payable.toLocaleString());
      })

      .catch((error) => {});
  };
  useEffect(() => {
    fetchMenuItems();
  }, []);

  const filteredRows = detailItem
    ? detailItem.filter((item) =>
        item.titmdsc.toLowerCase().includes(searchText.toLowerCase())
      )
    : [];
  const handleDeletePendingRow = (row) => {
    const apiUrl = `${apiLinks}/DeletePendingOrder.php`;

    const formData = new URLSearchParams({
      id: row.id,
    }).toString();

    // console.log("Order ID to update:", row.id);

    axios
      .post(apiUrl, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        // console.log(response.data);
        dispatch(fetchPendingOrderlist()); // Refresh the pending orders list
      })
      .catch((error) => {
        // console.error("Error updating order status:", error);
      });
  };
  const handleDeleteCartRow = (row) => {
    const apiUrl = `${apiLinks}/DeleteCartItem.php`;

    const formData = new URLSearchParams({
      id: row.id,
    }).toString();

    axios
      .post(apiUrl, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        const updatedDetailItem = filteredRows;
        const newTotalQuantity = updatedDetailItem.reduce(
          (total, item) => total + (item.titmqnt || 0),
          0
        );
        const newTotalAmount = updatedDetailItem.reduce(
          (total, item) => total + (item.salamt || 0),
          0
        );

        settotalItemm(newTotalQuantity);
        settamtItems(newTotalAmount);
        fetchMenuItems();

        dispatch(fetchPendingOrderlist());
      })
      .catch((error) => {});
  };
  ///////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////
  //////////////////// DELETE ITEM api ////////////////////////
  ///////////////////////////////////////////////////////////
  const [tableData, setTableData] = useState({ columns: [], rows: [] });

  const [showModal, setShowModal] = useState(false);
  const [showModalPendingDelete, setShowModalPendingDelete] = useState(false);

  const [selectedItemId, setSelectedItemId] = useState();
  const handleImageClick = (index) => {
    setSelectedItemId(index);
    handleShowModal(); // Show the delete confirmation modal
  };

  const handleClose = () => {
    setShowModal(false);
  };
  const handleClosePendingDelete = () => {
    setShowModalPendingDelete(false);
  };

  // const handleDeleteItem = () => {
  //   setfilteredRowsss((prevItems) =>
  //     prevItems.filter((item) => item.itemid !== selectedItemId)
  //   );
  //   handleClose();
  // };
  const handleDeleteItem = () => {
    setfilteredRowsss((prevItems) =>
      prevItems.filter((_, i) => i !== selectedItemId)
    );
    handleClose();
  };
  const handleShowModal = () => {
    setShowModal(true);
  };

  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////
  /////////////////////////  ITEM FUNCTION  ////////////////////////////////
  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////
  const [dataItem, setDataItem] = useState({ columns: [], rows: [] });
  const [categoryId, setCategoryId] = useState(null);
  const imageurlitem = `${apiLinks}/itemimage/`;

  const handleCategoryClick = (categoryId) => {
    setCategoryId(categoryId);
  };

  useEffect(() => {
    fetch(`${apiLinks}/get_category.php`)
      .then((response) => response.json())
      .then((apiData) => {
        if (apiData.length > 0) {
          // console.log("===================================");
          // console.log(apiData[0].tctgid);
          setCategoryId(apiData[0].tctgid);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (itemdata && itemdata.data) {
      const filteredData = itemdata?.data.filter(
        (item) => item.ctgid === categoryId
      );
      const transformedData = filteredData.map((item) => ({
        TItmId: item.TItmId,
        dscription: item.dscription,
        dscription1: item.dscription1,
        dscription2: item.dscription2,
        dscription3: item.dscription3,
        dscription4: item.dscription4,
        dscription5: item.dscription5,
        rspcode: item.rspcode,
        line1: item.line1,
        line2: item.line2,
        line3: item.line3,
        line4: item.line4,
        line5: item.line5,
        amount1: item.amount1,
        amount2: item.amount2,
        amount3: item.amount3,
        amount4: item.amount4,
        amount5: item.amount5,

        TItmPic: item.TItmPic,

        quantity: 1.0,
      }));
      setDataItem({ rows: transformedData });
      setFilteredDataItem(transformedData);
    }
  }, [categoryId]);

  //////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////
  ////////////////////////   Modals    //////////////////////////////
  //////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");

  const handleNewOrderClick = (name, mobile, address) => {
    setNewOrderData("---");
    setDataOrderTypeeee1("1");
    setShowDeliveryModal(false);
    setShowTakeAwayModal(false);

    setName(name);
    setMobile(mobile);
    setAddress(address);
    // console.log("Name:", name);
    // console.log("Mobile a:", mobile);
    // console.log("address:", address);
  };
  const handleNewOrderClickCar = (name) => {
    setNewOrderData("---");
    setName(name);
    setShowCarModal(false);
    setDataOrderTypeeee1("1");
  };

  const handleNewOrderClickTakeAway = (mobile) => {
    setNewOrderData("---");
    setName("");
    setAddress("");
    setMobile(mobile);
    setShowTakeAwayModal(false);
    setDataOrderTypeeee1("1");
  };
  const handleNewOrderClickdining = () => {
    setDataOrderTypeeee1("1");
    setNewOrderData("---");
    setfilteredRowsss([]);
    console.log("sdfsfs", selectedwaiiiIdd);
    setName(selectedwaiiiIdd);
    setMobile("");
    setShowDiningModal(false);
  };

  const [showDeliveryModal, setShowDeliveryModal] = useState(false);

  const handleShowDeliveryModal = () => {
    setShowDeliveryModal(true);
  };
  const handleDeliveryClose = () => {
    console.log("close the delivery modal");

    setShowDeliveryModal(false);
  };

  const [showDiningModal, setShowDiningModal] = useState(false);

  const handleShowDiningModal = () => {
    // setfilteredRowsss([]);
    //   setNewOrderData([]);
    setShowDiningModal(true);
  };

  const handleDiningClose = () => {
    setShowDiningModal(false);
    resetTableNumber();
  };

  const [showCarModal, setShowCarModal] = useState(false);

  const handleShowCarModal = () => {
    setShowCarModal(true);
  };
  const handleCarClose = () => {
    // setSelectedWaiterId('');

    // setNewOrderData(newOrderData?.id);
    console.log("close the car modal", newOrderData?.id);
    setShowCarModal(false);
  };

  const [showTakeAwayModal, setShowTakeAwayModal] = useState(false);

  const handleShowTakeAwayModal = () => {
    setShowTakeAwayModal(true);
  };
  const handleTakeAwayClose = () => {
    // setSelectedWaiterId('');

    // setNewOrderData(newOrderData?.id);
    console.log("close the car modal", newOrderData?.id);
    setShowTakeAwayModal(false);
  };
  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////  ADD TO CART ////////////////////////////
  const [filteredRowsss, setfilteredRowsss] = useState([]);
  const handleRemarksChange = (index, remarks) => {
    setfilteredRowsss((prevRows) => {
      const updatedRows = [...prevRows];
      updatedRows[index] = { ...updatedRows[index], remarks };
      return updatedRows;
    });
  };
  const [totalAmountCart, setTotalAmountCart] = useState(0);
  const [totalQuantityCart, setTotalQuantityCart] = useState(0);

  // const handleQuantityChange111 = (index, newQuantity) => {
  //   setfilteredRowsss((prevItems) =>
  //     prevItems.map((item, i) =>
  //       i === index
  //         ? { ...item, qty: newQuantity, total: newQuantity * item.saleRate }
  //         : item
  //     )
  //   );
  // };
  const handleQuantityChange111 = (index, value) => {
    const newItems = [...filteredRowsss];
    newItems[index].qty = parseInt(value, 10);
    console.log("newItems[index].qty", newItems[index].qty);
    const discount = newItems[index].discount || 0;
    newItems[index].total =
      newItems[index].qty * newItems[index].saleRate - discount;
    console.log("newItems[index].saleRate", newItems[index].saleRate);
    console.log("newItems[index].discount", discount);

    setfilteredRowsss(newItems);
  };

  const handleDiscountChange = (index, value) => {
    const newItems = [...filteredRowsss];
    const discountValue = Math.max(0, parseInt(value, 10) || 0);
    const totalBeforeDiscount = newItems[index].qty * newItems[index].saleRate;
    const discountAmount = (totalBeforeDiscount * discountValue) / 100;
    const totalAfterDiscount = totalBeforeDiscount - discountAmount;
    newItems[index].discount = discountValue;
    newItems[index].total = totalAfterDiscount;
    setfilteredRowsss(newItems);
  };

  useEffect(() => {
    const totalAmount = filteredRowsss.reduce(
      (accumulator, item) => accumulator + item.total,
      0
    );

    const totalQuantity = filteredRowsss.reduce(
      (accumulator, item) => accumulator + parseInt(item.qty, 10) || 0,
      0
    );

    setTotalQuantityCart(totalQuantity);
    setTotalAmountCart(totalAmount);
  }, [filteredRowsss]);
  // function handleAddToCart(item, amount, description) {
  //   console.log("item", item);
  //   const { quantity } = item;
  //   const itemId = item.TItmId;

  //   // Create the new data object
  //   const newData = {
  //     itemid: itemId,
  //     itemDec: `${item.dscription}(${description}) `,
  //     purRate: amount,
  //     saleRate: amount,
  //     disRate: amount,
  //     total: quantity * amount,
  //     qty: quantity,
  //   };

  //   setfilteredRowsss((prevItems) => {
  //     // Check if item already exists in the array
  //     const existingItemIndex = prevItems.findIndex((i) => i.itemid === itemId);

  //     if (existingItemIndex !== -1) {
  //       // Item exists, update its quantity
  //       const updatedItems = prevItems.map((i, index) => {
  //         if (index === existingItemIndex) {
  //           return {
  //             ...i,
  //             qty: i.qty + 1,
  //             total: (i.qty + 1) * amount,
  //           };
  //         }
  //         return i;
  //       });
  //       return updatedItems;
  //     } else {
  //       // Item does not exist, add it
  //       return [...prevItems, newData];
  //     }
  //   });

  //   console.log("totalAmountsdsad", totalAmount);
  // }

  function handleAddToCart(item, amount, description) {
    console.log("item", item);
    const { quantity } = item;

    const total = quantity * amount;

    const data = {
      itemid: item.TItmId,
      itemDec: `${item.dscription}(${description}) `,
      receipecode: item.rspcode,
      purRate: amount,
      saleRate: amount,
      disRate: amount,
      total: total,
      qty: quantity,
    };
    console.log("dataaaaaaaa", data);
    setfilteredRowsss((prevItems) => [...prevItems, data]);
    // }

    console.log("totalAmountsdsad", totalAmount);
  }

  //////////////////////////////////////////////////////////////////////////
  /////////////////////////      ORDER TYPE         //////////////////////////
  ////////////////////////   NEW ORDER GENERATE    //////////////////////////////
  ///////////////////////  DELEIVERY ORDER  ,,, DINING ORDER    /////////////////////////////
  //////////////////////////////////////////////////////////////////////////

  const [lastOrderId, setLastOrderId] = useState(null);

  const [values, setValues] = useState({
    descriptionitem: "",
    namee: "",
    mobilee: "",
    tablee: "",
    priceDiscount: "",
    percentageDiscount: "",
    perDicAmtt: "",
    loading: false,
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const uppercaseValue = value.toUpperCase();
    setValues({ ...values, [name]: uppercaseValue });
  };

  const [dataOrderType, setDataOrderTypeeee] = useState("2");
  const [dataOrderType1, setDataOrderTypeeee1] = useState("1");

  const handleButtonClick1 = () => {
    setDataOrderTypeeee1(dataOrderType1 === "1" ? "2" : "1");
    setDataOrderTypeeee("2");
  };

  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClick = (row) => {
    setDataOrderTypeeee1("1");
    if (selectedRow === row.id) {
      setShowOrderList(!showOrderList);
      // setDataOrderTypeeee(showOrderList ? "1" : "2");
      setDataOrderTypeeee1("1");

      // setNewOrderData(row);
    } else {
      setSelectedRow(row.id);
      setShowOrderList(true);
      setDataOrderTypeeee1("1");
      setNewOrderData(row);
    }
  };
  // add the item
  const showcartitemlist = (row) => {
    console.log("show cart");
    setDataOrderTypeeee("2");
    setDataOrderTypeeee1("1");
    if (selectedRow === row.id) {
      setShowOrderList(!showOrderList);
      // setDataOrderTypeee(showOrderList ? "1" : "2");
      setDataOrderTypeeee("2");
      setDataOrderTypeeee1("1");
      // setNewOrderData(row);
    } else {
      setSelectedRow(row.id);
      setShowOrderList(true);
      setDataOrderTypeeee("2");
      setDataOrderTypeeee1("1");
      setNewOrderData(row);
    }
  };
  // show the item

  const showitemsandadditem = (row) => {
    console.log("order id shwofsdf", row);
    setMobile(row.tmobnum);
    setAddress(row.address);
    setDataOrderTypeeee("3");
    if (selectedRow === row.id) {
      setShowOrderList(!showOrderList);
      // setDataOrderTypeeee(showOrderList ? "1" : "2");
      setDataOrderTypeeee("3");
      // setNewOrderData(row);
    } else {
      setSelectedRow(row.id);
      setShowOrderList(true);
      setDataOrderTypeeee("3");
      setNewOrderData(row);
    }
  };

  useEffect(() => {
    if (newOrderData && newOrderData.id) {
      console.log(newOrderData.id, "newOrderData shwofsdf");
    }
    fetchMenuItems();
    dispatch(fetchPendingOrderlist());
  }, [newOrderData]);

  const resetTableNumber = () => {
    setSelectedTableIddd("");
  };

  const customScrollbarStyle = `
    ::-webkit-scrollbar {
      width: 0px;
    }

    ::-webkit-scrollbar-track {
      background: transparent;
    }

    ::-webkit-scrollbar-thumb {
      background-color: #888;
      border-radius: 6px;
    }
  `;

  ////////////////////////////////////////////  print modal////////////////////

  const [showPrintModal, setShowPrintModal] = useState(false);
  const [getmovedata, setmovedatatorecipe] = useState([]);

  const handleShowPrintModal = (row) => {
    fetchMenuItems();
    setNewOrderData(row);
    setmovedatatorecipe(row);
    console.log("row showOrderListshowOrderList", row.id);
  };
  const receiptRef = useRef(); // Use useRef instead of React.createRef

  const handlePrintClose = () => {
    //////// jab ma print modal close kro ga wab mara automatically reset ho ji ga
    setPriceDiscount(0);
    setPercentageDiscount(0);
    setTotalAmount(0);
    setShowPrintModal(false);
  };

  ///////////////////////////////////////////////////////////////////////////////
  ////////////////////////  show minus plus data in print ////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    setTotalAmount(tamtItems);
  }, [tamtItems]);
  // const [getpricepercentagediscount, setpicepercentagediscount] = useState("");

  const [perDicAmtt, setPerDicAmt] = useState("");

  const [priceDiscount, setPriceDiscount] = useState(0);
  const [percentageDiscount, setPercentageDiscount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(tamtItems);

  const [showPrice, setShowPrice] = useState(true);
  const [showPercentage, setShowPercentage] = useState(false);
  const handleToggle = (type) => {
    if (type === "price") {
      setShowPrice(true);
      setShowPercentage(false);
    } else if (type === "percentage") {
      setShowPrice(false);
      setShowPercentage(true);
    }
  };
  const [discountType, setDiscountType] = useState("fixed"); // 'fixed' or 'percentage'
  const [discountValue, setDiscountValue] = useState(0);
  const [getdiscountamount, setdiscountamount] = useState("0");

  const handleSubmit = () => {
    const numberInt = parseInt(tamtItems.replace(/,/g, ""), 10);
    let totalAfterDiscount = 0;

    if (discountType === "fixed") {
      if (discountValue < 0) {
        setAlertData({
          type: "error",
          message: "Negative value is not Acceptable",
        });
        setTimeout(() => {
          setAlertData(null);
        }, 2000);
        return; // Exit early if percentage value is invalid
      }
      totalAfterDiscount = numberInt - discountValue;
      setdiscountamount(discountValue);
    } else {
      const percentageAmount = (discountValue / 100) * numberInt;

      if (discountValue > 100) {
        setAlertData({
          type: "error",
          message: "Percentage value must be 100 or less.",
        });
        setTimeout(() => {
          setAlertData(null);
        }, 2000);
        return; // Exit early if percentage value is invalid
      } else if (discountValue < 0) {
        setAlertData({
          type: "error",
          message: "Negative value is not Acceptable",
        });
        setTimeout(() => {
          setAlertData(null);
        }, 2000);
        return; // Exit early if percentage value is invalid
      }

      setdiscountamount(percentageAmount);
      totalAfterDiscount = numberInt - percentageAmount;
    }

    setTotalAmount(totalAfterDiscount);
  };

  const [selectedCategory1, setSelectedCategory1] = useState("0");

  const [buttonLabel, setButtonLabel] = useState("Delivery");
  const handleButtonClickmodal = () => {
    if (selectedCategory1 === "1") {
      handleShowDeliveryModal();
    } else if (selectedCategory1 === "2") {
      handleShowDiningModal();
    } else if (selectedCategory1 === "3") {
      handleShowTakeAwayModal();
    } else if (selectedCategory1 === "4") {
      handleShowCarModal();
    }
  };
  const handleRadioChange1 = (e) => {
    setSelectedCategory1(e.target.value);
    if (e.target.value === "1") {
      setButtonLabel("Delivery");
      handleShowDeliveryModal();
    } else if (e.target.value === "2") {
      setButtonLabel("Dining");
      handleShowDiningModal();
    } else if (e.target.value === "3") {
      setButtonLabel("T_Away");
      handleShowTakeAwayModal();
    } else if (e.target.value === "4") {
      setButtonLabel("Car");
      handleShowCarModal();
    }
  };
  /////////////////////////////substracted amount from the taken amount //////////////////////////////////
  const [enteredAmount, setEnteredAmount] = useState(0);

  const [subtractedValue, setSubtractedValue] = useState(0);

  const handleAmountChange1 = (event) => {
    const { value } = event.target;
    setEnteredAmount(value);
    calculateSubtractedValue(value); // Call calculateSubtractedValue on amount change
  };

  const calculateSubtractedValue = (enteredAmount) => {
    const tamtItemsInt = parseInt(String(totalAmount).replace(/,/g, ""), 10);

    // Check if tamtItemsInt is a valid number
    if (!isNaN(tamtItemsInt)) {
      const subsractedvalue = enteredAmount - tamtItemsInt;
      setSubtractedValue(subsractedvalue);
      console.log("subtractedValue", subsractedvalue);

      console.log("tamtItems", tamtItemsInt);
      console.log("enteredAmount", enteredAmount);
    } else {
    }
  };

  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////  4 button in foter ////////////////////////////
  const buttonStyles = {
    backgroundColor: primaryColor,
    height: "35px",
    border: "none",
    fontWeight: "bold",
    fontSize: "13px",
    width: "100%",
    borderRadius: "0px",
    color: secondaryColor,
  };

  const buttonTexts = [
    "Move to Orders ==>>",
    "<<== Move to Item",
    "Move to Orders ==>>",
    "Move to Orders ==>>",
    "Move to Orders ==>>",
    "Move to Orders ==>>",
  ];

  const ResetButton = () => {
    setEnteredAmount(0);
    setDiscountValue("");
    setfilteredRowsss([]);
    setNewOrderData([]);
    setSubtractedValue(0);
  };

  /////////////////////////////////////////////////  Dining List

  const tableCellStyle = {
    backgroundColor: primaryColor,

    color: secondaryColor,
    fontWeight: "bold",
    position: "sticky",
    top: -1,
    zIndex: 1,
  };

  /////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////

  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  const handleShowCheckoutModal = () => {
    console.log("handleShowCheckoutModal");

    dispatch(fetchDiningOrderList());
    dispatch(fetchCarOrderList());
    dispatch(fetchDeliveryOrderList());
    setShowCheckoutModal(true);
  };
  const handleCheckoutClose = () => {
    console.log("handleCheckoutClose");
    setfilteredRowsss([]);
    setShowCheckoutModal(false);
    // setShowCheckoutModal(false);
    setDataOrderTypeeee("2");
    dispatch(fetchDiningOrderList());
    dispatch(fetchCarOrderList());
    dispatch(fetchPendingOrderlist());
    dispatch(fetchDeliveryOrderList());
  };
  const setShowCheckoutModalfun = () => {
    console.log("close the setShowCheckoutModalfun delivery modal");
    handleCheckoutClose();
    setShowCheckoutModal(false);
  };

  const savebuttonourdata = async (filteredRowsss, newOrderData) => {
    // dispatch(fetchKitchen());
    console.log(
      selectedWaiterId,
      "==========================================="
    );
    console.log("===========================================");
    console.log("===========================================");
    console.log(selectedCategory1, "savebuttonourdata savebuttonourdata");
    console.log("===========================================");
    console.log("===========================================");
    console.log("===========================================");

    setValues({
      loading: false,
    });
    try {
      if (!newOrderData) {
        setAlertData({
          type: "error",
          message: "You need to first check the orderid",
        });
        return;
      }

      const requestData = {
        ordtyp: selectedCategory1,
        waiter: selectedWaiterId,
        table: selectedwaiiiIdd,
        address: address,
        name: name,
        mobile: mobile,
        userid: 33,
        detail1: filteredRowsss.map((item) => {
          // const total = item.qty * item.saleRate;
          return {
            receipecode: item.receipecode || "",
            itemid: item.itemid,
            itemDec: item.itemDec,
            purRate: item.purRate,
            saleRate: item.saleRate,
            discount: item.discount || 0,
            qty: item.qty,
            total: item.total,
          };
        }),
      };
      console.log("requestDatrequestDatarequestDatarequestDataa", requestData);

      console.log("total amount", totalAmount);
      setfilteredRowsss((prevItems) => [...prevItems, requestData.detail1]);
      const response = await axios.post(
        `${apiLinks}/Order.php`,
        JSON.stringify(requestData),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log(response);
      console.log(requestData);
      setNewOrderData(response.data);
      // setfilteredRowsss([]);
      // console.log("add to save button click ", newOrderData);
      setName("");
      setMobile("");
      setAddress("");
      if (response.data.error === 200) {
        // setNewOrderData(response.data.orderId);

        setDiscountValue("");
        setSelectedCategory1([]);
        setSelectedCategory1("0");
        setWaiterNamedata("");
        setName("");
        setMobile("");
        setAddress("");
        setSelectedwaaaaaIddd("");
        setSelectedWaiterId("0");
        setfilteredRowsss([]);

        dispatch(fetchCarOrderList());
        dispatch(fetchDiningOrderList());
        dispatch(fetchDeliveryOrderList());
        // navigate("/MainPage");
        setfilteredRowsss([]);
        dispatch(fetchPendingOrderlist());

        // console.log(
        //   response.data.message,
        //   "add to save button click ",
        //   newOrderData
        // );
        setAlertData({
          type: "success",
          message: `${response.data.message}`,
        });
        setTimeout(() => {
          setAlertData(null);
        }, 1000);
      } else {
        setName("");
        setMobile("");
        setAddress("");
        // console.log(response.data.message);

        setAlertData({
          type: "error",
          message: `${response.data.message}`,
        });
        setTimeout(() => {
          setAlertData(null);
        }, 2000);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setValues((prevState) => ({
        ...prevState,
        loading: false,
      }));
    }
  };

  useEffect(() => {
    if (newOrderData !== null) {
      // console.log("New order data:", newOrderData);
    }
  }, [newOrderData]);
  const addtocartbuttonupdatedata = async (filteredRowsss) => {
    // dispatch(fetchKitchen());
    // console.log("addtocartbuttonupdatedata", newOrderData.id);

    const { quantity } = filteredRowsss;
    setValues({
      loading: false,
      // Add other default values as needed
    });
    try {
      if (newOrderData && newOrderData.id === null) {
        setAlertData({
          type: "error",
          message: "You need to first check the orderid",
        });
        return; // Exit the function early
      }
      // Prepare the data to be sent in the request
      const requestData = {
        orderid: newOrderData.id,

        detail1: filteredRowsss.map((item) => {
          // const total = item.qty * item.saleRate;
          return {
            itemid: item.itemid,
            itemDec: item.itemDec,
            purRate: item.purRate,
            saleRate: item.saleRate,
            disRate: item.disRate,
            qty: item.qty,
            discount: item.discount || 0,
            total: item.total,
            remarks: item.remarks,
          };
        }),
      };
      // console.log("requestDatrequestDatarequestDatarequestDataa", requestData);

      // console.log("newOrderData.id newOrderData.id", newOrderData.id);

      const response = await axios.post(
        `${apiLinks}/Add_Cart.php`,
        JSON.stringify(requestData),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      // console.log(response);
      // console.log(requestData);
      // console.log("tablel id", selectedTableIdd);

      if (response.data.error === 200) {
        dispatch(fetchCarOrderList());
        dispatch(fetchDiningOrderList());
        dispatch(fetchDeliveryOrderList());
        fetchMenuItems();
        dispatch(fetchPendingOrderlist());
        setDiscountValue("");

        setfilteredRowsss([]);
        // console.log(response.data.message);
        setAlertData({
          type: "success",
          message: `${response.data.message}`,
        });
        setTimeout(() => {
          setAlertData(null);
          dispatch(fetchPendingOrderlist());
        }, 1000);
      } else if (response.data.error === 404) {
        setAlertData({
          type: "error",
          message: "You need to check the type of order",
        });
        setTimeout(() => {
          setAlertData(null);
          dispatch(fetchPendingOrderlist());
        }, 1000);
        return; // Exit the function early
      } else {
        dispatch(fetchCarOrderList());
        dispatch(fetchDiningOrderList());
        dispatch(fetchDeliveryOrderList());
        fetchMenuItems();
        dispatch(fetchPendingOrderlist());
        setfilteredRowsss([]);
        // console.log(response.data.message);

        setAlertData({
          type: "error",
          message: `${response.data.error}`,
        });
        setTimeout(() => {
          setAlertData(null);
        }, 2000);
      }
    } catch (error) {
      // console.error("Error:", error);
    } finally {
      setValues((prevState) => ({
        ...prevState,
        loading: false,
      }));
    }
  };

  const receiveCarOrderValues = (values) => {
    setName(values.namee);
    // console.log("valuesvaluesvalues", values.namee);
  };
  const formatAmountWithCommas = (amount) => {
    const parsedAmount = parseFloat(amount);

    if (isNaN(parsedAmount)) {
      return "";
    }

    const parts = parsedAmount.toFixed(2).toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return parts.join(".");
  };

  const [hoveredRow, setHoveredRow] = useState(null);

  const handleMouseEnter = (row) => {
    setHoveredRow(row);
  };

  const handleMouseLeave = () => {
    setHoveredRow(null);
  };
  return (
    <>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          backgroundColor: "#FFEB79",
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

        <div className="row">
          <div className="col-4">
            <Row>
              <Col
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                style={{
                  textAlign: "center",
                  fontSize: "11px",
                  margin: "12px",
                }}
              >
                <FormControl
                  component="fieldset"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <RadioGroup
                    aria-label="categoryIdd"
                    name="categoryIdd"
                    value={selectedCategory1}
                    onChange={handleRadioChange1}
                    style={{ flexDirection: "row" }}
                  >
                    <Row>
                      {[1, 2, 3].map((value) => (
                        <Col key={value} xs={2} sm={2} md={2} lg={2} xl={2}>
                          <FormControlLabel
                            value={value.toString()}
                            control={<Radio />}
                            label={
                              <Typography
                                variant="body2"
                                style={{ fontSize: "12px" }}
                                className={
                                  selectedCategory1 === value.toString()
                                    ? "selected-label"
                                    : ""
                                }
                              >
                                {value === 1 && "Delivery"}
                                {value === 2 && "Dining"}
                                {value === 3 && "T_Away"}
                                {/* {value === 4 && "Car"} */}
                              </Typography>
                            }
                          />
                        </Col>
                      ))}
                      <Col
                        xs={4}
                        sm={4}
                        md={4}
                        lg={4}
                        xl={4}
                        style={{
                          textAlign: "center",
                          fontSize: "11px",
                        }}
                      >
                        <Button
                          onClick={handleButtonClickmodal}
                          style={{
                            backgroundColor: primaryColor,
                            color: secondaryColor,
                            borderRadius: "0px",
                            width: "100px",
                          }}
                        >
                          {buttonLabel}
                        </Button>
                      </Col>
                    </Row>
                  </RadioGroup>
                </FormControl>
              </Col>
              <Row>
                <Col>
                  {
                    getwaiternamedata == 1
                      ? "ADNAN"
                      : getwaiternamedata == 2
                      ? "IMRAN"
                      : getwaiternamedata == 3
                      ? "HAMZA"
                      : getwaiternamedata == 4
                      ? "BAJWA"
                      : getwaiternamedata == 5
                      ? "ARSALAN"
                      : "Waiter:"

                    // : `Waiter: ${getwaiternamedata}`
                  }
                </Col>

                {/* <Col>{`Name: ${getwaiternamedata}`}</Col> */}
                <Col>{`Table#:${selectedwaiiiIdd} `}</Col>
                {/* // create a circle red color show in that center orderid
                 */}
                <Col
                  style={{
                    backgroundColor: "red",
                    borderRadius: "50px",
                    color: "white",
                  }}
                >{`Order#:${newOrderData.id}`}</Col>
              </Row>
              {/* //////////////////////DELEIVERY ORDER///////////////////////////////////////// */}
              <OrderDeliveryModal
                show={showDeliveryModal}
                onHide={handleDeliveryClose}
                handleNewOrderClick={handleNewOrderClick}
                getWaiter={getWaiter}
                selectedWaiterId={selectedWaiterId}
                handleWaiterChange1={handleWaiterChange1}
              />

              {/* //////////////////////DINING ORDER///////////////////////////////////////// */}

              <DiningOrderModal
                show={showDiningModal}
                onHide={handleDiningClose}
                handleNewOrderClick={handleNewOrderClickdining}
                getWaiter={getWaiter}
                handleWaiterChange1={handleWaiterChange1}
                getTable={getTable}
                selectedWaiterId={selectedWaiterId}
                handleTableChange1={handleTableChange1}
              />
              {/* //////////////////////CAR ORDER///////////////////////////////////////// */}
              <CarOrderModal
                show={showCarModal}
                onHide={handleCarClose}
                handleNewOrderClickCar={handleNewOrderClickCar}
                getWaiter={getWaiter}
                handleWaiterChange1={handleWaiterChange1}
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
                selectedWaiterId={selectedWaiterId}
                receiveCarOrderValues={receiveCarOrderValues} // Pass the function as a prop
              />
              {/* //////////////////////Take Away ORDER///////////////////////////////////////// */}

              <TakeAwayOrderModal
                show={showTakeAwayModal}
                onHide={handleTakeAwayClose}
                handleNewOrderClick={handleNewOrderClickTakeAway}
                getWaiter={getWaiter}
                selectedWaiterId={selectedWaiterId}
                handleWaiterChange1={handleWaiterChange1}

                // show={showTakeAwayModal}
                // onHide={handleTakeAwayClose}
                // handleNewOrderClickTakeAway={handleNewOrderClickTakeAway}
                // getWaiter={getWaiter}
                // handleWaiterChange1={handleWaiterChange1}
                // primaryColor={primaryColor}
                // secondaryColor={secondaryColor}
                // selectedWaiterId={selectedWaiterId}
                // receiveCarOrderValues={receiveCarOrderValues} // Pass the function as a prop
              />
            </Row>
            {/* JSON VARIABLE WITH  */}
            {dataOrderType === "2" && (
              <div
                style={{
                  overflowY: "scroll",
                  fontSize: "12px",
                  overflow: "hidden",
                }}
              >
                <style>{customScrollbarStyle}</style>
                <MDBTable
                  scrollY
                  maxHeight="85vh"
                  striped
                  bordered
                  small
                  responsive
                >
                  <MDBTableHead>
                    <tr
                      style={{
                        position: "sticky",
                        top: 0,
                        zIndex: 1,
                      }}
                    >
                      <th
                        style={{
                          backgroundColor: primaryColor,
                          color: secondaryColor,
                          fontWeight: "bold",
                          width: "60px", // Adjust width as needed
                        }}
                      >
                        Delete
                      </th>
                      <th
                        style={{
                          backgroundColor: primaryColor,
                          color: secondaryColor,
                          fontWeight: "bold",
                          width: "120px", // Adjust width as needed
                        }}
                      >
                        Item
                      </th>

                      <th
                        style={{
                          backgroundColor: primaryColor,
                          color: secondaryColor,
                          fontWeight: "bold",
                          width: "100px", // Adjust width as needed
                        }}
                      >
                        Price
                      </th>
                      <th
                        style={{
                          backgroundColor: primaryColor,
                          color: secondaryColor,
                          fontWeight: "bold",
                          width: "10px", // Adjust width as needed
                        }}
                      >
                        Qty
                      </th>
                      <th
                        style={{
                          backgroundColor: primaryColor,
                          color: secondaryColor,
                          fontWeight: "bold",
                          width: "30px", // Adjust width as needed
                        }}
                      >
                        Dis
                      </th>
                      <th
                        style={{
                          backgroundColor: primaryColor,
                          color: secondaryColor,
                          fontWeight: "bold",
                          width: "90px",
                        }}
                      >
                        Total
                      </th>
                    </tr>
                  </MDBTableHead>

                  <MDBTableBody>
                    {filteredRowsss.map((item, index) => {
                      const row = {
                        rowNumber: rowNumber + index + 1, // Calculate row number
                        ...item, // Include other row data
                      };

                      return (
                        <tr key={index}>
                          <td>
                            <img
                              onClick={() => handleImageClick(index)}
                              src={Bin}
                              alt="delete"
                              style={{ width: "15px", height: "12px" }}
                            />
                          </td>
                          <td style={{ width: "100%", textAlign: "left" }}>
                            {item.itemDec}
                          </td>

                          <td style={{ textAlign: "right" }}>
                            {item.saleRate}
                          </td>
                          <td style={{ textAlign: "right" }}>
                            <input
                              type="number"
                              style={{ width: "50px", textAlign: "center" }}
                              value={item.qty}
                              onChange={(e) =>
                                handleQuantityChange111(index, e.target.value)
                              }
                            />
                          </td>
                          <td style={{ textAlign: "right" }}>
                            <input
                              type="text"
                              style={{ width: "50px", textAlign: "right" }}
                              value={item.discount}
                              onChange={(e) =>
                                handleDiscountChange(index, e.target.value)
                              }
                            />
                          </td>
                          <td style={{ textAlign: "right" }}>{item.total}</td>
                          {/* <td>
                            <input
                              type="remarks"
                              style={{ width: "50px", textAlign: "center" }}
                              value={item.remarks}
                              onChange={(e) =>
                                handleRemarksChange(index, e.target.value)
                              }
                            />
                          </td> */}
                        </tr>
                      );
                    })}

                    {Array.from({
                      length: Math.max(0, 23 - filteredRowsss.length),
                    }).map((_, index) => (
                      <tr key={`blank-${index}`}>
                        {Array.from({ length: 6 }).map((_, colIndex) => (
                          <td key={`blank-${index}-${colIndex}`}>&nbsp;</td>
                        ))}
                      </tr>
                    ))}

                    {/* //////////////////////////////////////// DELETE MODAL //////////////////////////// */}
                    <Modal
                      show={showModal}
                      onHide={handleClose}
                      centered
                      style={{
                        backgroundColor: "rgba(0, 0, 0, 0.1) !important",
                      }}
                    >
                      <Modal.Header
                        closeButton
                        style={{
                          backgroundColor: primaryColor,
                          color: secondaryColor,
                        }}
                      >
                        <Modal.Title>Deleted!</Modal.Title>
                      </Modal.Header>

                      <Modal.Body>
                        <p>Are you sure you want to delete this item?</p>
                      </Modal.Body>

                      <Modal.Footer>
                        <Button
                          variant="secondary"
                          onClick={handleClose}
                          style={{
                            backgroundColor: primaryColor,
                            color: secondaryColor,
                            borderRadius: "0px",
                          }}
                        >
                          No
                        </Button>
                        <Button
                          variant="danger"
                          onClick={handleDeleteItem}
                          style={{
                            backgroundColor: primaryColor,
                            color: secondaryColor,
                            borderRadius: "0px",
                          }}
                        >
                          Yes, Delete
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </MDBTableBody>
                  <MDBTableFoot
                    style={{ position: "sticky", bottom: 0, zIndex: 8 }}
                  >
                    <tr>
                      <th
                        style={{
                          backgroundColor: primaryColor,
                          color: secondaryColor,

                          textAlign: "left",
                        }}
                      ></th>
                      <th
                        style={{
                          backgroundColor: primaryColor,
                          color: secondaryColor,
                          textAlign: "center",
                        }}
                      >
                        {/* i want orderid select nhi ki hui tu ya wala buttton show ho otherwise dosra */}
                        <button
                          style={{
                            width: "50%",
                            backgroundColor: secondaryColor,
                            color: primaryColor,
                            borderRadius: "5px",
                            border: "none",
                            cursor: "pointer",
                            fontSize: "12px",
                          }}
                          onClick={() => {
                            if (newOrderData.id > 0) {
                              addtocartbuttonupdatedata(filteredRowsss);
                            } else if (newOrderData.id === undefined) {
                              if (
                                selectedCategory1 === "0" &&
                                selectedWaiterId === "0"
                              ) {
                                setAlertData({
                                  type: "error",
                                  message: `You need to select the waiter and table`,
                                });
                                setTimeout(() => {
                                  setAlertData(null);
                                }, 1000);
                              } else {
                                savebuttonourdata(filteredRowsss, newOrderData);
                              }
                            }
                          }}
                        >
                          Save
                        </button>
                        {/* <button
                          style={{
                            width: "50%",
                            backgroundColor: secondaryColor,
                            color: primaryColor,
                            borderRadius: "5px",
                            border: "none",
                            cursor: "pointer",
                            fontSize: "12px",
                          }}
                          onClick={() => {
                          }}
                        >
                          Add
                        </button> */}
                      </th>

                      <th
                        style={{
                          backgroundColor: primaryColor,
                          color: secondaryColor,

                          textAlign: "left",
                        }}
                      ></th>

                      <th
                        style={{
                          backgroundColor: primaryColor,
                          color: secondaryColor,
                        }}
                      >
                        {totalQuantityCart}
                      </th>
                      <th
                        style={{
                          backgroundColor: primaryColor,
                          color: secondaryColor,

                          textAlign: "left",
                        }}
                      ></th>
                      <th
                        style={{
                          backgroundColor: primaryColor,
                          color: secondaryColor,
                        }}
                      >
                        {totalAmountCart}
                      </th>
                      {/* <th
                        style={{
                          backgroundColor: primaryColor,
                          color: secondaryColor,
                        }}
                      ></th> */}
                    </tr>
                  </MDBTableFoot>
                </MDBTable>
              </div>
            )}
            {dataOrderType === "3" && (
              // cart item table
              <>
                <div
                  style={{
                    overflowY: "scroll",
                    fontSize: "12px",
                    overflow: "hidden",
                  }}
                >
                  <style>{customScrollbarStyle}</style>
                  <MDBTable
                    scrollY
                    maxHeight="62vh"
                    striped
                    bordered
                    small
                    responsive
                  >
                    <MDBTableHead>
                      <tr
                        style={{
                          position: "sticky",
                          top: 0,
                          zIndex: 1,
                        }}
                      >
                        <th
                          style={{
                            backgroundColor: primaryColor,
                            color: secondaryColor,
                            fontWeight: "bold",
                            width: "150px", // Adjust width as needed
                          }}
                        >
                          Sr.
                        </th>
                        <th
                          style={{
                            backgroundColor: primaryColor,
                            color: secondaryColor,
                            fontWeight: "bold",
                            width: "120px", // Adjust width as needed
                          }}
                        >
                          Item
                        </th>

                        <th
                          style={{
                            backgroundColor: primaryColor,
                            color: secondaryColor,
                            fontWeight: "bold",
                            width: "100px", // Adjust width as needed
                          }}
                        >
                          Price
                        </th>
                        <th
                          style={{
                            backgroundColor: primaryColor,
                            color: secondaryColor,
                            fontWeight: "bold",
                            width: "50px", // Adjust width as needed
                          }}
                        >
                          Qty
                        </th>
                        <th
                          style={{
                            backgroundColor: primaryColor,
                            color: secondaryColor,
                            fontWeight: "bold",
                            width: "30px", // Adjust width as needed
                          }}
                        >
                          Dis
                        </th>
                        <th
                          style={{
                            backgroundColor: primaryColor,
                            color: secondaryColor,
                            fontWeight: "bold",
                            width: "90px",
                          }}
                        >
                          Total
                        </th>
                        <th
                          style={{
                            backgroundColor: primaryColor,
                            color: secondaryColor,
                            fontWeight: "bold",
                            width: "90px",
                          }}
                        >
                          -
                        </th>
                      </tr>
                    </MDBTableHead>

                    <MDBTableBody>
                      {filteredRows.map((item, index) => {
                        const row = {
                          rowNumber: rowNumber + index + 1, // Calculate row number
                          ...item, // Include other row data
                        };

                        return (
                          <tr key={index}>
                            <td style={{ width: "1%" }}>{index + 1}</td>
                            <td style={{ width: "100%", textAlign: "left" }}>
                              {item.titmdsc}
                            </td>
                            <td>{item.tsalrat}</td>
                            <td>{item.titmqnt}</td>
                            <td>{item.discount}</td>
                            <td>{item.salamt}</td>
                            <td>
                              <i
                                class="fas fa-trash-alt"
                                onClick={() => {
                                  handleDeleteCartRow(row);
                                }}
                              ></i>
                            </td>
                          </tr>
                        );
                      })}

                      {Array.from({
                        length: Math.max(
                          0,
                          Math.floor((100 * window.innerHeight) / 100) / 33
                        ),
                      }).map((_, index) => (
                        <tr key={`blank-${index}`}>
                          {Array.from({
                            length: 7,
                          }).map((_, colIndex) => (
                            <td key={`blank-${index}-${colIndex}`}>&nbsp;</td>
                          ))}
                        </tr>
                      ))}
                    </MDBTableBody>
                    <MDBTableFoot
                      style={{ position: "sticky", bottom: 0, zIndex: 2 }}
                    >
                      <tr>
                        <th
                          style={{
                            backgroundColor: primaryColor,
                            color: secondaryColor,
                          }}
                        ></th>
                        <th
                          style={{
                            backgroundColor: primaryColor,
                            color: secondaryColor,

                            textAlign: "left",
                          }}
                        ></th>

                        <th
                          style={{
                            backgroundColor: primaryColor,
                            color: secondaryColor,
                          }}
                        ></th>
                        <th
                          style={{
                            backgroundColor: primaryColor,
                            color: secondaryColor,
                            textAlign: "center",
                          }}
                        >
                          {totalItemmm}
                        </th>
                        <th
                          style={{
                            backgroundColor: primaryColor,
                            color: secondaryColor,
                          }}
                        ></th>
                        <th
                          style={{
                            backgroundColor: primaryColor,
                            color: secondaryColor,
                          }}
                        >
                          {" "}
                          {tamtItems}
                        </th>
                        <th
                          style={{
                            backgroundColor: primaryColor,
                            color: secondaryColor,
                          }}
                        ></th>
                      </tr>
                    </MDBTableFoot>
                  </MDBTable>
                </div>

                <div
                  className="row fixed-bottom"
                  style={{
                    marginBottom: "15.3vh",
                    fontSize: "12px",
                    marginRight: "67%",
                  }}
                >
                  <div className="col-7">
                    <table>
                      <tbody style={{ textAlign: "right" }}>
                        <tr>
                          <td>
                            <button
                              style={{
                                // backgroundColor: primaryColor,
                                color: showPrice ? "white" : secondaryColor,
                                fontSize: "12px",
                                height: "30px",
                                width: "100%",
                                border: "none",
                                borderRadius: "0px",
                                background: showPrice ? "green" : primaryColor, // Change background color if showPrice is true
                              }}
                              onClick={() => {
                                handleToggle("price");
                                setDiscountType("fixed");
                              }}
                            >
                              Fixed
                            </button>
                          </td>

                          <td>
                            <button
                              style={{
                                backgroundColor: primaryColor,
                                color: showPrice ? secondaryColor : "black",
                                fontSize: "12px",
                                height: "30px",
                                width: "100%",
                                border: "none",
                                borderRadius: "0px",
                                background: showPercentage
                                  ? "green"
                                  : primaryColor,
                              }}
                              onClick={() => {
                                handleToggle("percentage");
                                setDiscountType("percentage");
                              }}
                            >
                              Percentage
                            </button>
                          </td>

                          <td>
                            <input
                              type="number"
                              style={{ width: "80px", textAlign: "center" }}
                              value={discountValue}
                              onChange={(e) => setDiscountValue(e.target.value)}
                              placeholder={
                                discountType === "fixed"
                                  ? "Enter fixed discount"
                                  : "Enter percentage discount"
                              }
                            />
                          </td>
                          <td>
                            <button onClick={handleSubmit}>Calculate</button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="col-4 offset-1">
                    <button
                      className="btn btn-primary"
                      style={{
                        backgroundColor: "#f4511e",
                        height: "35px",
                        border: "none",
                        opacity: "0.8",
                        fontWeight: "bold",
                        fontSize: "11px",
                        width: "100%",
                        color: "black",
                        borderRadius: "0px",
                      }}
                    >
                      Payable : {totalAmount}
                    </button>
                  </div>
                </div>
                <div
                  className="row fixed-bottom"
                  style={{ marginBottom: "9.5vh", marginRight: "67%" }}
                >
                  <div className="col-6">
                    <button
                      className="btn btn-primary"
                      placeholder="Amount Return"
                      disabled={true}
                      style={{
                        border: "none",
                        backgroundColor: "blue",
                        height: "35px",
                        fontSize: "16px",
                        color: "white",
                        opacity: "0.7",
                        width: "100%",
                        borderRadius: "0px",
                      }}
                    >
                      Amt Return: {subtractedValue}
                    </button>
                  </div>
                  <div className="col-6">
                    <input
                      type="text"
                      value={enteredAmount}
                      onChange={handleAmountChange1}
                      placeholder="Amount Taken"
                      className="btn btn-primary"
                      style={{
                        border: "none",
                        backgroundColor: "blue",
                        height: "35px",
                        fontSize: "16px",
                        fontWeight: primaryColor,
                        color: "white",
                        opacity: "0.6",
                        borderRadius: "0px",

                        width: "100%",
                      }}
                    />
                  </div>
                </div>
                <div
                  className="row fixed-bottom"
                  style={{ marginBottom: "4vh", marginRight: "67%" }}
                >
                  <div className="col-9">
                    <button
                      onClick={handleShowCheckoutModal}
                      className="btn btn-primary"
                      style={{
                        backgroundColor: "#f4511e",
                        height: "35px",
                        border: "none",
                        opacity: "0.8",
                        fontWeight: "bold",
                        fontSize: "13px",
                        width: "100%",
                        borderRadius: "0px",

                        color: "black",
                      }}
                    >
                      Save
                    </button>
                  </div>
                  <CheckoutModal
                    totalItem={totalItemmm}
                    tamtItems={tamtItems}
                    getpayable={getpayable}
                    getdiscountamount={getdiscountamount}
                    totalAmount={totalAmount}
                    show={showCheckoutModal}
                    onHide={handleCheckoutClose}
                    orderid={newOrderData.id}
                    setShowCheckoutModalfun={setShowCheckoutModalfun}
                    // setShowCheckoutModal(false);
                  />
                  <div className="col-3">
                    <button
                      className="btn btn-primary"
                      onClick={ResetButton}
                      style={{
                        backgroundColor: "red",
                        height: "35px",
                        border: "none",
                        opacity: "0.8",
                        fontWeight: "bold",
                        borderRadius: "0px",

                        fontSize: "13px",
                        width: "100%",
                        color: "white",
                      }}
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="col-8">
            <div
              className="menu-container"
              style={{
                display: "flex",
                alignItems: "end",
                justifyContent: "end",
                marginTop: "12px",
                marginRight: "20px",
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
                  <div onClick={() => handleNavigation("/Get_Item")}>
                    Item Maintenance
                  </div>
                  <div onClick={() => handleNavigation("/Get_Category")}>
                    Category Maintenance
                  </div>
                  <div onClick={() => handleNavigation("/Get_Table")}>
                    Table Maintenance
                  </div>
                  <div onClick={() => handleNavigation("/Get_Waiter")}>
                    Waiter Maintenance
                  </div>
                  <div onClick={() => handleNavigation("/Daily_Sale_Report")}>
                    Daily Sale Report
                  </div>
                  <hr style={{ borderTop: "1px solid black" }} />
                  <div onClick={() => handleNavigation("/MainPage")}>Exit</div>
                </div>
              )}
            </div>
            {/* category or item ka code */}
            {dataOrderType1 === "1" && (
              <>
                <div className="row">
                  <div
                    className="col-3"
                    style={{
                      maxHeight: "87vh",
                      overflowY: "auto",
                      overflowX: "hidden",
                    }}
                  >
                    <style>{customScrollbarStyle}</style>
                    {/* <br /> */}
                    <Row>
                      {categorydata.data && (
                        <Row>
                          {categorydata.data.map((item) => (
                            <Col
                              key={item.tctgid}
                              xs={12}
                              sm={12}
                              md={12}
                              lg={12}
                              xl={12}
                            >
                              <CategoryCard
                                categoryId={item}
                                handleCategoryClick={handleCategoryClick}
                                isSelected={categoryId === item.tctgid}
                              />
                            </Col>
                          ))}
                        </Row>
                      )}
                    </Row>
                  </div>

                  <div
                    className="col-9"
                    style={{
                      maxHeight: "93vh",
                      overflowY: "auto",
                      overflowX: "hidden",
                    }}
                  >
                    {/* <br /> */}
                    <div
                      className={`cards ${
                        filteredDataItem.length > 0
                          ? "cards-large"
                          : "cards-small"
                      }`}
                    >
                      <Row xs={12} sm={6} md={4} lg={3} xl={3}>
                        {filteredDataItem.map((row, index) => (
                          <Col
                            key={index}
                            style={{ marginBottom: "4px" }}
                            xs={12}
                            sm={6}
                            md={6}
                            lg={6}
                            xl={6}
                          >
                            <Card
                              className="animated-card"
                              style={{
                                backgroundColor: "#f7e49e",
                                borderRadius: "15px",
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                height: "26vh",
                                width: "330px",
                                overflow: "hidden",
                              }}
                            >
                              <Card.Title
                                className="text-center d-flex justify-content-center align-items-center"
                                style={{
                                  height: "6vh",
                                  backgroundColor: primaryColor, // Reddish primary color
                                  color: secondaryColor, // White text color
                                  borderRadius: "15px 15px 0 0", // Rounded top corners
                                }}
                              >
                                {row.dscription}
                              </Card.Title>

                              <Card.Body>
                                <Row>
                                  <Col xs={8}>
                                    {row.amount1 === "0" ? (
                                      ""
                                    ) : (
                                      <Row
                                        style={{
                                          marginTop: "1%",
                                          fontSize: "11px",
                                        }}
                                      >
                                        <Col
                                          xs={9}
                                          style={{
                                            textAlign: "left",
                                            // fontWeight: "bold",
                                          }}
                                        >
                                          <div
                                            style={{
                                              display: "flex",
                                              justifyContent: "space-between",
                                            }}
                                          >
                                            <span
                                              style={{ fontWeight: "bold" }}
                                            >
                                              {row.dscription1}
                                            </span>
                                            <span>
                                              {formatAmountWithCommas(
                                                row.amount1
                                              )}
                                            </span>
                                          </div>
                                        </Col>

                                        <Col xs={3}>
                                          <Button
                                            variant="contained"
                                            style={{
                                              fontSize: "11px",
                                              height: "23px",
                                              backgroundColor: primaryColor, // Reddish primary color
                                              color: secondaryColor, // White text color
                                              borderRadius: "8px", // Rounded corners
                                            }}
                                            onClick={() =>
                                              handleAddToCart(
                                                row,
                                                row.amount1,
                                                row.dscription1
                                              )
                                            }
                                          >
                                            Add
                                          </Button>
                                        </Col>
                                      </Row>
                                    )}
                                    {row.amount2 === "0" ? (
                                      ""
                                    ) : (
                                      <Row
                                        style={{
                                          marginTop: "1%",
                                          fontSize: "11px",
                                        }}
                                      >
                                        <Col
                                          xs={9}
                                          style={{
                                            textAlign: "left",
                                            // fontWeight: "bold",
                                          }}
                                        >
                                          <div
                                            style={{
                                              display: "flex",
                                              justifyContent: "space-between",
                                            }}
                                          >
                                            <span
                                              style={{ fontWeight: "bold" }}
                                            >
                                              {row.dscription2}
                                            </span>
                                            <span>
                                              {formatAmountWithCommas(
                                                row.amount2
                                              )}
                                            </span>
                                          </div>
                                          {/* {row.dscription2} */}
                                        </Col>
                                        {/* <Col
                                          xs={5}
                                          style={{ textAlign: "right" }}
                                        >
                                          {formatAmountWithCommas(row.amount2)}
                                        </Col> */}
                                        <Col xs={3}>
                                          <Button
                                            variant="contained"
                                            style={{
                                              fontSize: "11px",
                                              height: "23px",
                                              backgroundColor: primaryColor, // Reddish primary color
                                              color: secondaryColor, // White text color
                                              borderRadius: "8px", // Rounded corners
                                            }}
                                            onClick={() =>
                                              handleAddToCart(
                                                row,
                                                row.amount2,
                                                row.dscription2
                                              )
                                            }
                                          >
                                            Add
                                          </Button>
                                        </Col>
                                      </Row>
                                    )}
                                    {row.amount3 === "0" ? (
                                      ""
                                    ) : (
                                      <Row
                                        style={{
                                          marginTop: "1%",
                                          fontSize: "11px",
                                        }}
                                      >
                                        <Col
                                          xs={9}
                                          style={{
                                            textAlign: "left",
                                            // fontWeight: "bold",
                                          }}
                                        >
                                          <div
                                            style={{
                                              display: "flex",
                                              justifyContent: "space-between",
                                            }}
                                          >
                                            <span
                                              style={{ fontWeight: "bold" }}
                                            >
                                              {row.dscription3}
                                            </span>
                                            <span>
                                              {formatAmountWithCommas(
                                                row.amount3
                                              )}
                                            </span>
                                          </div>
                                        </Col>
                                        {/* <Col
                                          xs={4}
                                          style={{ textAlign: "right" }}
                                        >
                                          {formatAmountWithCommas(row.amount3)}
                                        </Col> */}
                                        <Col xs={3}>
                                          <Button
                                            variant="contained"
                                            style={{
                                              fontSize: "11px",
                                              height: "23px",
                                              backgroundColor: primaryColor, // Reddish primary color
                                              color: secondaryColor, // White text color
                                              borderRadius: "8px", // Rounded corners
                                            }}
                                            onClick={() =>
                                              handleAddToCart(
                                                row,
                                                row.amount3,
                                                row.dscription3
                                              )
                                            }
                                          >
                                            Add
                                          </Button>
                                        </Col>
                                      </Row>
                                    )}
                                    {row.amount4 === "0" ? (
                                      ""
                                    ) : (
                                      <Row
                                        style={{
                                          marginTop: "1%",
                                          fontSize: "11px",
                                        }}
                                      >
                                        <Col
                                          xs={9}
                                          style={{
                                            textAlign: "left",
                                            // fontWeight: "bold",
                                          }}
                                        >
                                          <div
                                            style={{
                                              display: "flex",
                                              justifyContent: "space-between",
                                            }}
                                          >
                                            <span
                                              style={{ fontWeight: "bold" }}
                                            >
                                              {row.dscription4}
                                            </span>
                                            <span>
                                              {formatAmountWithCommas(
                                                row.amount4
                                              )}
                                            </span>
                                          </div>
                                        </Col>
                                        {/* <Col
                                          xs={4}
                                          style={{ textAlign: "right" }}
                                        >
                                          {formatAmountWithCommas(row.amount4)}
                                        </Col> */}
                                        <Col xs={3}>
                                          <Button
                                            variant="contained"
                                            style={{
                                              fontSize: "11px",
                                              height: "23px",
                                              backgroundColor: primaryColor, // Reddish primary color
                                              color: secondaryColor, // White text color
                                              borderRadius: "8px", // Rounded corners
                                            }}
                                            onClick={() =>
                                              handleAddToCart(
                                                row,
                                                row.amount4,
                                                row.dscription4
                                              )
                                            }
                                          >
                                            Add
                                          </Button>
                                        </Col>
                                      </Row>
                                    )}
                                  </Col>

                                  <Col xs={4}>
                                    <div
                                      onMouseEnter={() => handleMouseEnter(row)}
                                      onMouseLeave={handleMouseLeave}
                                      style={{ position: "relative" }}
                                    >
                                      {hoveredRow === row && (
                                        <div
                                          style={{
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            width: "115%",
                                            height: "115%",
                                            backgroundColor: "#ff9999", // Light reddish background color
                                            zIndex: 1,
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            borderRadius: "15px", // Rounded corners
                                            boxShadow:
                                              "0 4px 8px rgba(0, 0, 0, 0.2)", // Slight shadow
                                          }}
                                        >
                                          <p
                                            style={{
                                              fontSize: "10px",
                                              fontWeight: "bold",
                                              color: "black",
                                            }}
                                          >
                                            {/* Render dynamic lines */}
                                            {[1, 2, 3, 4].map(
                                              (lineNum) =>
                                                row[`line${lineNum}`] && (
                                                  <React.Fragment key={lineNum}>
                                                    {row[`line${lineNum}`]}
                                                    <br />
                                                  </React.Fragment>
                                                )
                                            )}
                                          </p>
                                        </div>
                                      )}
                                      <Card.Img
                                        variant="top"
                                        src={imageurlitem + row.TItmPic}
                                        style={{
                                          height: "100px",
                                          borderRadius: "15px",
                                        }} // Rounded corners for the image
                                      />
                                    </div>
                                  </Col>
                                </Row>
                              </Card.Body>
                            </Card>
                          </Col>
                        ))}
                      </Row>
                    </div>
                  </div>
                </div>
              </>
            )}
            {/* //card item table and print code */}
            {dataOrderType1 === "2" && (
              // Order list
              <div>
                <div
                  style={{
                    overflowY: "auto",
                    overflowX: "hidden",
                    fontSize: "11px",
                    maxHeight: "88vh",
                  }}
                >
                  <style>{customScrollbarStyle}</style>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead style={{ height: "24px" }}>
                      <tr>
                        {getorderlist.columns.map((column, columnIndex) => (
                          <th
                            key={columnIndex}
                            style={{
                              backgroundColor: primaryColor,
                              color: secondaryColor,
                              fontWeight: "bold",
                              position: "sticky",
                              textAlign: "center",
                              top: 0,
                              zIndex: 1,
                              height: "24px",
                              padding: "8px",
                              border: "1px solid #ddd",
                            }}
                          >
                            {column.label}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {getorderlist.rows.map((row, index) => (
                        <tr key={index} style={{ backgroundColor: "white" }}>
                          <td style={{ width: "1%" }}>{row.id}</td>
                          <td style={{ textAlign: "left", width: "20%" }}>
                            {row.tcstnam}
                          </td>

                          <td style={{ textAlign: "right", width: "3%" }}>
                            {row.tmobnum}
                          </td>
                          <td style={{ textAlign: "left" }}>{row.w_name}</td>
                          <td style={{ textAlign: "center" }}>{row.dvdsc}</td>
                          <td style={{ textAlign: "right" }}>{row.totalAmt}</td>
                          <td>
                            <button
                              className="btn btn-primary"
                              onClick={() => showitemsandadditem(row)}
                              style={{
                                backgroundColor: primaryColor,
                                height: "24px",
                                fontSize: "11px",
                                color: secondaryColor,
                                width: "100%",
                                borderRadius: "0px",
                              }}
                            >
                              Show Data
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-primary"
                              onClick={() => showcartitemlist(row)}
                              style={{
                                backgroundColor: primaryColor,
                                height: "24px",
                                fontSize: "11px",
                                color: secondaryColor,
                                width: "100%",
                                borderRadius: "0px",
                              }}
                            >
                              Add Item
                            </button>
                          </td>
                          <td>
                            <ReactToPrint
                              bodyClass="print-receipt"
                              content={() => ref && ref.current}
                              trigger={() => (
                                <div>
                                  <img
                                    onClick={() => handleShowPrintModal(row)}
                                    src={Print}
                                    alt="Print"
                                    style={{ height: "3vh", width: "60%" }}
                                  />
                                </div>
                              )}
                            />
                          </td>
                          <td>
                            <i
                              class="fas fa-trash-alt"
                              onClick={() => {
                                handleDeletePendingRow(row);
                              }}
                            ></i>
                          </td>
                        </tr>
                      ))}

                      {Array.from({
                        length: Math.max(0, 50 - getorderlist.rows.length),
                      }).map((_, index) => (
                        <tr
                          key={`blank-${index}`}
                          style={{ backgroundColor: "white" }}
                        >
                          {Array.from({ length: 10 }).map((_, colIndex) => (
                            <td key={`blank-${index}-${colIndex}`}>&nbsp;</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                    <div style={{ display: "none" }}>
                      <Receipt
                        newOrderData={newOrderData}
                        ref={ref}
                        mobile={mobile}
                        address={address}
                        selectedCategory1={selectedCategory1}
                        enteredAmount={enteredAmount}
                        subsractedvalue={subtractedValue}
                        detailItem={detailItem}
                        priceDiscount={getdiscountamount}
                        percentageDiscount={percentageDiscount}
                        totalAmount={totalAmount}
                      />
                    </div>
                    <tfoot
                      style={{
                        height: "24px",
                        position: "sticky",
                        bottom: 0,
                        zIndex: 2,
                      }}
                    >
                      <tr>
                        <th
                          style={{
                            backgroundColor: primaryColor,
                            color: secondaryColor,
                            border: "1px solid #ddd",
                            height: "24px",
                          }}
                        >
                          {Length}
                        </th>
                        <th
                          colSpan={9}
                          style={{
                            backgroundColor: primaryColor,
                            color: secondaryColor,
                            textAlign: "left",
                            border: "1px solid #ddd",
                            padding: "8px",
                            height: "24px",
                          }}
                        ></th>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            )}

            {dataOrderType1 === "3" && (
              // Take Away

              <Table
                data={datatakeaway}
                showItemsAndAddItem={showitemsandadditem}
                showCartItemList={showcartitemlist}
                handleShowPrintModal={handleShowPrintModal}
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
                ref={ref}
                newOrderData={newOrderData}
                detailItem={detailItem}
                priceDiscount={priceDiscount}
                percentageDiscount={percentageDiscount}
                totalAmount={totalAmount}
              />
            )}
            {dataOrderType1 === "4" && (
              <Table
                data={datadining}
                showItemsAndAddItem={showitemsandadditem}
                showCartItemList={showcartitemlist}
                handleShowPrintModal={handleShowPrintModal}
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
                ref={ref}
                newOrderData={newOrderData}
                detailItem={detailItem}
                priceDiscount={priceDiscount}
                percentageDiscount={percentageDiscount}
                totalAmount={totalAmount}
              />
            )}
            {dataOrderType1 === "5" && (
              <Table
                data={dataCar}
                showItemsAndAddItem={showitemsandadditem}
                showCartItemList={showcartitemlist}
                handleShowPrintModal={handleShowPrintModal}
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
                ref={ref}
                newOrderData={newOrderData}
                detailItem={detailItem}
                priceDiscount={priceDiscount}
                percentageDiscount={percentageDiscount}
                totalAmount={totalAmount}
              />
            )}
            {dataOrderType1 === "6" && (
              <Table
                data={dataDelivery}
                showItemsAndAddItem={showitemsandadditem}
                showCartItemList={showcartitemlist}
                handleShowPrintModal={handleShowPrintModal}
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
                ref={ref}
                newOrderData={newOrderData}
                detailItem={detailItem}
                priceDiscount={priceDiscount}
                percentageDiscount={percentageDiscount}
                totalAmount={totalAmount}
              />
            )}

            {/* ////////////////////////////// Five button in footer  */}
            <div className="row fixed-bottom" style={{ marginLeft: "33%" }}>
              <div className="col-4">
                {dataOrderType1 >= "1" && dataOrderType1 <= "6" && (
                  <button
                    onClick={handleButtonClick1}
                    className="btn btn-primary"
                    style={buttonStyles}
                  >
                    {buttonTexts[parseInt(dataOrderType1) - 1]}
                  </button>
                )}
              </div>
              <div className="col-2">
                <button
                  className="btn btn-primary"
                  onClick={() => setDataOrderTypeeee1("6")}
                  style={buttonStyles}
                >
                  Delivery
                </button>
              </div>
              <div className="col-2">
                <button
                  className="btn btn-primary"
                  onClick={() => setDataOrderTypeeee1("4")} // Pass a function reference
                  style={buttonStyles}
                >
                  Dining
                </button>
              </div>
              <div className="col-2">
                <button
                  className="btn btn-primary"
                  style={buttonStyles}
                  onClick={() => setDataOrderTypeeee1("3")} // Pass a function reference
                >
                  Take Away
                </button>
              </div>
              <div className="col-2">
                <button
                  className="btn btn-primary"
                  onClick={() => setDataOrderTypeeee1("5")}
                  style={buttonStyles}
                >
                  Car
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Order_Dashboard;

const Table = ({
  data,
  showItemsAndAddItem,
  showCartItemList,
  handleShowPrintModal,
  primaryColor,
  secondaryColor,
  newOrderData,
  detailItem,
  priceDiscount,
  percentageDiscount,
  totalAmount,
}) => {
  const receiptRef = useRef();

  return (
    <div>
      <div
        style={{
          overflowY: "auto",
          overflowX: "hidden",
          fontSize: "11px",
          maxHeight: "88vh",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ height: "24px" }}>
            {[
              "ID",
              "Order Id",
              "Table No",
              "Waiter",
              "Amount",
              "Show Data",
              "Add Item",
              "Print",
            ].map((header, index) => (
              <th
                key={index}
                style={{
                  backgroundColor: primaryColor,
                  color: secondaryColor,
                  border: "1px solid #ddd",
                  textAlign: "center",
                }}
              >
                {header}
              </th>
            ))}
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} style={{ backgroundColor: "white" }}>
                <td style={{ width: "1%" }}>{index + 1}</td>
                <td style={{ width: "10%" }}>{row.id}</td>
                <td style={{ width: "15%" }}>{row.tcstnam}</td>
                <td style={{ textAlign: "left", width: "20%" }}>
                  {row.w_name}
                </td>
                <td>{row.totalAmt}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => showItemsAndAddItem(row)}
                    style={{
                      backgroundColor: primaryColor,
                      height: "24px",
                      fontSize: "11px",
                      color: secondaryColor,
                      width: "100%",
                      borderRadius: "0px",
                    }}
                  >
                    Show Data
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => showCartItemList(row)}
                    style={{
                      backgroundColor: primaryColor,
                      height: "24px",
                      fontSize: "11px",
                      color: secondaryColor,
                      width: "100%",
                      borderRadius: "0px",
                    }}
                  >
                    Add Item
                  </button>
                </td>
                <td>
                  <ReactToPrint
                    bodyClass="print-receipt"
                    content={() => receiptRef.current}
                    trigger={() => (
                      <img
                        onClick={() => handleShowPrintModal(row)}
                        src={Print}
                        alt="Print"
                        style={{ height: "3vh", width: "50%" }}
                      />
                    )}
                  />
                </td>
              </tr>
            ))}

            <div style={{ display: "none" }}>
              <Receipt
                newOrderData={newOrderData}
                ref={receiptRef}
                selectedCategory1={selectedCategory1}
                detailItem={detailItem}
                priceDiscount={priceDiscount}
                percentageDiscount={percentageDiscount}
                totalAmount={totalAmount}
              />
            </div>

            {Array.from({ length: Math.max(0, 24 - data.length) }).map(
              (_, index) => (
                <tr key={`blank-${index}`} style={{ backgroundColor: "white" }}>
                  {Array.from({ length: 8 }).map((_, colIndex) => (
                    <td key={`blank-${index}-${colIndex}`}>&nbsp;</td>
                  ))}
                </tr>
              )
            )}
          </tbody>
          <tfoot
            style={{
              height: "24px",
              position: "sticky",
              bottom: 0,
              zIndex: 2,
            }}
          >
            <tr>
              <th
                style={{
                  backgroundColor: primaryColor,
                  color: secondaryColor,
                  border: "1px solid #ddd",
                  height: "24px",
                }}
              >
                {data.length}
              </th>
              <th
                colSpan={9}
                style={{
                  backgroundColor: primaryColor,
                  color: secondaryColor,
                  textAlign: "left",
                  border: "1px solid #ddd",
                  padding: "8px",
                  height: "24px",
                }}
              ></th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};
