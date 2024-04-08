import React from "react";
import Header from "./components/Headers/Header";
import Pages from "./components/MainPages/Pages";
import { BrowserRouter as Router } from "react-router-dom";
import { DataProvider } from "./GlobalState";

const App = () => {
  return (
    <DataProvider>
      <Router>
        <div className="App">
          <Header />
          <Pages />
        </div>
      </Router>
    </DataProvider>
  );
};
export default App;
