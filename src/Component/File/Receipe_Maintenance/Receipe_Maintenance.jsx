import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Nav,
  Spinner,
} from "react-bootstrap";
import { MDBTable, MDBTableBody, MDBTableFoot, MDBTableHead } from "mdbreact";

import Alert from "@mui/material/Alert";
import PathHead from "../../MainComponent/PathHead/PathHead";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Receipe_Maintenance.css";
import { QRCodeSVG } from "qrcode.react";
import { Modal } from "react-bootstrap"; // Assume you're using react-bootstrap for modal
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "../../../ThemeContext";
import { fetchItem, fetchChartofAccount, fetchRaw } from "../../Redux/action";
import Bin from "../../../image/bin.png";
function Receipe_Maintenance() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const datalist = useSelector((state) => state.itemlist);
  const datalistraw = useSelector((state) => state.rawslist);

  const datalistAccount = useSelector((state) => state.accountlist);
  useEffect(() => {
    console.log(
      "datalistAccount",
      datalistAccount.data && datalistAccount.data
    );
    dispatch(fetchItem());
    dispatch(fetchChartofAccount());
    dispatch(fetchRaw());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchItem());
    setTimeout(() => {
      console.log("datalistdatalistdatalistdatalist", datalist);
    }, 3000);
  }, [dispatch]);
  const [nextItemId, setNextItemId] = useState(0);
  const fetchData = async () => {
    try {
      const response = await fetch(`${apiLinks}/RecipeNumber.php`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setTimeout(() => {
        setNextItemId(data.invnum);
      }, 1000);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiLinks}/RecipeNumber.php`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTimeout(() => {
          setNextItemId(data.invnum);
        }, 1000);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const [tableDataAccount, setTableDataAccount] = useState([]);

  const [getfrefcod, setfrefcod] = useState();
  const [getfrefcoddes, setfrefcoddesc] = useState();

  const [getsetfcstnam, setfcstnam] = useState("");

  const [getftrnrem, setftrnrem] = useState("");
  const [getfmobnum, setfmobnum] = useState("");
  const [getfadd001, setfadd001] = useState("");
  const [getfadd002, setfadd002] = useState("");
  const [getfnicnum, setfnicnum] = useState("");
  const [getfntnnum, setfntnnum] = useState("");
  const [getfstnnum, setfstnnum] = useState("");
  const [getrefdonum, setrefdonum] = useState("");
  const [getgstnum, setgstnum] = useState("");
  // const [getgstnum, setgstnum] = useState("");
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const defaultFromDate = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;

  const [dateFormate, setDateFormate] = useState(defaultFromDate);
  const handleInputChange3 = (e) => {
    const { name, value } = e.target;
    const upperCaseValue = value.toUpperCase();
    e.target.value = upperCaseValue;

    if (name === "CustomerCode") {
      let rawValue = value.replace(/\D/g, "");
      // Limit to 7 digits
      if (rawValue.length > 7) {
        rawValue = rawValue.slice(0, 7);
      }

      // Format the value
      let formattedValue = rawValue;
      if (rawValue.length > 4) {
        formattedValue = `${rawValue.slice(0, 2)}-${rawValue.slice(
          2,
          4
        )}-${rawValue.slice(4, 7)}`;
      } else if (rawValue.length > 2) {
        formattedValue = `${rawValue.slice(0, 2)}-${rawValue.slice(2, 4)}`;
      }

      setfrefcod(formattedValue);

      // Find the selected item based on the value
      const selectedItem =
        datalist.data &&
        datalist.data.find((item) => item.TItmId === formattedValue);
      if (selectedItem) {
        setfrefcoddesc(selectedItem.dscription);
        console.log("selectedItem", selectedItem);
      } else {
        console.log("No matching item found");
        setfrefcoddesc("");
      }
    }
    if (name === "getfrefcoddes") {
      setfrefcoddesc(upperCaseValue);
    }
    if (name === "Mobile1") {
      setfmobnum(upperCaseValue);
    }
    if (name === "Remarks") {
      setftrnrem(upperCaseValue);
    }
    if (name === "Name") {
      setfcstnam(upperCaseValue);
    }

    if (name === "Address1") {
      setfadd001(upperCaseValue);
    }
    if (name === "Address2") {
      setfadd002(upperCaseValue);
    }
    if (name === "Cnic") {
      let rawValue = value.replace(/\D/g, "");
      // Limit to 7 digits
      if (rawValue.length > 13) {
        rawValue = rawValue.slice(0, 13);
      }

      // Format the value
      let formattedValue = rawValue;
      if (rawValue.length > 12) {
        formattedValue = `${rawValue.slice(0, 5)}-${rawValue.slice(
          5,
          12
        )}-${rawValue.slice(12)}`;
      } else if (rawValue.length > 5) {
        formattedValue = `${rawValue.slice(0, 5)}-${rawValue.slice(5)}`;
      }

      setfnicnum(formattedValue);
      // setfnicnum(upperCaseValue);
    }
    if (name === "NTN") {
      setfntnnum(upperCaseValue);
    }
    if (name === "STN") {
      setfstnnum(upperCaseValue);
    }
    if (name === "Ref/Do") {
      setfstnnum(upperCaseValue);
    }
    if (name === "GST") {
      setfstnnum(upperCaseValue);
    }
  };
  const SaleNo = useRef(null);
  const CustomerCode = useRef(null);
  const CustomerName = useRef(null);
  const DATE = useRef(null);

  const Remarks = useRef(null);
  const Mobile1 = useRef(null);
  const Mobile2 = useRef(null);
  const Name = useRef(null);
  const Address1 = useRef(null);
  const Address2 = useRef(null);
  const Ref = useRef(null);
  const GST = useRef(null);
  const Cnic = useRef(null);
  const NTN = useRef(null);
  const STN = useRef(null);

  const Customer = useRef(null);
  const Status = useRef(null);
  const Company = useRef(null);
  const Category = useRef(null);
  const Capacity = useRef(null);
  const Type = useRef(null);
  const Purchase = useRef(null);
  const SaleMan = useRef(null);
  const MRP = useRef(null);
  const Sale = useRef(null);
  const Fix = useRef(null);
  const Submit = useRef(null);
  const lastInputRef = useRef(null);
  const SearchBox = useRef(null);
  const SearchBoxAccount = useRef(null);
  const firstRowRef = useRef(null);
  const tableRef = useRef(null);
  const Return = useRef(null);
  const Clear = useRef(null);
  const [highlightedRowIndex, setHighlightedRowIndex] = useState(0);
  const generateRandomString = () => {
    const length = 10; // Length of the random string
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  };
  const randomData = generateRandomString();

  const today = new Date();

  // Format the date to "dd/mm/yyyy"
  const formattedDate = today.toLocaleDateString("en-GB");
  const formattedTime = today.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true, // Use true for AM/PM format, false for 24-hour format
  });
  const [alertData, setAlertData] = useState(null);
  const { secondaryColor, apiLinks } = useTheme();
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [Length, setLength] = useState("");

  const UserId = 33;

  const responseData = {
    // detail1: [],
    detail1: [],
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Prepare the data to be sent in the request
      const responsedata = {
        // saleid: nextItemId,
        itemcode: CustomerCode.current.value,
        itemDescription: CustomerName.current.value,
        remarks: Remarks.current.value,
        // Mobile1: Mobile1.current.value,
        // Mobile2: Mobile2.current.value,
        // Name: Name.current.value,
        // Address1: Address1.current.value,
        // Address2: Address2.current.value,
        // CNIC: Cnic.current.value,
        // NTN: NTN.current.value,
        // STN: STN.current.value,
        totalAmount: totalAmount.replace(/,/g, ""),
        totalQuantity: totalQuantity.replace(/,/g, ""),
        type: "RRR",

        detail1: tableData.map((item) => ({
          item_id: item.name,
          item_description: item.Description,
          // item_pur: item.Purchase,
          item_rate: item.Sale,
          item_quantity: item.quantity,
          item_amount: item.Amount.replace(/,/g, ""),
          // item_MRP: item.MRP,
          // item_Tax: item.Tax,
          // item_TotalTax: item.TotalTax,
        })),
      };
      const response = await axios.post(
        `${apiLinks}/AddRacipe.php`,
        JSON.stringify(responsedata),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log(response);
      console.log("sdfsdfsdf", responsedata);

      if (response.data.error === 200) {
        // emppty all fields
        fetchData();
        setfrefcod("");
        setfrefcoddesc("");
        setftrnrem("");
        setTableData([
          {
            name: "",
            Description: "",
            Purchase: "",
            Sale: "",
            Amount: "",
          },
        ]);
        console.log(response.data.message);
        setAlertData({
          type: "success",
          message: `${response.data.message}`,
        });
        setTimeout(() => {
          setAlertData(null);
        }, 1000);
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
    } catch (error) {
      console.error("Error:", error);
    } finally {
    }
  };

  const [gettotaltax, settotaltax] = useState(0);
  const calculateTotals = () => {
    let quantityTotal = 0;
    let amountTotal = 0;
    let taxTotal = 0;
    tableData.forEach((rowData) => {
      const quantity = parseFloat(rowData.quantity || 0);
      const sale = parseFloat(rowData.Sale || 0);
      const totaltx = parseFloat(rowData.TotalTax || 0);
      taxTotal += totaltx;
      quantityTotal += quantity;
      amountTotal += quantity * sale;
    });
    settotaltax(taxTotal.toLocaleString());
    setTotalQuantity(quantityTotal.toFixed(2));
    const amountWithCommas = amountTotal.toLocaleString(undefined, {
      minimumFractionDigits: 2,
    });
    // Format the amount with commas using toLocaleString
    setTotalAmount(amountWithCommas); // Format the amount with commas
  };

  const [tableData, setTableData] = useState([
    {
      name: "",
      Description: "",
      Purchase: "",
      Sale: "",
      Amount: "",
      MRP: "",
      Tax: "",
      TotalTax: "",
      quantity: "",
    },
  ]);
  const handleInputChange = (event, index) => {
    console.log("tableData", tableData);

    const { name, value } = event.target;

    const newData = [...tableData];
    newData[index][name] = value;
    setTableData(newData);
    calculateTotals(); // total amount or total quantity ko calculate kerna ka lia
    // Calculate kerna hai sale or quantity ko multiply karke amount ko update karna hai
    if (name === "quantity" || name === "sale") {
      const quantity = parseFloat(newData[index].quantity || 0);
      const purchase = parseFloat(newData[index].Sale || 0);
      const amount = quantity * purchase;
      const amountWithCommas = amount.toLocaleString(undefined, {
        minimumFractionDigits: 2,
      });
      const quantitywithCommas = quantity.toLocaleString(undefined, {
        minimumFractionDigits: 2,
      });
      newData[index].Amount = amountWithCommas;
      newData[index].quantity = quantitywithCommas;
    }
    setTableData(newData);
  };

  const calculateAmount = (quantity, Sale) => {
    const parsedQuantity = parseFloat(quantity) || 0;
    const parsedPurchase = parseFloat(Sale) || 0;
    return parsedQuantity * parsedPurchase;
  };

  const [itemdata, setitemdata] = useState([]);
  const [rawdata, setrawdata] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [searchTextAccount, setSearchTextAccount] = useState("");

  useEffect(() => {
    if (datalist.data && Array.isArray(datalist.data)) {
      const transformedData = datalist.data.map((item) => ({
        TItmId: item.TItmId,
        dscription: item.dscription,
      }));
      console.log(
        "transformedDatatransformedDatatransformedDatatransformedData",
        transformedData
      );
      setitemdata(transformedData);
      setLength(transformedData.length);
    }
  }, [datalist.data]);
  useEffect(() => {
    if (datalistraw.data && Array.isArray(datalistraw.data)) {
      const transformedData = datalistraw.data.map((item) => ({
        raw_cod: item.raw_cod,
        raw_dsc: item.raw_dsc,
      }));
      console.log(
        "transformedDatatransformedDatatransformedDatatransformedData",
        transformedData
      );
      setrawdata(transformedData);
    }
  }, [datalist.data]);
  const handleSearchChange = (e) => {
    const upperCaseValue = e.target.value.toUpperCase();
    setHighlightedRowIndex(0);
    setSearchText(upperCaseValue);
  };

  // row ko add kerna ka lia
  const addNewRow = () => {
    setTableData([
      ...tableData,
      {
        name: "",
        Description: "",
        Purchase: "",
        Sale: "",
        Amount: "",
        MRP: "",
        Tax: "",
        TotalTax: "",
        isEditable: true,
      },
    ]);
  };

  const [getcolor, setColor] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  // modal ko open kerta hai or text ko set kerta hai search ma show kerwana ka lia
  const handleDoubleClick = (e) => {
    setHighlightedRowIndex(0);
    setTimeout(() => {
      focusNextInput(SearchBox);
    }, 500);
    console.log("====== handle double click=======");
    console.log("e.target.value", e.target.value);
    setSearchText(e.target.value);
    setModalOpen(true);
  };

  const [isModalOpenAccount, setModalOpenAccount] = useState(false);

  const handleSearchChangeAccount = (event) => {
    const upperCaseValue = event.target.value.toUpperCase();
    setHighlightedRowIndex(0);
    setSearchTextAccount(upperCaseValue);
  };
  const handleDoubleClickAccount = (e) => {
    setTimeout(() => {
      focusNextInput(SearchBoxAccount);
    }, 500);
    setHighlightedRowIndex(0);
    console.log("====== handle double click=======");
    console.log("e.target.value", e.target.value);
    setSearchTextAccount(e.target.value);
    setModalOpenAccount(true);
  };
  const handleCloseModalAccount = () => {
    setModalOpenAccount(false);
  };
  // close the item list modal
  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const handleRowClick = (rowData, rowIndex) => {
    console.log("Row Data", rowData);
    setColor(rowData.raw_cod);

    setModalOpen(false);
    const updatedTableData = [...tableData];

    updatedTableData[updatedTableData.length - 1] = {
      ...updatedTableData[updatedTableData.length - 1],
      name: rowData.raw_cod,
      Description: rowData.raw_dsc,
      Purchase: rowData.tpurrat,
      Sale: rowData.tsalrat,
      // MRP: rowData.tpurrat,
      // Tax: rowData.tatPersentage,
      // TotalTax: rowData.tax,

      Amount: calculateAmount(
        updatedTableData[updatedTableData.length - 1].quantity,
        rowData.tsalrat
      ),
    };

    // Update the state with the modified tableData
    setTableData(updatedTableData);
    calculateTotals(); // total amount or total quantity ko calculate kerna ka lia
  };
  const handleRowClickAccount = (rowData, rowIndex) => {
    console.log("handleRowClickAccount", rowData);
    // setColorAccount(rowData.titmcod);

    setModalOpenAccount(false);

    setfrefcod(rowData.TItmId);
    setfrefcoddesc(rowData.dscription);

    calculateTotals();
  };
  const handleDeleteRow = (index) => {
    const updatedTableData = [...tableData];
    const deletedRow = updatedTableData.splice(index, 1)[0]; // osi row ko delete
    setTableData(updatedTableData);
    const newTotalQuantity = totalQuantity - deletedRow.quantity;
    console.log("deletedRow.quantity", deletedRow.quantity);
    console.log("deletedRow.Sale", deletedRow.Sale);
    const newTotalAmount =
      parseFloat(totalAmount.replace(/,/g, "")) -
      deletedRow.quantity * deletedRow.Sale;
    console.log("totalAmount", newTotalAmount);
    const newTotalAmountwithcommas = newTotalAmount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
    });
    setTotalQuantity(newTotalQuantity);
    setTotalAmount(newTotalAmountwithcommas);
  };

  const USEREF4 = useRef(null);
  const USEREF7 = useRef(null);

  const USEREF8 = useRef(null);
  const USEREF9 = useRef(null);

  // Function to focus on the next input field
  const focusNextInput = (ref) => {
    if (ref.current) {
      ref.current.focus();
    }
  };
  const lastRowRef = useRef(null);

  // Focus on the last row jab hum 11 row per ho ga tu scroll ker ka last row per focus ho ga
  useEffect(() => {
    if (lastRowRef.current) {
      lastRowRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [tableData]);
  const handleEnterKeyPress = (ref, e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      focusNextInput(ref);
    }
  };

  // Modify the handleInputChange1 function to handle item selection and update the first row
  const handleInputChange1 = (event, rowIndex) => {
    const { name, value } = event.target;
    const updatedTableData = [...tableData];
    console.log("value", value);
    if (name === "name") {
      if (!value) {
        updatedTableData[rowIndex] = {
          ...updatedTableData[rowIndex],
          name: "",
          Description: "",
          Purchase: 0,
          Sale: 0,
          MRP: 0,
          Tax: 0,
          TotalTax: 0,
          Amount: 0,
        };
      } else {
        // Find the selected item based on the provided value
        const selectedItem = datalist.data.find(
          (item) => item.titmcod === value
        );
        console.log("selectedItem:", selectedItem);

        if (selectedItem) {
          // Update the row data based on the selected item
          updatedTableData[rowIndex] = {
            ...updatedTableData[rowIndex],
            name: selectedItem.titmcod,
            Description: selectedItem.titmdsc,
            Purchase: selectedItem.tpurrat,
            Sale: selectedItem.tsalrat,
            MRP: selectedItem.tsalrat,
            Tax: selectedItem.tatPersentage,
            TotalTax: selectedItem.tax,
            // Calculate the Amount
            Amount: calculateAmount(
              updatedTableData[rowIndex].quantity || 0,
              selectedItem.tsalrat
            ),
          };
        } else {
          updatedTableData[rowIndex] = {
            ...updatedTableData[rowIndex],
            name: value,
            Description: "",
            Purchase: 0,
            Sale: 0,
            MRP: 0,
            Tax: 0,
            TotalTax: 0,
            Amount: 0,
          };
        }
      }
    } else {
      // Handle other fields normally
      updatedTableData[rowIndex] = {
        ...updatedTableData[rowIndex],
        [name]: value,
      };

      // Recalculate Amount if 'quantity' or 'Sale' changed
      if (name === "quantity" || name === "Sale") {
        const quantity = parseFloat(updatedTableData[rowIndex].quantity || 0);
        const Sale = parseFloat(updatedTableData[rowIndex].Sale || 0);
        updatedTableData[rowIndex].Amount = (quantity * Sale).toFixed(2);
      }
    }

    // Update the state with the updated table data
    setTableData(updatedTableData);
    calculateTotals(); // Recalculate totals
  };
  const filteredRows =
    rawdata &&
    rawdata.filter(
      (row) =>
        (row.raw_cod &&
          row.raw_cod.toLowerCase().includes(searchText.toLowerCase())) ||
        (row.raw_dsc &&
          row.raw_dsc.toLowerCase().includes(searchText.toLowerCase()))
    );
  const filteredRowsAccount =
    datalistAccount.data &&
    datalistAccount.data.filter(
      (row) =>
        (row.TItmId &&
          row.TItmId.toLowerCase().includes(searchTextAccount.toLowerCase())) ||
        (row.dscription &&
          row.dscription
            .toLowerCase()
            .includes(searchTextAccount.toLowerCase()))
    );
  const formatAccountCode = (value) => {
    const formattedValue = value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d{2})(\d{3})/, "$1-$2-$3");
    if (formattedValue.length === 9) {
      USEREF8.current.focus();
    }
    return formattedValue;
  };
  const handleInputChangefetchdatafunction = (ttrnnum) => {
    axios
      .post(`${apiLinks}/RecipeList.php`, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        console.log(response.data[0], "sdjklfjs");
        const matchedItem = response.data.find(
          (item) => item.ttrnnum === ttrnnum
        );

        if (matchedItem) {
          setfrefcod(matchedItem.titmcod);
          setfrefcoddesc(matchedItem.rcpdsc);
          setftrnrem(matchedItem.ttrnrem);

          if (matchedItem.recipe && matchedItem.recipe.length > 0) {
            const newTableData = matchedItem.recipe.map((detail) => ({
              name: detail.titmcod_rsp,
              Description: detail.titmdsc,
              Purchase: detail.titmrat,
              Sale: detail.titmrat,
              Amount: detail.titmamt,
              quantity: detail.titmqnt,
            }));
            setTableData(newTableData);
            console.log("Matched Item:", matchedItem.ftrnrem);
            console.log("New Table Data:", newTableData);
          } else {
            setTableData([
              {
                name: "",
                Description: "",
                Purchase: "",
                Sale: "",
                Amount: "",
                MRP: "",
                Tax: "",
                TotalTax: "",
                quantity: "",
              },
            ]);
          }
        } else {
          console.log("No matching item found");
          setfrefcod("");
          setfrefcoddesc("");
          setfcstnam("");
          setftrnrem("");
          setfmobnum("");
          setfadd001("");
          setfadd002("");
          setfnicnum("");
          setfntnnum("");
          setfstnnum("");
          setTableData([
            {
              name: "",
              Description: "",
              Purchase: "",
              Sale: "",
              Amount: "",
              MRP: "",
              Tax: "",
              TotalTax: "",
              quantity: "",
            },
          ]);
        }
      });
  };

  const firstcolwidth = "50px";
  const secondcolwidth = "100px";
  const thirdcolwidth = "290px";
  const fourthcolwidth = "90px";
  const fifthcolwidth = "90px";
  const sixthcolwidth = "90px";
  const seventhcolwidth = "80px";
  const eighthcolwidth = "80px";
  const ninthcolwidth = "80px";
  const tenthcolwidth = "80px";
  const eleventhcolwidth = "80px";
  const twelvethcolwidth = "80px";
  const thirteenthcolwidth = "50px";

  const firstColWidthModal = "150px";
  const secondColWidthModal = "700px";
  const handleArrowKeyPress = (direction) => {
    if (filteredRows.length === 0) return;

    let newIndex = highlightedRowIndex;
    let upindex = highlightedRowIndex - 10;
    let bottomindex = highlightedRowIndex + 10;

    if (direction === "up") {
      const rowElement = document.getElementById(`row-${upindex}`);
      if (rowElement) {
        rowElement.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
      newIndex = Math.max(-1, highlightedRowIndex - 1);
    } else if (direction === "down") {
      const rowElement = document.getElementById(`row-${bottomindex}`);
      if (rowElement) {
        rowElement.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
      newIndex = Math.min(filteredRows.length - 1, highlightedRowIndex + 1);
    }

    setHighlightedRowIndex(newIndex);
  };

  const [enterCount, setEnterCount] = useState(0);

  const handleFocus = (codeparam) => {
    if (codeparam.current) {
      codeparam.current.style.backgroundColor = "orange";
    }
  };

  const handleBlur = (codeparam) => {
    if (codeparam.current) {
      codeparam.current.style.backgroundColor = "#3368B5";
    }
  };
  const handleSave = () => {
    handleFormSubmit();
  };
  const handleClear = () => {
    setfrefcod("");
    setfrefcoddesc("");
    setTableData([
      {
        name: "",
        Description: "",
        credit: "",
      },
    ]);
    SaleNo.current.focus();
  };
  const handleReturn = () => {
    navigate("/MainPage");
  };
  const handleBlurRVC = (e) => {
    // Convert nextItemId to string before calling padStart
    const value = String(nextItemId).padStart(6, "0");
    setNextItemId(value);
    console.log("value", value);
    setTimeout(() => {
      handleInputChangefetchdatafunction(value);
    }, 500);
  };

  const handleInputChangefetchdata = async (e) => {
    console.log("show the value is:", e.target.value);
    let inputValue = e.target.value;
    setNextItemId(inputValue);
    if (inputValue.length > 6) {
      return;
    }
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
        {/* <Header /> */}

        <div
          className="col-12"
          style={{
            backgroundColor: "white",
            color: "black",
            fontWeight: "bold",
            fontFamily: "Verdana",
          }}
        >
          <div
            className="row"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "5px",
              minHeight: "100vh",
              overflowY: "scroll",
              height: "calc(100vh - 200px)",
            }}
          >
            <div className="col-md-12 form-rawmaterialpurchase-container">
              <Nav
                className="col-12 d-flex justify-content-between"
                style={{
                  backgroundColor: "#3368b5",
                  color: "#fff",
                  height: "24px",
                }}
              >
                <div className="col-4 ">
                  <Link onClick={handleFormSubmit}>
                    {/* <i
                      class="fa-solid fa-regular fa-upload fa-lg topBtn"
                      title="Save"
                    ></i> */}
                    {/* <i
                      // className="fa-solid fa-paper-plane fa-lg topBtn"
                      className="fa-solid fa-floppy-disk fa-lg topBtn"

                      title="Save"
                    ></i> */}
                  </Link>

                  {/* <i className="fa fa-refresh fa-lg topBtn" title="Refresh"></i> */}
                </div>
                <div style={{ fontSize: "14px" }} className="col-4 text-center">
                  <strong>Receipe Maintenance</strong>
                </div>
                <div className="text-end col-4">
                  {/* <Link to="/MainPage" className="topBtn">
                    <i className="fa fa-close fa-lg crossBtn"></i>
                  </Link> */}
                </div>
              </Nav>
              <Form onSubmit={handleFormSubmit} style={{ marginTop: "1%" }}>
                <div className="row ">
                  <div className="col-9">
                    <div className="row">
                      <div className="col-sm-2 label-item">Receipe #:</div>
                      <div className="col-sm-3">
                        <Form.Control
                          type="number"
                          id="nextItemId"
                          placeholder="Code"
                          name="nextItemId"
                          className="form-control-item"
                          value={nextItemId}
                          ref={SaleNo}
                          onChange={(e) => handleInputChangefetchdata(e)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleBlurRVC();
                              handleEnterKeyPress(DATE, e);
                            }
                          }}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-2 label-item">Item:</div>
                      <div className="col-sm-8" style={{ display: "flex" }}>
                        <Form.Control
                          type="text"
                          id="CustomerCode"
                          placeholder="Code"
                          name="CustomerCode"
                          className="form-control-item"
                          ref={CustomerCode}
                          value={getfrefcod}
                          style={{ width: "100px" }}
                          onChange={handleInputChange3}
                          // onKeyDown={(e) => handleEnterKeyPress(CustomerName, e)}
                          // onKeyDown={(e) => {
                          //   if (e.key === "Enter") {
                          //     handleDoubleClick(e);
                          //     handleEnterKeyPress(CustomerName, e);
                          //   }
                          // }}

                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              const upperCaseValue =
                                e.target.value.toUpperCase();
                              const selectedItem = datalist.data.find(
                                (item) => item.TItmId === upperCaseValue
                              );

                              if (selectedItem) {
                                console.log("selectedItem:", selectedItem);
                                handleEnterKeyPress(CustomerName, e);
                              } else if (upperCaseValue.length < 9) {
                                // all feids empty

                                // handleEnterKeyPress(Description, e);
                                setAlertData({
                                  type: "error",
                                  message: `Please enter a valid account code`,
                                });
                                setTimeout(() => {
                                  setAlertData(null);
                                }, 3000);
                              } else {
                                handleEnterKeyPress(CustomerName, e);
                              }
                            }
                          }}
                          onFocus={(e) => e.target.select()}
                          onDoubleClick={(e) => {
                            if (e.target.value.length <= 9) {
                              handleDoubleClickAccount(e);
                              setTimeout(() => {
                                focusNextInput(SearchBoxAccount);
                              }, 100);
                            }
                          }}
                          // style={{
                          //   border: fieldErrors.accountCode
                          //     ? "1px solid red"
                          //     : "",

                          //   transition:
                          //     "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
                          // }}
                          // ref={Code}
                        />
                        <Form.Control
                          type="text"
                          id="getfrefcoddes"
                          placeholder="Customer"
                          name="getfrefcoddes"
                          className="form-control-item"
                          ref={CustomerName}
                          onFocus={(e) => e.target.select()}
                          value={getfrefcoddes}
                          onChange={handleInputChange3}
                          onKeyDown={(e) => handleEnterKeyPress(Remarks, e)}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-2 label-item">Remarks:</div>
                      <div className="col-sm-8" style={{ display: "flex" }}>
                        <Form.Control
                          id="Remarks"
                          placeholder="Remarks"
                          name="Remarks"
                          className="form-control-item"
                          ref={Remarks}
                          onFocus={(e) => e.target.select()}
                          value={getftrnrem}
                          onChange={handleInputChange3}
                          onKeyDown={(e) => handleEnterKeyPress(USEREF4, e)} // Adjust as needed
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="row">
                      <div className="col-sm-2 label-item">Date:</div>
                      <div className="col-sm-10" style={{ display: "flex" }}>
                        <input
                          style={{ height: "24px", marginLeft: "-10px" }}
                          type="date"
                          format="dd-mm-yyyy"
                          className="col-12"
                          value={dateFormate}
                          ref={DATE}
                          onKeyDown={(e) =>
                            handleEnterKeyPress(CustomerCode, e)
                          }
                          onChange={(e) => setDateFormate(e.target.value)}
                          defaultValue={defaultFromDate}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-2 label-item">Time:</div>
                      <div className="col-sm-10" style={{ display: "flex" }}>
                        <Form.Control
                          type="text"
                          id="code"
                          placeholder="Time"
                          disabled
                          className="form-control-item"
                          value={formattedTime}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div
                    className="col-12 firsttable-container"
                    style={{ height: "243px", fontSize: "11px" }}
                  >
                    <table className="custom-table">
                      <thead>
                        <tr>
                          <th
                            class="sticky-header"
                            style={{
                              width: firstcolwidth,
                              fontWeight: "bold",
                              borderRight: "1px solid black",
                              textAlign: "center",
                            }}
                          >
                            Sr#
                          </th>
                          <th
                            class="sticky-header"
                            style={{
                              width: secondcolwidth,
                              textAlign: "center",

                              fontWeight: "bold",
                              borderRight: "1px solid black",
                            }}
                          >
                            Raw Code
                          </th>
                          <th
                            class="sticky-header"
                            style={{
                              width: thirdcolwidth,
                              textAlign: "center",

                              fontWeight: "bold",
                              borderRight: "1px solid black",
                            }}
                          >
                            Description
                          </th>
                          <th
                            class="sticky-header"
                            style={{
                              width: fifthcolwidth,
                              textAlign: "center",

                              fontWeight: "bold",
                              borderRight: "1px solid black",
                            }}
                          >
                            Rate
                          </th>
                          <th
                            class="sticky-header"
                            style={{
                              width: fourthcolwidth,
                              textAlign: "center",

                              fontWeight: "bold",
                              borderRight: "1px solid black",
                            }}
                          >
                            Qnty
                          </th>

                          <th
                            class="sticky-header"
                            style={{
                              width: sixthcolwidth,
                              textAlign: "center",

                              fontWeight: "bold",
                              borderRight: "1px solid black",
                            }}
                          >
                            Amount
                          </th>

                          <th
                            class="sticky-header"
                            style={{
                              width: thirteenthcolwidth,
                              textAlign: "center",

                              fontWeight: "bold",
                              borderRight: "1px solid black",
                            }}
                          ></th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableData.map((rowData, index) => (
                          <tr
                            key={index}
                            ref={
                              index === tableData.length - 1 ? lastRowRef : null
                            }
                          >
                            <td
                              style={{
                                border: "1px solid #000",
                                padding: "8px",
                                textAlign: "center",
                                width: firstcolwidth,
                              }}
                            >
                              {index + 1}
                            </td>
                            <td
                              style={{
                                border: "1px solid #000",
                                padding: "8px",
                                textAlign: "center",
                                width: secondcolwidth,
                              }}
                            >
                              <input
                                type="text"
                                name="name"
                                value={rowData.name}
                                onChange={(e) => handleInputChange1(e, index)}
                                style={{
                                  width: "100%",
                                  border: "none",
                                  backgroundColor: "transparent",
                                  textAlign: "center",
                                }}
                                ref={USEREF4}
                                onFocus={(e) => e.target.select()}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    const upperCaseValue =
                                      e.target.value.toUpperCase();
                                    const selectedItem =
                                      datalistAccount.data.find(
                                        (item) =>
                                          item.raw_cod === upperCaseValue
                                      );
                                    console.log(
                                      "Enter Pressed",
                                      upperCaseValue,
                                      selectedItem
                                    );
                                    // handleDoubleClick(e);
                                    // handleDoubleClickAccount(e);

                                    if (selectedItem) {
                                      console.log(
                                        "selectedItem:",
                                        selectedItem
                                      );
                                      handleEnterKeyPress(USEREF7, e);
                                    } else if (upperCaseValue.length < 2) {
                                      // handleEnterKeyPress(Description, e);
                                      handleDoubleClick(e);
                                      setAlertData({
                                        type: "error",
                                        message: `Please enter a valid account code`,
                                      });
                                      setTimeout(() => {
                                        setAlertData(null);
                                      }, 3000);
                                    } else {
                                      handleEnterKeyPress(USEREF7, e);
                                    }
                                  }
                                }}
                                onDoubleClick={(e) => {
                                  if (e.target.value.length <= 9) {
                                    handleDoubleClick(e);
                                  }
                                }}
                              />
                            </td>

                            <td
                              style={{
                                border: "1px solid #000",
                                padding: "8px",
                                textAlign: "center",
                                width: thirdcolwidth,
                              }}
                            >
                              <input
                                type="text"
                                name="Desctiption"
                                // placeholder="Description"
                                value={rowData.Description}
                                onChange={(e) => handleInputChange1(e, index)}
                                onFocus={(e) => e.target.select()}
                                disabled
                                style={{
                                  width: "100%",
                                  border: "none",
                                  backgroundColor: "transparent",
                                  textAlign: "left",
                                }}
                                // onKeyDown={(e) =>
                                //   handleEnterKeyPress(USEREF6, e)
                                // }
                                // ref={USEREF5}
                              />
                            </td>

                            <td
                              style={{
                                border: "1px solid #000",
                                padding: "8px",
                                width: fifthcolwidth,

                                textAlign: "center",
                                // background: "#f5f5f5",
                              }}
                            >
                              <input
                                type="text"
                                name="Sale"
                                // placeholder="Sale"
                                value={rowData.Sale}
                                onChange={(e) => handleInputChange1(e, index)}
                                onFocus={(e) => e.target.select()}
                                style={{
                                  width: "100%",
                                  border: "none",
                                  backgroundColor: "transparent",
                                  textAlign: "right",
                                }}
                                onKeyDown={(e) =>
                                  handleEnterKeyPress(USEREF8, e)
                                }
                                ref={USEREF7}
                              />
                            </td>
                            <td
                              style={{
                                border: "1px solid #000",
                                padding: "8px",
                                width: fourthcolwidth,

                                textAlign: "center",
                                // background: "#f5f5f5",
                              }}
                            >
                              <input
                                // type="number"
                                name="quantity"
                                // placeholder="Quantity"
                                value={rowData.quantity}
                                onChange={(e) => handleInputChange(e, index)}
                                onFocus={(e) => e.target.select()}
                                onBlur={(e) => {
                                  const inputValue = parseFloat(e.target.value);
                                  if (!isNaN(inputValue)) {
                                    // Convert the value to a string with two decimal places
                                    e.target.value = inputValue.toLocaleString(
                                      undefined,
                                      { minimumFractionDigits: 2 }
                                    );
                                  }
                                }}
                                ref={USEREF8}
                                onKeyDown={(e) => {
                                  const inputValue = parseFloat(e.target.value);
                                  if (e.key === "Enter" && inputValue > 0) {
                                    e.preventDefault();
                                    addNewRow();
                                    setTimeout(() => {
                                      handleEnterKeyPress(USEREF4, e);
                                      if (lastInputRef.current) {
                                        lastInputRef.current.focus();
                                      }
                                    }, 500);
                                  }
                                }}
                                style={{
                                  width: "100%",
                                  border: "none",
                                  backgroundColor: "transparent",
                                  textAlign: "right",
                                }}
                              />
                            </td>
                            <td
                              style={{
                                border: "1px solid #000",
                                padding: "8px",
                                width: sixthcolwidth,

                                textAlign: "center",
                                // background: "#f5f5f5",
                              }}
                            >
                              <input
                                type="text"
                                name="Amount"
                                value={rowData.Amount}
                                onChange={(e) => handleInputChange(e, index)}
                                onFocus={(e) => e.target.select()}
                                style={{
                                  width: "100%",
                                  border: "none",
                                  backgroundColor: "transparent",
                                  textAlign: "right",
                                }}
                                ref={USEREF9}
                                onKeyDown={(e) => {
                                  const inputValue = parseFloat(e.target.value);
                                  setAlertData({
                                    type: "error",
                                    message: `Please enter a Credit Amount`,
                                  });
                                  setTimeout(() => {
                                    setAlertData(null);
                                  }, 3000);
                                  if (e.key === "Enter" && inputValue > 0) {
                                    e.preventDefault();

                                    if (index === tableData.length - 1) {
                                      addNewRow();
                                    }
                                    // handleEnterKeyPress(USEREF4, e);
                                    setTimeout(() => {
                                      handleEnterKeyPress(USEREF4, e);
                                      if (lastInputRef.current) {
                                        lastInputRef.current.focus();
                                      }
                                    }, 200);
                                  }
                                }}
                              />
                            </td>

                            {tableData.length - 1 ? (
                              <td
                                style={{
                                  border: "1px solid #000",
                                  padding: "8px",
                                  textAlign: "center",
                                  // background: "#f5f5f5",
                                  width: thirteenthcolwidth,
                                }}
                              >
                                <img
                                  onClick={() => handleDeleteRow(index)} // Delete the row when the delete icon is clicked
                                  src={Bin}
                                  alt="delete"
                                  style={{
                                    cursor: "pointer",
                                    width: "18px",
                                    height: "auto",
                                  }}
                                />
                              </td>
                            ) : (
                              <td
                                style={{
                                  border: "1px solid #000",
                                  padding: "8px",
                                  textAlign: "center",
                                  // background: "#f5f5f5",
                                  width: thirteenthcolwidth,
                                }}
                              >
                                <img
                                  src={Bin}
                                  alt="delete"
                                  disabled
                                  style={{
                                    cursor: "pointer",
                                    width: "18px",
                                    height: "auto",
                                  }}
                                />
                              </td>
                            )}
                          </tr>
                        ))}
                        {Array.from({
                          length: Math.max(0, 10 - tableData.length),
                        }).map((_, index) => (
                          <tr key={`blank-${index}`}>
                            {Array.from({ length: 7 }).map((_, colIndex) => (
                              <td key={`blank-${index}-${colIndex}`}>&nbsp;</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr
                          style={{
                            backgroundColor: "#c6daf7",
                            // borderTop: "1px solid black",
                          }}
                        >
                          <td
                            className="sticky-footer"
                            style={{
                              width: firstcolwidth,
                              border: "1px solid black",
                            }}
                          ></td>
                          <td
                            className="sticky-footer"
                            style={{
                              width: secondcolwidth,
                            }}
                          ></td>
                          <td
                            className="sticky-footer"
                            style={{
                              width: thirdcolwidth,
                            }}
                          ></td>

                          <td
                            className="sticky-footer"
                            style={{
                              width: fifthcolwidth,
                            }}
                          ></td>
                          <td
                            className="sticky-footer"
                            style={{
                              border: "1px solid #000",
                              padding: "8px",
                              width: fourthcolwidth,

                              textAlign: "right",
                            }}
                          >
                            {totalQuantity}
                          </td>

                          <td
                            className="sticky-footer"
                            style={{
                              border: "1px solid #000",
                              padding: "8px",
                              width: sixthcolwidth,

                              textAlign: "center",
                            }}
                          >
                            {totalAmount}
                          </td>

                          <td
                            className="sticky-footer"
                            style={{
                              width: thirteenthcolwidth,
                            }}
                          ></td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>

                  <Modal
                    show={isModalOpenAccount}
                    onHide={handleCloseModalAccount}
                  >
                    <Nav
                      className="col-12 d-flex justify-content-between"
                      style={{
                        backgroundColor: "#3368b5",
                        color: "#fff",
                        height: "24px",
                      }}
                    >
                      <div className="col-4 ">
                        <i
                          className="fa fa-refresh fa-lg topBtn"
                          title="Refresh"
                        ></i>
                      </div>
                      <div
                        style={{ fontSize: "14px" }}
                        className="col-4 text-center"
                      >
                        <strong>Select Items</strong>
                      </div>
                      <div className="text-end col-4">
                        <Link
                          onClick={handleCloseModalAccount}
                          className="topBtn"
                        >
                          <i className="fa fa-close fa-lg crossBtn"></i>
                        </Link>
                      </div>
                    </Nav>
                    <Modal.Body>
                      <Row>
                        <Col xs={12} sm={4} md={4} lg={4} xl={{ span: 4 }}>
                          <Form.Control
                            type="text"
                            placeholder="Search..."
                            className="form-control-item  search"
                            ref={SearchBoxAccount}
                            value={searchTextAccount}
                            onChange={handleSearchChangeAccount}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                if (enterCount === 0) {
                                  // fetchDataAndDisplay();
                                  setEnterCount(1);
                                } else if (enterCount === 1) {
                                  // fetchDataAndDisplay();
                                  const selectedRowData =
                                    filteredRowsAccount[highlightedRowIndex];
                                  handleRowClickAccount(
                                    selectedRowData,
                                    highlightedRowIndex
                                  );
                                  setEnterCount(0); // Reset count after the second enter press
                                }
                              } else if (e.key === "ArrowUp") {
                                handleArrowKeyPress("up");
                              } else if (e.key === "ArrowDown") {
                                handleArrowKeyPress("down");
                              } else {
                                setEnterCount(0); // Reset count for any other key press
                              }
                            }}
                          />
                        </Col>
                      </Row>
                      <table
                        className="custom-table-area"
                        style={{ color: "black" }}
                      >
                        <thead>
                          <tr>
                            <th
                              class="sticky-header-area"
                              style={{
                                width: firstColWidthModal,
                                fontWeight: "bold",
                                textAlign: "center",
                                borderRight: "1px solid black",
                              }}
                            >
                              Code
                            </th>
                            <th
                              class="sticky-header-area"
                              style={{
                                width: secondColWidthModal,
                                textAlign: "center",

                                fontWeight: "bold",
                                borderRight: "1px solid black",
                              }}
                            >
                              Description
                            </th>
                          </tr>
                        </thead>

                        <tbody ref={tableRef} style={{ fontSize: "10px" }}>
                          {!itemdata || itemdata.length === 0 ? (
                            <>
                              {Array.from({ length: 18 }).map((_, index) => (
                                <tr key={`blank-${index}`}>
                                  {Array.from({ length: 2 }).map(
                                    (_, colIndex) => (
                                      <td key={`blank-${index}-${colIndex}`}>
                                        &nbsp;
                                      </td>
                                    )
                                  )}
                                </tr>
                              ))}

                              <tr>
                                <td
                                  style={{
                                    textAlign: "center",
                                    width: firstColWidthModal,
                                  }}
                                ></td>
                                <td
                                  style={{
                                    textAlign: "center",
                                    width: secondColWidthModal,
                                  }}
                                ></td>
                              </tr>
                            </>
                          ) : (
                            <>
                              {itemdata &&
                                itemdata.map((row, rowIndex) => (
                                  <tr
                                    style={{
                                      fontWeight:
                                        highlightedRowIndex === rowIndex
                                          ? "bold"
                                          : "normal",
                                      border:
                                        highlightedRowIndex === rowIndex
                                          ? "1px solid #3368B5"
                                          : "1px solid #3368B5",
                                      backgroundColor:
                                        highlightedRowIndex === rowIndex
                                          ? "#739ad1"
                                          : "",
                                    }}
                                    ref={rowIndex === 0 ? firstRowRef : null}
                                    key={rowIndex}
                                    id={`row-${rowIndex}`}
                                    onClick={() =>
                                      handleRowClickAccount(row, rowIndex)
                                    }
                                  >
                                    <td style={{ width: firstColWidthModal }}>
                                      {" "}
                                      {row.TItmId}
                                    </td>
                                    <td
                                      style={{
                                        textAlign: "left",
                                        width: secondColWidthModal,
                                      }}
                                    >
                                      {row.dscription}
                                    </td>
                                  </tr>
                                ))}

                              {Array.from({
                                length: Math.max(0, 16 - tableData.length),
                              }).map((_, index) => (
                                <tr key={`blank-${index}`}>
                                  {Array.from({ length: 2 }).map(
                                    (_, colIndex) => (
                                      <td key={`blank-${index}-${colIndex}`}>
                                        &nbsp;
                                      </td>
                                    )
                                  )}
                                </tr>
                              ))}
                            </>
                          )}
                        </tbody>
                        <tfoot>
                          <tr
                            style={{
                              fontSize: "11px",
                            }}
                          >
                            <th
                              className="sticky-footer-area"
                              style={{
                                textAlign: "center",
                                width: firstColWidthModal,
                              }}
                            >
                              {/* {Length} */}
                            </th>
                            <th
                              className="sticky-footer-area"
                              style={{
                                width: secondColWidthModal,
                              }}
                            ></th>
                          </tr>
                        </tfoot>
                      </table>
                    </Modal.Body>
                  </Modal>
                  <Modal show={isModalOpen} onHide={handleCloseModal}>
                    <Nav
                      className="col-12 d-flex justify-content-between"
                      style={{
                        backgroundColor: "#3368b5",
                        color: "#fff",
                        height: "24px",
                      }}
                    >
                      <div className="col-4 ">
                        <i
                          className="fa fa-refresh fa-lg topBtn"
                          title="Refresh"
                        ></i>
                      </div>
                      <div
                        style={{ fontSize: "14px" }}
                        className="col-4 text-center"
                      >
                        <strong>Select Raw</strong>
                      </div>
                      <div className="text-end col-4">
                        <Link
                          onClick={handleCloseModalAccount}
                          className="topBtn"
                        >
                          <i className="fa fa-close fa-lg crossBtn"></i>
                        </Link>
                      </div>
                    </Nav>
                    <Modal.Body>
                      <Row>
                        <Col xs={12} sm={4} md={4} lg={4} xl={{ span: 4 }}>
                          <Form.Control
                            type="text"
                            className="form-control-employee search"
                            style={{
                              height: "25px",
                              boxShadow: "none",
                              margin: "0.5%",
                              backgroundColor: "white",
                            }}
                            name="searchText"
                            ref={SearchBox}
                            placeholder="Search..."
                            value={searchText}
                            onChange={handleSearchChange}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                if (enterCount === 0) {
                                  // fetchDataAndDisplay();
                                  setEnterCount(1);
                                } else if (enterCount === 1) {
                                  // fetchDataAndDisplay();
                                  const selectedRowData =
                                    filteredRows[highlightedRowIndex];

                                  // handleRowClickAccount(
                                  //   selectedRowData,
                                  //   highlightedRowIndex
                                  // );
                                  handleRowClick(
                                    selectedRowData,
                                    highlightedRowIndex
                                  );
                                  setEnterCount(0); // Reset count after the second enter press
                                }
                              } else if (e.key === "ArrowUp") {
                                handleArrowKeyPress("up");
                              } else if (e.key === "ArrowDown") {
                                handleArrowKeyPress("down");
                              } else {
                                setEnterCount(0); // Reset count for any other key press
                              }
                            }}
                          />
                        </Col>
                      </Row>
                      <table
                        className="custom-table-area"
                        style={{ color: "black" }}
                      >
                        <thead>
                          <tr>
                            <th
                              class="sticky-header-area"
                              style={{
                                width: firstColWidthModal,
                                fontWeight: "bold",
                                textAlign: "center",
                                borderRight: "1px solid black",
                              }}
                            >
                              Code
                            </th>
                            <th
                              class="sticky-header-area"
                              style={{
                                width: secondColWidthModal,
                                textAlign: "center",

                                fontWeight: "bold",
                                borderRight: "1px solid black",
                              }}
                            >
                              Description
                            </th>
                          </tr>
                        </thead>

                        <tbody ref={tableRef} style={{ fontSize: "10px" }}>
                          {!filteredRows || filteredRows.length === 0 ? (
                            <>
                              {Array.from({ length: 18 }).map((_, index) => (
                                <tr key={`blank-${index}`}>
                                  {Array.from({ length: 2 }).map(
                                    (_, colIndex) => (
                                      <td key={`blank-${index}-${colIndex}`}>
                                        &nbsp;
                                      </td>
                                    )
                                  )}
                                </tr>
                              ))}

                              <tr>
                                <td
                                  style={{
                                    textAlign: "center",
                                    width: firstColWidthModal,
                                  }}
                                ></td>
                                <td
                                  style={{
                                    textAlign: "center",
                                    width: secondColWidthModal,
                                  }}
                                ></td>
                              </tr>
                            </>
                          ) : (
                            <>
                              {filteredRows &&
                                filteredRows.map((row, index) => (
                                  <tr
                                    style={{
                                      fontWeight:
                                        highlightedRowIndex === index
                                          ? "bold"
                                          : "normal",
                                      border:
                                        highlightedRowIndex === index
                                          ? "1px solid #3368B5"
                                          : "1px solid #3368B5",
                                      backgroundColor:
                                        highlightedRowIndex === index
                                          ? "#739ad1"
                                          : "",
                                    }}
                                    ref={index === 0 ? firstRowRef : null}
                                    key={index}
                                    id={`row-${index}`}
                                    onClick={() => handleRowClick(row, index)}
                                  >
                                    <td style={{ width: firstColWidthModal }}>
                                      {row.raw_cod}
                                    </td>
                                    <td
                                      style={{
                                        width: secondColWidthModal,
                                        textAlign: "left",
                                      }}
                                    >
                                      {row.raw_dsc}
                                    </td>
                                  </tr>
                                ))}
                              {Array.from({
                                length: Math.max(0, 19 - filteredRows.length),
                              }).map((_, index) => (
                                <tr key={`blank-${index}`}>
                                  {Array.from({ length: 2 }).map(
                                    (_, colIndex) => (
                                      <td key={`blank-${index}-${colIndex}`}>
                                        &nbsp;
                                      </td>
                                    )
                                  )}
                                </tr>
                              ))}
                            </>
                          )}
                        </tbody>
                        <tfoot>
                          <tr
                            style={{
                              fontSize: "11px",
                            }}
                          >
                            <th
                              className="sticky-footer-area"
                              style={{
                                textAlign: "center",
                                width: firstColWidthModal,
                              }}
                            >
                              {/* {Length} */}
                            </th>
                            <th
                              className="sticky-footer-area"
                              style={{
                                width: secondColWidthModal,
                              }}
                            ></th>
                          </tr>
                        </tfoot>
                      </table>
                    </Modal.Body>
                  </Modal>
                  <div className="row">
                    <div className="col-4"></div>
                    <div className="col-7">
                      <div className="row">
                        <div className="col-10 label-item">Labour Charges:</div>
                        <div className="col-2">
                          <input type="text" style={{ width: "80px" }} />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-10 label-item">Over Head:</div>
                        <div className="col-2">
                          <input type="text" style={{ width: "80px" }} />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-10 label-item">Net Amount:</div>
                        <div className="col-2">
                          <input type="text" style={{ width: "80px" }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Form>
              <br />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  marginBottom: "2px",
                  borderTop: "1px solid gray ",
                }}
              >
                <button
                  style={{
                    border: "1px solid #FFFFFF",
                    width: "75px",
                    height: "25px",
                    marginTop: "2px",
                    color: "white",
                    backgroundColor: "#3368B5",
                  }}
                  onFocus={() => handleFocus(Submit)}
                  onBlur={() => handleBlur(Submit)}
                  accessKey="s"
                  onKeyDown={(event) => {
                    if (event.altKey && event.key === "s") {
                      handleSave();
                      event.preventDefault();
                    } else if (event.key === "ArrowRight") {
                      Return.current.focus();
                      event.preventDefault();
                    }
                  }}
                  onClick={handleFormSubmit}
                  ref={Submit}
                >
                  Save
                </button>

                <button
                  style={{
                    border: "1px solid #FFFFFF",
                    width: "75px",
                    marginLeft: "2px",
                    height: "25px",
                    marginTop: "2px",
                    color: "white",

                    backgroundColor: "#3368B5",
                  }}
                  accessKey="r"
                  onKeyDown={(event) => {
                    if (event.altKey && event.key === "r") {
                      handleReturn();
                      event.preventDefault();
                    } else if (event.key === "ArrowRight") {
                      Clear.current.focus();
                      event.preventDefault();
                    } else if (event.key === "ArrowLeft") {
                      Submit.current.focus();
                      event.preventDefault();
                    }
                  }}
                  onFocus={() => handleFocus(Return)}
                  onBlur={() => handleBlur(Return)}
                  ref={Return}
                  onClick={handleReturn}
                >
                  Return
                </button>
                <button
                  style={{
                    border: "1px solid #FFFFFF",
                    width: "75px",
                    marginLeft: "2px",
                    height: "25px",
                    marginTop: "2px",
                    color: "white",

                    backgroundColor: "#3368B5",
                  }}
                  accessKey="c"
                  onKeyDown={(event) => {
                    if (event.altKey && event.key === "c") {
                      handleClear();
                      event.preventDefault();
                    } else if (event.key === "ArrowLeft") {
                      Return.current.focus();
                      event.preventDefault();
                    } else if (event.key === "ArrowRight") {
                      Submit.current.focus();
                      event.preventDefault();
                    }
                  }}
                  ref={Clear}
                  onFocus={() => handleFocus(Clear)}
                  onBlur={() => handleBlur(Clear)}
                  onClick={handleClear}
                >
                  Clear
                </button>
                <button
                  style={{
                    border: "1px solid #FFFFFF",
                    width: "75px",
                    marginLeft: "2px",
                    height: "25px",
                    marginTop: "2px",
                    color: "white",

                    backgroundColor: "#3368B5",
                  }}
                  accessKey="c"
                  onKeyDown={(event) => {
                    if (event.altKey && event.key === "c") {
                      handleClear();
                      event.preventDefault();
                    } else if (event.key === "ArrowLeft") {
                      Return.current.focus();
                      event.preventDefault();
                    } else if (event.key === "ArrowRight") {
                      Submit.current.focus();
                      event.preventDefault();
                    }
                  }}
                  ref={Clear}
                  onFocus={() => handleFocus(Clear)}
                  onBlur={() => handleBlur(Clear)}
                  onClick={handleClear}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
          <br />
        </div>
      </div>
    </>
  );
}

export default Receipe_Maintenance;
