import React from "react";
import { Routes,  Route } from "react-router-dom";
import NavBar from "./components/navbar";
import ProductsMain from "./components/productsMain";
import GroupsMain from "./components/groupsMain";
import StatisticsMain from "./components/statisticsMain";
import ProductPage from "./components/productPage";

const App = () => {
  return (
      <div className="App">
          <NavBar/>
          <Routes>
              <Route path="/"/>
              <Route path="/products" element={<ProductsMain/>}/>
              <Route path="/products/:id" element={<ProductPage create={false}/>}/>
              <Route path="/groups" element={<GroupsMain/>}/>
              <Route path="/statistics" element={<StatisticsMain/>}/>
              <Route path="/create-product" element={<ProductPage create={true}/>}/>
              <Route path="/create-group" />
          </Routes>
      </div>
  );
}

export default App;
