import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { InlineSuggest } from '../src/InlineSuggest';

import '../scss/inline-suggest.scss';

type User = {
  id: number;
  username: string;
  email: string;
};

const simpleUsers = [
  'xmazu',
  'john',
  'martin'
];

const complexUsers: User[] = [
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

type WrapperState = {
  value: string;
};

storiesOf('InlineSuggest', module)
.add('Plain array string', () => {
  class Wrapper extends React.Component<{}, WrapperState> {
    constructor() {
      super()
      this.state = {
        value: ''
      };
    }

    handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
      action('onChange')(e.currentTarget.value);
      this.setState({ value: e.currentTarget.value });
    };

    handleOnMatch = (v: string) => action('onMatch')(v);

    render() {
      return (
        <div style={{ width: 200 }}>
          <InlineSuggest
            onChange={this.handleOnChange}
            value={this.state.value}
            haystack={simpleUsers}
            onMatch={this.handleOnMatch}
          />
        </div>
      );
    }
  }
  return (
    <div style={{ padding: 8 }}>
      <p>Type one of usernames {simpleUsers.join(', ')}</p>
      <Wrapper />
    </div>
  );
})
.add('Complex array', () => {
  class Wrapper extends React.Component<{}, WrapperState> {
    constructor() {
      super()
      this.state = {
        value: ''
      };
    }

    handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
      action('onChange')(e.currentTarget.value);
      this.setState({ value: e.currentTarget.value });
    };

    handleOnMatch = (v: User) => action('onMatch')(v);

    render() {
      return (
        <div style={{ width: 200 }}>
          <InlineSuggest
            onChange={this.handleOnChange}
            value={this.state.value}
            haystack={complexUsers}
            onMatch={this.handleOnMatch}
            getFn={(u: User) => u.email}
          />
        </div>
      );
    }
  }
  return (
    <div style={{ padding: 8 }}>
      <p>Type one of emails {complexUsers.map(u => u.email).join(', ')}</p>
      <Wrapper />
    </div>
  );
});