import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBTable, MDBTableBody, MDBTableFoot, MDBTableHead } from "mdbreact";
import Header from "../../MainComponent/Header/Header";
import Footer from "../../MainComponent/Footer/Footer";
import PathHead from "../../MainComponent/PathHead/PathHead";
import {
  Card,
  Row,
  Col,
  Button,
  FormControl,
  InputGroup,
  Nav,
  Form,
  Spinner,
} from "react-bootstrap";
import "./Item_Maintenance.css";
import { HiRefresh } from "react-icons/hi";
import { FaArrowLeft } from "react-icons/fa6";
import { Countdown } from "../../Transaction/Booking_Maintenance/Get_Booking_Maintenance";
import { useDispatch, useSelector } from "react-redux";
import { fetchItem } from "../../Redux/action";
import { useTheme } from "../../../ThemeContext";

const Get_Item = () => {
  const dispatch = useDispatch();
  const datalist = useSelector((state) => state.itemlist);
  useEffect(() => {
    console.log("datalist", datalist.data);

    dispatch(fetchItem());
  }, [dispatch]);
  const navigate = useNavigate();
  const { primaryColor, secondaryColor, apiLinks, fontFamily } = useTheme();

  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState({ columns: [], rows: [] });

  const imageurl = `https://www.crystalsolutions.com.pk/csart/itemimage/`;
  const [Length, setLength] = useState("");

  const handleMenuItemClick = () => {
    navigate("/Add_Item");
  };
  useEffect(() => {
    if (datalist.data && Array.isArray(datalist.data)) {
      const transformedData = datalist.data.map((item) => ({
        TItmId: item.TItmId,
        dscription: item.dscription,
        dscription1: item.dscription1,
        amount1: item.amount1,
        dscription2: item.dscription2,
        amount2: item.amount2,
        dscription3: item.dscription3,
        amount3: item.amount3,
        dscription4: item.dscription4,
        amount4: item.amount4,
        itmsts: item.itmsts,
      }));

      console.log("Transformed Data", transformedData);

      const columns = [
        { label: "Code", field: "tgrpid", sort: "asc" },
        { label: "Description", field: "tgrpdsc", sort: "asc" },
        { label: "Description1", field: "tgrpid", sort: "asc" },
        { label: "Amount1", field: "tgrpid", sort: "asc" },
        { label: "Description2", field: "tgrpid", sort: "asc" },
        { label: "Amount2", field: "tgrpid", sort: "asc" },
        { label: "Description3", field: "tgrpid", sort: "asc" },
        { label: "Amount3", field: "tgrpid", sort: "asc" },
        { label: "Description4", field: "tgrpid", sort: "asc" },
        { label: "Amount4", field: "tgrpid", sort: "asc" },

        { label: "Status", field: "tgrpsts", sort: "asc" },
      ];

      setData({ columns, rows: transformedData });
      setLength(transformedData.length);
    }
  }, [datalist.data]);

  // useEffect(() => {
  //   const transformedData = datalist.data.map((item) => ({
  //     titmcod: item.titmcod,
  //     titmdsc: item.titmdsc,
  //     company: item.company,
  //     category: item.category,
  //     titmsts: item.titmsts,
  //   }));
  //   console.log("data show", data);
  //   const columns = [
  //     { label: "Code", field: "tgrpid", sort: "asc" },
  //     { label: "Desription ", field: "tgrpdsc", sort: "asc" },
  //     { label: "Company", field: "tgrpid", sort: "asc" },
  //     { label: "Category", field: "tgrpid", sort: "asc" },
  //     { label: "Status ", field: "tgrpsts", sort: "asc" },
  //   ];

  //   setData({ columns, rows: transformedData });
  //   setLength(transformedData.length);
  // }, []);

  const filteredRows = data.rows.filter(
    (row) =>
      (row.dscription &&
        row.dscription.toLowerCase().includes(searchText.toLowerCase())) ||
      (row.itmsts &&
        row.itmsts.toLowerCase().includes(searchText.toLowerCase()))
  );

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };
  ///////////////// here is our Search Function

  const [selectedRow, setSelectedRow] = useState(null);
  const [color, setColor] = useState(null);
  const handleRowClick = (row) => {
    setColor(row.TItmId);
    if (selectedRow === row.TItmId) {
      // If the clicked row is already selected, navigate to the update screen
      navigate(`/Update_Item/${row.TItmId}`);
    } else {
      // Set the selectedRow state to the clicked row id
      setSelectedRow(row.TItmId);
    }
  };
  const handlebackSubmit = (event) => {
    event.preventDefault();
    navigate("/MainPage");
  };
  const customScrollbarStyle = `
  ::-webkit-scrollbar {
    width: 12px;
    color: black;
  }

  ::-webkit-scrollbar-track {
    background: lightgray;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #1F2670;
    border-radius: 6px;
  }
`;
  return (
    <>
      <Header />

      {/* <header
        style={{
          width: "100%",
          height: "30px",
          backgroundColor: "#1f2670",
          display: "flex",
          // justifyContent:'center',
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
            Files &nbsp;&gt;&nbsp; Item Maintenance
          </p>
        </div>
      </header> */}
      <div
        className="col-12"
        style={{
          backgroundColor: "#F5F5F5",
          color: secondaryColor,
        }}
      >
        <br />
        <div
          className="Item-table"
          style={{
            backgroundColor: "#F5F5F5",
          }}
          // style={{
          //   marginLeft: "10%",
          //   marginRight: "10%",
          //   maxWidth: "80%",
          //   padding: "15px",
          //   border: "1px solid gray",
          //   backgroundColor: "white",
          // }}
        >
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
              style={{ display: "flex", marginTop: "-5px" }}
            >
              <Link to="/Add_Item">
                <i
                  style={{ color: "white" }}
                  className="fa-solid fa-arrow-right fa-md topBtn"
                  title="Next Page"
                ></i>
              </Link>
            </div>
            <div style={{ fontSize: "14px" }} className="col-4 text-center">
              <strong>Item List</strong>
            </div>
            <div className="text-end col-4" style={{ marginTop: "-5px" }}>
              <Link to="/MainPage" className="topBtn">
                <i
                  style={{ color: "white" }}
                  className="fa fa-close fa-2md crossBtn"
                ></i>
              </Link>
            </div>
          </Nav>
          <div
            style={{
              backgroundColor: "#F5F5F5",
              marginTop: "1%",
            }}
          >
            <Row>
              <Col xs={12} sm={4} md={4} lg={4} xl={{ span: 3, offset: 9 }}>
                <Form.Control
                  type="text"
                  placeholder="Search..."
                  className="form-control-item  search"
                  value={searchText}
                  onChange={handleSearchChange}
                />
              </Col>
            </Row>
          </div>
          <div
            style={{
              fontSize: "12px",
              fontFamily: "Verdana",
              width: "100%",
              overflowX: "auto",
            }}
          >
            {/* <style>{customScrollbarStyle}</style> */}
            {data.rows.length > 0 ? (
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
                    {data.columns.map((column, columnIndex) => (
                      <th
                        key={columnIndex}
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
                        {""}
                        {column.label}
                      </th>
                    ))}
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {filteredRows.length === 0 ? (
                    <>
                      {Array.from({
                        length: Math.max(
                          0,
                          Math.floor((100 * window.innerHeight) / 100) / 84
                        ),
                      }).map((_, index) => (
                        <tr key={`blank-${index}`}>
                          {Array.from({ length: 11 }).map((_, colIndex) => (
                            <td key={`blank-${index}-${colIndex}`}>&nbsp;</td>
                          ))}
                        </tr>
                      ))}
                      <tr>
                        <td colSpan={11} style={{ textAlign: "center" }}>
                          <div style={{ position: "relative" }}>
                            <Spinner animation="border" variant="primary" />
                          </div>
                        </td>
                      </tr>
                      {Array.from({
                        length: Math.max(
                          0,
                          Math.floor((100 * window.innerHeight) / 75) / 84
                        ),
                      }).map((_, index) => (
                        <tr key={`blank-${index}`}>
                          {Array.from({ length: 11 }).map((_, colIndex) => (
                            <td key={`blank-${index}-${colIndex}`}>&nbsp;</td>
                          ))}
                        </tr>
                      ))}
                    </>
                  ) : (
                    <>
                      {filteredRows.map((row, index) => (
                        <tr key={index}>
                          {Object.keys(row).map((key, columnIndex) => (
                            <td
                              onClick={() => handleRowClick(row)}
                              key={key}
                              style={{
                                backgroundColor:
                                  color === row.titmcod ? "#444ebd" : "",
                                color:
                                  color === row.titmcod ? secondaryColor : "",
                                fontWeight: color === row.titmcod ? "bold" : "",
                                textAlign:
                                  columnIndex === 1 ||
                                  columnIndex === 2 ||
                                  columnIndex === 4 ||
                                  columnIndex === 6 ||
                                  columnIndex === 8
                                    ? "left"
                                    : columnIndex === 3 ||
                                      columnIndex === 5 ||
                                      columnIndex === 7 ||
                                      columnIndex === 9
                                    ? "right"
                                    : "center",
                                width:
                                  columnIndex === 0
                                    ? "1%"
                                    : columnIndex === 1
                                    ? "30%"
                                    : columnIndex === 2
                                    ? "10%"
                                    : columnIndex === 3
                                    ? "10%"
                                    : columnIndex === 4
                                    ? "10%"
                                    : columnIndex === 5
                                    ? "10%"
                                    : columnIndex === 6
                                    ? "10%"
                                    : columnIndex === 7
                                    ? "10%"
                                    : columnIndex === 8
                                    ? "10%"
                                    : columnIndex === 9
                                    ? "10%"
                                    : columnIndex === 10
                                    ? "1%"
                                    : "auto",
                              }}
                            >
                              {key === "tusrpwd" ? "*****" : row[key]}
                            </td>
                          ))}
                        </tr>
                      ))}

                      {Array.from({
                        length: Math.max(
                          0,
                          Math.floor((100 * window.innerHeight) / 100) / 40
                        ),
                      }).map((_, index) => (
                        <tr key={`blank-${index}`}>
                          {Array.from({
                            length: 11,
                          }).map((_, colIndex) => (
                            <td key={`blank-${index}-${colIndex}`}>&nbsp;</td>
                          ))}
                        </tr>
                      ))}
                    </>
                  )}
                </MDBTableBody>
              </MDBTable>
            ) : (
              <div>
                <MDBTable
                  scrollY
                  maxHeight="63vh"
                  striped
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
                          top: -1,
                          textAlign: "center",
                          border: "1px solid black",
                          zIndex: 1,
                        }}
                      >
                        Description
                      </th>
                      <th
                        style={{
                          height: "24px",
                          backgroundColor: "#c6daf7",
                          color: "black",
                          fontWeight: "bold",
                          position: "sticky",
                          top: -1,
                          textAlign: "center",
                          border: "1px solid black",
                          zIndex: 1,
                        }}
                      >
                        Description1
                      </th>
                      <th
                        style={{
                          height: "24px",
                          backgroundColor: "#c6daf7",
                          color: "black",
                          fontWeight: "bold",
                          position: "sticky",
                          top: -1,
                          textAlign: "center",
                          border: "1px solid black",
                          zIndex: 1,
                        }}
                      >
                        Amount1
                      </th>
                      <th
                        style={{
                          height: "24px",
                          backgroundColor: "#c6daf7",
                          color: "black",
                          fontWeight: "bold",
                          position: "sticky",
                          top: -1,
                          textAlign: "center",
                          border: "1px solid black",
                          zIndex: 1,
                        }}
                      >
                        Description2
                      </th>
                      <th
                        style={{
                          height: "24px",
                          backgroundColor: "#c6daf7",
                          color: "black",
                          fontWeight: "bold",
                          position: "sticky",
                          top: -1,
                          textAlign: "center",
                          border: "1px solid black",
                          zIndex: 1,
                        }}
                      >
                        Amount2
                      </th>
                      <th
                        style={{
                          height: "24px",
                          backgroundColor: "#c6daf7",
                          color: "black",
                          fontWeight: "bold",
                          position: "sticky",
                          top: -1,
                          textAlign: "center",
                          border: "1px solid black",
                          zIndex: 1,
                        }}
                      >
                        Description3
                      </th>
                      <th
                        style={{
                          height: "24px",
                          backgroundColor: "#c6daf7",
                          color: "black",
                          fontWeight: "bold",
                          position: "sticky",
                          top: -1,
                          textAlign: "center",
                          border: "1px solid black",
                          zIndex: 1,
                        }}
                      >
                        Amount3
                      </th>
                      <th
                        style={{
                          height: "24px",
                          backgroundColor: "#c6daf7",
                          color: "black",
                          fontWeight: "bold",
                          position: "sticky",
                          top: -1,
                          textAlign: "center",
                          border: "1px solid black",
                          zIndex: 1,
                        }}
                      >
                        Description4
                      </th>
                      <th
                        style={{
                          height: "24px",
                          backgroundColor: "#c6daf7",
                          color: "black",
                          fontWeight: "bold",
                          position: "sticky",
                          top: -1,
                          textAlign: "center",
                          border: "1px solid black",
                          zIndex: 1,
                        }}
                      >
                        Amount4
                      </th>
                      <th
                        style={{
                          height: "24px",
                          backgroundColor: "#c6daf7",
                          color: "black",
                          fontWeight: "bold",
                          position: "sticky",
                          top: -1,
                          textAlign: "center",
                          border: "1px solid black",
                          zIndex: 1,
                        }}
                      >
                        Status
                      </th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    <tr>
                      <td
                        colSpan="11"
                        style={{ fontWeight: "bold", color: primaryColor }}
                      >
                        looding....
                      </td>
                    </tr>
                    {Array.from({
                      length: Math.max(
                        0,
                        Math.floor((100 * window.innerHeight) / 100) / 80
                      ),
                    }).map((_, index) => (
                      <tr key={`blank-${index}`}>
                        {Array.from({
                          length: 11,
                        }).map((_, colIndex) => (
                          <td key={`blank-${index}-${colIndex}`}></td>
                        ))}
                      </tr>
                    ))}
                    <tr>
                      <td colSpan={11} style={{ textAlign: "center" }}>
                        <div style={{ position: "relative" }}>
                          <Spinner animation="border" variant="primary" />
                        </div>
                      </td>
                    </tr>
                    {Array.from({
                      length: Math.max(
                        0,
                        Math.floor((100 * window.innerHeight) / 100) / 80
                      ),
                    }).map((_, index) => (
                      <tr key={`blank-${index}`}>
                        {Array.from({
                          length: 11,
                        }).map((_, colIndex) => (
                          <td key={`blank-${index}-${colIndex}`}></td>
                        ))}
                      </tr>
                    ))}
                  </MDBTableBody>
                </MDBTable>
              </div>
            )}
          </div>
          <div
            className="col-12 border-dark border-top"
            style={{
              backgroundColor: "#F5F5F5",
              height: "24px",
            }}
          >
            <input
              type="text"
              value={Length}
              className="text-center"
              disabled
              style={{
                fontSize: "12px",
                width: "4%",
                height: "28px",
                backgroundColor: "white",
                fontWeight: "bold",
              }}
            />
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Get_Item;
