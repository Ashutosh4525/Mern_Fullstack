import { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { RxHamburgerMenu } from "react-icons/rx";
import { BiHome } from "react-icons/bi";
import { TfiMenuAlt } from "react-icons/tfi";
import { MdOutlineAdd,MdCategory } from "react-icons/md";
import { HiArchiveBox } from "react-icons/hi2";
import {  NavLink, Outlet } from 'react-router-dom';
import Dashboard from "../Dashboard/Dashboard";



const Sidenav= () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
    {/* <div style={{display: "flex", height: "100vh"}}> */}
     {/* <main style={{ backgroundColor:"#f9f9f9b3",borderColor: "#efefef"}}> */}
          
      {/* </main> */}
    <div style={{ display: 'flex', height: '100vh',minHeight: '400px'}}>
      <div style={{position: "fixed", top: 0, zIndex: 10, width: "100%", height: "55px", backgroundColor: "#f5f5f5", display: "flex", alignItems: "center", justifyContent:"space-between", padding: "0 15px", borderBottom: "1px solid #ddd"}}>
        <button className="sb-button" onClick={() => setCollapsed(!collapsed)} style={{margin: "10px", background: "white", border: "1px solid #ccc", borderRadius: "5px", cursor: "pointer", padding: "5px 8px",}}>
            <RxHamburgerMenu />
          </button> 
          </div>   
      <Sidebar collapsed={collapsed}>   
        
        <Menu style={{paddingTop:"50px"}}>
          <MenuItem component={<NavLink to="/home"/>}><BiHome /> Dashboard</MenuItem>
          <SubMenu icon={<MdCategory/>} label="Category" >
            <MenuItem component={<NavLink to="/category-list"/>}> <TfiMenuAlt />Category List</MenuItem>
            <MenuItem component={<NavLink to="/add-category"/>}> <MdOutlineAdd />Add Category</MenuItem>
          </SubMenu>
          <SubMenu icon={<HiArchiveBox/>} label="Product">
            <MenuItem component={<NavLink to="/product-list"/>}><TfiMenuAlt /> Product List</MenuItem>
            <MenuItem component={<NavLink to="/add-product"/>}><MdOutlineAdd />Add Product</MenuItem>
          </SubMenu>
        </Menu>
      </Sidebar> 
     <main style={{ flex: 1,padding:"0px 10px", paddingTop: "60px", overflowY: "auto" }}> 
      <Outlet/>
      </main> 
    </div>
     
    {/* </div> */}
    </>
  );
}

export default Sidenav;