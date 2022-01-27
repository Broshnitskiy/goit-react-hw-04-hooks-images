import { Component } from "react";
import { toast } from "react-toastify";
import styles from "./Searchbar.module.css";
import PropTypes from "prop-types";

export class Searchbar extends Component {
  state = {
    inputValue: "",
  };

  handleChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.inputValue.trim() === "") {
      toast.info("Enter the name of the picture !");
      return;
    }

    this.props.onSubmit(this.state.inputValue);
    this.setState({ inputValue: "" });
  };

  render() {
    const { inputValue } = this.state;
    return (
      <header className={styles.Searchbar}>
        <form className={styles.SearchForm} onSubmit={this.handleSubmit}>
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
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
