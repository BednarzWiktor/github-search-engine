import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { mount, configure } from 'enzyme';

import toJson from 'enzyme-to-json';

import OptionIconGenerator from './';

configure({adapter: new Adapter()});
describe('OptionIconGenerator', () => {
    const userWrapper = mount(<OptionIconGenerator origin="user"/>);
    const repoWrapper = mount(<OptionIconGenerator origin="repo"/>);

    it('renders without crashing', () => {
        expect(toJson(userWrapper)).toMatchSnapshot();
        expect(toJson(repoWrapper)).toMatchSnapshot();
    });

    it('renders appropriate icon based on passed in origin prop', () => {
        const user = userWrapper.find('path').at(0);
        const repo = repoWrapper.find('path').at(0);

        expect(user.html()).toEqual(
            `<path d=\"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z\"></path>`
        );
        expect(repo.html()).toEqual(
            `<path d=\"M2 20h20v-4H2v4zm2-3h2v2H4v-2zM2 4v4h20V4H2zm4 3H4V5h2v2zm-4 7h20v-4H2v4zm2-3h2v2H4v-2z\"></path>`
        );
    });
});