import { useState } from 'react';
import { toastWarningMessage } from '../../serviceAPI/toast';
import propTypes from 'prop-types';

import {
  SearchBar,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';

export const Searchbar = ({inputValue}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInput = e => {
    setSearchQuery(e.currentTarget.value.trimLeft());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (searchQuery === '') {
      return toastWarningMessage();
    }

    inputValue(searchQuery);
    setSearchQuery('');
  };

  return (
    <SearchBar>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <SearchFormButtonLabel>Search</SearchFormButtonLabel>
        </SearchFormButton>

        <SearchFormInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleInput}
          value={searchQuery}
        />
      </SearchForm>
    </SearchBar>
  );
};

Searchbar.propTypes = {
  inputValue: propTypes.func.isRequired,
};


