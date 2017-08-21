import * as ReactDOM from 'react-dom';
import * as React from 'react';

import { InlineSuggest } from '../src';

import '../scss/inline-suggest.scss';

namespace ExampleApp {
  export type Props = {};

  export type State = {
    value: string;
  };
}

type User = {
  id: number;
  username: string;
  email: string;
};

const users: User[] = [
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

const simpleUsers = ['xmazu', 'joHn', 'MaThEo'];

class ExampleApp extends React.Component<ExampleApp.Props, ExampleApp.State> {
  constructor() {
    super();

    this.state = {
      value: ''
    };
  }

  render() {
    return (
      <div>
        <h3>InlineSuggest</h3>
        <p>Avaiable values: {simpleUsers.join(', ')}</p>
        <div style={{ width: 200 }}>
          <InlineSuggest
            haystack={['xmazu', 'joHn', 'MaThEo']}
            value={this.state.value}
            onChange={this.onChangeValue}
          />
        </div>
      </div>
    );
  }

  private getUsername(user: User) {
    return user.email;
  }

  private onChangeValue = (e: React.SyntheticEvent<HTMLInputElement>) => {
    this.setState({ value: e.currentTarget.value });
  }
}

const el = document.getElementById('root');

ReactDOM.render(<ExampleApp />, el);
