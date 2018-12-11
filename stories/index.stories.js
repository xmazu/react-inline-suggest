import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { InlineSuggest } from '../lib';

const complexUsers = [
  {
    id: 1,
    username: 'xmazu',
    email: 'xmazu@yahoo.com'
  },
  {
    id: 2,
    username: 'john_doe',
    email: 'john@doe.com'
  }
];

storiesOf('InlineSuggest', module).add('Complex array', () => {
  class StoryComponent extends React.Component {
    state = {
      value: ''
    };

    handleOnChange = e => {
      action('onChange')(e.currentTarget.value);
      this.setState({ value: e.currentTarget.value });
    };

    handleOnMatch = value => action('onMatch')(value);

    render() {
      return (
        <InlineSuggest
          onChange={this.handleOnChange}
          value={this.state.value}
          suggestions={complexUsers}
          onMatch={this.handleOnMatch}
          getSuggestionValue={u => u.email}
        />
      );
    }
  }
  return (
    <>
      <p>Available emails: {complexUsers.map(u => u.email).join(', ')}</p>
      <div style={{ width: 200 }}>
        <StoryComponent />
      </div>
    </>
  );
});
