import React from "react";
import { Link } from "react-router-dom";
import { TreeView, TreeItem } from '@mui/x-tree-view';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PostAddIcon from '@mui/icons-material/PostAdd';
import AddIcon from '@mui/icons-material/Add';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import RateReviewIcon from '@mui/icons-material/RateReview';

const Sidebar = () => {
  return (
    <div className="flex flex-col bg-white ">
      {/* Logo section removed */}
      <Link to="/admin/dashboard" className="flex items-center text-gray-600 font-light text-lg py-8 transition-transform duration-500 hover:text-tomato hover:scale-110">
        <DashboardIcon className="mr-2" />
        <p>Dashboard</p>
      </Link>
      {/* TreeView section removed */}
      <Link to="/admin/orders" className="flex items-center text-gray-600 font-light text-lg py-8 transition-transform duration-500 hover:text-tomato hover:scale-110">
        <ListAltIcon className="mr-2" />
        <p>Orders</p>
      </Link>
      <Link to="/admin/product" className="flex items-center text-gray-600 font-light text-lg py-8 transition-transform duration-500 hover:text-tomato hover:scale-110">
        <AddIcon className="mr-2" />
        <p>Product</p>
      </Link>
      <Link to="/admin/users" className="flex items-center text-gray-600 font-light text-lg py-8 transition-transform duration-500 hover:text-tomato hover:scale-110">
        <PeopleIcon className="mr-2" />
        <p>Users</p>
      </Link>
      <Link to="/admin/reviews" className="flex items-center text-gray-600 font-light text-lg py-8 transition-transform duration-500 hover:text-tomato hover:scale-110">
        <RateReviewIcon className="mr-2" />
        <p>Reviews</p>
      </Link>
    </div>
  );
};

export default Sidebar;
