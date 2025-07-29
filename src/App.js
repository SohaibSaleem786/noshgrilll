import "./App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage1 from "./Component/MainComponent/HomePage/Homepage";
import { ThemeProvider } from "./ThemeContext";
import Loginn from "./Component/MainComponent/Loginn/Login";
import { SidebarProvider } from "./SidebarContext";
import Add_Item from "./Component/File/Item_Maintenance/Add_Item";
import Update_Item from "./Component/File/Item_Maintenance/Update_Item";
import Get_Item from "./Component/File/Item_Maintenance/Get_Item";
import Get_Category from "./Component/File/Category_Maintenance/Get_Category";
import Add_Category from "./Component/File/Category_Maintenance/Add_Category";
import Update_Category from "./Component/File/Category_Maintenance/Update_Category";
import Item_Sale from "./Component/Transaction/Item_Sale/Item_Sale";
import Cash_Receipt_Voucher from "./Component/Transaction/Cash_Receipt_Voucher/Cash_Receipt_Voucher";
import Location_Radius from "./Component/File/location_radius/Location_Radius";
import OrderList from "./Component/Transaction/OrderList/OrderList";
import OrderList_Info from "./Component/Transaction/OrderList/OrderList_Info";
import Order_Dashboard from "./Component/Transaction/Orders/OrderDashboard";
import Get_Table from "./Component/File/Table_Maintenance/Get_Table";
import Add_Table from "./Component/File/Table_Maintenance/Add_Table";
import Update_Table from "./Component/File/Table_Maintenance/Update_Table";
import Get_Waiter from "./Component/File/Waiter_Maitenance/Get_Waiter";
import Add_Waiter from "./Component/File/Waiter_Maitenance/Add_Waiter";
import Update_Waiter from "./Component/File/Waiter_Maitenance/Update_Waiter";
import Add_AccountCode from "./Component/File/AccountCode_Maintenance/Add_AccountCode";
import Cash_Payment_Voucher from "./Component/Transaction/Cash_Payment_Voucher/Cash_Payment_Voucher";
import Raw_Material from "./Component/File/Raw_Material/Raw_Material";
import Item_Purchase from "./Component/Transaction/Item_Purchase/Item_Purchase";
import Daily_Sale_Report from "./Component/Reports/Daily_Sale_Report/Daily_Sale_Report";
import Receipe_Maintenance from "./Component/File/Receipe_Maintenance/Receipe_Maintenance";
import Raw_Material_Purchase from "./Component/Transaction/Raw_Material_Purchase/Raw_Material_Purchase";
import Stock_Maintenance from "./Component/File/Stock_Maintenance/Stock_Maintenance";
function App() {
  return (
    <>
      {/* sdf */}
      <div style={{ backgroundColor: "white", minHeight: "100vh" }}>
        <Router basename="/noshgrilll">
          <SidebarProvider>
            <ThemeProvider>
              <Routes>
                <Route exact path="/" element={<Loginn />} />
                <Route exact path="/login" element={<Loginn />}></Route>
                <Route exact path="/MainPage" element={<HomePage1 />}></Route>
                {/* ///////////////////////////////// file  /////////////////////////////// */}
                {/* ///////////////////////////////// Category Maintenance /////////////////////////////// */}
                <Route
                  exact
                  path="/Get_Category"
                  element={<Get_Category />}
                ></Route>
                <Route
                  exact
                  path="/Add_Category"
                  element={<Add_Category />}
                ></Route>
                <Route
                  exact
                  path="/Update_Category/:tctgid"
                  element={<Update_Category />}
                ></Route>
                <Route
                  exact
                  path="/Location_Radius"
                  element={<Location_Radius />}
                ></Route>
                {/* ///////////////////////////////// ITem   /////////////////////////////// */}
                <Route exact path="/Get_Item" element={<Get_Item />}></Route>
                <Route exact path="/Add_Item" element={<Add_Item />}></Route>
                <Route
                  exact
                  path="/Update_Item/:TItmId"
                  element={<Update_Item />}
                ></Route>
                {/* ///////////////////////////////// order list   /////////////////////////////// */}
                <Route
                  exact
                  path="/OrderList_Info"
                  element={<OrderList_Info />}
                ></Route>
                <Route
                  exact
                  path="/OrderList_Infos/:id"
                  element={<OrderList_Info />}
                ></Route>
                <Route
                  exact
                  path="/Order_Dashboard"
                  element={<Order_Dashboard />}
                ></Route>
                {/* ///////////////////////////////// Table  /////////////////////////////// */}
                <Route exact path="/Get_Table" element={<Get_Table />}></Route>
                <Route exact path="/Add_Table" element={<Add_Table />}></Route>
                <Route
                  exact
                  path="/Update_Table/:t_id"
                  element={<Update_Table />}
                ></Route>
                {/* ///////////////////////////////// Waiter  /////////////////////////////// */}
                <Route
                  exact
                  path="/Get_Waiter"
                  element={<Get_Waiter />}
                ></Route>
                <Route
                  exact
                  path="/Add_Waiter"
                  element={<Add_Waiter />}
                ></Route>
                <Route
                  exact
                  path="/Update_Waiter/:w_id"
                  element={<Update_Waiter />}
                ></Route>
                {/* ///////////////////////////////// Waiter  /////////////////////////////// */}
                <Route
                  exact
                  path="/Account_Code_Maintenance"
                  element={<Add_AccountCode />}
                ></Route>
                <Route
                  exact
                  path="/Raw_Material_Maintenance"
                  element={<Raw_Material />}
                ></Route>
                <Route
                  exact
                  path="/Receipe_Maintenance"
                  element={<Receipe_Maintenance />}
                ></Route>
                <Route
                  exact
                  path="/Raw_Material_Purchase"
                  element={<Raw_Material_Purchase />}
                ></Route>
                {/* <Route
                  exact
                  path="/Account_Code_Maintenance"
                  element={<Item_Purchase />}
                ></Route> */}
                {/* //////////////////////////////// /////////////////////////////// */}
                {/* /////////////////////////////////////////////////////////////// */}
                {/* //////////////////////////////////////////////////////////////// */}
                {/* ///////////////////////////////// Item Sale  /////////////////////////////// */}
                <Route exact path="/Item_Sale" element={<Item_Sale />}></Route>

                {/* ///////////////////////////////// Cash_Receipt_Voucher  /////////////////////////////// */}
                <Route
                  exact
                  path="/Cash_Receipt_Voucher"
                  element={<Cash_Receipt_Voucher />}
                ></Route>

                {/* ///////////////////////////////// Item Sale  /////////////////////////////// */}
                <Route
                  exact
                  path="/Cash_Payment_Voucher"
                  element={<Cash_Payment_Voucher />}
                ></Route>
                {/* Cash_Receipt_Voucher */}
                {/* ///////////////////////////////// Cash_Receipt_Voucher /////////////////////////////// */}
                <Route
                  exact
                  path="/Cash_Receipt_Voucher"
                  element={<Cash_Receipt_Voucher />}
                ></Route>
                {/* ///////////////////////////////// Cash_Receipt_Voucher /////////////////////////////// */}
                <Route
                  exact
                  path="/Stock_Maintenance"
                  element={<Stock_Maintenance />}
                ></Route>
                {/* ///////////////////////////////// Daily_Sale_Report /////////////////////////////// */}
                <Route
                  exact
                  path="/Daily_Sale_Report"
                  element={<Daily_Sale_Report />}
                ></Route>
              </Routes>
            </ThemeProvider>
          </SidebarProvider>
        </Router>
      </div>
    </>
  );
}

export default App;
