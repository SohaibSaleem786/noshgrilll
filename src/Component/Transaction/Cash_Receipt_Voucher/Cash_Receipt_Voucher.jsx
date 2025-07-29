import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Nav,
  Spinner,
} from "react-bootstrap";
import Alert from "@mui/material/Alert";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Cash_Receipt_Voucher.css";
import { Modal } from "react-bootstrap"; // Assume you're using react-bootstrap for modal
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "../../../ThemeContext";
import { fetchItem, fetchChartofAccount } from "../../Redux/action";
import Bin from "../../../image/bin.png";
function Cash_Receipt_Voucher() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const datalistAccount = useSelector((state) => state.accountlist);
  const SaleNo = useRef(null);
  const USEREF4 = useRef(null);
  const USEREF8 = useRef(null);
  const CustomerCode = useRef(null);
  const CustomerName = useRef(null);
  const Remarks = useRef(null);
  const DATE = useRef(null);
  const lastInputRef = useRef(null);
  const Submit = useRef(null);
  const Clear = useRef(null);
  const Return = useRef(null);
  const SearchBox = useRef(null);
  const firstRowRef = useRef(null);
  const lastRowRef = useRef(null);
  const tableRef = useRef(null);
  const SearchBoxAccount = useRef(null);
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const today = new Date();
  const firstColWidth = "10px";
  const secondColWidth = "120px";
  const thirdColWidth = "450px";
  const fourthColWidth = "150px";
  const fifthColWidth = "50px";
  const sixthColWidth = "50px";
  const firstColWidthModal = "150px";
  const secondColWidthModal = "500px";
  const defaultFromDate = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;
  const formattedTime = today.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  useEffect(() => {
    dispatch(fetchItem());
    dispatch(fetchChartofAccount());
    setTimeout(() => {
      if (SaleNo.current) {
        SaleNo.current.focus();
      }
    }, 2000);
  }, [dispatch]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalOpenAccount, setModalOpenAccount] = useState(false);
  const [nextItemId, setNextItemId] = useState(0);
  const [getfrefcod, setfrefcod] = useState();
  const [getfrefcoddes, setfrefcoddesc] = useState();
  const [getftrnrem, setftrnrem] = useState("");
  const [dateFormate, setDateFormate] = useState(defaultFromDate);
  const [alertData, setAlertData] = useState(null);
  const { secondaryColor, apiLinks } = useTheme();
  const [gettotalcreditamount, setTotalCreditAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [fileUrl, setFileUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [PSerNum, setPSerNum] = useState(0);
  const [highlightedRowIndex, setHighlightedRowIndex] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [searchTextAccount, setSearchTextAccount] = useState("");
  const [enterCount, setEnterCount] = useState(0);
  const [tableData, setTableData] = useState([
    {
      name: "",
      Description: "",
      credit: "",
    },
  ]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiLinks}/CRVNumber.php`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTimeout(() => {
          console.log("Data:", data);
          setNextItemId(data.num);
        }, 200);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await fetch(`${apiLinks}/CRVNumber.php`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setTimeout(() => {
        console.log("Data:", data);
        setNextItemId(data.num);
      }, 200);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  // useEffect(() => {
  //   setNextItemId("000002");
  // }, []);

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
        datalistAccount.data &&
        datalistAccount.data.find((item) => item.tacccod === formattedValue);
      if (selectedItem) {
        setfrefcoddesc(selectedItem.taccdsc);
        console.log("selectedItem", selectedItem);
      } else {
        console.log("No matching item found");
        setfrefcoddesc("");
      }
    }

    if (name === "Remarks") {
      setftrnrem(upperCaseValue);
    }
  };

  const handleSearchChange = (event) => {
    setHighlightedRowIndex(0);
    const searchcapital = event.target.value.toUpperCase();
    setSearchText(searchcapital);
  };

  const handleDoubleClickpdf = () => {
    if (fileUrl) {
      window.open(fileUrl, "_blank");
    }
  };

  const handlePdfChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      setFileUrl(URL.createObjectURL(file));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const responsedata = {
        // saleid: nextItemId,
        accountcode: CustomerCode.current.value,
        accountDescription: CustomerName.current.value,
        Remarks: Remarks.current.value,
        totalCreditAmount: gettotalcreditamount.replace(/,/g, ""),
        type: "CRV",

        detail1: tableData.map((item) => ({
          account_id: item.name,
          account_description: item.Description,
          // account_credit: item.quantity.replace(/,/g, ""),
          account_credit: (item.quantity || "").replace(/,/g, ""), // Ensure quantity is defined
        })),
      };
      const response = await axios.post(
        `${apiLinks}/CashReceiveVoucher.php`,
        JSON.stringify(responsedata)
        // {
        //   headers: { "Content-Type": "application/json" },
        // }
      );

      console.log(response);
      console.log("responsedata", responsedata);

      if (response.data.error === 200) {
        SaleNo.current.focus();

        fetchData();
        setfrefcod("");
        setfrefcoddesc("");
        setftrnrem("");
        setTableData([
          {
            name: "",
            Description: "",
            credit: "",
          },
        ]);
        // navigate("/MainPage");
        console.log(response.data.message);
        setAlertData({
          type: "success",
          message: `${response.data.message}`,
        });
        setTimeout(() => {
          setAlertData(null);
          // window.location.reload();
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

  const calculateTotals = () => {
    let quantityTotal = 0;
    let amountTotal = 0;
    tableData.forEach((rowData) => {
      const quantity = parseFloat(rowData.quantity || 0);
      quantityTotal += quantity;
    });
    setTotalCreditAmount(
      quantityTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })
    );
    const amountWithCommas = amountTotal.toLocaleString(undefined, {
      minimumFractionDigits: 2,
    });
    // Format the amount with commas using toLocaleString
    setTotalAmount(amountWithCommas); // Format the amount with commas
  };

  const handleInputChange = (event, index) => {
    console.log("tableData", tableData);

    const { name, value } = event.target;
    if (name === "credit") {
      // Convert the value to a string with two decimal places and commas as thousand separators
      const datastring = value.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      console.log("datastring", datastring);
      tableData[index].quantity = datastring;
    }

    const newData = [...tableData];
    newData[index][name] = value;
    setTableData(newData);
    calculateTotals(); // total amount or total quantity ko calculate kerna ka lia
    // Calculate kerna hai sale or quantity ko multiply karke amount ko update karna hai

    // if (name === "quantity" || name === "sale") {
    //   const quantity = parseFloat(newData[index].quantity || 0);

    //   const quantitywithCommas = quantity.toLocaleString(undefined, {
    //     minimumFractionDigits: 2,
    //   });
    //   newData[index].quantity = quantitywithCommas;
    // }
    setTableData(newData);
  };

  const addNewRow = () => {
    setTableData([
      ...tableData,
      {
        name: "",
        Description: "",
        credit: "",

        isEditable: true,
      },
    ]);
  };

  const handleSearchChangeAccount = (event) => {
    const upperCaseValue = event.target.value.toUpperCase();
    setHighlightedRowIndex(0);
    setSearchTextAccount(upperCaseValue);
  };
  const handleDoubleClickAccount = (e) => {
    setHighlightedRowIndex(0);
    setTimeout(() => {
      focusNextInput(SearchBoxAccount);
    }, 100);
    console.log("====== handle double click=======");
    console.log("e.target.value", e.target.value);
    setSearchTextAccount(e.target.value);
    setModalOpenAccount(true);
  };
  const handleDoubleClick = (e) => {
    setTimeout(() => {
      focusNextInput(SearchBox);
    }, 100);
    console.log("====== handle double click=======");
    console.log("e.target.value", e.target.value);
    const upperCaseValue = e.target.value.toUpperCase();
    setHighlightedRowIndex(0);
    setSearchText(upperCaseValue);
    setModalOpen(true);
  };
  const handleCloseModalAccount = () => {
    focusNextInput(USEREF8);

    setHighlightedRowIndex(0);
    setModalOpenAccount(false);
  };
  const handleCloseModal = () => {
    setHighlightedRowIndex(0);
    setModalOpen(false);
  };
  const handleRowClickAccount = (rowData, rowIndex) => {
    focusNextInput(USEREF8);
    console.log("Row Data", rowData);

    setModalOpenAccount(false);
    const updatedTableData = [...tableData];

    updatedTableData[updatedTableData.length - 1] = {
      ...updatedTableData[updatedTableData.length - 1],
      name: rowData.tacccod,
      Description: rowData.taccdsc,
      // Purchase: rowData.tpurrat,
      // Sale: rowData.tsalrat,
      // MRP: rowData.tpurrat,
      // Tax: rowData.tatPersentage,
      // TotalTax: rowData.tax,

      // Amount: calculateAmount(
      //   updatedTableData[updatedTableData.length - 1].quantity,
      //   rowData.tsalrat
      // ),
    };
    // setfrefcod(rowData.tacccod);
    // setfrefcoddesc(rowData.taccdsc);
    setTableData(updatedTableData);
    calculateTotals(); // total amount or total quantity ko calculate kerna ka lia
  };
  const handleRowClick = (rowData, rowIndex) => {
    console.log("handleRowClickAccount", rowData);
    // setColorAccount(rowData.titmcod);

    setModalOpen(false);

    setfrefcod(rowData.tacccod);
    setfrefcoddesc(rowData.taccdsc);

    calculateTotals();
  };
  const handleDeleteRow = (index) => {
    const updatedTableData = [...tableData];
    const deletedRow = updatedTableData.splice(index, 1)[0];
    setTableData(updatedTableData);

    // Ensure gettotalcreditamount is a string
    const totalCreditAmountStr = gettotalcreditamount.toString();
    const newTotalQuantity =
      parseFloat(totalCreditAmountStr.replace(/,/g, "")) - deletedRow.credit;

    console.log("gettotalcreditamount", gettotalcreditamount);
    console.log("deletedRow.credit", deletedRow.credit);
    console.log("newTotalQuantity", newTotalQuantity);

    // Ensure totalAmount is a string
    const totalAmountStr = totalAmount.toString();
    const newTotalAmount =
      parseFloat(totalAmountStr.replace(/,/g, "")) - deletedRow.credit;

    console.log("totalAmount", newTotalAmount);

    const newTotalAmountWithCommas = newTotalAmount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
    });

    setTotalCreditAmount(newTotalQuantity);
    setTotalAmount(newTotalAmountWithCommas);
  };
  const focusNextInput = (ref) => {
    if (ref.current) {
      ref.current.focus();
    }
  };
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
  const formatAccountCode = (value) => {
    const formattedValue = value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d{2})(\d{3})/, "$1-$2-$3");
    if (formattedValue.length === 9) {
      USEREF8.current.focus();
    }
    return formattedValue;
  };
  const handleInputChange1 = (event, rowIndex) => {
    const { name, value } = event.target;
    const updatedTableData = [...tableData];
    console.log("value", value);
    let formattedValue = value.trim().toUpperCase();

    formattedValue = formatAccountCode(formattedValue);

    if (name === "name") {
      if (!formattedValue) {
        updatedTableData[rowIndex] = {
          ...updatedTableData[rowIndex],
          name: "",
          Description: "",
        };
      } else {
        // Find the selected item based on the provided value
        const selectedItem =
          datalistAccount.data &&
          datalistAccount.data.find((item) => item.tacccod === formattedValue);
        console.log("selectedItem:", selectedItem);

        if (selectedItem) {
          // Update the row data based on the selected item
          updatedTableData[rowIndex] = {
            ...updatedTableData[rowIndex],
            name: selectedItem.tacccod,
            Description: selectedItem.taccdsc,
          };
        } else {
          updatedTableData[rowIndex] = {
            ...updatedTableData[rowIndex],
            name: formattedValue,
            Description: "",
          };
        }
      }
    } else {
      // Handle other fields normally
      updatedTableData[rowIndex] = {
        ...updatedTableData[rowIndex],
        [name]: formattedValue,
      };
      if (name === "credit") {
        const credit = parseFloat(updatedTableData[rowIndex].credit || 0);
        updatedTableData[rowIndex].credit = credit.toFixed(2);
        console.log("credit", credit);
      }
    }

    // Update the state with the updated table data
    setTableData(updatedTableData);
    calculateTotals(); // Recalculate totals
  };
  const filteredRows =
    datalistAccount.data &&
    datalistAccount.data.filter(
      (row) =>
        row.tacccod.startsWith("12-01") &&
        ((row.tacccod &&
          row.tacccod.toLowerCase().includes(searchText.toLowerCase())) ||
          (row.taccdsc &&
            row.taccdsc.toLowerCase().includes(searchText.toLowerCase())))
    );

  const filteredRowsAccount =
    datalistAccount.data &&
    datalistAccount.data.filter(
      (row) =>
        !row.tacccod.startsWith("12-01") &&
        ((row.tacccod &&
          row.tacccod
            .toLowerCase()
            .includes(searchTextAccount.toLowerCase())) ||
          (row.taccdsc &&
            row.taccdsc
              .toLowerCase()
              .includes(searchTextAccount.toLowerCase())))
    );

  const handleInputChangefetchdata = async (e) => {
    console.log("show the value is:", e.target.value);
    let inputValue = e.target.value;
    setNextItemId(inputValue);
    if (inputValue.length > 6) {
      return;
    }
  };

  const handleInputChangefetchdatafunction = (value) => {
    const data = {
      invNumber: value,
      type: "CRV",
    };
    const formData = new URLSearchParams(data).toString();

    axios
      .post(`${apiLinks}/PaymentAndReceiveIncoiceDetail.php`, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        console.log(response.data[0], "sdjklfjs");
        const matchedItem = response.data[0];
        if (matchedItem) {
          setfrefcod(matchedItem.trefcod);
          setfrefcoddesc(matchedItem.ttrnrem);
          setftrnrem(matchedItem.tcstnam);
          setTotalCreditAmount(matchedItem.ttrntot);

          if (matchedItem.detail && matchedItem.detail.length > 0) {
            const newTableData = matchedItem.detail.map((detail) => ({
              name: detail.tacccod,
              Description: detail.ttrndsc,
              credit: detail.tdbtamt,
            }));
            setTableData(newTableData);
            console.log("Matched Item:", matchedItem.ftrnrem);
            console.log("New Table Data:", newTableData);
          } else {
            setTableData([
              {
                name: "",
                Description: "",
                credit: "",
              },
            ]);
          }
        } else {
          console.log("No matching item found");
          setfrefcod("");
          setfrefcoddesc("");
          setftrnrem("");
          setTotalCreditAmount(0);
          setTableData([
            {
              name: "",
              Description: "",
              credit: "",
            },
          ]);
        }
      });
  };

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
  const handleBlurRVC = (e) => {
    // Convert nextItemId to string before calling padStart
    const value = String(nextItemId).padStart(6, "0");
    setNextItemId(value);
    console.log("value", value);
    setTimeout(() => {
      handleInputChangefetchdatafunction(value);
    }, 500);
  };

  const handleSave = () => {
    handleFormSubmit();
  };
  const handleClear = () => {
    setfrefcod("");

    setftrnrem("  ");
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

  const handleNavigation = (e, rowIndex, colIndex) => {
    const totalCols = 5; // Update this if you have a different number of columns
    const currentInput = e.target;
    let nextInput;

    switch (e.key) {
      case "ArrowUp":
        nextInput = document.querySelector(
          `input[data-row-index="${
            rowIndex - 1
          }"][data-col-index="${colIndex}"]`
        );
        break;
      case "ArrowDown":
        nextInput = document.querySelector(
          `input[data-row-index="${
            rowIndex + 1
          }"][data-col-index="${colIndex}"]`
        );
        break;
      case "ArrowLeft":
        nextInput = document.querySelector(
          `input[data-row-index="${rowIndex}"][data-col-index="${
            colIndex - 1
          }"]`
        );
        break;
      case "ArrowRight":
        nextInput = document.querySelector(
          `input[data-row-index="${rowIndex}"][data-col-index="${
            colIndex + 1
          }"]`
        );
        break;
      default:
        return;
    }

    if (nextInput) {
      nextInput.focus();
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
            <div className="col-md-12 form-CashReciptVoucher-container">
              <Nav
                className="col-12"
                style={{
                  backgroundColor: "#3368b5",
                  color: "#fff",
                  height: "24px",
                  display: "flex",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  Cash Receipt Vouchers
                </div>
              </Nav>

              <Form onSubmit={handleFormSubmit} style={{ marginTop: "1%" }}>
                <div className="row ">
                  <div className="col-9">
                    <div className="row">
                      <div className="col-sm-2 label-item">RVR #:</div>
                      <div className="col-sm-3">
                        <Form.Control
                          id="nextItemId"
                          placeholder="Code"
                          name="nextItemId"
                          className="form-control-item"
                          value={nextItemId}
                          maxLength={6}
                          ref={SaleNo}
                          inputMode="numeric"
                          onFocus={(e) => e.target.select()}
                          // onBlur={handleBlurRVC}
                          style={{ width: "80px" }}
                          onChange={(e) => handleInputChangefetchdata(e)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleBlurRVC();
                              handleEnterKeyPress(DATE, e);
                            }
                          }}
                          onInput={(e) => {
                            e.target.value = e.target.value.replace(
                              /[^0-9]/g,
                              ""
                            );
                          }}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-2 label-item">A/C :</div>
                      <div className="col-sm-8" style={{ display: "flex" }}>
                        <Form.Control
                          type="text"
                          id="CustomerCode"
                          placeholder="Code"
                          name="CustomerCode"
                          className="form-control-item"
                          ref={CustomerCode}
                          value={getfrefcod}
                          style={{ width: "90px", marginRight: "10px" }}
                          onChange={handleInputChange3}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              const upperCaseValue =
                                e.target.value.toUpperCase();
                              const selectedItem = datalistAccount.data.find(
                                (item) => item.tacccod === upperCaseValue
                              );

                              if (selectedItem) {
                                console.log("selectedItem:", selectedItem);
                                handleEnterKeyPress(Remarks, e);
                              } else if (upperCaseValue.length < 9) {
                                handleDoubleClick(e);
                                setAlertData({
                                  type: "error",
                                  message: `Please enter a valid account code`,
                                });
                                setTimeout(() => {
                                  setAlertData(null);
                                }, 1000);
                              } else {
                                handleEnterKeyPress(Remarks, e);
                              }
                            }
                          }}
                          onFocus={(e) => e.target.select()}
                          onDoubleClick={(e) => {
                            if (e.target.value.length <= 9) {
                              handleDoubleClick(e);
                              setTimeout(() => {
                                focusNextInput(SearchBox);
                              }, 100);
                            }
                          }}
                        />
                        <Form.Control
                          type="text"
                          id="CustomerName"
                          placeholder="Customer"
                          name="CustomerName"
                          className="form-control-item"
                          disabled
                          ref={CustomerName}
                          value={getfrefcoddes}
                          onFocus={(e) => e.target.select()}
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
                          value={getftrnrem}
                          onChange={handleInputChange3}
                          onFocus={(e) => e.target.select()}
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

                    <div className="row">
                      <div className="col-sm-12 d-flex justify-content-between align-items-center">
                        <input
                          type="file"
                          id="pdfInput"
                          style={{ display: "none" }}
                          accept=".pdf"
                          onChange={handlePdfChange}
                        />
                        {fileName ? (
                          <label
                            onDoubleClick={handleDoubleClickpdf}
                            style={{
                              display: "inline-block",
                              border: "1px solid #FFFFFF",
                              width: "150px",
                              height: "25px",
                              fontSize: "11px",
                              color: "white",
                              backgroundColor: "green",
                              textAlign: "center",
                              lineHeight: "25px",
                              cursor: "pointer",
                            }}
                          >
                            {fileName}
                          </label>
                        ) : (
                          <label
                            htmlFor="pdfInput"
                            style={{
                              display: "inline-block",
                              border: "1px solid #FFFFFF",
                              width: "150px",
                              height: "25px",
                              fontSize: "11px",
                              color: "white",
                              backgroundColor: "red",
                              textAlign: "center",
                              lineHeight: "25px",
                              cursor: "pointer",
                            }}
                          >
                            Upload
                          </label>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div
                    className="col-12 firsttable-container"
                    style={{ height: "242px", fontSize: "11px" }}
                  >
                    <table className="custom-table">
                      <thead>
                        <tr>
                          <th
                            class="sticky-header"
                            style={{
                              width: firstColWidth,
                              textAlign: "center",
                              fontWeight: "bold",
                            }}
                          >
                            Sr#
                          </th>
                          <th
                            class="sticky-header"
                            style={{
                              width: secondColWidth,
                              textAlign: "center",
                              fontWeight: "bold",
                            }}
                          >
                            A/C Code
                          </th>
                          <th
                            class="sticky-header"
                            style={{
                              width: thirdColWidth,
                              textAlign: "center",
                              fontWeight: "bold",
                            }}
                          >
                            Description
                          </th>
                          <th
                            class="sticky-header"
                            style={{
                              width: fourthColWidth,
                              textAlign: "center",
                              fontWeight: "bold",
                            }}
                          >
                            Credit
                          </th>
                          <th
                            class="sticky-header"
                            style={{
                              width: fifthColWidth,
                              textAlign: "center",
                              fontWeight: "bold",
                            }}
                          >
                            Delete
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableData.map((rowData, rowIndex) => (
                          <tr
                            key={rowIndex}
                            ref={
                              rowIndex === tableData.length - 1
                                ? lastRowRef
                                : null
                            }
                          >
                            <td
                              style={{
                                border: "1px solid #000",
                                padding: "8px",
                                textAlign: "center",
                                width: firstColWidth,
                              }}
                            >
                              {rowIndex + 1}
                            </td>
                            <td
                              style={{
                                border: "1px solid #000",
                                padding: "8px",
                                textAlign: "center",
                                width: secondColWidth,
                              }}
                            >
                              <input
                                ref={USEREF4}
                                type="text"
                                name="name"
                                value={rowData.name}
                                onChange={(e) =>
                                  handleInputChange1(e, rowIndex)
                                }
                                style={{
                                  width: "100%",
                                  border: "none",
                                  backgroundColor: "transparent",
                                  textAlign: "center",
                                }}
                                data-row-index={rowIndex}
                                data-col-index={1}
                                onFocus={(e) => e.target.select()}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    if (PSerNum !== rowIndex) {
                                      handleEnterKeyPress(USEREF8, e);

                                      setTimeout(() => {
                                        document
                                          .querySelector(
                                            `input[data-row-index="${rowIndex}"][data-col-index="3"]`
                                          )
                                          .focus();
                                      }, 100);
                                    } else {
                                      handleNavigation(e, rowIndex, 1);
                                      const upperCaseValue =
                                        e.target.value.toUpperCase();
                                      const selectedItem =
                                        datalistAccount.data.find(
                                          (item) =>
                                            item.tacccod === upperCaseValue
                                        );
                                      console.log(
                                        "Enter Pressed",
                                        upperCaseValue,
                                        selectedItem
                                      );
                                      if (selectedItem) {
                                        console.log(
                                          "selectedItem:",
                                          selectedItem
                                        );
                                        handleEnterKeyPress(USEREF8, e);
                                      } else if (upperCaseValue.length < 9) {
                                        handleDoubleClickAccount(e);
                                        setAlertData({
                                          type: "error",
                                          message: `Please enter a valid account code`,
                                        });
                                        setTimeout(() => {
                                          setAlertData(null);
                                        }, 3000);
                                      } else {
                                        handleEnterKeyPress(USEREF8, e);
                                      }
                                    }
                                  } else {
                                    handleNavigation(e, rowIndex, 1);
                                  }
                                }}
                                onDoubleClick={(e) => {
                                  if (e.target.value.length <= 9) {
                                    handleDoubleClickAccount(e);
                                  }
                                }}
                              />
                            </td>
                            <td
                              style={{
                                border: "1px solid #000",
                                padding: "8px",
                                textAlign: "center",
                                width: thirdColWidth,
                              }}
                            >
                              <input
                                type="text"
                                name="Description"
                                value={rowData.Description}
                                onChange={(e) =>
                                  handleInputChange1(e, rowIndex)
                                }
                                data-row-index={rowIndex}
                                data-col-index={2}
                                onKeyDown={(e) =>
                                  handleNavigation(e, rowIndex, 2)
                                }
                                onFocus={(e) => e.target.select()}
                                style={{
                                  width: "100%",
                                  border: "none",
                                  backgroundColor: "transparent",
                                  textAlign: "left",
                                }}
                              />
                            </td>
                            <td
                              style={{
                                border: "1px solid #000",
                                padding: "8px",
                                width: fourthColWidth,
                                textAlign: "center",
                              }}
                            >
                              <input
                                name="credit"
                                value={rowData.credit}
                                onChange={(e) => handleInputChange(e, rowIndex)}
                                ref={USEREF8}
                                data-row-index={rowIndex}
                                data-col-index={3}
                                onKeyDown={(e) => {
                                  handleNavigation(e, rowIndex, 3);
                                  const inputValue = parseFloat(e.target.value);

                                  if (e.key === "Enter" && inputValue > 0) {
                                    e.preventDefault();

                                    if (
                                      rowData.name.length >= 9 &&
                                      rowData.Description.length > 2 &&
                                      rowData.credit > 0 &&
                                      rowData.credit !== 0 &&
                                      PSerNum === rowIndex
                                    ) {
                                      console.log("create row ", PSerNum);
                                      addNewRow();
                                      setPSerNum(PSerNum + 1);

                                      setTimeout(() => {
                                        handleEnterKeyPress(USEREF4, e);

                                        if (lastInputRef.current) {
                                          lastInputRef.current.focus();
                                        }
                                      }, 200);
                                    } else {
                                      console.log(
                                        "PSerNum ",
                                        PSerNum,
                                        rowIndex
                                      );
                                      handleEnterKeyPress(USEREF4, e);
                                      setTimeout(() => {
                                        document
                                          .querySelector(
                                            `input[data-row-index="${rowIndex}"][data-col-index="1"]`
                                          )
                                          .focus();
                                      }, 100);
                                    }
                                  }
                                }}
                                onFocus={(e) => e.target.select()}
                                style={{
                                  width: "100%",
                                  border: "none",
                                  backgroundColor: "transparent",
                                  textAlign: "right",
                                }}
                              />
                            </td>
                            {tableData.length - 1 ? (
                              <td
                                style={{
                                  border: "1px solid #000",
                                  padding: "8px",
                                  textAlign: "center",
                                  width: fifthColWidth,
                                }}
                              >
                                <img
                                  onClick={() => handleDeleteRow(rowIndex)}
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
                                  width: fifthColWidth,
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
                            {Array.from({ length: 5 }).map((_, colIndex) => (
                              <td key={`blank-${index}-${colIndex}`}>&nbsp;</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>

                      <tfoot>
                        <tr
                          style={{
                            fontSize: "11px",
                          }}
                        >
                          <th
                            className="sticky-footer"
                            style={{
                              textAlign: "center",
                              width: firstColWidth,
                            }}
                          ></th>
                          <th
                            className="sticky-footer"
                            style={{
                              width: secondColWidth,
                            }}
                          ></th>
                          <th
                            className="sticky-footer"
                            style={{
                              width: thirdColWidth,
                            }}
                          ></th>
                          <th
                            className="sticky-footer"
                            style={{
                              width: fourthColWidth,
                              textAlign: "right",
                            }}
                          >
                            {gettotalcreditamount.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                            })}
                          </th>
                          <th
                            className="sticky-footer"
                            style={{
                              width: fifthColWidth,
                            }}
                          ></th>
                        </tr>
                      </tfoot>
                    </table>
                  </div>

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
                        <strong>Select Account</strong>
                      </div>
                      <div className="text-end col-4">
                        <Link onClick={handleCloseModal} className="topBtn">
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
                                    <td style={{ width: "30%" }}>
                                      {row.tacccod}
                                    </td>
                                    <td
                                      style={{
                                        width: secondColWidthModal,
                                        textAlign: "left",
                                      }}
                                    >
                                      {row.taccdsc}
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
                            ></th>
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
                        <strong>Select Accounts</strong>
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
                            ref={SearchBoxAccount}
                            placeholder="Search..."
                            value={searchTextAccount}
                            onChange={handleSearchChangeAccount}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                if (enterCount === 0) {
                                  // fetchDataAndDisplay();
                                  setEnterCount(1);
                                } else if (enterCount === 1) {
                                  focusNextInput(USEREF8);
                                  // fetchDataAndDisplay();
                                  const selectedRowData =
                                    filteredRowsAccount[highlightedRowIndex];

                                  // handleRowClickAccount(
                                  //   selectedRowData,
                                  //   highlightedRowIndex
                                  // );
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
                          {!filteredRowsAccount ||
                          filteredRowsAccount.length === 0 ? (
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
                              {filteredRowsAccount &&
                                filteredRowsAccount
                                  // .filter((row) =>
                                  //   row.acc_code.startsWith("13-")
                                  // )
                                  .map((row, index) => (
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
                                      onClick={() =>
                                        handleRowClickAccount(row, index)
                                      }
                                    >
                                      <td style={{ width: firstColWidthModal }}>
                                        {row.tacccod}
                                      </td>
                                      <td
                                        style={{
                                          width: secondColWidthModal,
                                          textAlign: "left",
                                        }}
                                      >
                                        {row.taccdsc}
                                      </td>
                                    </tr>
                                  ))}
                              {Array.from({
                                length: Math.max(
                                  0,
                                  19 - filteredRowsAccount.length
                                ),
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
                            ></th>
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
              </div>
            </div>
          </div>
          <br />
        </div>
      </div>
    </>
  );
}

export default Cash_Receipt_Voucher;
