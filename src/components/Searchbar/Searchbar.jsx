import { useState } from "react";
import { toast } from "react-toastify";
import styles from "./Searchbar.module.css";
import PropTypes from "prop-types";

export const Searchbar = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState("");
  // state = {
  //   inputValue: "",
  // };

  const handleChange = (e) => {
    setInputValue(e.target.value);
    // this.setState({ inputValue: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputValue.trim() === "") {
      toast.info("Enter the name of the picture !");
      return;
    }

    onSubmit(inputValue);
    setInputValue("");
    // this.setState({ inputValue: "" });
  };

  return (
    <header className={styles.Searchbar}>
      <form className={styles.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={styles.SearchFormButton}>
          <span className={styles.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={styles.SearchFormInput}
          type="text"
          autoсomplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={inputValue}
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
