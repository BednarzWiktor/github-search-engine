import React, { useState, useEffect, SyntheticEvent } from 'react';

import { debounce } from 'lodash';

import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import OptionIconGenerator from '../OptionIconGenerator';

import { SearchProps as Props, SearchResultItem } from '../../types/propTypes';

import styles from './index.module.css';

const Search = ({ combinedResults, getSearchResults }: Props) => {
    const [ value, setValue ] = useState<SearchResultItem | null>(null);
    const [ inputValue, setInputValue ] = useState<string>('');

    const handleOnChangeValue = (event: SyntheticEvent<EventTarget>, newValue: any) => {
        setValue(newValue);
    };

    const handleSearchWithDebounce = debounce((searchValue) => {
        if (searchValue && searchValue.length >= 3) {
            getSearchResults(searchValue);
        }
    }, 300);

    const handleOnChangeInputValue = (event: SyntheticEvent<EventTarget>, newInputValue: string) => {
        setInputValue(newInputValue);
        handleSearchWithDebounce(newInputValue)
    };

    useEffect(() => {
        if (value) {
            window.open(value.url, "_blank");
        }
    }, [ value ]);

    return (
        <div className={styles.container}>
            <span className={styles.input}>
                <Autocomplete
                    value={value}
                    onChange={handleOnChangeValue}
                    inputValue={inputValue}
                    onInputChange={handleOnChangeInputValue}
                    options={combinedResults}
                    getOptionLabel={item => item.name}
                    clearOnBlur={false}
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
                    onClose={(event, reason) => console.log(reason)}
                />
            </span>
        </div>
    );
};

export default Search;