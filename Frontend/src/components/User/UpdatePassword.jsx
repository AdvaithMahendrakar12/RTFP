import React, { Fragment, useState } from "react";
import Loading from "../Loading";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { useUpdatePasswordMutation } from "../../actions/userApi";
import { toast } from "react-toastify";

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();

  const updatePasswordSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const { data } = await updatePassword({
        oldPassword,
        newPassword,
        confirmPassword,
      }).unwrap();

      if (data.success) {
        toast.success("Password updated successfully");
      } else {
        toast.error(data.message || "Password update failed");
      }
    } catch (error) {
      console.error("Failed to update password:", error);
      toast.error(error.data?.message || "Password update failed");
    }
  };

  return (
    <Fragment>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full bg-white p-8 rounded-md shadow-md">
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Change Password
              </h2>
            </div>
            <form className="mt-8 space-y-6" onSubmit={updatePasswordSubmit}>
              <input type="hidden" name="remember" value="true" />
              <div className="rounded-md shadow-sm -space-y-px">
                <div className="mt-4">
                  <div className="flex">
                    <span className="inline-block h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <VpnKeyIcon className="h-6 w-6 text-gray-600" />
                    </span>
                    <input
                      id="oldPassword"
                      name="oldPassword"
                      type="password"
                      required
                      className="ml-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Old Password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex">
                    <span className="inline-block h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <LockOpenIcon className="h-6 w-6 text-gray-600" />
                    </span>
                    <input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      required
                      className="ml-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="New Password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex">
                    <span className="inline-block h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <LockIcon className="h-6 w-6 text-gray-600" />
                    </span>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required
                      className="ml-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  disabled={isLoading}
                >
                  {isLoading ? "Updating..." : "Change"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default UpdatePassword;
