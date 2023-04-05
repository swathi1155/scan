import React, { useState } from "react";
import "../Styles/UpdateBook.css";

const UpdateBook = () => {
  const [isbn, setIsbn] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [pages, setPages] = useState("");
  const [completed, setCompleted] = useState(false);
  const [notes, setNotes] = useState("");
  const [isbnError, setIsbnError] = useState("");

  const handleUpdate = () => {
    if (validateISBN(isbn)) {
      fetch(`http://localhost:8080/scanbook/updateBook/${isbn}`, {
        method: "PUT",
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
            alert("Book updated successfully.");
          } else {
            alert("Failed to update book.");
          }
        })
        .catch((error) => {
          console.error("Error updating book:", error);
          alert("An error occurred while updating the book.");
        });
    } else {
      setIsbnError("Please enter a valid ISBN.");
    }
  };

  const validateISBN = (isbn) => {
    if (isbn.length !== 13) {
      setIsbnError("ISBN must be 13 digits long.");
      return false;
    }

    if (isbn.charAt(0) !== "9") {
      setIsbnError("ISBN must start with 9.");
      return false;
    }

    const weightedSum =
      1 * isbn.charAt(0) +
      3 * isbn.charAt(1) +
      1 * isbn.charAt(2) +
      3 * isbn.charAt(3) +
      1 * isbn.charAt(4) +
      3 * isbn.charAt(5) +
      1 * isbn.charAt(6) +
      3 * isbn.charAt(7) +
      1 * isbn.charAt(8) +
      3 * isbn.charAt(9) +
      1 * isbn.charAt(10);

    if (weightedSum % 10 !== 0) {
      setIsbnError("ISBN has an invalid weighted sum checksum.");
      return false;
    }

    setIsbnError("");
    return true;
  };

  return (
    <div className="update">
      <h1>Update a Book</h1>
      <label>
        ISBN:
        <input
          type="text"
          value={isbn}
          onChange={(event) => setIsbn(event.target.value)}
        />
      </label>
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
      <button onClick={handleUpdate}>Update Book</button>
    </div>
  );
};

export default UpdateBook;
