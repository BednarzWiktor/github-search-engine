import React from 'react';

import { connect } from 'react-redux';
import { selectTranslatedAndSortedSearchResult } from '../../../redux/selectors/search';
import { getSearchResults, clearSearchResults } from '../../../redux/methods/search';

import Search from '../../../components/Search';

import { SearchProps as Props } from '../../../types/propTypes';

const SearchForm = (props: Props) => <Search {...props}/>;

const mapStateToProps = (state: any) => ({
    combinedResults: selectTranslatedAndSortedSearchResult(state),
    isLoading: state.search.isLoading
});

const mapDispatch = {
    getSearchResults,
    clearSearchResults
};

export default connect(mapStateToProps, mapDispatch)(SearchForm);