import { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { RxHamburgerMenu } from "react-icons/rx";
import { BiHome } from "react-icons/bi";
import { TfiMenuAlt } from "react-icons/tfi";
import { MdOutlineAdd,MdCategory } from "react-icons/md";
import { HiArchiveBox } from "react-icons/hi2";
import {  NavLink ,Outlet,Link} from 'react-router-dom';




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
          <div className="py-6">
                  <Link to={"/login"}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </Link>
          </div>
          </div>   
      <Sidebar collapsed={collapsed}>   
        
        <Menu style={{paddingTop:"50px"}}>
          <MenuItem icon={<BiHome />}component={<NavLink to="/home"/>}> Dashboard</MenuItem>
          <SubMenu icon={<MdCategory/>} label="Category" >
            <MenuItem icon={<TfiMenuAlt />}component={<NavLink to="/category-list"/>}> Category List</MenuItem>
            <MenuItem icon={<MdOutlineAdd />}component={<NavLink to="/add-category"/>}> Add Category </MenuItem>
          </SubMenu>
          <SubMenu icon={<HiArchiveBox/>} label="Product">
            <MenuItem icon={<TfiMenuAlt />}component={<NavLink to="/product-list"/>}> Product List </MenuItem>
            <MenuItem icon={<MdOutlineAdd />}component={<NavLink to="/add-product"/>}>Add Product </MenuItem>
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