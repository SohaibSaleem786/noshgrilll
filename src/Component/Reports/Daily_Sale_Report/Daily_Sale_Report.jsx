import React, { useState, useEffect, useContext } from "react";
import { Container, Spinner, Nav } from "react-bootstrap";
import axios from "axios";
import jsPDF from "jspdf";
import Select from "react-select";
import * as XLSX from "xlsx";
import { Link } from "react-router-dom";
// import EmailModal from "./EmailModal";
// import "./Ledgers.css";
// import { Content } from "../../../App";

export default function Daily_Sale_Report() {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const defaultFromDate = `${year}-${month.toString().padStart(2, "0")}-01`;

  const defaultToDate = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;

  const [selectedDateFrom, setSelectedDateFrom] = useState(defaultFromDate);

  const [selectedDateTo, setSelectedDateTo] = useState(defaultToDate);

  //   const { tableTopColor, tableHeadColor, secondaryColor, textColor, apiLink } =
  //     useContext(Content);

  const tableTopColor = "#c6daf7";
  const tableHeadColor = "#c6daf7";
  const secondaryColor = "#c6daf7";
  const textColor = "black";
  const apiLink =
    "https://crystalsolutions.com.pk/nosh_grill/DailySaleReportWeb.php";

  const [tableData, setTableData] = useState([]);

  const [dropdownOptionsStatus, setDropdownOptionsStatus] = useState([]);
  const [selectedOptionStatus, setSelectedOptionStatus] = useState("");

  const [selectedSearch, setSelectedSearch] = useState("");

  const [selectedOptionType, setSelectedOptionType] = useState("");

  const [selectedRow, setSelectedRow] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const [sortData, setSortData] = useState("ASC");

  const apiUrl = apiLink;

  const dropDownApiUrl = apiLink;
  function fetchMenuItems() {
    // console.log(
    // 	"klajdfhlakjdsfh" + selectedDateFrom,
    // 	selectedDateTo,
    // 	selectedOptionStatus
    // );
    setIsLoading(true);
    const formData = new URLSearchParams({
      date: selectedDateFrom,
      //   fnldate: selectedDateTo,
      //   account: selectedOptionStatus,
    }).toString();
    axios
      .post(apiUrl, formData)
      .then((response) => {
        setTableData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
      });
  }

  useEffect(() => {
    axios
      .get(dropDownApiUrl)
      .then((response) => {
        setDropdownOptionsStatus(response.data); // Assuming response.data is an array of options
      })
      .catch((error) => {
        console.error("Error fetching dropdown options:", error);
      });
  }, []);

  const handleSubmit = () => {
    fetchMenuItems();
  };

  const exportPDFHandler = () => {
    // Create a new jsPDF instance with landscape orientation
    const doc = new jsPDF({ orientation: "portrait" });

    // Define table data (rows)
    const rows = getFilteredTableData().map((item) => [
      String(item.id),
      String(item.tcstnam),
      String(item.tmobnum),
      String(item.w_name),
      String(item.dvdsc),
      String(item.totalAmt),
    ]);

    // Add summary row to the table
    rows.push(["", "", "", "", "", String(totalDebit)]);

    // Define table column headers and individual column widths
    const headers = ["Sr#", "Name", "Mobile", "Waiter", "Order Type", "Amount"];
    const columnWidths = [10, 30, 20, 20, 22, 27];

    // Calculate total table width
    const totalWidth = columnWidths.reduce((acc, width) => acc + width, 0);

    // Define page height and padding
    const pageHeight = doc.internal.pageSize.height;
    const paddingTop = 20;
    const paddingBottom = 20;

    // Set font properties for the table
    doc.setFont("Verdana");
    doc.setFontSize(10);

    // Function to add table headers
    const addTableHeaders = (startX, startY) => {
      // Set font style and size for headers
      doc.setFont("bold"); // Set font to bold
      doc.setFontSize(12); // Set font size for headers

      headers.forEach((header, index) => {
        const cellWidth = columnWidths[index];
        const cellHeight = 6; // Height of the header row
        const cellX = startX + cellWidth / 2; // Center the text horizontally
        const cellY = startY + cellHeight / 2 + 1.5; // Center the text vertically

        // Draw the inner border (to achieve the double border effect)
        doc.setLineWidth(0.2); // Set the width of the inner border
        doc.rect(startX, startY, cellWidth, cellHeight);

        // Set text alignment to center
        doc.setTextColor(0); // Set text color to black
        doc.text(cellX, cellY, header, null, null, "center"); // Center the text
        startX += columnWidths[index]; // Move to the next column
      });

      // Reset font style and size after adding headers
      doc.setFont("normal");
      doc.setFontSize(10);
    };

    const addTableRows = (startX, startY, startIndex, endIndex) => {
      const rowHeight = 5; // Adjust this value to decrease row height
      const fontSize = 8; // Adjust this value to decrease font size
      // const boldFont = "Rubik One"; // Bold font
      const normalFont = "helvetica"; // Default font
      const tableWidth = getTotalTableWidth(); // Calculate total table width
      const pageHeight = doc.internal.pageSize.height; // Get page height

      doc.setFontSize(fontSize);

      for (let i = startIndex; i < endIndex; i++) {
        const row = rows[i];
        const isOddRow = i % 2 !== 0; // Check if the row index is odd
        // const isRedRow = row[0] && parseInt(row[0]) > 100; // Check if tctgcod is greater than 100
        let textColor = [0, 0, 0]; // Default text color
        let fontName = normalFont; // Default font

        // if (isRedRow) {
        // 	textColor = [255, 0, 0]; // Red color
        // 	fontName = boldFont; // Set bold font for red-colored row
        // }

        // Set background color for odd-numbered rows
        if (isOddRow) {
          doc.setFillColor(240); // Light background color
          doc.rect(
            startX,
            startY + (i - startIndex + 2) * rowHeight,
            tableWidth,
            rowHeight,
            "F"
          );
        }

        // Draw row borders
        doc.setDrawColor(0); // Set color for borders
        doc.rect(
          startX,
          startY + (i - startIndex + 2) * rowHeight,
          tableWidth,
          rowHeight
        );

        row.forEach((cell, cellIndex) => {
          const cellY = startY + (i - startIndex + 2) * rowHeight + 3;
          // Set text color
          doc.setTextColor(textColor[0], textColor[1], textColor[2]);
          // Set font
          doc.setFont(fontName, "normal");
          // Determine alignment and xOffset for each cell

          // Align columns 0, 3 to the right, others to the left
          const align =
            cellIndex === 1 ||
            cellIndex === 3 ||
            cellIndex === 4 ||
            cellIndex === 5
              ? "right"
              : "left";
          const xOffset =
            cellIndex === 1 ||
            cellIndex === 3 ||
            cellIndex === 4 ||
            cellIndex === 5
              ? startX + columnWidths[cellIndex] - 2
              : startX + 2;

          // Adjust xOffset for the text position
          doc.text(cell, xOffset, cellY, null, null, align);

          // Draw column borders (excluding the last column)
          if (cellIndex < row.length - 1) {
            doc.rect(
              startX,
              startY + (i - startIndex + 2) * rowHeight,
              columnWidths[cellIndex],
              rowHeight
            );
            startX += columnWidths[cellIndex];
          }
        });

        // Draw border for the last column
        doc.rect(
          startX,
          startY + (i - startIndex + 2) * rowHeight,
          columnWidths[row.length - 1],
          rowHeight
        );
        startX = (doc.internal.pageSize.width - tableWidth) / 2; // Adjusted for center alignment
      }

      // Draw line at the bottom of the page with padding
      const lineWidth = tableWidth; // Match line width with table width
      const lineX = (doc.internal.pageSize.width - tableWidth) / 2; // Center line
      const lineY = pageHeight - 15; // Position the line 20 units from the bottom
      doc.setLineWidth(0.3);
      doc.line(lineX, lineY, lineX + lineWidth, lineY); // Draw line
      const headingFontSize = 12; // Adjust as needed

      // Add heading "Crystal Solution" aligned left bottom of the line
      const headingX = lineX + 2; // Padding from left
      const headingY = lineY + 5; // Padding from bottom
      doc.setFontSize(headingFontSize); // Set the font size for the heading
      doc.setTextColor(0); // Reset text color to default
      doc.text(headingX, headingY, "Crystal Solution");
    };

    // Function to calculate total table width
    const getTotalTableWidth = () => {
      let totalWidth = 0;
      columnWidths.forEach((width) => (totalWidth += width));
      return totalWidth;
    };

    // Function to add a new page and reset startY
    const addNewPage = (startY) => {
      doc.addPage();
      return paddingTop; // Set startY for each new page
    };

    // Define the number of rows per page
    const rowsPerPage = 45; // Adjust this value based on your requirements

    // Function to handle pagination
    const handlePagination = () => {
      // Define the addTitle function
      const addTitle = (
        title,
        date,
        time,
        pageNumber,
        startY,
        titleFontSize = 16,
        dateTimeFontSize = 8,
        pageNumberFontSize = 8
      ) => {
        doc.setFontSize(titleFontSize); // Set the font size for the title
        doc.text(title, doc.internal.pageSize.width / 2, startY, {
          align: "center",
        });

        // Calculate the x-coordinate for the right corner
        const rightX = doc.internal.pageSize.width - 10;

        if (date) {
          doc.setFontSize(dateTimeFontSize); // Set the font size for the date and time
          if (time) {
            doc.text(date + " " + time, rightX, startY, { align: "right" });
          } else {
            doc.text(date, rightX - 10, startY, { align: "right" });
          }
        }

        // Add page numbering
        doc.setFontSize(pageNumberFontSize);
        doc.text(
          `Page ${pageNumber}`,
          rightX - 10,
          doc.internal.pageSize.height - 10,
          { align: "right" }
        );
      };

      let currentPageIndex = 0;
      let startY = paddingTop; // Initialize startY
      let pageNumber = 1; // Initialize page number

      while (currentPageIndex * rowsPerPage < rows.length) {
        const date = getCurrentDate(); // Get current date
        const time = getCurrentTime(); // Get current time
        addTitle("NOSH GRILL", date, "", pageNumber, startY); // Render company title with default font size, only date, and page number
        startY += 5; // Adjust vertical position for the company title
        addTitle("DAILY SALE REPORT", time, "", pageNumber, startY, 10, 8); // Render sale report title with decreased font size, provide the time, and page number
        startY += 6; // Adjust vertical position for the sale report title

        // Add the "Salary", "From Date", and "To Date" labels before the table headers
        const labelsX = (doc.internal.pageSize.width - totalWidth) / 2;
        const labelsY = startY + 5; // Position the labels below the titles and above the table
        doc.setFontSize(12);
        // doc.text(`A/C: ${selectedOptionStatus}`, labelsX, labelsY);
        // doc.text(`From: ${selectedDateFrom}`, labelsX + 110, labelsY); // Adjust x-coordinate for From Date
        // doc.text(`To: ${selectedDateTo}`, labelsX + 150, labelsY); // Adjust x-coordinate for To Date
        startY += 3;

        addTableHeaders((doc.internal.pageSize.width - totalWidth) / 2, 38);
        const startIndex = currentPageIndex * rowsPerPage;
        const endIndex = Math.min(startIndex + rowsPerPage, rows.length);
        startY = addTableRows(
          (doc.internal.pageSize.width - totalWidth) / 2,
          startY,
          startIndex,
          endIndex
        );
        if (endIndex < rows.length) {
          startY = addNewPage(startY); // Add new page and update startY
          pageNumber++; // Increment page number
        }
        currentPageIndex++;
      }
    };

    const getCurrentDate = () => {
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, "0");
      const mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
      const yyyy = today.getFullYear();
      return dd + "/" + mm + "/" + yyyy;
    };

    // Function to get current time in the format HH:MM:SS
    const getCurrentTime = () => {
      const today = new Date();
      const hh = String(today.getHours()).padStart(2, "0");
      const mm = String(today.getMinutes()).padStart(2, "0");
      const ss = String(today.getSeconds()).padStart(2, "0");
      return hh + ":" + mm + ":" + ss;
    };

    // Call function to handle pagination
    handlePagination();

    // Save the PDF file
    doc.save("DailySaleReport.pdf");
    // Print the PDF by triggering the print dialog for the iframe

    // const pdfBlob = doc.output("blob");
    // const pdfFile = new File([pdfBlob], "table_data.pdf", {
    // 	type: "application/pdf",
    // });
  };

  const handleDownloadCSV = () => {
    // Create workbook
    const workbook = XLSX.utils.book_new();

    // Create worksheet
    const worksheet = XLSX.utils.aoa_to_sheet([
      ["", "NOSH GRILL"],
      ["", "DAILY SALE REPORT"],
    ]);

    const acc_date = [
      //   `A/C: ${selectedOptionStatus}`,
      "",
      `Date: ${selectedDateFrom}`,
      //   `To: ${selectedDateTo}`,
    ];
    XLSX.utils.sheet_add_aoa(worksheet, [acc_date], { origin: -1 });

    // Define table column headers
    const headers = ["Sr#", "Name", "Mobile", "Waiter", "Order Type", "Amount"];

    // Map the data to match the header order
    const mappedData = getFilteredTableData().map((item) => ({
      Sr: item.id,
      Name: item.tcstnam,
      Mobile: item.tmobnum,
      Waiter: item.w_name,
      Type: item.dvdsc,
      Amount: item.totalAmt,
    }));

    // Convert mappedData to array of arrays
    const dataRows = mappedData.map((item) => [
      item.id,
      item.tcstnam,
      item.tmobnum,
      item.w_name,
      item.dvdsc,
      item.totalAmt,
    ]);

    // Add headers and data to worksheet
    XLSX.utils.sheet_add_aoa(worksheet, [[]], { origin: -1 }); // Add one empty row
    XLSX.utils.sheet_add_aoa(worksheet, [headers], { origin: -1 }); // Add headers
    XLSX.utils.sheet_add_aoa(worksheet, [[]], { origin: -1 }); // Add one empty row

    // Add data rows
    XLSX.utils.sheet_add_aoa(worksheet, dataRows, { origin: -1 });

    // Add one empty row after all content
    XLSX.utils.sheet_add_aoa(worksheet, [[]], { origin: -1 });
    // Add a footer row with total number of rows
    const footerRow = ["", "", "", "", "", totalDebit];
    XLSX.utils.sheet_add_aoa(worksheet, [footerRow], { origin: -1 });

    // Set column widths
    const columnWidths = [
      { wch: 13 },
      { wch: 7 },
      { wch: 30 },
      { wch: 12 },
      { wch: 12 },
      { wch: 12 },
    ];
    worksheet["!cols"] = columnWidths;

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Save workbook as Excel file
    XLSX.writeFile(workbook, "DailySaleReport.xlsx");
  };

  // const handleSorting = async (col) => {
  // 	const isDate = (str) => {
  // 		const datePattern = /^\d{1,2}-\d{1,2}-\d{4}$/;
  // 		return datePattern.test(str);
  // 	};

  // 	const parseDate = (str) => {
  // 		const [day, month, year] = str.split("-").map(Number);
  // 		return new Date(year, month - 1, day);
  // 	};

  // 	const sortDataByColumn = (order) => {
  // 		const sorted = [...tableData].sort((a, b) => {
  // 			const valueA = a[col];
  // 			const valueB = b[col];

  // 			if (isDate(valueA) && isDate(valueB)) {
  // 				const dateA = parseDate(valueA);
  // 				const dateB = parseDate(valueB);
  // 				return order === "ASC" ? dateA - dateB : dateB - dateA;
  // 			}

  // 			const numA = parseFloat(valueA);
  // 			const numB = parseFloat(valueB);

  // 			if (!isNaN(numA) && !isNaN(numB)) {
  // 				return order === "ASC" ? numA - numB : numB - numA;
  // 			} else {
  // 				const strA = valueA !== null ? valueA.toLowerCase() : "";
  // 				const strB = valueB !== null ? valueB.toLowerCase() : "";
  // 				if (strA < strB) return order === "ASC" ? -1 : 1;
  // 				if (strA > strB) return order === "ASC" ? 1 : -1;
  // 				return 0;
  // 			}
  // 		});
  // 		setTableData(sorted);
  // 		setSortData(order === "ASC" ? "DSC" : "ASC");
  // 	};

  // 	if (sortData === "ASC") {
  // 		sortDataByColumn("ASC");
  // 	} else if (sortData === "DSC") {
  // 		sortDataByColumn("DSC");
  // 	}
  // };

  // function refreshPage() {
  // 	handleSubmit();
  // }

  const isClearable = true;

  const handleSearch = (e) => {
    setSelectedSearch(e.target.value);
  };

  const handleType = (e) => {
    setSelectedOptionType(e.target.value);
  };

  const handleStatus = (event) => {
    // Check if event is not null before accessing its properties
    if (event) {
      setSelectedOptionStatus(event.value);
    } else {
      // Handle the case when the selection is cleared
      setSelectedOptionStatus(null);
    }
  };

  const getFilteredTableData = () => {
    let filteredData = tableData; // Make a copy of tableData to avoid mutating the original

    // Filter based on selectedOptionType
    if (selectedOptionType) {
      filteredData = filteredData.filter(
        (data) => data.dvdsc === selectedOptionType
      );
    }

    // Filter based on search query
    if (selectedSearch.trim() !== "") {
      const query = selectedSearch.trim().toLowerCase();
      filteredData = filteredData.filter(
        (data) =>
          (data.tcstnam && data.tcstnam.toLowerCase().includes(query)) ||
          (data.dvdsc && data.dvdsc.toLowerCase().includes(query))
      );
    }

    return filteredData;
  };

  const statusOption = [
    ...dropdownOptionsStatus.map((option) => ({
      value: option.code,
      label:
        // option.code + " " +
        option.description,
    })),
  ];

  const customStyles = {
    control: (base, state) => ({
      ...base,
      height: "24px",
      minHeight: "24px",
      maxHeight: "24px",
      width: "100%",
      fontSize: "12px",
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

  // const handleRowClick = (row) => {
  // 	setSelectedRow(row.ttrnnum);
  // };

  const firstColWidth = {
    width: "5%",
  };
  const secondColWidth = {
    width: "25%",
  };
  const thirdColWidth = {
    width: "20%",
  };
  const forthColWidth = {
    width: "16%",
  };
  const fifthColWidth = {
    width: "16%",
  };
  const sixthColWidth = {
    width: "16%",
  };

  let totalEnteries = 0;
  let totalDebit = 0;
  let totalCredit = 0;
  let totalBalance = 0;

  return (
    <>
      <Container className="my-5 border border-dark" id="ContainerStyling6col">
        <div style={{ margin: "0 -12px" }}>
          <Nav
            className="col-12 d-flex justify-content-between"
            style={{ backgroundColor: tableTopColor, color: textColor }}
          >
            <div className="col-4">
              {/* <span
								className="fa-solid fa-envelope fa-xl topBtn"
								title="Email"
							></span> */}
              <span onClick={handleDownloadCSV}>
                <i
                  className="fa-solid fa-file-csv fa-xl topBtn"
                  title="Download Excel"
                ></i>
              </span>
              <i
                className="fa-solid fa-file-pdf fa-xl topBtn"
                title="Download PDF"
                onClick={exportPDFHandler}
              ></i>
              {/* <i
								className="fa fa-refresh fa-xl topBtn"
								title="Refresh"
								onClick={refreshPage}
							></i> */}
              <i
                class="fa-solid fa-upload fa-xl topBtn"
                title="Submit"
                onClick={handleSubmit}
              ></i>
            </div>
            <div style={{ fontSize: "14px" }} className="col-4 text-center">
              <strong>Daily Sale Report</strong>
            </div>
            <div className="text-end col-4">
              <Link to="/MainPage">
                <i className="fa fa-close fa-2xl crossBtn"></i>
              </Link>
            </div>
          </Nav>
          <div className="my-1">
            <div className="col-12 d-flex mb-1">
              <div className="col-4 d-flex justify-content-start align-items-center">
                <label className="col-3 text-end">
                  <strong>From: &ensp;&ensp;</strong>
                </label>
                <input
                  style={{ height: "24px" }}
                  type="date"
                  format="dd-mm-yyyy"
                  className="col-6"
                  onChange={(e) => setSelectedDateFrom(e.target.value)}
                  defaultValue={defaultFromDate}
                />
              </div>
              {/* <div className="col-4 d-flex justify-content-start align-items-center">
                <label className="col-3 text-end">
                  <strong>To: &ensp;&ensp;</strong>
                </label>
                <input
                  style={{ height: "24px" }}
                  format="dd-mm-yyyy"
                  type="date"
                  className="col-6"
                  onChange={(e) => setSelectedDateTo(e.target.value)}
                  defaultValue={defaultToDate}
                />
              </div> */}
              <div className="col-4"></div>
              <div className="col-4 d-flex justify-content-end">
                <label className="col-3 d-flex align-items-center justify-content-end">
                  <strong>Search: &ensp;&ensp;</strong>
                </label>
                <input
                  style={{ height: "24px" }}
                  type="text"
                  placeholder="Search..."
                  className="col-9"
                  onChange={handleSearch}
                  value={selectedSearch}
                />
              </div>
            </div>
            <div className="col-12 d-flex">
              <div className="col-4 d-flex justify-content-start">
                <label className="col-3 d-flex align-items-center justify-content-end">
                  <strong>Type: &ensp;&ensp;</strong>
                </label>
                <select
                  style={{ height: "24px" }}
                  className="col-6"
                  onChange={handleType}
                  value={selectedOptionType}
                >
                  <option value="">All</option>
                  <option value={"DINING"}>Dinning</option>
                  <option value={"DELIVERY"}>Delivery</option>
                  <option value={"TAKE_AWAY"}>Take Away</option>
                  <option value={"CAR"}>Car</option>
                </select>
              </div>
              <div className="col-4"></div>
              {/* <div className="col-4 d-flex justify-content-end align-items-center">
                <label className="col-3 text-end">
                  <strong>A/C: &ensp;&ensp;</strong>
                </label>
                <Select
                  className="col-9"
                  onChange={handleStatus}
                  options={statusOption}
                  placeholder="Search or select..."
                  styles={customStyles}
                  isClearable={isClearable}
                />
              </div> */}
            </div>
          </div>
          <div>
            <div
              style={{
                overflowY: "auto",
                maxHeight: "65vh",
                width: "100%",
              }}
            >
              <table
                className="myTable"
                id="table"
                style={{
                  fontSize: "12px",
                  width: "100%",
                  position: "relative",
                }}
              >
                <thead
                  style={{
                    fontWeight: "bold",
                    height: "24px",
                    position: "sticky",
                    top: 0,
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                    // border: "1px solid black",
                  }}
                >
                  <tr
                    style={{
                      backgroundColor: tableHeadColor,
                    }}
                  >
                    <td
                      className="border-dark"
                      style={firstColWidth}
                      // onClick={() => handleSorting("ttrndat")}
                    >
                      Sr#{" "}
                      {/* <i className="fa-solid fa-caret-down caretIconStyle"></i> */}
                    </td>
                    <td
                      className="border-dark"
                      style={secondColWidth}
                      // onClick={() => handleSorting("ttrnnum")}
                    >
                      Name{" "}
                      {/* <i className="fa-solid fa-caret-down caretIconStyle"></i> */}
                    </td>
                    <td
                      className="border-dark"
                      style={thirdColWidth}
                      // onClick={() => handleSorting("ttrndsc")}
                    >
                      Mobile{" "}
                      {/* <i className="fa-solid fa-caret-down caretIconStyle"></i> */}
                    </td>
                    <td
                      className="border-dark"
                      style={forthColWidth}
                      // onClick={() => handleSorting("tdbtamt")}
                    >
                      Waiter{" "}
                      {/* <i className="fa-solid fa-caret-down caretIconStyle"></i> */}
                    </td>
                    <td
                      className="border-dark"
                      style={fifthColWidth}
                      // onClick={() => handleSorting("tcrtamt")}
                    >
                      Order Type{" "}
                      {/* <i className="fa-solid fa-caret-down caretIconStyle"></i> */}
                    </td>
                    <td
                      className="border-dark"
                      style={sixthColWidth}
                      // onClick={() => handleSorting("balance")}
                    >
                      Amount{" "}
                      {/* <i className="fa-solid fa-caret-down caretIconStyle"></i> */}
                    </td>
                  </tr>
                </thead>

                <tbody>
                  {isLoading ? (
                    <>
                      <tr>
                        <td colSpan="6" className="text-center">
                          <Spinner animation="border" variant="primary" />
                        </td>
                      </tr>
                      {Array.from({ length: Math.max(0, 30 - 3) }).map(
                        (_, rowIndex) => (
                          <tr key={`blank-${rowIndex}`}>
                            {Array.from({ length: 6 }).map((_, colIndex) => (
                              <td key={`blank-${rowIndex}-${colIndex}`}>
                                &nbsp;
                              </td>
                            ))}
                          </tr>
                        )
                      )}
                    </>
                  ) : (
                    <>
                      {getFilteredTableData().map((item, i) => {
                        var debitVal = item.totalAmt || "0";
                        var creditVal = item.tcrtamt || "0";
                        var balanceVal = item.balance || "0";

                        totalEnteries += 1;
                        totalDebit += parseFloat(debitVal.replace(/,/g, ""));
                        totalCredit += parseFloat(creditVal.replace(/,/g, ""));
                        totalBalance += parseFloat(
                          balanceVal.replace(/,/g, "")
                        );

                        return (
                          <tr
                            key={i}
                            // onClick={() => handleRowClick(item)}
                            style={{
                              // 	backgroundColor:
                              // 		selectedRow === item.ttrnnum
                              // 			? "#ADD8E6"
                              // 			: "white",
                              // 	fontWeight:
                              // 		selectedRow === item.ttrnnum ? "bold" : "",
                              fontSize: "12px !important",
                            }}
                          >
                            <td className="text-center" style={firstColWidth}>
                              {item.id}
                            </td>
                            <td className="text-start" style={secondColWidth}>
                              {item.tcstnam}
                            </td>
                            <td className="text-end" style={thirdColWidth}>
                              {item.tmobnum}
                            </td>
                            <td className="text-start" style={forthColWidth}>
                              {item.w_name}
                            </td>
                            <td className="text-start" style={fifthColWidth}>
                              {item.dvdsc}
                            </td>
                            <td className="text-end" style={sixthColWidth}>
                              {item.totalAmt}
                            </td>
                          </tr>
                        );
                      })}
                      {Array.from({
                        length: Math.max(0, 27 - getFilteredTableData().length),
                      }).map((_, rowIndex) => (
                        <tr key={`blank-${rowIndex}`}>
                          {Array.from({ length: 6 }).map((_, colIndex) => (
                            <td key={`blank-${rowIndex}-${colIndex}`}>
                              &nbsp;
                            </td>
                          ))}
                        </tr>
                      ))}
                    </>
                  )}
                </tbody>
              </table>
            </div>
            {/* Footer div -section */}
            <div
              className="col-12 border-dark border-top"
              style={{
                backgroundColor: secondaryColor,
              }}
            >
              <input
                type="text"
                value={totalEnteries}
                className="text-center border-dark"
                disabled
                style={{
                  // ...firstColWidth,
                  width: "5%",
                  height: "24px",
                  backgroundColor: secondaryColor,
                  fontWeight: "bold",
                }}
              />
              <input
                type="text"
                // value={totalEnteries}
                className="text-center border-dark"
                disabled
                style={{
                  // ...secondColWidth,
                  width: "25%",
                  height: "24px",
                  backgroundColor: secondaryColor,
                  fontWeight: "bold",
                }}
              />
              <input
                type="text"
                // value={totalEnteries}
                className="text-center border-dark"
                disabled
                style={{
                  // ...thirdColWidth,
                  width: "20%",
                  height: "24px",
                  backgroundColor: secondaryColor,
                  fontWeight: "bold",
                }}
              />
              <input
                type="text"
                // value={totalDebit.toLocaleString()}
                className="text-end border-dark"
                disabled
                style={{
                  // ...forthColWidth,
                  width: "16%",
                  height: "24px",
                  backgroundColor: secondaryColor,
                  fontWeight: "bold",
                }}
              />
              <input
                type="text"
                // value={totalCredit.toLocaleString()}
                className="text-end border-dark"
                disabled
                style={{
                  // ...fifthColWidth,
                  width: "16%",
                  height: "24px",
                  backgroundColor: secondaryColor,
                  fontWeight: "bold",
                }}
              />
              <input
                type="text"
                value={totalDebit.toLocaleString()}
                className="text-end border-dark"
                disabled
                style={{
                  ...sixthColWidth,
                  height: "24px",
                  backgroundColor: secondaryColor,
                  fontWeight: "bold",
                }}
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
