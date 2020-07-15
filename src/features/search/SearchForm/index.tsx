import React from 'react';

import { connect } from 'react-redux';
import { selectTranslatedAndSortedSearchResult } from '../../../redux/selectors/search';
import { getSearchResults } from '../../../redux/methods/search';

import Search from '../../../components/Search';

import { SearchProps as Props } from '../../../types/propTypes';

const SearchForm = ({ combinedResults, getSearchResults }: Props) => {
    return (
        <Search
            combinedResults={combinedResults}
            getSearchResults={getSearchResults}
        />
    )
};

const mapStateToProps = (state: any) => ({
    combinedResults: selectTranslatedAndSortedSearchResult(state)
});

const mapDispatch = {
    getSearchResults
};

export default connect(mapStateToProps, mapDispatch)(SearchForm);