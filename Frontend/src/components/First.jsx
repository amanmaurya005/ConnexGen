import { Outlet } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from './Header';

export default function First() {
  return (
   <>
   <ToastContainer position="top-right" autoClose={3000} />
   <Header />
   <Outlet />
   </>
  )
}
