import React, { forwardRef, useEffect, useState } from "react";
import { useTheme } from "../../../ThemeContext";
import axios from "axios";
import logo from "../../../image/cheifkitchen.png";
import "./Receipt.css";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdb-react-ui-kit";

const Receipt = forwardRef(
  (
    {
      mobile,
      address,
      newOrderData,
      detailItem,
      selectedCategory1,
      priceDiscount,
      percentageDiscount,
      subsractedvalue,
      enteredAmount,
      totalAmount,
    },
    ref
  ) => {
    console.log(detailItem, "detailItem");
    const date = new Date();
    const formattedDate = `${date.getDate().toString().padStart(2, "0")}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;
    const time = `${date.getHours().toString().padStart(2, "0")}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`;
    const { primaryColor, secondaryColor, apiLinks } = useTheme();

    const [tamtItems, settamtItems] = useState("");
    const [totalItem, settotalItem] = useState(0);
    const [detailItema, setDetailItem] = useState([]);

    useEffect(() => {
      console.log(detailItem, "shfshkfj");
      const fetchMenuItems = () => {
        const apiUrl = `https://crystalsolutions.com.pk/nosh_grill/Cart_Item.php`;
        const formData = new URLSearchParams({
          orderid: newOrderData?.id,
        }).toString();

        axios
          .post(apiUrl, formData)
          .then((response) => {
            settotalItem(response.data.totalitem);
            setDetailItem(response.data.detail);
            settamtItems(response.data.totalAmt.toLocaleString());
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      };
      fetchMenuItems();
    }, [newOrderData?.id]);

    return (
      <div
        id="receipt-container"
        ref={ref}
        style={{
          fontSize: "12px",
          fontFamily: "'Courier New', monospace",
          fontWeight: "bold",
          width: "300px",
          margin: "0 auto",
          padding: "1px",
          marginTop: "-5px",
          borderBottom: "1px solid #000",
          borderRadius: "0px",
        }}
      >
        <div
          id="receipt"
          style={{
            textAlign: "center",
            // padding: "10px 0",
            borderBottom: "1px solid #000",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'Courier New', monospace",

              borderBottom: "2px solid #FFB200",
              paddingBottom: "10px",
              marginBottom: "10px",
            }}
          >
            <img
              src={logo}
              alt="logo"
              style={{
                height: "90px", // Slightly larger for better visibility
                width: "90px",
                marginRight: "5px", // Adds space between the logo and text
              }}
            />
            <p
              style={{
                margin: 0,
                fontSize: "25px", // Increases the font size for better readability
                fontWeight: "bold", // Makes the text bold
                color: "#333", // Adds a dark grey color for better contrast
                display: "flex",
                alignItems: "center", // Centers the text vertically with the logo
              }}
            >
              <span style={{ color: "black", fontWeight: "bold" }}>
                Nosh Grill'z
              </span>{" "}
            </p>
          </div>

          <h2 style={{ fontSize: "25px" }}></h2>
          <p style={{ margin: 0, color: "black", fontWeight: "bold" }}>
            Pir G Dars Road <br />
            Block # 6 CCV <br />
            Delivery: 0301-9686186
          </p>
          <h3
            style={{
              fontSize: "16px",
              margin: "8px 0",
              color: "black",
              fontWeight: "bold",
            }}
          >
            <strong>Sales Receipt</strong>
          </h3>

          <div style={{ display: "flex", justifyContent: "start" }}>
            <p style={{ margin: 0, color: "black", fontWeight: "bold" }}>
              <strong>Token Number:</strong> {newOrderData?.id}
            </p>
          </div>
          <div style={{ display: "flex", justifyContent: "start" }}>
            <p style={{ margin: 0, color: "black", fontWeight: "bold" }}>
              <strong>Date:</strong> {formattedDate} {time}{" "}
            </p>
          </div>
          <div style={{ display: "flex", justifyContent: "start" }}>
            <p style={{ margin: 0, color: "black", fontWeight: "bold" }}>
              <strong>Mobile#:</strong> {mobile}
            </p>
          </div>
          <div style={{ display: "flex", justifyContent: "start" }}>
            <p style={{ margin: 0, color: "black", fontWeight: "bold" }}>
              <strong>Address:</strong> {address}
            </p>
          </div>
          <div style={{ display: "flex", justifyContent: "start" }}>
            <p style={{ margin: 0, color: "black", fontWeight: "bold" }}>
              <strong>Order:</strong>
              {selectedCategory1 === "1"
                ? "Delivery"
                : selectedCategory1 === "2"
                ? "Dining"
                : selectedCategory1 === "3"
                ? "Take Away"
                : "Car"}
            </p>
          </div>
        </div>

        <div style={{ overflowX: "none", marginTop: "10px" }}>
          <table
            style={{
              width: "100%",
              fontSize: "12px",
              fontFamily: "'Courier New', monospace",
              fontWeight: "bold",

              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    borderBottom: "1px solid #000",
                    textAlign: "center",
                    fontWeight: "bold",
                    color: "black",
                  }}
                >
                  Sr.
                </th>
                <th
                  style={{
                    borderBottom: "1px solid #000",
                    textAlign: "center",
                    fontWeight: "bold",
                    color: "black",
                  }}
                >
                  Item
                </th>
                <th
                  style={{
                    borderBottom: "1px solid #000",
                    textAlign: "center",
                    fontWeight: "bold",
                    color: "black",
                  }}
                >
                  Price
                </th>

                <th
                  style={{
                    borderBottom: "1px solid #000",
                    textAlign: "center",
                    fontWeight: "bold",
                    color: "black",
                  }}
                >
                  Qty
                </th>
                <th
                  style={{
                    borderBottom: "1px solid #000",
                    textAlign: "center",
                    fontWeight: "bold",
                    color: "black",
                  }}
                >
                  Dis
                </th>
                <th
                  style={{
                    borderBottom: "1px solid #000",
                    textAlign: "center",
                    fontWeight: "bold",
                    color: "black",
                  }}
                >
                  Total
                </th>
              </tr>
            </thead>
            <tbody
              style={{
                fontSize: "14px",
                fontFamily: "'Courier New', monospace",
              }}
            >
              {detailItem?.map((item, index) => (
                <tr key={index}>
                  <td
                    style={{
                      textAlign: "center",
                      width: "10px",
                      borderBottom: "1px solid #ddd",
                    }}
                  >
                    <p
                      style={{
                        fontWeight: "bold",
                        color: "black",
                        fontSize: "11px",
                      }}
                    >
                      {index + 1}
                    </p>
                  </td>
                  <td
                    style={{
                      textAlign: "left",
                      width: "200px",
                      borderBottom: "1px solid #ddd",
                    }}
                  >
                    <p
                      style={{
                        fontWeight: "bold",
                        color: "black",
                        fontSize: "11px",
                      }}
                    >
                      {item.titmdsc}
                    </p>
                  </td>
                  <td
                    style={{
                      textAlign: "right",
                      borderBottom: "1px solid #ddd",
                    }}
                  >
                    <p
                      style={{
                        fontWeight: "bold",
                        color: "black",
                        fontSize: "11px",
                      }}
                    >
                      {" "}
                      {item.tsalrat}
                    </p>
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      borderBottom: "1px solid #ddd",
                    }}
                  >
                    <p
                      style={{
                        fontWeight: "bold",
                        color: "black",
                        fontSize: "11px",
                      }}
                    >
                      {" "}
                      {item.titmqnt}
                    </p>
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      borderBottom: "1px solid #ddd",
                    }}
                  >
                    <p
                      style={{
                        fontWeight: "bold",
                        color: "black",
                        fontSize: "11px",
                      }}
                    >
                      {" "}
                      {item.discount}
                    </p>
                  </td>
                  <td
                    style={{
                      textAlign: "right",
                      borderBottom: "1px solid #ddd",
                    }}
                  >
                    <p
                      style={{
                        fontWeight: "bold",
                        color: "black",
                        fontSize: "11px",
                      }}
                    >
                      {item.salamt}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <hr style={{ border: "1px solid black", margin: "10px 0" }} />
        <div className="row">
          <div className="col-6">
            {" "}
            <p
              style={{
                margin: 0,
                color: "black",
                fontWeight: "bold",
                fontSize: "14px",
              }}
            >
              <strong>Total Items:</strong> {totalItem}
            </p>
          </div>
          <div className="col-3">
            <strong
              style={{
                display: "flex",
                justifyContent: "end",
                color: "black",
                fontWeight: "bold",
              }}
            >
              {" "}
              Amount:
            </strong>
          </div>
          <div
            className="col-2 "
            style={{ textAlign: "right", color: "black", fontWeight: "bold" }}
          >
            {tamtItems}
          </div>
          <div className="col-1"></div>
        </div>
        <div className="row">
          <div className="col-6"></div>
          <div className="col-3">
            <strong
              style={{
                display: "flex",
                justifyContent: "end",
                color: "black",
                fontWeight: "bold",
              }}
            >
              {" "}
              Discount:
            </strong>
          </div>
          <div
            className="col-2 "
            style={{ textAlign: "right", color: "black", fontWeight: "bold" }}
          >
            {priceDiscount}
          </div>
          <div className="col-1"></div>
        </div>
        <div className="row">
          <div className="col-9" style={{ textAlign: "right" }}>
            <strong
              style={{
                display: "flex",
                justifyContent: "end",
                color: "black",
                fontWeight: "bold",
              }}
            >
              {" "}
              Net Total:
            </strong>
          </div>
          <div
            className="col-2 "
            style={{ textAlign: "right", color: "black", fontWeight: "bold" }}
          >
            {totalAmount}
          </div>
          <div className="col-1"></div>
        </div>
        <div className="row">
          <div className="col-9" style={{ textAlign: "right" }}>
            <strong
              style={{
                display: "flex",
                justifyContent: "end",
                color: "black",
                fontWeight: "bold",
              }}
            >
              {" "}
              Amount Received:
            </strong>
          </div>
          <div
            className="col-2 "
            style={{ textAlign: "right", color: "black", fontWeight: "bold" }}
          >
            {enteredAmount}
          </div>
          <div className="col-1"></div>
        </div>
        <div className="row">
          <div className="col-9" style={{ textAlign: "right" }}>
            <strong
              style={{
                display: "flex",
                justifyContent: "end",
                color: "black",
                fontWeight: "bold",
              }}
            >
              Balance Payable:
            </strong>
          </div>
          <div
            className="col-2 "
            style={{ textAlign: "right", color: "black", fontWeight: "bold" }}
          >
            {subsractedvalue}
          </div>
          <div className="col-1"></div>
        </div>
        {/* <hr style={{ border: "1px solid black", margin: "10px 0" }} /> */}
      </div>
    );
  }
);

export default Receipt;
