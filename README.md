# Github Search Engine
Very simple and reusable `React.js` debounced autocomplete component which searches through [GitHub v3](https://developer.github.com/v3/) REST API for repositories or usernames matching provided string. Styled with [material-ui](https://material-ui.com/), state structure managed by [redux]([https://redux-toolkit.js.org/](https://redux-toolkit.js.org/)).

[live demo](https://bednarzwiktor.github.io/github-search-engine/)

## Installation
npm:

    $ npm install --save github-search-engine
yarn:

    $ yarn add --save github-search-engine

**disclaimer:**
For now it is required to also install [node-fetch](https://www.npmjs.com/package/node-fetch) in order to completely use this component. Github's api client operates on it and I didn't find time for now to try and appropriately handle it during bundling.

## Usage

```javascript
import React from 'react';
import GithubSearchEngine from 'github-search-engine';
	
const App = () => {
	return (
		<div>
			// ...
			<GithubSearchEngine />
		</div>
	);
};

export default App;
```
For now the component doesn't take in any props, including potential keys for github api. Might be a matter to change in the future.