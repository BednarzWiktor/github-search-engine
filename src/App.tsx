import React from 'react';

import { Container, Paper, Typography } from '@material-ui/core';

import FeatureWrapper from './features/FeatureWrapper';

import 'fontsource-roboto';
import styles from './index.module.css';

const App = () =>
  <Container maxWidth="sm" style={{ marginTop: '40px' }}>
    <Paper elevation={12} square>
      <header className={styles.header}>
        <Typography variant="h4" component="h1">
          Traverse GitHub
        </Typography>
        <Typography variant="subtitle1" component="span">
          to find a <strong>user</strong> or a <strong>repository</strong>
        </Typography>
      </header>
      <main className={styles.search}>
        <FeatureWrapper />
      </main>
    </Paper>
  </Container>
;

export default App;
