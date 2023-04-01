import { Component } from 'react';
import {toastWarningMessage} from '../../serviceAPI/toast'
import propTypes from 'prop-types';


import {
  SearchBar,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleInput = (e) => {
    this.setState({searchQuery: e.currentTarget.value.trimLeft()});
  };


  handleSubmit =(e) => {
    e.preventDefault();
    const {searchQuery} = this.state
    if (searchQuery === '') {
      return toastWarningMessage();     
    }

    this.props.searchQuery(searchQuery);
    this.setState({searchQuery: ''});



  };

  render() {
    return (
      <SearchBar>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit">
            <SearchFormButtonLabel>Search</SearchFormButtonLabel>
          </SearchFormButton>

          <SearchFormInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleInput}
            value={this.state.searchQuery}
          />
        </SearchForm>
      
      </SearchBar>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: propTypes.func.isRequired,
};