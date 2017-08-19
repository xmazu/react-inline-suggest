import * as ReactDOM from 'react-dom';
import * as React from 'react';

import { SimpleInlineSuggest } from '../src';

namespace ExampleApp {
  export type Props = {};

  export type State = {
    value: string;
  };
}

class ExampleApp extends React.Component<ExampleApp.Props, ExampleApp.State> {
  constructor() {
    super();

    this.state = {
      value: ''
    };
  }

  render() {
    return (
      <SimpleInlineSuggest 
        haystack={['maciek', 'test']}
        value={this.state.value}
        onChange={this.onChangeValue}
      />
    );
  }

  private onChangeValue = (e: React.SyntheticEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value);
    this.setState({ value: e.currentTarget.value });
  }
}

const el = document.getElementById('root');

ReactDOM.render(<ExampleApp />, el);
