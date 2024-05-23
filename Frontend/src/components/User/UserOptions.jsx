import React, { useState } from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useNavigate } from 'react-router-dom';
import { Backdrop } from '@mui/material';
import { useSelector } from 'react-redux';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function UserOptions({ user }) {
  const { cartItems } = useSelector((state) => state.cart);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate(); 
  const options = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: account },
    { icon: <ShoppingCartIcon />, name: `Cart(${cartItems.length})`, func: cart }
  ];

  if (user.role === "admin") {
    options.unshift({ icon: <DashboardIcon />, name: "Dashboard", func: dashboard });
  }

  function dashboard() {
    navigate('admin/dashboard');
  }

  function orders() {
    navigate('/orders');
  }

  function account() {
    navigate('/profile');
  }

  function cart() {
    navigate('/cart');
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Backdrop
        sx={{
          color: '#fff',
          zIndex: "10",
          position: 'fixed',
          top: 0, // Position the Backdrop at the top of the viewport
          left: 0, // Position the Backdrop at the left of the viewport
          width: '100%', // Make the Backdrop cover the entire viewport width
          height: '100%', // Make the Backdrop cover the entire viewport height
        }}
        open={open}
      />
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        direction="down"
        sx={{
          position: 'fixed', // Fix the SpeedDial position
          top: 80, // Adjust the top position as needed
          right: 20, // Adjust the right position as needed
          zIndex: "11", // Ensure the SpeedDial appears above the Backdrop
        }}
        icon={
          <img
            src={user?.avatar?.url || 'https://images.pexels.com/photos/4061662/pexels-photo-4061662.jpeg?auto=compress&cs=tinysrgb&w=600'}
            alt='Profile'
            style={{ width: 50, height: 50, borderRadius: '50%' }}
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      </SpeedDial>
    </>
  );
}

export default UserOptions;
