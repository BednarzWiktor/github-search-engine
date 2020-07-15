import React from 'react';

import { Storage, Person } from '@material-ui/icons';

import { OptionIconGeneratorProps as Props } from '../../types/propTypes';

const OptionIconGenerator = ({ origin }: Props) => {
    switch (origin) {
        case 'repo': return <Storage />;
        case 'user': return <Person />;
        default: return null;
    };
};

export default OptionIconGenerator;