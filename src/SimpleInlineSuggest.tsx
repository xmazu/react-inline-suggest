import * as React from 'react';
import { ReactElement } from 'react';

export namespace SimpleInlineSuggest {
  export type Props = React.HTMLProps<HTMLInputElement> & {
    value: string;
    haystack: string[];
  };

  export type State = {
    currentValue: string;
    needle: string;
  };
}

export class SimpleInlineSuggest extends React.Component<SimpleInlineSuggest.Props, SimpleInlineSuggest.State> {
  constructor(props: SimpleInlineSuggest.Props) {
    super(props);

    this.state = {
      currentValue: '',
      needle: ''
    };
  }

  render(): ReactElement<any> {
    return (
      <input 
        onChange={this.handleOnChange}
        value={`${this.state.currentValue}${this.state.needle}`}
      />
    );
  }

  private handleOnChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const { currentTarget } = e;
    const { value } = currentTarget;
    const { haystack } = this.props;

    const performMatch = value.length > this.state.currentValue.length;

    if (!performMatch) {
      this.setState({
        currentValue: value,
        needle: ''
      });

      return;
    }

    const match = haystack.find(v => v.indexOf(value) === 0);

    if (match) {
      this.setState({
        currentValue: value,
        needle: match.replace(value, '')
      }, () => {
        currentTarget.focus();
        currentTarget.setSelectionRange(value.length, match.length);
      });
    } else {
      this.setState({
        currentValue: value,
        needle: ''
      });
    }

    if (this.props.onChange) {
      const newEvent: React.FormEvent<HTMLInputElement> = {
        ...e,
        currentTarget: {
          ...e.currentTarget,
          value
        }
      }
      this.props.onChange(newEvent);
    }
  };
}
