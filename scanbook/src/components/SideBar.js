import React from "react";
import "../Styles/SideBar.css";
import { Link } from "react-router-dom";

function SideBar() {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link className="linker" to="/SearchBook">
            SearchBooks
          </Link>
        </li>
        <li>
          <Link className="linker" to="/ListBooks">
            List of Books
          </Link>
        </li>
        <li>
          <Link className="linker" to="/AddBook">
            Add book
          </Link>
        </li>
        <li>
          <Link className="linker" to="/DeleteBook">
            Delete Book
          </Link>
        </li>

        <li>
          <Link className="linker" to="/UpdateBook">
            Update Book
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
