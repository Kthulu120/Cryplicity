/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import React from 'react';
import Wrapper from './Wrapper';
import Input from './Input';
import Icon from "./Icon";

/**
 *
 * SearchBar.js
 *
 * A common search bar that can be modified as needed
 */
function SearchBar(props) {
  return (
    <Wrapper style={props.containerStyle}>
      <Icon>{props.icon}</Icon>
      <Input placeholder={props.placeholder} onChange={e => props.onInputChange(e.target.value)} />
    </Wrapper>
  );
}

SearchBar.defaultProps = {
  placeholder: 'Search',
  icon: 'search',
  containerStyle: {}
};
SearchBar.propTypes = {
  icon: PropTypes.string,
  placeholder: PropTypes.string,
  onInputChange: PropTypes.func.isRequired,
  containerStyle: PropTypes.object,
};


export default SearchBar;
