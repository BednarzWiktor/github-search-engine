import React from 'react';

import { connect } from 'react-redux';
import { selectTranslatedAndSortedSearchResult, selectError } from '../../../redux/selectors/search';
import { getSearchResults, clearSearchResults, clearError } from '../../../redux/methods/search';

import Search from '../../../components/Search';

import { SearchProps as Props } from '../../../types/propTypes';

const SearchForm = (props: Props) => <Search {...props}/>;

const mapStateToProps = (state: any) => ({
    combinedResults: selectTranslatedAndSortedSearchResult(state),
    isLoading: state.search.isLoading,
    error: selectError(state)
});

const mapDispatch = {
    getSearchResults,
    clearSearchResults,
    clearError
};

export default connect(mapStateToProps, mapDispatch)(SearchForm);