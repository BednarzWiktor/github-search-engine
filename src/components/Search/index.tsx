import React, { useState, useEffect, useCallback, SyntheticEvent } from 'react';

import { debounce } from 'lodash';

import { generateUpdatedFilters } from '../../utils';

import { TextField, FormControlLabel, Checkbox, Typography } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import OptionIconGenerator from '../OptionIconGenerator';

import { SearchProps as Props, SearchResultItem } from '../../types/propTypes';

import 'fontsource-roboto';
import styles from './index.module.css';

const Search = ({ combinedResults, getSearchResults, clearSearchResults, isLoading }: Props) => {
    const [ value, setValue ] = useState<SearchResultItem | null>(null);
    const [ inputValue, setInputValue ] = useState<string>('');
    const [ filters, setFilters] = useState<Array<string>>(['users', 'repos']);
    const delayedQuery = useCallback(debounce((inputValue: string, filters: Array<string>) => getSearchResults(inputValue, filters), 500), []);

    const handleOnChangeValue = (event: SyntheticEvent<EventTarget>, newValue: any, reason: string) => {
        setValue(newValue);
        if (reason === 'clear') {
            clearSearchResults();
        }
    };

    const handleOnChangeInputValue = (event: SyntheticEvent<EventTarget>, newInputValue: string) => {
        setInputValue(newInputValue);

        const canMakeCall = newInputValue && newInputValue.length >= 3 && filters && filters.length > 0;
        if (canMakeCall) {
            delayedQuery(newInputValue, filters);
        }
    };

    const handleOnCheckboxChange = (type: 'users' | 'repos') => () => {
        const updatedFilters = generateUpdatedFilters(filters, type);
        
        setInputValue('');
        clearSearchResults();
        setFilters(updatedFilters);
    };

    useEffect(() => {
        if (value) {
            window.open(value.url, "_blank");
        }
    }, [ value ]);

    return (
        <div className={styles.container}>
            <aside className={styles.filters}>
                <Typography variant="body1" component="span">Search within:</Typography>
                <span className={styles.filtersControls}>
                    <FormControlLabel
                        label="Users"
                        control={
                            <Checkbox
                                checked={filters.includes('users')}
                                onChange={handleOnCheckboxChange('users')}
                                name="Users"
                                color="primary"
                            />
                        }
                    />
                    <FormControlLabel
                        label="Repos"
                        control={
                            <Checkbox
                                checked={filters.includes('repos')}
                                onChange={handleOnCheckboxChange('repos')}
                                name="Repos"
                                color="primary"
                            />
                        }
                    />
                </span>
            </aside>
            <main className={styles.input}>
                <Autocomplete
                    value={value}
                    onChange={handleOnChangeValue}
                    inputValue={inputValue}
                    onInputChange={handleOnChangeInputValue}
                    options={combinedResults}
                    getOptionLabel={item => item.name}
                    getOptionSelected={item => item.url === (value && value.url)}
                    clearOnBlur={false}
                    loading={isLoading ? true : false}
                    loadingText="Fetching data..."
                    disabled={filters.length === 0}
                    renderInput={
                        props =>
                            <TextField
                                {...props}
                                label="Search GitHub"
                                variant="outlined"
                            />
                    }
                    renderOption={
                        option =>
                            <span className={styles.option}>
                                <span>{option.name}</span>
                                <OptionIconGenerator origin={option.origin}/>
                            </span>
                    }
                />
            </main>
        </div>
    );
};

export default Search;