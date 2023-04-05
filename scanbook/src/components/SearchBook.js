import React from "react";
import "../Styles/SearchBook.css";
import { useState } from "react";

const SearchBook = () => {
  const [isbn, setIsbn] = useState("");
  const [bookInfo, setBookInfo] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/scanbook/${isbn}`);
      if (response.ok) {
        const data = await response.json();
        setBookInfo(data);
        setErrorMessage(null);
      } else {
        setBookInfo(null);
        setErrorMessage("Book not found.");
      }
    } catch (error) {
      setBookInfo(null);
      setErrorMessage("Error searching for book.");
    }
  };

  const handleIsbnChange = (event) => {
    setIsbn(event.target.value);
  };

  return (
    <div className="Booksearch">
      <h1>Welcome to search book</h1>
      <form onSubmit={handleSearch}>
        <label htmlFor="isbn">Enter ISBN</label>
        <input type="text" id="isbn" value={isbn} onChange={handleIsbnChange} />
        <button type="submit">Search</button>
      </form>
      {errorMessage && <div>{errorMessage}</div>}
      {bookInfo && (
        <div>
          <div className="p1">
            <h4>Book Title:</h4>
            <p> {bookInfo.title}</p>
          </div>
          <div className="p1">
            <h4>Author:</h4>
            <p>{bookInfo.author}</p>
          </div>
          <div className="p1">
            <h4>Pages:</h4>
            <p>{bookInfo.pages}</p>
          </div>
          <div className="p1">
            <h4>Read or Not:</h4>{" "}
            <p>{bookInfo.completed === "true" ? "READ" : "NOT READ"}</p>
          </div>
          <div className="p1">
            <h4>Notes:</h4> <p>{bookInfo.notes}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBook;
