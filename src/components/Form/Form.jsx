import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "../Form/Form.module.css";

export default function Form({ onSubmit }) {
  const [state, setState] = useState({
    q: "",
  })

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...state });
    setState({ q: " " });
  }

  return (
    <form onSubmit={handleSubmit} className={styles.searchForm}>
      <input
        className={styles.searchFormInput}
        value={state.q}
        name="q"
        onChange={handleChange}
        type="text"
        placeholder="Search movies"/>

      <button type="submit" className={styles.button}>
        <span>Search</span>
      </button>
    </form>
  )
}

Form.propTypes = {
  onSubmit: PropTypes.func,
}
