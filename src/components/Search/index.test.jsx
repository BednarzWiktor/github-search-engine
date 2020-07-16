import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

import toJson from 'enzyme-to-json';

import Search from './';

configure({adapter: new Adapter()});
describe('Search', () => {
    const basicProps = {
        combinedResults: [
            {
                name: 'user1',
                url: 'http://user1.com',
                origin: 'user'
            },
            {
                name: 'repo1',
                url: 'http://repo1.com',
                origin: 'user'
            },
            {
                name: 'user2',
                url: 'http://user2.com',
                origin: 'user'
            },
            {
                name: 'repo2',
                url: 'http://repo2.com',
                origin: 'user'
            },
        ],
        getSearchResults: jest.fn(),
        clearSearchResults: jest.fn(),
    };
    const isLoadingProps = { ...basicProps, isLoading: true };
    const emptyProps = { ...basicProps, combinedResults: [] };
    const emptyIsLoadingProps = { ...emptyProps, isLoading: true };

    const basicWrapper = shallow(<Search { ...basicProps }/>);
    const isLoadingWrapper = shallow(<Search { ...isLoadingProps }/>);
    const emptyWrapper = shallow(<Search { ...emptyProps }/>);
    const emptyIsLoadingWrapper = shallow(<Search { ...emptyIsLoadingProps }/>);

    it('renders without crashing', () => {
        expect(toJson(basicWrapper)).toMatchSnapshot();
        expect(toJson(isLoadingWrapper)).toMatchSnapshot();
        expect(toJson(emptyWrapper)).toMatchSnapshot();
        expect(toJson(emptyIsLoadingWrapper)).toMatchSnapshot();
    });
});