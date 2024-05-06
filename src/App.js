import React from "react";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Container from "react-bootstrap/Container";
// import Invoice from "./pages/Invoice";
// import InvoiceList from "./pages/InvoiceList";
import InvoiceModal from "./components/InvoiceModal";
// import Products from "./pages/Products";
import { routes } from "./data/routes";

const App = () => {
  return (
    <Container>
      <Routes>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            element={<route.component />}
          />
        ))}
      </Routes>

      {/* Render all Modals here */}
      <InvoiceModal />
    </Container>
  );
};

export default App;
