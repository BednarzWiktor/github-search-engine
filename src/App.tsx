import React from 'react';

import FeatureWrapper from './features/FeatureWrapper';

import styles from './index.module.css';

const App = () =>
  <section className={styles.container}>
    <header className={styles.header}>
      <h1 className={styles.headerMain}>
        Traverse GitHub
      </h1>
      <span className={styles.headerSub}>
        to find a <strong>user</strong> or a <strong>repository</strong>
      </span>
    </header>
    <main className={styles.search}>
      <FeatureWrapper />
    </main>
  </section>
;

export default App;
