import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import home from '../../assets/home.png';
import printer from '../../assets/printer small.png';
import slider from '../../assets/sliders.png';
import chart from '../../assets/bar-chart-2.png';
import clipboard from '../../assets/clipboard.png';
import book from '../../assets/book.png';
import user from '../../assets/user_icon.png';

const navItems = [
  { icon_: home, label_: "Trang chủ", path_: "admin_home/admin_SPSO", centered: true },
  { icon_: printer, label_: "Trạng thái máy in", path_: "admin_home/printStatus", centered: true },
  {icon_: printer, label_: "Thông tin máy in", path_: "admin_home/printInformation", centered: true },
  
  { icon_: slider, label_: "Cấu hình", path_: "admin_home/settings", centered: true },
  { icon_: chart, label_: "Báo cáo", path_: "admin_home/reports", centered: true },
  { icon_: clipboard, label_: "Lịch sử in", path_: "admin_home/history", centered: true },
  { icon_: book, label_: "Thanh toán", path_: "admin_home/admin_payment", marginTop: true },
  { icon_: user, label_: "Người dùng", path_: "admin_home/users", marginTop: true }
];

const LeftSidebar = () => {
  
  return (
    // <nav className="Sidebar">
    //   {navItems.map((item, index) => (

    //     <NavLink key={index}  to={`/${item.path_}`} className="nav_Item"
    //      activeclassname="active"
    //     >
    //       <img src={Object.values(item.icon_)} alt={item.label_} />
    //       <span>{item.label_}</span>
    //     </NavLink>

    //   ))}
    // </nav>
    <nav className="Sidebar">
    {navItems.map((item, index) => (
      <NavLink
        key={index}
        to={`/${item.path_}`}
        className="nav_Item"
        activeclassname="active"
      >
        <img src={item.icon_} alt={item.label_} />
        <span>{item.label_}</span>
      </NavLink>
    ))}
  </nav>
  );
};

export default LeftSidebar;