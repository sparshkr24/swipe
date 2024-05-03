import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Container from "react-bootstrap/Container";
import { Route, Routes } from "react-router-dom";
import Invoice from "./pages/Invoice";
import InvoiceList from "./pages/InvoiceList";
import Products from "./pages/Products";

const App = () => {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<InvoiceList />} />
        <Route path="/create" element={<Invoice />} />
        <Route path="/create/:id" element={<Invoice />} />
        <Route path="/edit/:id" element={<Invoice />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </Container>
  );
};

export default App;
