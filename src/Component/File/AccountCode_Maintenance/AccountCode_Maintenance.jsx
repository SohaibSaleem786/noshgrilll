import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBTable, MDBTableBody, MDBTableFoot, MDBTableHead } from "mdbreact";
import Header from "../../MainComponent/Header/Header";
import Footer from "../../MainComponent/Footer/Footer";
import { HiRefresh } from "react-icons/hi";
import { FaArrowLeft } from "react-icons/fa6";
// import PathHead from "../../../MainComponent/PathHead/PathHead";
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
// import "../../../Table.css";
// import { fetchCategory } from "../../../../Redux/action";
import "./AccountCode_Maintenance.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccount } from "../../Redux/action";
const AccountCode_Maintenance = () => {
  const dispatch = useDispatch();
  const accountlist = useSelector((state) => state.AccountCodeList);

  useEffect(() => {
    console.log("AccountCode_Maintenance", accountlist);
    dispatch(fetchAccount());
  }, [dispatch]);

  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState({ columns: [], rows: [] });
  const primaryColor = "#1f2670";
  const secondaryColor = "white";
  const fontFamily = "verdana";
  const apiLinks =
    "https://crystalsolutions.com.pk/umair_electronic/web/ChartOfAccount.php";
  const imageurl = `https://www.crystalsolutions.com.pk/csart/itemimage/`;
  const [Length, setLength] = useState("");

  const handleMenuItemClick = () => {
    navigate("/Add_AccountCode");
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiLinks);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        const transformedData = jsonData.map((item) => ({
          tacccod: item.tacccod,
          taccdsc: item.taccdsc,
          taccsts: item.taccsts,
        }));

        const columns = [
          { label: "Code", field: "tareid", sort: "asc" },
          { label: "Description", field: "taredsc", sort: "asc" },
          { label: "Status", field: "tarests", sort: "asc" },
        ];

        setData({ columns, rows: transformedData });
        setLength(transformedData.length);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

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
    setSearchText(event.target.value);
  };
  ///////////////// here is our Search Function

  const [selectedRow, setSelectedRow] = useState(null);
  const [color, setColor] = useState(null);
  const handleRowClick = (row) => {
    setColor(row.tacccod);
    if (selectedRow === row.tacccod) {
      // If the clicked row is already selected, navigate to the update screen
      navigate(`/Update_Account/${row.tacccod}`);
    } else {
      // Set the selectedRow state to the clicked row id
      setSelectedRow(row.tacccod);
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
  const firstColWidth = "100px";
  const secondColWidth = "450px";
  const thirdColWidth = "70px";
  const fourthColWidth = "70px";
  return (
    <>
      <Header />

      <div
        className="col-12"
        style={{ color: secondaryColor, backgroundColor: "white" }}
      >
        <br />
        <div className="Account-table" style={{ backgroundColor: "#F5F5F5" }}>
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
              <Link to="/Add_AccountCode">
                <i
                  className="fa-solid fa-arrow-right fa-md topBtn"
                  title="Next Page"
                ></i>
              </Link>

              <i className="fa fa-refresh fa-md topBtn" title="Refresh"></i>
            </div>
            <div style={{ fontSize: "14px" }} className="col-4 text-center">
              <strong>Account Code List</strong>
            </div>
            <div className="text-end col-4" style={{ marginTop: "-1%" }}>
              <Link to="/MainPage" className="topBtn">
                <i className="fa fa-close fa-2md crossBtn"></i>
              </Link>
            </div>
          </Nav>
          <div style={{ marginTop: "1%", backgroundColor: "#F5F5F5" }}>
            <Row>
              <Col
                xs={12}
                sm={4}
                md={4}
                lg={4}
                xl={{ span: 3, offset: 9 }}
                className="search-account"
              >
                <Form.Control
                  type="text"
                  className="form-control-employee  search"
                  style={{
                    height: "25px",
                    boxShadow: "none",
                    margin: "0.5%",
                    backgroundColor: "white",
                  }}
                  placeholder="Search..."
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

            <table className="custom-table-area" style={{ color: "black" }}>
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
                  <th
                    class="sticky-header-area"
                    style={{
                      width: fourthColWidth,
                      textAlign: "center",

                      fontWeight: "bold",
                      borderRight: "1px solid black",
                    }}
                  >
                    Edit
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredRows.length === 0 ? (
                  <>
                    {Array.from({ length: 6 }).map((_, index) => (
                      <tr key={`blank-${index}`}>
                        {Array.from({ length: 4 }).map((_, colIndex) => (
                          <td key={`blank-${index}-${colIndex}`}>&nbsp;</td>
                        ))}
                      </tr>
                    ))}
                    <tr>
                      <td colSpan={4} style={{ textAlign: "center" }}>
                        <div style={{ padding: "20px" }}>
                          <Spinner animation="border" variant="primary" />
                          <p>No data available</p>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{ textAlign: "center", width: firstColWidth }}
                      ></td>
                      <td
                        style={{ textAlign: "center", width: secondColWidth }}
                      ></td>
                      <td
                        style={{ textAlign: "center", width: thirdColWidth }}
                      ></td>
                      <td
                        style={{ textAlign: "center", width: fourthColWidth }}
                      ></td>
                    </tr>
                    {Array.from({ length: 6 }).map((_, index) => (
                      <tr key={`blank-${index}`}>
                        {Array.from({ length: 4 }).map((_, colIndex) => (
                          <td key={`blank-${index}-${colIndex}`}>&nbsp;</td>
                        ))}
                      </tr>
                    ))}
                  </>
                ) : (
                  <>
                    {filteredRows.map((row, index) => (
                      <tr
                        key={index}
                        // onClick={() => handleRowClick1(row)}
                        // style={{
                        //   backgroundColor:
                        //     color === row.tacccod ? "#444ebd" : "",
                        //   color: color === row.tacccod ? secondaryColor : "",
                        //   fontWeight: color === row.tacccod ? "bold" : "",
                        // }}
                      >
                        <td style={{ width: firstColWidth }}>{row.tacccod}</td>
                        <td
                          style={{ width: secondColWidth, textAlign: "left" }}
                        >
                          {row.taccdsc}
                        </td>
                        <td style={{ width: thirdColWidth }}>{row.taccsts}</td>
                        <td
                          style={{ width: fourthColWidth }}
                          onClick={() => handleRowClick(row)}
                        >
                          <i class="fa fa-pencil" aria-hidden="true"></i>
                        </td>
                      </tr>
                    ))}
                    {Array.from({
                      length: Math.max(0, 19 - filteredRows.length),
                    }).map((_, index) => (
                      <tr key={`blank-${index}`}>
                        {Array.from({ length: 4 }).map((_, colIndex) => (
                          <td key={`blank-${index}-${colIndex}`}>&nbsp;</td>
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

                  <th
                    className="sticky-footer"
                    style={{
                      width: fourthColWidth,
                      textAlign: "right",
                    }}
                  ></th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default AccountCode_Maintenance;
