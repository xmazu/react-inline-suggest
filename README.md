# React Inline Suggest

> [React](http://facebook.github.io/react/index.html) components for a search input inline suggestions.

## Installation

```shell
yarn add react-inline-suggest
```

or

```shell
npm install react-inline-suggest --save
```

## Demo and examples
Live demo: [xmazu.github.io/react-inline-suggest](https://xmazu.github.io/react-inline-suggest/)

## Usage


### SimpleInlineSuggest
```jsx
import { SimpleInlineSuggest } from 'react-inline-suggest'

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
        <h4>Simple array</h4>
        <SimpleInlineSuggest 
          haystack={['xmazu', 'joHn', 'MaThEo']}
          value={this.state.value}
          onChange={this.onChangeValue}
        />

        <h4>Complex array</h4>
        <SimpleInlineSuggest 
          haystack={users}
          value={this.state.value}
          onChange={this.onChangeValue}
          getFn={this.getUsername}
          onMatch={v => console.log(v)}
          ignoreCase={false}
        />        
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

```