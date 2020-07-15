export type SearchResultItem = {
    name: string;
    url: string;
    origin: 'repo' | 'user';
}

export type OptionIconGeneratorProps = {
    origin: 'repo' | 'user';
}

export interface SearchProps {
    combinedResults: Array<SearchResultItem>,
    getSearchResults: Function
}