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
import "./Item_Sale.css";
import { QRCodeSVG } from "qrcode.react";
import { Modal } from "react-bootstrap"; // Assume you're using react-bootstrap for modal
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "../../../ThemeContext";
import { fetchItem } from "../../Redux/action";
import Bin from "../../../image/bin.png";
function Item_Sale() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const datalist = useSelector((state) => state.itemlist);
  useEffect(() => {
    console.log("datalist", datalist.data);
      dispatch(fetchItem());
    }, [dispatch]);
  useEffect(() => {
    dispatch(fetchItem());
    setTimeout(() => {
      console.log("datalistdatalistdatalistdatalist", datalist);
    }, 3000);
  }, [dispatch]);
  
 




  const handleInputChange3 = (e) => {
    const { name, value } = e.target;
    const upperCaseValue = value.toUpperCase();
    e.target.value = upperCaseValue;
  };
  const SaleNo = useRef(null);
  const CustomerCode = useRef(null);
  const CustomerName = useRef(null);
  const Remarks = useRef(null);
  const Mobile1 = useRef(null);
  const Mobile2 = useRef(null);
  const Name = useRef(null);
  const Address1 = useRef(null);
  const Address2 = useRef(null);
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
        customercode: CustomerCode.current.value,
        CustomerDescription: CustomerName.current.value,
        Remarks: Remarks.current.value,
        Mobile1: Mobile1.current.value,
        Mobile2: Mobile2.current.value,
        Name: Name.current.value,
        Address1: Address1.current.value,
        Address2: Address2.current.value,
        CNIC: Cnic.current.value,
        NTN: NTN.current.value,
        STN: STN.current.value,
        totalAmount: totalAmount,
        totalQuantity: totalQuantity,
        type: "Sale",

        detail1: tableData.map((item) => ({
          item_id: item.name,
          item_description: item.Description,
          item_pur: item.Purchase,
          item_sale: item.Sale,
          item_quantity: item.quantity,
          item_amount: item.Amount,
          item_MRP: item.MRP,
          item_Tax: item.Tax,
          item_TotalTax: item.TotalTax,

        })),
      };

      // const response = await axios.post(
      //   `${apiLinks}/Purchase.php`,
      //   JSON.stringify(requestData),
      //   {
      //     headers: { "Content-Type": "application/json" },
      //   }
      // );

      // console.log(response);
      console.log(responsedata);

      // if (response.data.error === 200) {
      //   // navigate("/MainPage");
      //   console.log(response.data.message);
      //   setAlertData({
      //     type: "success",
      //     message: `${response.data.message}`,
      //   });
      //   setTimeout(() => {
      //     setAlertData(null);
      //     window.location.reload();
      //   }, 1000);
      // } else {
      //   console.log(response.data.message);

      //   setAlertData({
      //     type: "error",
      //     message: `${response.data.message}`,
      //   });
      //   setTimeout(() => {
      //     setAlertData(null);
      //   }, 2000);
      // }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      
    }
  };


  const [gettotaltax , settotaltax] = useState(0);
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
    const amountWithCommas = amountTotal.toLocaleString(undefined, {minimumFractionDigits: 2});
    // Format the amount with commas using toLocaleString
    setTotalAmount(amountWithCommas); // Format the amount with commas
  };


  const [tableData, setTableData] = useState([
    { name: "", Description: "", Purchase: "", Sale: "", Amount: "",MRP:"",Tax:"",TotalTax:"",quantity:"" },
  ]);
  const handleInputChange = (event, index) => {
console.log("tableData",tableData)

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
      const amountWithCommas = amount.toLocaleString(undefined, {minimumFractionDigits: 2});
      const quantitywithCommas = quantity.toLocaleString(undefined, {minimumFractionDigits: 2});
      newData[index].Amount = amountWithCommas;
      newData[index].quantity = quantitywithCommas;
  }
    setTableData(newData);
  };

  const calculateAmount = (quantity, Sale) => {
    const parsedQuantity = parseFloat(quantity) || 0;
    const parsedPurchase = parseFloat(Sale) || 0;
    return (parsedQuantity * parsedPurchase);
  };

 
  const [itemdata, setitemdata] = useState([]);


  const [searchText, setSearchText] = useState("");
  const [filteredItemData, setFilteredItemData] = useState([]);

  useEffect(() => {
    // Filter the itemdata array based on TItmDsc and searchText
    const filteredData = itemdata.filter((item) =>
      item.titmdsc.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredItemData(filteredData);
  }, [searchText, itemdata]);
  useEffect(() => {
    if (datalist.data && Array.isArray(datalist.data)) {
      const transformedData = datalist.data.map((item) => ({
        titmcod: item.titmcod,
        titmdsc: item.titmdsc,
        tpurrat: item.tpurrat,
        tsalrat: item.tsalrat,
        tatPersentage:item.tatPersentage,
        tax:item.tax,
        // titmsts: item.titmsts,
      }));
      console.log("transformedDatatransformedDatatransformedDatatransformedData", transformedData);
      setitemdata(transformedData);
        setLength(transformedData.length);
    }
}, [datalist.data]);
  // useEffect(() => {
  //   fetch(`https://crystalsolutions.com.pk/umair_electronic/web/ItemList.php`)
  //     .then((response) => response.json())
  //     .then((apiData) => {
  //       const transformedData = apiData.data.map((item) => ({
  //         titmcod: item.titmcod,
  //         titmdsc: item.titmdsc,
  //         tpurrat: item.tpurrat,
  //         tsalrat: item.tsalrat,
  //         tatPersentage:item.tatPersentage,
  //         tax:item.tax,
  //         // titmsts: item.titmsts,
  //       }));
  //       console.log("transformedDatatransformedDatatransformedDatatransformedData", transformedData);
  //       setitemdata(transformedData);

  //       console.log(apiData); // Log the fetched data
  //     })
  //     .catch((error) => console.error(error));
  // }, []);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  // row ko add kerna ka lia 
  const addNewRow = () => {
    setTableData([
      ...tableData,
      { name: "", Description: "", Purchase: "", Sale: "", Amount: "" ,MRP:"",Tax:"",TotalTax:"" , isEditable: true, 
    },
    ]);
  };

  const [getcolor, setColor] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  // modal ko open kerta hai or text ko set kerta hai search ma show kerwana ka lia
  const handleDoubleClick = (e) => {
    console.log("====== handle double click=======");
    console.log("e.target.value", e.target.value);
    setSearchText(e.target.value);
    setModalOpen(true);
  };

  // close the item list modal 
  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const handleRowClick = (rowData, rowIndex) => {
    console.log("Row Data", rowData);
    setColor(rowData.titmcod);
    
    setModalOpen(false);
    const updatedTableData = [...tableData];

      updatedTableData[updatedTableData.length - 1] = {
        ...updatedTableData[updatedTableData.length - 1],
        name: rowData.titmcod,
        Description: rowData.titmdsc,
        Purchase: rowData.tpurrat,
        Sale: rowData.tsalrat,
        MRP: rowData.tpurrat,
        Tax: rowData.tatPersentage,
        TotalTax: rowData.tax,

        Amount: calculateAmount(
          updatedTableData[updatedTableData.length - 1].quantity,
          rowData.tsalrat
        ),
      };

    // Update the state with the modified tableData
    setTableData(updatedTableData);
    calculateTotals();// total amount or total quantity ko calculate kerna ka lia
  };

  const handleDeleteRow = (index) => {
    const updatedTableData = [...tableData];
    const deletedRow = updatedTableData.splice(index, 1)[0]; // osi row ko delete 
    setTableData(updatedTableData);
    const newTotalQuantity = totalQuantity - deletedRow.quantity;
    console.log("deletedRow.quantity", deletedRow.quantity);
    console.log("deletedRow.Sale", deletedRow.Sale);
    const newTotalAmount = parseFloat(totalAmount.replace(/,/g, '')) - (deletedRow.quantity * deletedRow.Sale);
    console.log("totalAmount", newTotalAmount);
    const newTotalAmountwithcommas = newTotalAmount.toLocaleString(undefined, {minimumFractionDigits: 2});
    setTotalQuantity(newTotalQuantity);
    setTotalAmount(newTotalAmountwithcommas);
  };


  const USEREF4 = useRef(null);
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
console.log("value",value) 
if (name === "name") {
  // Check if the input value is empty
  if (!value) {
      // Clear the data in the row if the input value is empty
      updatedTableData[rowIndex] = {
          ...updatedTableData[rowIndex],
          name: "", // or reset to ""
          Description: "", // or reset to ""
          Purchase: 0, // or reset to 0
          Sale: 0, // or reset to 0
          MRP: 0, // or reset to 0
          Tax: 0, // or reset to 0
          TotalTax: 0, // or reset to 0
          Amount: 0, // or reset to 0
      };
  } else {
      // Find the selected item based on the provided value
      const selectedItem = datalist.data.find((item) => item.titmcod === value);
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
          // If no matching item is found, set all fields in the row to empty or zero values
          updatedTableData[rowIndex] = {
              ...updatedTableData[rowIndex],
              name: value, // or reset to ""
              Description: "", // or reset to ""
              Purchase: 0, // or reset to 0
              Sale: 0, // or reset to 0
              MRP: 0, // or reset to 0
              Tax: 0, // or reset to 0
              TotalTax: 0, // or reset to 0
              Amount: 0, // or reset to 0
          };
      }
  }
}

