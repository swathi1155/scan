import React from "react";
import "../Styles/HomePage.css";

const SearchBook = () => {
  return (
    <div>
      <h1>
        <center>Welcome to Scanbook</center>
      </h1>
      <p className="content">
        Welcome to Scanbook, the book management tool that allows you to easily
        enter, lookup, save, and retrieve information about the books you own or
        have read. Simply enter the ISBN for a book and let Scanbook do the
        rest, pulling in information about the book from Google Books API. You
        can also indicate whether you've read the book and add notes or
        comments. Use the list view to see all of your saved books and make
        edits or deletions as needed.
      </p>
    </div>
  );
};

export default SearchBook;
