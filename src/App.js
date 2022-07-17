import React from "react";
import { Routes,  Route, Navigate } from "react-router-dom";
import NavBar from "./components/navbar";
import ProductsMain from "./components/productsMain";
import GroupsMain from "./components/groupsMain";
import StatisticsMain from "./components/statisticsMain";
import ProductPage from "./components/productPage";
import GroupPage from "./components/groupPage";
import LoginMain from "./components/loginMain";

const App = () => {

    const elementWithNavbar = (element) => {
        return (<>
                    <NavBar/>
                    {element}
                </>
        );
    }

  return (
      <div className="App">
          <Routes>
              <Route path="/" element={<Navigate to="/products"/>}/>
              <Route path="/products" element={elementWithNavbar(<ProductsMain/>)}/>
              <Route path="/products/:id" element={elementWithNavbar(<ProductPage create={false}/>)}/>
              <Route path="/groups" element={elementWithNavbar(<GroupsMain/>)}/>
              <Route path="/groups/:id" element={elementWithNavbar(<GroupPage create={false}/>)}/>
              <Route path="/statistics" element={elementWithNavbar(<StatisticsMain/>)}/>
              <Route path="/create-product" element={elementWithNavbar(<ProductPage create={true}/>)}/>
              <Route path="/create-group" element={elementWithNavbar(<GroupPage create={true}/>)}/>
              <Route path="/login" element={<LoginMain/>}/>
          </Routes>
      </div>
  );
}

export default App;
