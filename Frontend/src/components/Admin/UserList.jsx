import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SideBar from "./Sidebar";
import { useGetAllUsersQuery, useDeleteUserMutation } from "../../actions/userApi";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const UsersList = () => {
  const navigate = useNavigate();
  const { data: usersData, error: usersError, isLoading } = useGetAllUsersQuery();
  const [deleteUserMutation, { isSuccess: isDeleted, error: deleteError }] = useDeleteUserMutation();

  useEffect(() => {
    if (usersError) {
      toast.error(usersError.message);
    }

    if (deleteError) {
      toast.error(deleteError.message);
    }

    if (isDeleted) {
      toast.success("User Deleted Successfully");
      navigate("/admin/users");
    }
  }, [usersError, deleteError, isDeleted, navigate]);

  const deleteUserHandler = async (id) => {
    try {
      await deleteUserMutation(id).unwrap();
    } catch (error) {
      console.error("Failed to delete user:", error);
      toast.error("Failed to delete user");
    }
  };

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },
    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "role",
      headerName: "Role",
      type: "string",
      minWidth: 150,
      flex: 0.3,
      cellClassName: (params) => {
        return params.value === "admin" ? "text-green-600" : "text-red-600";
      },
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => (
        <Fragment>
          <Link to={`/admin/user/${params.row.id}`} className="text-indigo-600 hover:text-indigo-700 mr-2">
            <EditIcon />
          </Link>
          <Button onClick={() => deleteUserHandler(params.row.id)} className="text-red-600 hover:text-red-700">
            <DeleteIcon />
          </Button>
        </Fragment>
      ),
    },
  ];

  const rows = usersData?.users?.map((user) => ({
    id: user._id,
    email: user.email,
    name: user.name,
    role: user.role,
  })) || [];

  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="flex-1 bg-white border-l border-gray-200 flex flex-col">
        <h1 id="productListHeading" className="text-3xl font-semibold text-gray-800 px-8 py-4 text-center">
          ALL USERS
        </h1>
        <div className="overflow-x-auto">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="bg-white shadow-md rounded-lg"
            autoHeight
          />
        </div>
      </div>
    </div>
  );
};

export default UsersList;
