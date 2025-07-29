import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Nav,
  Spinner,
} from "react-bootstrap";
import Header from "../../MainComponent/Header/Header";
import { fetchData } from "../../react_query/React_Query_Function";
import Select from "react-select";
import { useHotkeys } from "react-hotkeys-hook";
import { components } from "react-select";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Footer from "../../MainComponent/Footer/Footer";
import "./AccountCode_Maintenance.css";
import { Modal } from "react-bootstrap";

function Add_AccountCode() {
  // const dispatch = useDispatch();
  // const accountlist = useSelector((state) => state.accountlist);
  // useEffect(() => {
  //   // console.log("AccountCode_Maintenance", accountlist);
  //   dispatch(fetchAccount());
  // }, [dispatch]);
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState("");
  const [alertData, setAlertData] = useState(null);
  const [alert, setAlert] = useState(null);
  const primaryColor = "#1f2670";
  const secondaryColor = "white";
  const fontFamily = "verdana";
  const apiLinks =
    "https://crystalsolutions.com.pk/nosh_grill/ChartOfAccount.php";
  // Create refs for each input field
  const [Descriptionform, setDescriptionform] = useState("");
  const [AccountCodeform, setAccountCodeform] = useState("");
  const [Debitform, setDebitform] = useState(0.0);
  const [Creditform, setCreditform] = useState(0.0);
  const Code = useRef(null);
  const Status = useRef(null);
  const Description = useRef(null);
  const Debit = useRef(null);
  const Credit = useRef(null);
  const Submit = useRef(null);
  const Clear = useRef(null);
  const Return = useRef(null);
  const SearchBox = useRef(null);

  const [accountdropdown, setAccountdropdown] = useState([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState("");
  const [accountdata, setaccountdata] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");

  console.log(selectedCompanyId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://crystalsolutions.com.pk/nosh_grill/AccountTypeList.php`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        const transformedData = jsonData
          .filter((item) => item.acc_code !== "12-00")
          .map((item) => ({
            acc_code: item.acc_code,
            acc_dsc: item.acc_dsc,
          }));

        setAccountdropdown(transformedData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const accountcode = async (selectedOption) => {
    try {
      const formData = new FormData();
      formData.append("code", selectedOption);
      console.log("sdkljfsdf", selectedOption);
      const response = await axios.post(
        `https://crystalsolutions.com.pk/nosh_grill/NextAccount.php `,
        formData
      );
      console.log("sdfsdf", response.data.next_code);
      setAccountCodeform(response.data.next_code);
      setaccountdata(response.data.next_code);
    } catch (error) {
      console.error(error);
    }
  };

  const [fieldErrors, setFieldErrors] = useState({
    accountCode: false,
    debit: false,
    credit: false,
    description: false,
    status: false,
  });
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setTimeout(() => {
      setFieldErrors({ ...fieldErrors, accountCode: false });
      setFieldErrors({ ...fieldErrors, description: false });
    }, 5000);
    // Check for empty fields
    if (
      AccountCodeform === "" ||
      Descriptionform === ""
      // selectedStatus === ""
    ) {
      setFieldErrors({
        accountCode: AccountCodeform === "",

        description: Descriptionform === "",
        // status: selectedStatus === "",
      });
      return; // Stop form submission
    }
    const value = {
      cstss: selectedStatus,
    };

    const sliceaccountcode = AccountCodeform.slice(0, 5);
    try {
      const formData = new FormData();
      formData.append("code", AccountCodeform);
      formData.append("debit", Debit.current.value.replace(/,/g, ""));
      formData.append("credits", Credit.current.value.replace(/,/g, ""));
      formData.append("cdsc", Description.current.value);
      formData.append("csts", value.cstss);
      axios
        .post(
          `https://crystalsolutions.com.pk/nosh_grill/AddAccount.php`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        )

        .then((response) => {
          console.log(response);
          if (response.data.error === 200) {
            accountcode(sliceaccountcode);
            fetchDataAndDisplayy();
            setAlertData({
              type: "success",
              message: `${response.data.message}`,
            });
            Code.current.focus();
            // setAccountCodeform("");
            setDescriptionform("");
            setDebitform("0");
            setCreditform("0");
            setSelectedStatus("");
            setTimeout(() => {
              setAlertData(null);
              // navigate("/AccountCode_Maintenance");
            }, 3000);
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

      setAlert("Image uploaded successfully.");
    } catch (error) {
      setAlert("Error uploading image.");
      console.error(error);
    } finally {
    }
  };

  //////////////////////// PRESS ENTER TO MOVE THE NEXT FIELD //////////////////
  useEffect(() => {
    // Focus on the first input when the component mounts
    if (Code.current) {
      Code.current.focus();
    }
  }, []);
  const focusNextInput = (ref) => {
    if (ref.current) {
      ref.current.focus();
    }
  };

  const handleEnterKeyPress = (ref, e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      focusNextInput(ref);
    }
  };

  const handlebackSubmit = (event) => {
    event.preventDefault();
    navigate("/AccountCode_Maintenance");
  };
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState({ columns: [], rows: [] });
  const [textdata, settextdata] = useState("Account Code Maintenance");
  const handleCloseModal = () => {
    setData({ columns: [], rows: [] });
    setHighlightedRowIndex(0);
    setSearchText("");
    const sliceaccountcode = AccountCodeform.slice(0, 5);
    accountcode(sliceaccountcode);
    settextdata("Update Account Code");
    setModalOpen(false);
  };
  const firstColWidth = "120px";
  const secondColWidth = "480px";
  const thirdColWidth = "150px";
  const fourthColWidth = "70px";
  const [Length, setLength] = useState("");

  const handleDoubleClick = (e) => {
    focusNextInput(Code);
    console.log("====== handle double click=======");
    // setSearchText(e.target.value);
    setModalOpen(true);
  };

  // const { dataa, error, isLoading } = useQuery("chartOfAccounts", fetchData);

  const fetchDataAndDisplay = async () => {
    try {
      const transformedData = await fetchData(apiLinks);
      const columns = [
        { label: "Code", field: "tacccod", sort: "asc" },
        { label: "Description", field: "taccdsc", sort: "asc" },
        { label: "Status", field: "taccsts", sort: "asc" },
      ];
      setData({ columns, rows: transformedData });
      setLength(transformedData.length);
    } catch (error) {
      // setError(error);
    } finally {
      // setIsLoading(false);
    }
  };
  const [dataa, setDataa] = useState({ columns: [], rows: [] });
  const fetchDataAndDisplayy = async () => {
    try {
      const transformedData = await fetchData(apiLinks);
      const columns = [
        { label: "Code", field: "tacccod", sort: "asc" },
        { label: "Description", field: "taccdsc", sort: "asc" },
        { label: "Status", field: "taccsts", sort: "asc" },
      ];
      setDataa({ columns, rows: transformedData });
      // setLengthh(transformedData.length);
    } catch (error) {
      // setError(error);
    } finally {
      // setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchDataAndDisplayy();
  }, []);
  const formatAccountCode = (value) => {
    const formattedValue = value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d{2})(\d{4})/, "$1-$2-$3");
    if (formattedValue.length === 10) {
      const sliceaccountcode = AccountCodeform.slice(0, 2);

      const secondpart = AccountCodeform.slice(2, 4);

      setTimeout(() => {
        handleManualEntry(`${sliceaccountcode}-${secondpart}`);
      }, 500);
      Status.current.focus();
    }
    return formattedValue;
  };
  const formatAmount = (value) => {
    let cleanedValue = value.replace(/[^0-9.]/g, "");
    let num = parseFloat(cleanedValue);
    if (isNaN(num)) {
      return value;
    }
    return num.toLocaleString();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value.trim().toUpperCase();

    if (name === "AccountCodeform") {
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

      // formattedValue = formatAccountCode(formattedValue);
      const formattedValuee = formattedValue;

      console.log("Searching for:", formattedValuee);

      const selectedItem = dataa.rows.find(
        (item) => item.tacccod === formattedValuee
      );

      console.log("Selected item:", selectedItem);

      if (selectedItem) {
        setDescriptionform(selectedItem.taccdsc);
        setAccountCodeform(selectedItem.tacccod);
        setSelectedStatus(selectedItem.taccsts);
        setDebitform(selectedItem.tdbtamt);
        setCreditform(selectedItem.tcrtamt);
      } else {
        setDescriptionform("");
        setAccountCodeform(formattedValue);
        setSelectedStatus("");
      }
    } else if (name === "Creditform") {
      formattedValue = formatAmount(formattedValue);
      setCreditform(formattedValue);
    } else if (name === "Debitform") {
      formattedValue = formatAmount(formattedValue);
      setDebitform(formattedValue);
    } else if (name === "Descriptionform") {
      const upperCaseValue = value.toUpperCase();
      setDescriptionform(upperCaseValue);
    } else {
      setDescriptionform("");
      setAccountCodeform("");
      setSelectedStatus("");
      setDebitform("0");
      setCreditform("0");
    }
  };

  // useEffect(() => {
  //   // fetchDataAndDisplay();
  // }, []);
  const filteredRows = data.rows.filter(
    (row) =>
      (row.tacccod &&
        row.tacccod.toLowerCase().includes(searchText.toLowerCase())) ||
      (row.taccdsc &&
        row.taccdsc.toLowerCase().includes(searchText.toLowerCase())) ||
      (row.taccsts &&
        row.taccsts.toLowerCase().includes(searchText.toLowerCase()))
  );

  const handleSearchChange = (event) => {
    setHighlightedRowIndex(0);
    const searchcapital = event.target.value.toUpperCase();
    setSearchText(searchcapital);
  };
  const resetData = () => {
    setData({ columns: [], rows: [] });
    setSearchText("");
  };
  const firstRowRef = useRef(null);
  const tableRef = useRef(null);

  const [highlightedRowIndex, setHighlightedRowIndex] = useState(0);

  const handleRowClick = (rowData, rowIndex) => {
    console.log("handleRowClickAccount", rowData);
    if (!rowData) {
      console.error("Invalid rowData:", rowData);
      return;
    }
    console.log("handleRowClickAccount", rowData);
    // setHighlightedRowIndex(rowIndex);
    setModalOpen(false);
    setHighlightedRowIndex(0);
    setSelectedStatus(rowData.taccsts || "");
    setDescriptionform(rowData.taccdsc || "");
    setAccountCodeform(rowData.tacccod || "");
    resetData();
  };

  // React.useEffect(() => {
  //   return () => resetData();
  // }, []);
  const handleSave = () => {
    handleFormSubmit();
  };
  const handleClear = () => {
    setAccountCodeform("");
    setDescriptionform("");
    setDebitform("0");
    setCreditform("0");
    setSelectedStatus("");
    Code.current.focus();
  };
  const handleReturn = () => {
    navigate("/MainPage");
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
  const [dropdownOptionsStatus, setDropdownOptionsStatus] = useState([]);
  const [selectedOptionStatus, setSelectedOptionStatus] = useState("");

  const isClearable = true;

  const statusOption = [
    ...accountdropdown.map((option) => ({
      value: option.tacccod,
      label: option.tacccod + " " + option.taccdsc,
    })),
  ];
  const CustomInput = (props) => {
    return (
      <components.Input
        {...props}
        onChange={(e) => {
          e.target.value = e.target.value.toUpperCase();
          props.onChange(e);
        }}
      />
    );
  };
  const DropdownOption = (props) => {
    return (
      <components.Option {...props}>
        <div
          style={{
            // borderBottom: "1px solid #ccc",
            fontSize: "12px",
            padding: "0",
            lineHeight: "5px",
            margin: "0",
            width: "auto",
          }}
        >
          {props.data.label}
        </div>
      </components.Option>
    );
  };
  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      // difference between the menu and the control

      fontSize: "10px",
    }),
    control: (base, state) => ({
      ...base,
      height: "24px",
      minHeight: "24px",
      maxHeight: "24px",
      width: "300px",
      fontSize: "11px",
      marginBottom: "5px",
      borderRadius: 0,
      border: "1px solid black",
      transition: "border-color 0.15s ease-in-out",
      "&:hover": {
        borderColor: state.isFocused ? base.borderColor : "black",
      },
      // padding: "0 1px",
      // marginLeft: 10,
    }),
    dropdownIndicator: (base) => ({
      ...base,
      padding: "5px",
    }),
  };
  const [getaccountsliceform, setAccountCodesliceform] = useState("");

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    setDescriptionform("");
    setSelectedStatus("");
    setDebitform("0");
    setCreditform("0");
    Code.current.focus();
    if (selectedOption === null) {
      console.log("Selection cleared");
    }
    if (selectedOption) {
      console.log("selectedOption:", selectedOption);
      const selectedValue = selectedOption.value;
      setSelectedOption(selectedOption);
      accountcode(selectedValue);
      setAccountCodeform(selectedValue);
      setDescriptionform("");
    } else {
      setAccountCodeform("");
      setDescriptionform("");
    }
  };

  const handleManualEntry = (enteredValue) => {
    // Handle manual entry scenario
    console.log("Manually entered value:", enteredValue);

    // Assuming you want to set the dropdown value based on the manually entered value
    const matchingOption = accountdropdown.find(
      (option) => option.tacccod === enteredValue
    );
    console.log("matchingOption:", matchingOption);
    if (matchingOption) {
      const selectedOption = {
        value: matchingOption.tacccod,
        label: `${matchingOption.tacccod} ${matchingOption.taccdsc}`,
      };
      setSelectedOption(selectedOption);

      // Update states accordingly
      // accountcode(matchingOption.tacccod);
      // setAccountCodeform(matchingOption.tacccod);
      // setDescriptionform("");
    } else {
      console.log("Entered value does not match any dropdown options");
    }
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

  const [enterCount, setEnterCount] = useState(0);

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

        <div
          className="col-12"
          style={{
            color: "black",
            fontWeight: "bold",
            fontFamily: fontFamily,
            backgroundColor: "white",
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
            }}
          >
            <div className="col-md-12 form-accountcode-container">
              <Nav
                className="col-12 d-flex justify-content-between"
                style={{
                  backgroundColor: "#3368b5",
                  color: "#fff",
                  height: "24px",
                }}
              >
                <div
                  style={{ fontSize: "14px" }}
                  className="col-12 text-center"
                >
                  {textdata}
                </div>
              </Nav>
              <br />
              <Form>
                <div className="row scroll-account">
                  <div className="col-12">
                    <div className="row">
                      <div className="col-sm-2 account-field"></div>
                      <div className="col-sm-8 input-account">
                        <Form.Group
                          controlId="description"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginLeft: "-10px",
                          }}
                        >
                          <Select
                            value={selectedOption}
                            onChange={handleSelectChange}
                            options={accountdropdown.map((option) => ({
                              value: option.acc_code,
                              label: `${option.acc_code} ${option.acc_dsc}`,
                            }))}
                            placeholder="Search or select..."
                            styles={customStyles}
                            isClearable={isClearable}
                            components={{
                              Option: DropdownOption,
                              Input: CustomInput,
                            }}
                          />
                        </Form.Group>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-2 account-field">A/C Code:</div>
                      <div className="col-sm-3 input-account">
                        <Form.Group
                          controlId="description"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <Form.Control
                            type="text"
                            className="form-control-account"
                            placeholder="Code"
                            name="AccountCodeform"
                            value={AccountCodeform}
                            onChange={(e) => handleInputChange(e)}
                            maxLength={9}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                const sliceaccountcode = AccountCodeform.slice(
                                  0,
                                  5
                                );
                                handleManualEntry(sliceaccountcode);
                                const upperCaseValue =
                                  e.target.value.toUpperCase();
                                const selectedItem = dataa.rows.find(
                                  (item) => item.tacccod === upperCaseValue
                                );

                                if (selectedItem) {
                                  console.log("selectedItem:", selectedItem);
                                  handleEnterKeyPress(Status, e);
                                } else if (upperCaseValue.length < 10) {
                                  setDescriptionform("");
                                  setCreditform("0");
                                  setDebitform("0");
                                  // handleEnterKeyPress(Description, e);
                                  setAlertData({
                                    type: "error",
                                    message: `Please enter a valid account code`,
                                  });
                                  setTimeout(() => {
                                    setAlertData(null);
                                  }, 3000);
                                } else {
                                  handleEnterKeyPress(Status, e);
                                }
                              }
                            }}
                            onFocus={(e) => e.target.select()}
                            onDoubleClick={(e) => {
                              if (e.target.value.length <= 9) {
                                handleDoubleClick(e);
                                setTimeout(() => {
                                  focusNextInput(SearchBox);
                                  const sliceaccountcode =
                                    AccountCodeform.slice(0, 5);
                                  handleManualEntry(sliceaccountcode);
                                }, 100);
                              }
                            }}
                            style={{
                              border: fieldErrors.accountCode
                                ? "1px solid red"
                                : "",

                              transition:
                                "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
                            }}
                            ref={Code}
                          />
                        </Form.Group>
                      </div>
                      <div className="col-sm-1"></div>
                      <div className="col-sm-2 account-field">Status:</div>
                      <div className="col-sm-4 input-account">
                        <Form.Group
                          controlId="status"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <Form.Control
                            as="select"
                            name="AreStss"
                            className="form-control-account"
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                handleEnterKeyPress(Description, e);
                              }
                            }}
                            onFocus={(e) => {
                              e.target.style.backgroundColor = "orange";
                            }}
                            ref={Status}
                            style={{
                              height: "24px",
                              fontSize: "11px",
                              padding: "1px 10px",
                              borderRadius: "0px",
                              backgroundColor: "white",
                              boxShadow: "none",
                            }}
                          >
                            <option value="A">Active</option>
                            <option value="N">Non Active</option>
                          </Form.Control>
                        </Form.Group>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-2 account-field">Description:</div>
                      <div className="col-sm-10 input-account">
                        <Form.Group
                          controlId="description"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <Form.Control
                            type="text"
                            className="form-control-account"
                            placeholder="Description"
                            name="Descriptionform"
                            value={Descriptionform}
                            onChange={handleInputChange}
                            onKeyDown={(e) => handleEnterKeyPress(Debit, e)}
                            ref={Description}
                            style={{
                              border: fieldErrors.description
                                ? "1px solid red"
                                : "",

                              transition:
                                "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
                            }}
                            onFocus={(e) => e.target.select()}
                          />
                        </Form.Group>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-2 account-field">Debit:</div>
                      <div className="col-md-4 input-account">
                        <Form.Group
                          controlId="description"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <Form.Control
                            type="text"
                            className="form-control-account"
                            placeholder="Debit"
                            name="Debitform"
                            value={Debitform}
                            onChange={handleInputChange}
                            onKeyDown={(e) => handleEnterKeyPress(Credit, e)}
                            ref={Debit}
                            style={{
                              textAlign: "right",
                              // border: fieldErrors.debit ? "1px solid red" : "",

                              // transition:
                              //   "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
                            }}
                            onBlur={(e) => {
                              const inputValue = parseFloat(e.target.value);
                              if (parseFloat(inputValue) !== 0) {
                                setCreditform("0");
                              }
                            }}
                            onFocus={(e) => e.target.select()}
                          />
                        </Form.Group>
                      </div>
                      <div className="col-md-2 account-field">Credit:</div>
                      <div className="col-md-4 input-account">
                        <Form.Group
                          controlId="description"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <Form.Control
                            className="form-control-account"
                            type="text"
                            placeholder="Credit"
                            name="Creditform"
                            value={Creditform}
                            style={{
                              textAlign: "right",
                              // border: fieldErrors.credit ? "1px solid red" : "",

                              // transition:
                              //   "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
                            }}
                            onChange={handleInputChange}
                            onKeyDown={(e) => handleEnterKeyPress(Submit, e)}
                            ref={Credit}
                            onFocus={(e) => e.target.select()}
                            onBlur={(e) => {
                              const inputValue = parseFloat(e.target.value);
                              if (parseFloat(inputValue) !== 0) {
                                setDebitform("0");
                              }
                            }}
                          />
                        </Form.Group>
                      </div>
                    </div>
                  </div>
                </div>
                <br />
              </Form>
              {/* <p style={{ borderTop: "1px solid black " }}></p> */}
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
              <Modal
                show={isModalOpen}
                onHide={handleCloseModal}
                size="lg"
                // style={{ maxWidth: "60%", width: "80%" }}
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
                    <strong>Select Account</strong>
                  </div>
                  <div className="text-end col-4">
                    <Link
                      onClick={() => setModalOpen(false)}
                      // onClick={handleCloseModalAccount}
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
                              fetchDataAndDisplay();
                              setEnterCount(1);
                            } else if (enterCount === 1) {
                              fetchDataAndDisplay();
                              const selectedRowData =
                                filteredRows[highlightedRowIndex];
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
                            width: firstColWidth,
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
                            width: secondColWidth,
                            textAlign: "center",

                            fontWeight: "bold",
                            borderRight: "1px solid black",
                          }}
                        >
                          Description
                        </th>
                        <th
                          class="sticky-header-area"
                          style={{
                            width: thirdColWidth,
                            textAlign: "center",

                            fontWeight: "bold",
                            borderRight: "1px solid black",
                          }}
                        >
                          Status
                        </th>
                      </tr>
                    </thead>

                    <tbody ref={tableRef} style={{ fontSize: "10px" }}>
                      {filteredRows.length === 0 ? (
                        <>
                          {Array.from({ length: 18 }).map((_, index) => (
                            <tr key={`blank-${index}`}>
                              {Array.from({ length: 3 }).map((_, colIndex) => (
                                <td key={`blank-${index}-${colIndex}`}>
                                  &nbsp;
                                </td>
                              ))}
                            </tr>
                          ))}

                          <tr>
                            <td
                              style={{
                                textAlign: "center",
                                width: firstColWidth,
                              }}
                            ></td>
                            <td
                              style={{
                                textAlign: "center",
                                width: secondColWidth,
                              }}
                            ></td>
                            <td
                              style={{
                                textAlign: "center",
                                width: thirdColWidth,
                              }}
                            ></td>
                          </tr>
                        </>
                      ) : (
                        <>
                          {filteredRows.map((row, index) => (
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
                              onClick={(e) => {
                                handleRowClick(row, index);
                              }}
                            >
                              <td style={{ width: firstColWidth }}>
                                {row.tacccod}
                              </td>
                              <td
                                style={{
                                  width: secondColWidth,
                                  textAlign: "left",
                                }}
                              >
                                {row.taccdsc}
                              </td>
                              <td style={{ width: thirdColWidth }}>
                                {row.taccsts}
                              </td>
                            </tr>
                          ))}
                          {Array.from({
                            length: Math.max(0, 19 - filteredRows.length),
                          }).map((_, index) => (
                            <tr key={`blank-${index}`}>
                              {Array.from({ length: 3 }).map((_, colIndex) => (
                                <td key={`blank-${index}-${colIndex}`}>
                                  &nbsp;
                                </td>
                              ))}
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
                            width: firstColWidth,
                          }}
                        >
                          {Length}
                        </th>
                        <th
                          className="sticky-footer-area"
                          style={{
                            width: secondColWidth,
                          }}
                        ></th>
                        <th
                          className="sticky-footer-area"
                          style={{
                            width: thirdColWidth,
                          }}
                        ></th>
                      </tr>
                    </tfoot>
                  </table>
                </Modal.Body>
              </Modal>
            </div>
          </div>
          <br />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Add_AccountCode;
