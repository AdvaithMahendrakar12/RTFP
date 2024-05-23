import React from 'react';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import { selectUser } from '../../reducers/userSlice';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

const Profile = () => {
  const user = useSelector(selectUser);

  return (
    <Paper elevation={3} className="p-4 max-w-600 mx-auto mt-8 flex flex-col items-center">
      <Avatar
        alt="Profile Picture"
        src={user.avatar.url ? user.avatar.url : 'https://via.placeholder.com/150'}
        sx={{ width: 150, height: 150, marginBottom: 2 }}
      />
      <Typography variant="h4" gutterBottom className="text-xl">
        {user.name}
      </Typography>
      <Box className="flex flex-col items-center">
        <Typography variant="body1" gutterBottom>
          Email: {user.email}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Role: {user.role}
        </Typography>
        <Box mt={2} className="flex space-x-4">
          <Button
            component={Link}
            to="/me/update"
            variant="outlined"
            color="primary"
            className="text-blue-600 hover:text-blue-800"
          >
            Edit Profile
          </Button>
          <Button
            component={Link}
            to="/orders"
            variant="outlined"
            color="primary"
            className="text-blue-600 hover:text-blue-800"
          >
            My Orders
          </Button>
          <Button
            component={Link}
            to="/password/update"
            variant="outlined"
            color="primary"
            className="text-blue-600 hover:text-blue-800"
          >
            Change Password
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default Profile;
