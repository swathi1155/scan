import React, { useState } from "react";
import "../Styles/AddBook.css";

const AddBook = () => {
  const [isbn, setIsbn] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [pages, setPages] = useState("");
  const [completed, setCompleted] = useState(false);
  const [notes, setNotes] = useState("");
  const [isbnError, setIsbnError] = useState("");

  const handleAdd = () => {
    // ISBN validation
    const isbnRegex =
      /^(?=.{13}$)([0-9]{3})?-?[0-9]+-?[0-9]+-?[0-9]+-?([0-9]{1}|X)$/;
    const isValidIsbn = isbnRegex.test(isbn);
    if (!isValidIsbn) {
      alert("Invalid ISBN. Please enter a valid ISBN.");
      return;
    }

    fetch(`http://localhost:8080/scanbook?isbn=${isbn}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to check if book already exists.");
        }
      })
      .then((data) => {
        if (data.exists) {
          alert("A book with this ISBN already exists.");
        } else {
          fetch("http://localhost:8080/scanbook", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              isbn,
              title,
              author,
              pages,
              completed,
              notes,
            }),
          })
            .then((response) => {
              if (response.ok) {
                alert("Book added successfully.");
                setIsbn("");
                setTitle("");
                setAuthor("");
                setPages("");
                setCompleted(false);
                setNotes("");
              } else {
                alert("Failed to add book.");
              }
            })
            .catch((error) => {
              console.error("Error adding book:", error);
              alert("An error occurred while adding the book.");
            });
        }
      })
      .catch((error) => {
        console.error("Error checking if book already exists:", error);
        alert("An error occurred while checking if the book already exists.");
      });
  };

  return (
    <div className="addbook">
      <h1>Add a Book</h1>
      <div className="add">
        <label>
          ISBN:
          <input
            type="text"
            value={isbn}
            onChange={(event) => {
              setIsbn(event.target.value);
              setIsbnError(""); // Clear the error message if the user types a new ISBN
            }}
          />
        </label>
        {isbnError && <div className="error">{isbnError}</div>}
        <br />
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>
        <br />
        <label>
          Author:
          <input
            type="text"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
          />
        </label>
        <br />
        <label>
          Pages:
          <input
            type="number"
            value={pages}
            onChange={(event) => setPages(event.target.value)}
          />
        </label>
        <br />
        <label>
          Completed:
          <input
            type="checkbox"
            checked={completed}
            onChange={(event) => setCompleted(event.target.checked)}
          />
        </label>
        <br />
        <label>
          Notes:
          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
          />
        </label>
        <br />
        <button onClick={handleAdd}>Add Book</button>
      </div>
    </div>
  );
};

export default AddBook;
