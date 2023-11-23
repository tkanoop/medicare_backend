import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import AdminRoutes from "./routes/AdminRoutes";
import ClientRoutes from "./routes/ClientRoutes";
import DoctorRoutes from "./routes/DoctorRoutes";

function App() {
  return (
    <>
      <BrowserRouter>
        <AdminRoutes />
        
        <DoctorRoutes />
        <ClientRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
