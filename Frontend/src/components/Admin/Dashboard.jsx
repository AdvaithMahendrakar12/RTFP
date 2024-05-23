import Sidebar from "./Sidebar.jsx";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useGetAdminProductsQuery } from "../../actions/productApi.js";
import { useGetAllOrdersQuery } from "../../actions/OrderApi.js";
import { useGetAllUsersQuery } from "../../actions/userApi.js";
import Loading from "../Loading.jsx";

// Register Chart.js components and scales
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const { data: productData } = useGetAdminProductsQuery();
  const products = productData?.products || [];

  const { data: orderData } = useGetAllOrdersQuery();
  const orders = orderData?.orders || [];

  const { data: users } = useGetAllUsersQuery() || {};

  let outOfStock = products.filter((item) => item.Stock === 0).length;

  let totalAmount = orders.reduce((acc, item) => acc + item.totalPrice, 0);

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["#ff6347"],
        hoverBackgroundColor: ["#c54831"],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };

  return (
    <div className="w-screen max-w-full grid grid-cols-1 md:grid-cols-[1fr_5fr] absolute">
      <Sidebar />

      <div className="border-l border-gray-300 bg-white py-6 px-4">
        <Typography
          component="h1"
          className="text-gray-700 font-bold text-3xl text-center mx-auto my-2"
        >
          Dashboard
        </Typography>

        <div className="my-4">
          <div className="flex justify-center bg-white">
            <p className="bg-blue-700 text-white font-light text-lg text-center py-6 w-full mx-8">
              Total Amount <br /> ₹{totalAmount}
            </p>
          </div>
        </div>

        <div className="flex justify-center bg-white my-4">
          <Link
            to="/admin/products"
            className="flex flex-col justify-center items-center text-black font-light text-2xl text-center bg-yellow-200 no-underline py-6 w-40 h-40 mx-8 rounded-full"
          >
            <p>Product</p>
            <p>{products.length}</p>
          </Link>
          <Link
            to="/admin/orders"
            className="flex flex-col justify-center items-center font-light text-2xl text-center bg-red-400 text-white no-underline py-6 w-40 h-40 mx-8 rounded-full"
          >
            <p>Orders</p>
            <p>{orders.length}</p>
          </Link>
          <Link
            to="/admin/users"
            className="flex flex-col justify-center items-center font-light text-2xl text-center bg-gray-600 text-white no-underline py-6 w-40 h-40 mx-8 rounded-full"
          >
            <p>Users</p>
            <p>{users?.users.length}</p>{" "}
            {/* Display the length of users array */}
          </Link>
        </div>

        <div className="bg-white p-4 rounded shadow mb-4 w-4/5 mx-auto">
          <Line data={lineState} />
        </div>

        <div className="bg-white p-4 rounded shadow w-4/5 mx-auto">
          <Doughnut
            data={doughnutState}
            options={{ maintainAspectRatio: false }}
          />
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
