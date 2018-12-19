import { configure } from '@storybook/react';
import { configureActions } from '@storybook/addon-actions';

configureActions({
  depth: 100,
  limit: 20
});

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /.stories.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