else {
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
  const filteredRows = itemdata.filter(
    (row) =>
      (row.titmcod &&
        row.titmcod.toLowerCase().includes(searchText.toLowerCase())) ||
      (row.titmdsc &&
        row.titmdsc.toLowerCase().includes(searchText.toLowerCase()))
  );

  
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
            <div className="col-md-12 form-itemsale-container">
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
                  <i class="fa-solid fa-regular fa-upload fa-lg topBtn" 
                      title="Save"
                  
                  ></i>
                    {/* <i
                      // className="fa-solid fa-paper-plane fa-lg topBtn"
                      className="fa-solid fa-floppy-disk fa-lg topBtn"

                      title="Save"
                    ></i> */}
                  </Link>

                  <i className="fa fa-refresh fa-lg topBtn" title="Refresh"></i>
                </div>
                <div style={{ fontSize: "14px" }} className="col-4 text-center">
                  <strong>Item Sale</strong>
                </div>
                <div className="text-end col-4">
                  <Link to="/MainPage" className="topBtn">
                    <i className="fa fa-close fa-lg crossBtn"></i>
                  </Link>
                </div>
              </Nav>
              <Form onSubmit={handleFormSubmit} style={{marginTop:'1%'}}>
              <div className="row ">
                    <div className="col-7">
                      <div className="row">
                        <div className="col-sm-2 label-item">Sale #:</div>
                        <div className="col-sm-4">
                          <Form.Control
                            type="text"
                            id="code"
                            placeholder="Code"
                            name="itmIdd"
                            className="form-control-item"
                            ref={SaleNo}
                            onKeyDown={(e) => handleEnterKeyPress(CustomerCode, e)}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-2 label-item">Customer:</div>
                        <div className="col-sm-8" style={{ display: "flex" }}>
                          <Form.Control
                            type="text"
                            id="code"
                            placeholder="Code"
                            name="Description"
                            className="form-control-item"
                            ref={CustomerCode}
                            style={{ width: "100px" }}
                            onChange={handleInputChange3}
                            onKeyDown={(e) => handleEnterKeyPress(CustomerName, e)}
                          />
                          <Form.Control
                            type="text"
                            id="code"
                            placeholder="Customer"
                            name="Description"
                            className="form-control-item"
                            ref={CustomerName}
                            // style={{ width: "700px" }}
                            onChange={handleInputChange3}
                            onKeyDown={(e) => handleEnterKeyPress(Remarks, e)}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-2 label-item">Remarks:</div>
                        <div className="col-sm-8" style={{ display: "flex" }}>
                          <Form.Control
                            // as="textarea"
                            id="remarks"
                            // rows={2}
                            placeholder="Remarks"
                            name="remarks"
                            className="form-control-item"
                            ref={Remarks}
                            onChange={handleInputChange3}
                            onKeyDown={(e) => handleEnterKeyPress(Mobile1, e)}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-2 label-item">Mobile:</div>
                        <div className="col-sm-8" style={{ display: "flex" }}>
                          <Form.Control
                            type="text"
                            id="code"
                            placeholder="Mobile"
                            name="Mobile"
                            className="form-control-item"
                            ref={Mobile1}
                            style={{ width: "150px" }}
                            onChange={handleInputChange3}
                            onKeyDown={(e) => handleEnterKeyPress(Mobile2, e)}
                          />
                          <Form.Control
                            type="text"
                            id="code"
                            placeholder="Mobile"
                            name="Mobile"
                            className="form-control-item"
                            ref={Mobile2}
                            style={{ width: "150px" }}
                            onChange={handleInputChange3}
                            onKeyDown={(e) => handleEnterKeyPress(Name, e)}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-2 label-item">Name:</div>
                        <div className="col-sm-10" style={{ display: "flex" }}>
                          <Form.Control
                            type="text"
                            id="code"
                            placeholder="Name"
                            name="Mobile"
                            className="form-control-item"
                            ref={Name}
                            // style={{ height: "22px"}}
                            onChange={handleInputChange3}
                            onKeyDown={(e) => handleEnterKeyPress(Address1, e)}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-2 label-item">Address:</div>
                        <div className="col-sm-10" style={{ display: "flex" }}>
                          <Form.Control
                            type="text"
                            id="code"
                            placeholder="Address1"
                            name="Mobile"
                            className="form-control-item"
                            ref={Address1}
                            // style={{ height: "22px"}}

                            onChange={handleInputChange3}
                            onKeyDown={(e) => handleEnterKeyPress(Address2, e)}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-2 label-item"></div>
                        <div className="col-sm-10" style={{ display: "flex" }}>
                          <Form.Control
                            type="text"
                            id="code"
                            placeholder="Address2"
                            name="Mobile"
                            className="form-control-item"
                            ref={Address2}
                            // style={{ height: "22px"}}

                            onChange={handleInputChange3}
                            onKeyDown={(e) => handleEnterKeyPress(Cnic, e)}
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-sm-2 label-item">CNIC:</div>
                        <div className="col-sm-5" style={{ display: "flex" }}>
                          <Form.Control
                            type="text"
                            id="code"
                            placeholder="CNIC"
                            name="CNIC"
                            className="form-control-item"
                            ref={Cnic}
                            // style={{ height: "22px"}}

                            onChange={handleInputChange3}
                            onKeyDown={(e) => handleEnterKeyPress(NTN, e)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-5">
                      <div className="row">
                        <div className="col-7">
                          <div className="row">
                            <QRCodeSVG value={randomData} size={110} />
                          </div>
                          <div className="row">
                            <div className="col-sm-2"></div>
                            <div className="col-sm-10">
                            <Form.Control
                              type="text"
                              id="code"
                              placeholder=""
                              name="Mobile"
                              className="form-control-item"
                              ref={Customer}
                              onChange={handleInputChange3}
                              onKeyDown={(e) => handleEnterKeyPress(Company, e)}
                            />
                            </div>
                          </div>
                          
                          <div className="row">
                            <div className="col-sm-2 label-item">NTN:</div>
                            <div
                              className="col-sm-10"
                              style={{ display: "flex" }}
                            >
                              <Form.Control
                                type="text"
                                id="code"
                                placeholder="NTN"
                                name="NTN"
                                className="form-control-item"
                                ref={NTN}
                                // style={{width:'170px'}}
                                onChange={handleInputChange3}
                                onKeyDown={(e) =>
                                  handleEnterKeyPress(STN, e)
                                }
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-2 label-item">STN:</div>
                            <div
                              className="col-sm-10"
                              style={{ display: "flex" }}
                            >
                              <Form.Control
                                type="text"
                                id="code"
                                placeholder="NTN/STN"
                                name="STN"
                                className="form-control-item"
                                ref={STN}
                                // style={{width:'175px'}}

                                onChange={handleInputChange3}
                                onKeyDown={(e) =>
                                  handleEnterKeyPress(USEREF4, e)
                                }
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-5">
                          <div className="row">
                            <div className="col-sm-2 label-item">Date:</div>
                            <div
                              className="col-sm-10"
                              style={{ display: "flex" }}
                            >
                              <Form.Control
                                type="text"
                                id="code"
                                placeholder="Date"
                                disabled
                                className="form-control-item"
                                value={formattedDate}
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-2 label-item">Time:</div>
                            <div
                              className="col-sm-10"
                              style={{ display: "flex" }}
                            >
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
                    </div>
                  </div>

                  <div className="row">
                    <div
                      className="col-12 firsttable-container"
                      style={{height:'225px',fontSize:'11px'}}
                    >
                
                      <MDBTable
                        responsive
                        striped
                        bordered
                        hover
                        maxHeight="40vh"
                      >
                        {/* <MDBTableHead > */}
                        <tr>
  <th class="sticky-header" style={{width:'10px',fontWeight:'bold' ,borderRight:'1px solid black'}}>Sr#</th>
  <th class="sticky-header" style={{fontWeight:'bold',borderRight:'1px solid black'}}>Item Code</th>
  <th class="sticky-header" style={{fontWeight:'bold',borderRight:'1px solid black'}}>Description</th>
  <th class="sticky-header" style={{fontWeight:'bold',borderRight:'1px solid black'}}>Pur Rate</th>
  <th class="sticky-header" style={{fontWeight:'bold',borderRight:'1px solid black'}}>Sale Rate</th>
  <th class="sticky-header" style={{fontWeight:'bold',borderRight:'1px solid black'}}>Qnty</th>
  <th class="sticky-header" style={{fontWeight:'bold',borderRight:'1px solid black'}}>Amount</th>
  <th class="sticky-header" style={{fontWeight:'bold',borderRight:'1px solid black'}}>Unit MRP</th>
  <th class="sticky-header" style={{fontWeight:'bold',borderRight:'1px solid black'}}>Tax%</th>
  <th class="sticky-header" style={{fontWeight:'bold',borderRight:'1px solid black'}}>Total Tax</th>
  <th class="sticky-header" style={{fontWeight:'bold',borderRight:'1px solid black'}}>Delete</th>
</tr> 
                          
                        {/* </MDBTableHead> */}
                        
                        <MDBTableBody >
                          {tableData.map((rowData, index) => (
          <tr key={index} ref={index === tableData.length - 1 ? lastRowRef : null}>
          <td
                                style={{
                                  border: "1px solid #000",
                                  padding: "8px",
                                  textAlign: "center",
                                  width: "2%",

                                }}
                              >
                                {index + 1}
                              </td>
                              <td
                                style={{
                                  border: "1px solid #000",
                                  padding: "8px",
                                  textAlign: "center",
                                  width: "10%",

                                }}
                              >
                                <input
                                  type="text"
                                  name="name"
                                  // placeholder="Code"
                                  value={rowData.name}
                                  // onDoubleClick={handleDoubleClick}
                                  onChange={(e) => handleInputChange1(e, index)}
                                  style={{
                                    width: "100%",
                                    border: "none",
                                    backgroundColor: "transparent",
                                    textAlign: "center",
                                  }}
                                  onKeyDown={(e) => {
  if (e.key === "Enter") {
    handleDoubleClick(e);
  handleEnterKeyPress(USEREF8, e);

  }
}}
                                  ref={USEREF4}
                                  // ref={index === tableData.length - 1 ? lastInputRef : null}
                                />
                              </td>
                              
                              <td
                                style={{
                                  border: "1px solid #000",
                                  padding: "8px",
                                  textAlign: "center",
                                  width: "20%",
                                }}
                              >
                                
                                <input
                                  type="text"
                                  name="Desctiption"
                                  // placeholder="Description"
                                  value={rowData.Description}
                                  onChange={(e) => handleInputChange1(e, index)}
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
                                  textAlign: "center",
                                  width: "8%",
                                }}
                              >
                                <input
                                  type="text"
                                  name="Purchase"
                                  // placeholder="Purchase"
                                  value={rowData.Purchase}
                                  onChange={(e) => handleInputChange1(e, index)}
                                  style={{
                                    width: "100%",
                                    border: "none",
                                    backgroundColor: "transparent",
                                    textAlign: "right",
                                  }}
                                  // onKeyDown={(e) =>
                                  //   handleEnterKeyPress(USEREF7, e)
                                  // }
                                  // ref={USEREF6}
                                />
                              </td>

                              <td
                                style={{
                                  border: "1px solid #000",
                                  padding: "8px",
                                  width: "8%",

                                  textAlign: "center",
                                  background: "#f5f5f5",
                                }}
                              >
                                <input
                                  type="text"
                                  name="Sale"
                                  // placeholder="Sale"
                                  value={rowData.Sale}
                                  onChange={(e) => handleInputChange1(e, index)}
                                  style={{
                                    width: "100%",
                                    border: "none",
                                    backgroundColor: "transparent",
                                    textAlign: "right",
                                  }}
                                  // onKeyDown={(e) =>
                                  //   handleEnterKeyPress(USEREF8, e)
                                  // }
                                  // ref={USEREF7}
                                />
                              </td>
                              <td
                                style={{
                                  border: "1px solid #000",
                                  padding: "8px",
                                  width: "8%",

                                  textAlign: "center",
                                  background: "#f5f5f5",
                                }}
                              >
                                <input
  // type="number"
  name="quantity"
  // placeholder="Quantity"
  value={rowData.quantity}
  onChange={(e) => handleInputChange(e, index)}
  // onBlur={(e) => {
  //   const inputValue = parseFloat(e.target.value);
  //   if (!isNaN(inputValue)) {
  //     // Convert the value to a string with two decimal places
  //     e.target.value = inputValue.toLocaleString(undefined, {minimumFractionDigits: 2});;
  //   }
  // }}
  ref={USEREF8}
  onKeyDown={(e) => {
    // Get the value from the input field
    const inputValue = parseFloat(e.target.value);
    
    // Only proceed if the quantity is valid (greater than 0)
    if (e.key === "Enter" && inputValue > 0) {
      handleEnterKeyPress(USEREF9, e);
      e.preventDefault();
      addNewRow();
      
      if (lastInputRef.current) {
        lastInputRef.current.focus();
      }
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
                                  width: "8%",

                                  textAlign: "center",
                                  background: "#f5f5f5",
                                }}
                              >
                                <input
                                  type="text" 
                                  name="Amount"
                                  // placeholder="Amount"
                                  value={rowData.Amount}
                                  onChange={(e) => handleInputChange(e, index)}
                                  style={{
                                    width: "100%",
                                    border: "none",
                                    backgroundColor: "transparent",
                                    textAlign: "right",
                                  }}
                                  onKeyDown={(e) =>
                                    handleEnterKeyPress(USEREF4, e)
                                  }
                                  ref={USEREF9}
                                />
                              </td>
                              <td
                                style={{
                                  border: "1px solid #000",
                                  padding: "8px",
                                  textAlign: "center",
                                  width: "8%",
                                }}
                              >
                                <input
                                  type="text"
                                  name="Purchase"
                                  // placeholder="Purchase"
                                  value={rowData.Purchase}
                                  onChange={(e) => handleInputChange1(e, index)}
                                  style={{
                                    width: "100%",
                                    border: "none",
                                    backgroundColor: "transparent",
                                    textAlign: "right",
                                  }}
                                  // onKeyDown={(e) =>
                                  //   handleEnterKeyPress(USEREF7, e)
                                  // }
                                  // ref={USEREF6}
                                />
                              </td>
                              <td
                                style={{
                                  border: "1px solid #000",
                                  padding: "8px",
                                  textAlign: "center",
                                  width: "8%",
                                }}
                              >
                                <input
                                  type="text"
                                  name="tatPersentage"
                                  // placeholder="Percentage"
                                  value={rowData.Tax}
                                  onChange={(e) => handleInputChange1(e, index)}
                                  style={{
                                    width: "100%",
                                    border: "none",
                                    backgroundColor: "transparent",
                                    textAlign: "right",
                                  }}
                                  // onKeyDown={(e) =>
                                  //   handleEnterKeyPress(USEREF7, e)
                                  // }
                                  // ref={USEREF6}
                                />
                              </td>
                              <td
                                style={{
                                  border: "1px solid #000",
                                  padding: "8px",
                                  textAlign: "center",
                                  width: "8%",
                                }}
                              >
                                <input
                                  type="text"
                                  name="Tax"
                                  // placeholder="Tax"
                                  value={rowData.TotalTax}
                                  onChange={(e) => handleInputChange1(e, index)}
                                  style={{
                                    width: "100%",
                                    border: "none",
                                    backgroundColor: "transparent",
                                    textAlign: "right",
                                  }}
                                  // onKeyDown={(e) =>
                                  //   handleEnterKeyPress(USEREF7, e)
                                  // }
                                  // ref={USEREF6}
                                />
                              </td>
                              <td
                                style={{
                                  border: "1px solid #000",
                                  padding: "8px",
                                  textAlign: "center",
                                  background: "#f5f5f5",
                                  width: "1%",

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
                            </tr>
                          ))}
                          {Array.from({
                            length: Math.max(0, 10 - tableData.length),
                          }).map((_, index) => (
                            <tr key={`blank-${index}`}>
                              {Array.from({ length: 11 }).map((_, colIndex) => (
                                <td key={`blank-${index}-${colIndex}`}>
                                  &nbsp;
                                </td>
                              ))}
                            </tr>
                          ))}
                        </MDBTableBody>
                       
                      </MDBTable>
                    </div>
                    <div >
                      <tr style={{
backgroundColor: "#c6daf7",
borderTop:'1px solid black',

                      }}>
                              <td
                                style={{
                                  width: "3%",

                                }}
                              >
                              </td>
                              <td
                                style={{
                                  width: "9%",

                                }}
                              >
                                
                              </td>
                              <td
                                style={{
                                  width: "20%",
                                }}
                              >
                               
                              </td>
                              <td
                                style={{
                                  width: "8%",
                                }}
                              >
                                
                              </td>

                              <td
                                style={{
                                  width: "8%",

                                }}
                              >
                                
                              </td>
                              <td
                                style={{
                                  border: "1px solid #000",
                                  padding: "8px",
                                  width: "8%",

                                  textAlign: "right",
                                }}
                              >
                                                              {totalQuantity}

                              </td>
                              <td
                                style={{
                                  border: "1px solid #000",
                                  padding: "8px",
                                  width: "8%",

                                  textAlign: "center",
                                }}
                              >
                                {totalAmount}
                              </td>
                              <td
                                style={{
                                  border: "1px solid #000",
                                  padding: "8px",
                                  width: "8%",

                                  textAlign: "center",
                                }}
                              >
                                <input
                                 
                                  style={{
                                    width: "100%",
                                    border: "none",
                                    backgroundColor: "transparent",
                                    textAlign: "center",
                                  }}
                                />
                              </td>
                              <td
                                style={{
                                  border: "1px solid #000",
                                  padding: "8px",
                                  width: "8%",

                                  textAlign: "center",
                                }}
                              >
                                
                              </td>
                              <td
                                style={{
                                  border: "1px solid #000",
                                  padding: "8px",
                                  width: "8%",

                                  textAlign: "center",
                                }}
                              >
                                {gettotaltax|| ".00"} 
                              </td>
                              <td
                                style={{
                                  width: "4%",
                                }}
                              >
                               
                              </td>
                            </tr>
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
                          <strong>Select Item</strong>
                        </div>
                        <div className="text-end col-4">
                          <Link onClick={handleCloseModal} className="topBtn">
                            <i className="fa fa-close fa-lg crossBtn"></i>
                          </Link>
                        </div>
                      </Nav>
                      <Modal.Body>
                        <Row>
                          <Col
                            xs={12}
                            sm={4}
                            md={4}
                            lg={4}
                            xl={{ span: 4, offset: 8 }}
                          >
                            <Form.Control
                              type="text"
                              placeholder="Search..."
                              className="form-control-item  search"
                              value={searchText}
                              onChange={handleSearchChange}
                            />
                          </Col>
                        </Row>
                        <MDBTable
                          scrollY
                          maxHeight="63vh"
                          stripedss
                          bordered
                          small
                          responsive
                        >
                          <MDBTableHead>
                            <tr>
                            <th
                                  
                                  style={{
                                    height: "24px",
                                    backgroundColor: "#c6daf7",
                                    color: "black",
                                    fontWeight: "bold",
                                    position: "sticky",
                                    border: "1px solid black",
                                    top: -1,
                                    textAlign: "center",
                                    zIndex: 1,
                                  }}
                                >
                                  Code
                                </th>

                                <th
                                 
                                  style={{
                                    height: "24px",
                                    backgroundColor: "#c6daf7",
                                    color: "black",
                                    fontWeight: "bold",
                                    position: "sticky",
                                    border: "1px solid black",
                                    top: -1,
                                    textAlign: "center",
                                    zIndex: 1,
                                  }}
                                >
                                Description
                                </th>
                            </tr>
                          </MDBTableHead>
                          <MDBTableBody>
                            {filteredRows.length === 0 ? (
                              <>
                                {Array.from({
                                  length: Math.max(
                                    0,
                                    Math.floor(
                                      (100 * window.innerHeight) / 100
                                    ) / 84
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
                                <tr>
                                  <td
                                    colSpan={2}
                                    style={{ textAlign: "center" }}
                                  >
                                    <div style={{ position: "relative" }}>
                                      <Spinner
                                        animation="border"
                                        variant="primary"
                                      />
                                    </div>
                                  </td>
                                </tr>
                                {Array.from({
                                  length: Math.max(
                                    0,
                                    Math.floor(
                                      (100 * window.innerHeight) / 75
                                    ) / 84
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
                            ) : (
                              <>
                                {filteredRows.map((row, rowIndex) => (
                                  <tr
                                    key={rowIndex}
                                    onClick={() =>
                                      handleRowClick(row, rowIndex)
                                    }
                                    style={{
                                      backgroundColor:
                                        getcolor === row.titmcod ? "#444ebd" : "",
                                      color:
                                        getcolor === row.titmcod
                                          ? secondaryColor
                                          : "",
                                      fontWeight:
                                        getcolor === row.titmcod ? "bold" : "",
                                    }}
                                  >
                                    <td style={{ width: "10%" }}>
                                      {" "}
                                      {row.titmcod}
                                    </td>
                                    <td style={{ textAlign: "left" }}>
                                      {row.titmdsc}
                                    </td>
                                  </tr>
                                ))}

                                {Array.from({
                                  length: Math.max(
                                    0,
                                    Math.floor(
                                      (100 * window.innerHeight) / 100
                                    ) / 40
                                  ),
                                }).map((_, index) => (
                                  <tr key={`blank-${index}`}>
                                    {Array.from({
                                      length: 2,
                                    }).map((_, colIndex) => (
                                      <td key={`blank-${index}-${colIndex}`}>
                                        &nbsp;
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </>
                            )}
                          </MDBTableBody>
                        </MDBTable>
                      </Modal.Body>
                    </Modal>
                  </div>
              </Form>
            </div>
          </div>
          <br />
        </div>
      </div>
    </>
  );
}

export default Item_Sale;
