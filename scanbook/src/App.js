import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SideBar from "./components/SideBar";
import SearchBook from "./components/SearchBook";
import AddBook from "./components/AddBook";
import DeleteBook from "./components/DeleteBook";
import ListBooks from "./components/ListBooks";
import Homepage from "./components/Homepage";
import UpdateBook from "./components/UpdateBook";

function App() {
  return (
    <div className="container">
      <Router>
        <SideBar />
        <div className="bodycontainer">
          <Routes>
            <Route exact path="/" Component={Homepage} />
            <Route exact path="/SearchBook" Component={SearchBook} />
            <Route exact path="/AddBook" Component={AddBook} />
            <Route exact path="/DeleteBook" Component={DeleteBook} />
            <Route exact path="/ListBooks" Component={ListBooks} />
            <Route exact path="/UpdateBook" Component={UpdateBook} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
