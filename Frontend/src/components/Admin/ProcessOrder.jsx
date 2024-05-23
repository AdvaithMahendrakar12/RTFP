import React, { Fragment, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import SideBar from "./Sidebar";
import { useGetOrderDetailsQuery, useUpdateOrderMutation } from "../../actions/OrderApi";
import { toast } from "react-toastify";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { Button } from "@mui/material";
import Loading from "../Loading";

const ProcessOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, error, isLoading, refetch } = useGetOrderDetailsQuery(id);
  const [updateOrder, { isSuccess: isUpdated, error: updateError }] = useUpdateOrderMutation();

  const [status, setStatus] = useState("");

  const updateOrderSubmitHandler = async (e) => {
    e.preventDefault();
    await updateOrder({ id, status }).unwrap();
    refetch(); // Refetch order details after update
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (updateError) {
      toast.error(updateError);
    }
    if (isUpdated) {
      toast.success("Order Updated Successfully");
      navigate("/admin/orders");
    }
  }, [error, updateError, isUpdated, navigate, refetch]);

  if (isLoading) {
    return <Loading />;
  }

  const order = data ? data.order : undefined;

  return (
    <Fragment>
      <div className="dashboard grid grid-cols-4 gap-4">
        <SideBar />

        <div className="col-span-3">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            {order ? (
              <div className={`${order.orderStatus === "Delivered" ? "block" : "grid"} grid-cols-2 gap-4`}>
                <div>
                  <div className="confirmshippingArea mb-4">
                    <Typography variant="h6" className="mb-2">
                      Shipping Info
                    </Typography>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="font-semibold">Name:</p>
                        <span>{order.user?.name}</span>
                      </div>
                      <div>
                        <p className="font-semibold">Phone:</p>
                        <span>{order.shippingInfo?.phoneNo}</span>
                      </div>
                      <div className="col-span-2">
                        <p className="font-semibold">Address:</p>
                        <span>
                          {order.shippingInfo &&
                            `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <Typography variant="h6" className="mb-2">
                      Payment
                    </Typography>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p
                          className={`${
                            order.paymentInfo?.status === "succeeded"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {order.paymentInfo?.status === "succeeded"
                            ? "PAID"
                            : "NOT PAID"}
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold">Amount:</p>
                        <span>{order.totalPrice}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <Typography variant="h6" className="mb-2">
                      Order Status
                    </Typography>
                    <div>
                      <p
                        className={`${
                          order.orderStatus === "Delivered"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {order.orderStatus}
                      </p>
                    </div>
                  </div>
                </div>

                <div className={order.orderStatus === "Delivered" ? "hidden" : "block"}>
                  <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={updateOrderSubmitHandler}>
                    <h1 className="text-xl mb-4">Process Order</h1>

                    <div className="flex items-center mb-4">
                      <AccountTreeIcon />
                      <select
                        className="ml-2 p-2 border border-gray-300 rounded"
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option value="">Choose Category</option>
                        {order.orderStatus === "Processing" && (
                          <option value="Shipped">Shipped</option>
                        )}
                        {order.orderStatus === "Shipped" && (
                          <option value="Delivered">Delivered</option>
                        )}
                      </select>
                    </div>

                    <Button id="createProductBtn" type="submit" disabled={isLoading || status === ""}>
                      Process
                    </Button>
                  </form>
                </div>
              </div>
            ) : (
              <Typography variant="h6" className="text-center">
                Order not found
              </Typography>
            )}

            <div className="mb-4">
              <Typography variant="h6" className="mb-2">
                Your Cart Items:
              </Typography>
              <div className="grid grid-cols-2 gap-4">
                {order?.orderItems?.map((item) => (
                  <div key={item.product} className="flex items-center">
                    <img src={item.image} alt="Product" className="w-16 h-16 object-cover rounded-full" />
                    <Link to={`/product/${item.product}`} className="ml-2 text-blue-600 hover:underline">
                      {item.name}
                    </Link>{" "}
                    <span className="ml-2">
                      {item.quantity} X ₹{item.price} = <b>₹{item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ProcessOrder;
