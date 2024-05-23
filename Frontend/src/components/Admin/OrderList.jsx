import React, { Fragment, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, useNavigate } from "react-router-dom";
import SideBar from "./Sidebar";
import { useGetAllOrdersQuery, useDeleteOrderMutation } from "../../actions/OrderApi";
import { toast } from "react-toastify";

const OrderList = () => {
  const navigate = useNavigate();
  const { data, error } = useGetAllOrdersQuery();
  const [deleteOrder, { isSuccess: isDeleted, error: deleteError }] = useDeleteOrderMutation();

  const deleteOrderHandler = async(id) => {
    await deleteOrder(id).unwrap();
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }

    if (deleteError) {
      toast.error(deleteError);
    }

    if (isDeleted) {
      toast.success("Order Deleted Successfully");
      navigate("/admin/dashboard"); // use navigate from react-router-dom instead of history
    }
  }, [error, deleteError, navigate, isDeleted]);

  // Check if data is undefined or null
  if (!data) {
    return null; // or loading indicator
  }

  const rows = data.orders?.map((item) => ({
    id: item._id,
    itemsQty: item.orderItems.length,
    amount: item.totalPrice,
    status: item.orderStatus,
  })) || [];

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.row.status === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.4,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
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
          <Link to={`/admin/order/${params.row.id}`} className="text-indigo-600 hover:text-indigo-700 mr-2">
            <EditIcon />
          </Link>
          <Button
            onClick={() => deleteOrderHandler(params.row.id)}
            className="text-red-600 hover:text-red-700"
          >
            <DeleteIcon />
          </Button>
        </Fragment>
      ),
    },
  ];

  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="flex-1 bg-white border-l border-gray-200 flex flex-col">
        <h1 id="productListHeading" className="text-3xl font-semibold text-gray-800 px-8 py-4 text-center">
          ALL ORDERS
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

export default OrderList;
