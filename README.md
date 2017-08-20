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

## Basic usage

### Use SimpleInlineSuggest with complex array
```jsx
import { SimpleInlineSuggest } from 'react-inline-suggest';

const users = [
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

class ExampleApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };
  }

  render() {
    return (
      <SimpleInlineSuggest 
        haystack={users}
        value={this.state.value}
        onChange={this.onChangeValue}
        getFn={this.getUsername}
        onMatch={v => console.log(v)}
        ignoreCase={false}
      />        
    );
  }

  private onChangeValue = e => {
    this.setState({ value: e.currentTarget.value });
  }
}

```

## Props

| Property   | Type  |   Default | Required | Description                                                                                |
|------------|-------|----------:|----------|--------------------------------------------------------------------------------------------|
| value      | any   | undefined | yes      | initial field value                                                                        |
| haystack   | array | undefined | yes      | Array of available items to search in. Items can take an arbitrary shape.                  |
| onChange   | func  | undefined | yes      | onChange handler: function(e: React.FormEvent) {}                                          |
| onMatch    | func  | undefined |          | Called when Tab or Enter pressed                                                           |
| getFn      | func  | undefined |          | Used to read the display value from each entry in haystack: function(item: any): string {} |
| ignoreCase | bool  | true      |          | Determines whether the case-sensitivity is relevant                                        |


# Todo

- [ ] better docs
- [ ] create component InlineSuggest with transparent text suggestions
- [ ] more tests
- [ ] CI