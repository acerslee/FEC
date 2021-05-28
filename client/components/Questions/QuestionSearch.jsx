import React, { useState, useEffect } from "react";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";

const QuestionSearch = ({ handleSearch }) => {
  const handleFocus = (event) => {
    event.preventDefault();
    const { target } = event;
    target.setSelectionRange(0, target.value.length);
  };

  return (
    <div>
      <form className="qa-search" noValidate autoComplete="off">
        <OutlinedInput
          id="qa-search-bar"
          defaultValue="Have a question? Search for answers..."
          size="large"
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={handleFocus}
          fullWidth
          style={{
            fontSize: 14,
            fontWeight: 600,
            marginLeft: 10,
            marginBottom: 10,
          }}
          endAdornment={
            <InputAdornment position="end">
              <SearchIcon></SearchIcon>
            </InputAdornment>
          }
        />
      </form>
    </div>
  );
};

export default QuestionSearch;
