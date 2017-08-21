# React Inline Suggest

> [React](http://facebook.github.io/react/index.html) component for a search input inline suggestions.

## Todo

- Inline suggestion displayed in fancy way
- Support simple arrays and complex arrays with objects
- Accept value on **Enter**/**Tab**/**Right Arrow** click

## Installation

```shell
yarn add react-inline-suggest
```

or

```shell
npm install react-inline-suggest --save
```

Include `react-inline-suggest.css` from `node_modules/react-inline-suggest/dist` in your project.

## Demo and examples
Live demo: [xmazu.github.io/react-inline-suggest](https://xmazu.github.io/react-inline-suggest/)

## Basic usage

### Use InlineSuggest with complex array
```jsx
import { InlineSuggest } from 'react-inline-suggest';

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
      <InlineSuggest 
        haystack={users}
        value={this.state.value}
        onChange={this.onChangeValue}
        getFn={this.getUsername}
        onMatch={v => console.log(v)}
        ignoreCase={false}
      />        
    );
  }

  onChangeValue = e => {
    this.setState({ value: e.currentTarget.value });
  }
}

```

## Props

Component extends `React.HTMLProps<HTMLInputElement>` interface and adds some own props.

| Property   | Type  |   Default | Required | Description                                                                                |
|------------|-------|----------:|----------|--------------------------------------------------------------------------------------------|
| value      | any   | undefined | yes      | initial field value                                                                        |
| haystack   | array | undefined | yes      | Array of available items to search in. Items can take an arbitrary shape.                  |
| onChange   | func  | undefined | yes      | onChange handler: function(e: React.FormEvent) {}                                          |
| onMatch    | func  | undefined |          | Called when Tab/Enter/Right Arrow pressed                                                  |
| getFn      | func  | undefined |          | Used to read the display value from each entry in haystack: function(item: any): string {} |
| ignoreCase | bool  | true      |          | Determines whether the case-sensitivity is relevant                                        |


## Todo

- [ ] switch bettween suggestions by click up/down arrow
- [ ] possibility to decide when show suggestions (e.g. when user types 2 or more characters)
- [ ] better docs
- [ ] more tests
- [ ] CI