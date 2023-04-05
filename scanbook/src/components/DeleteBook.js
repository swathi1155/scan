import React, { useState } from "react";
import "../Styles/DeleteBook.css";

const DeleteBook = () => {
  const [isbn, setIsbn] = useState("");

  const handleDelete = () => {
    fetch(`http://localhost:8080/scanbook/${isbn}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          alert("Book deleted successfully.");
        } else {
          alert("Failed to delete book.");
        }
      })
      .catch((error) => {
        console.error("Error deleting book:", error);
        alert("An error occurred while deleting the book.");
      });
  };

  return (
    <div className="deletebook">
      <h1>Delete a Book</h1>
      <label>
        ISBN:
        <input
          type="text"
          value={isbn}
          onChange={(event) => setIsbn(event.target.value)}
        />
      </label>
      <button onClick={handleDelete}>Delete Book</button>
    </div>
  );
};

export default DeleteBook;
