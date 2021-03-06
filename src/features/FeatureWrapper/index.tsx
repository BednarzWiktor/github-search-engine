import React from 'react';

import { Provider } from 'react-redux';
import { store } from '../../redux/store';

import SearchForm from '../search/SearchForm';

import 'fontsource-roboto';

const FeatureWrapper = () =>
    <Provider store={store}>
        <SearchForm />
    </Provider>
;

export default FeatureWrapper;