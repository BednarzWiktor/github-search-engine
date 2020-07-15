import React from 'react';

import { Provider } from 'react-redux';
import { store } from './redux/store';

import SearchForm from './features/search/SearchForm';

import styles from './index.module.css';

const App = () =>
    <Provider store={store}>
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
          <SearchForm />
        </main>
      </section>
    </Provider>
;

export default App;
