import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "../Styles/ListBooks.css";

const ListBooks = () => {
  const [booksInfo, setBookInfo] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/scanbook/isbn")
      .then((response) => response.json())
      .then((data) => {
        setBookInfo(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (booksInfo === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="Bookinfo">
      <h1>Welcome to All book</h1>
      <div className="Book">
      <table>
        <thead>
          <tr>
            <th>ISBN</th>
            <th>Title</th>
            <th>Author</th>
            <th>Pages</th>
            <th>Read or not</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(booksInfo) &&
            booksInfo.map((book) => (
              <tr key={book.isbn}>
                <td>{book.isbn}</td>

                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.pages}</td>
                <td>
                  {book.completed === true || book.completed === "true"
                    ? "Yes"
                    : "No"}
                </td>
                <td>{book.notes}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default ListBooks;
