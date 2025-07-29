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
  Form,
  Nav,
  Spinner,
} from "react-bootstrap";
import "./Category_Maintenance.css";
import { HiRefresh } from "react-icons/hi";
import { FaArrowLeft } from "react-icons/fa6";
import { useTheme } from "../../../ThemeContext";
const Get_Category = () => {
  const navigate = useNavigate();
  const { primaryColor, secondaryColor, apiLinks, fontFamily } = useTheme();

  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState({ columns: [], rows: [] });

  const imageurl = `https://www.crystalsolutions.com.pk/csart/itemimage/`;
  const [Length, setLength] = useState("");

  const handleMenuItemClick = () => {
    navigate("/Add_Category");
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiLinks}/get_category.php`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const transformedData = data.map((item) => ({
          tctgid: item.tctgid,
          tctgdsc: item.tctgdsc,
          tctgsts: item.tctgsts,
        }));

        const columns = [
          { label: "Code", field: "tgrpid", sort: "asc" },
          { label: "Desription ", field: "tgrpdsc", sort: "asc" },
          { label: "Status ", field: "tgrpsts", sort: "asc" },
        ];

        setData({ columns, rows: transformedData });
        setLength(transformedData.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const filteredRows = data.rows.filter(
    (row) =>
      (row.tctgid &&
        row.tctgid.toLowerCase().includes(searchText.toLowerCase())) ||
      (row.tctgdsc &&
        row.tctgdsc.toLowerCase().includes(searchText.toLowerCase())) ||
      (row.tctgsts &&
        row.tctgsts.toLowerCase().includes(searchText.toLowerCase()))
  );

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };
  ///////////////// here is our Search Function

  const [selectedRow, setSelectedRow] = useState(null);
  const [color, setColor] = useState(null);
  const handleRowClick = (row) => {
    setColor(row.tctgid);
    if (selectedRow === row.tctgid) {
      // If the clicked row is already selected, navigate to the update screen
      navigate(`/Update_Category/${row.tctgid}`);
    } else {
      // Set the selectedRow state to the clicked row id
      setSelectedRow(row.tctgid);
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
  const firstColWidth = "50px";
  const secondColWidth = "500px";
  const thirdColWidth = "50px";
  return (
    <>
      <Header />

      <div
        className="Category-table"
        style={{
          backgroundColor: "#F5F5F5",
        }}
      >
        <Nav
          className="col-12 d-flex justify-content-between"
          style={{ backgroundColor: "#3368b5", color: "#fff", height: "24px" }}
        >
          <div className="col-4 " style={{ display: "flex", marginTop: "-1%" }}>
            <Link to="/Add_Category">
              <i
                style={{ color: "white" }}
                className="fa-solid fa-arrow-right fa-md topBtn"
                title="Next Page"
              ></i>
            </Link>

            <i className="fa fa-refresh fa-md topBtn" title="Refresh"></i>
          </div>
          <div style={{ fontSize: "14px" }} className="col-4 text-center">
            <strong>Category List</strong>
          </div>
          <div className="text-end col-4" style={{ marginTop: "-1%" }}>
            <Link to="/MainPage" className="topBtn">
              <i
                style={{ color: "white" }}
                className="fa fa-close fa-2md crossBtn"
              ></i>
            </Link>
          </div>
        </Nav>

        <div>
          <Row
            style={{
              // backgroundColor:'#F5F5F5',
              marginTop: "1%",
            }}
          >
            <Col xs={12} sm={4} md={4} lg={4} xl={{ span: 4, offset: 8 }}>
              <Form.Control
                type="text"
                placeholder="Search..."
                className="form-control-company  search"
                value={searchText}
                onChange={handleSearchChange}
              />
            </Col>
          </Row>
          <table className="custom-table-area" style={{ color: "black" }}>
            <thead>
              <tr>
                {data.columns.map((column, columnIndex) => (
                  <th
                    key={columnIndex}
                    style={{
                      width:
                        columnIndex === 0
                          ? firstColWidth
                          : columnIndex === 1
                          ? secondColWidth
                          : columnIndex === 2
                          ? thirdColWidth
                          : "auto",

                      backgroundColor: "#c6daf7",
                      color: "black",
                      fontWeight: "bold",
                      position: "sticky",
                      top: -1,
                      textAlign: "center",
                      zIndex: 1,
                      border: "1px solid black",
                    }}
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {filteredRows.length === 0 ? (
                <>
                  {Array.from({
                    length: Math.max(
                      0,
                      Math.floor((100 * window.innerHeight) / 100) / 84
                    ),
                  }).map((_, index) => (
                    <tr key={`blank-${index}`}>
                      {Array.from({ length: 3 }).map((_, colIndex) => (
                        <td key={`blank-${index}-${colIndex}`}>&nbsp;</td>
                      ))}
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={3} style={{ textAlign: "center" }}>
                      <div style={{ position: "relative" }}>
                        <Spinner animation="border" variant="primary" />
                      </div>
                    </td>
                  </tr>
                  {Array.from({
                    length: Math.max(
                      0,
                      Math.floor((100 * window.innerHeight) / 80) / 84
                    ),
                  }).map((_, index) => (
                    <tr key={`blank-${index}`}>
                      {Array.from({ length: 3 }).map((_, colIndex) => (
                        <td key={`blank-${index}-${colIndex}`}>&nbsp;</td>
                      ))}
                    </tr>
                  ))}
                </>
              ) : (
                <>
                  {filteredRows.map((row, index) => (
                    <tr key={index} onClick={() => handleRowClick(row)}>
                      {Object.keys(row).map((key, columnIndex) => {
                        return (
                          <td
                            key={key}
                            style={{
                              backgroundColor:
                                color === row.tctgid ? "#444ebd" : "",
                              color: color === row.tctgid ? secondaryColor : "",
                              fontWeight: color === row.tctgid ? "bold" : "",
                              textAlign: columnIndex === 1 ? "left" : "center",

                              width:
                                columnIndex === 0
                                  ? firstColWidth
                                  : columnIndex === 1
                                  ? secondColWidth
                                  : columnIndex === 2
                                  ? thirdColWidth
                                  : columnIndex === 3
                                  ? "1%"
                                  : columnIndex === 4
                                  ? "12%"
                                  : columnIndex === 5
                                  ? "12%"
                                  : columnIndex === 6
                                  ? "12%"
                                  : "auto",
                            }}
                          >
                            {key === "tusrpwd" ? "*****" : row[key]}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                  {Array.from({ length: 9 }).map((_, index) => (
                    <tr key={`blank-${index}`}>
                      {Array.from({ length: 3 }).map((_, colIndex) => (
                        <td key={`blank-${index}-${colIndex}`}>&nbsp;</td>
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
                  {Array.from({ length: 9 }).map((_, index) => (
                    <tr key={`blank-${index}`}>
                      {Array.from({ length: 3 }).map((_, colIndex) => (
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
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Get_Category;
