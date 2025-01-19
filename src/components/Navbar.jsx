import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "./ui/button";
import { login, logout } from "../store/authSlice";
import toast, { Toaster } from "react-hot-toast";

export const Navbar = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <nav className="flex justify-between items-center my-4">
        <h1 className="text-2xl font-bold text-slate-600">TaskFicient</h1>
        {!isAuthenticated ? (
          <Button
            onClick={() => {
              dispatch(login());
              toast.success("Successfully logged in!");
            }}
            className="bg-black text-white hover:bg-gray-600"
          >
            Login{" "}
          </Button>
        ) : (
          <Button
            onClick={() => {
              dispatch(logout());
              toast.success("Successfully logged out!");
            }}
            className="bg-white text-red-500 hover:bg-gray-100"
          >
            Logout
          </Button>
        )}
      </nav>
    </>
  );
};
