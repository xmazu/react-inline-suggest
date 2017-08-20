import * as React from 'react';
import { ReactElement } from 'react';

export namespace SimpleInlineSuggest {
  export type Props = {
    value: string;
    haystack: string[];
    onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
    onTabOrEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  };

  export type State = {
    needle: string;
  };
}

export class SimpleInlineSuggest extends React.Component<
  SimpleInlineSuggest.Props,
  SimpleInlineSuggest.State
> {
  static readonly TAB_KEY = 9;
  static readonly ENTER_KEY = 13;

  constructor(props: SimpleInlineSuggest.Props) {
    super(props);

    this.state = {
      needle: ''
    };
  }

  render(): ReactElement<any> {
    const { onTabOrEnter } = this.props;

    return (
      <input
        value={`${this.props.value}${this.state.needle}`}
        onChange={this.handleOnChange}
        onKeyDown={this.handleOnKeyDown}
        onKeyUp={this.handleOnKeyUp}
      />
    );
  }

  private fireOnChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    if (this.props.onChange) {
      this.props.onChange(e);
    }
  };

  private handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { currentTarget } = e;
    const { value } = currentTarget;
    const { haystack } = this.props;

    const performMatch = value.length > this.props.value.length;

    if (!performMatch) {
      this.fireOnChange(e);
      this.setState({
        needle: ''
      });

      return;
    }
    
    const rx = RegExp(`^${value}`, 'i');
    const match = haystack.find(v => rx.test(v));

    if (match) {
      const originalValue = match.substr(0, value.length);
      this.setState(
        {
          needle: match.replace(originalValue, '')
        },
        () => {
          currentTarget.focus();
          currentTarget.setSelectionRange(value.length, match.length);
        }
      );
    } else {
      this.setState({
        needle: ''
      });
    }
    this.fireOnChange(e);
  };

  private handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { keyCode } = e;
    const { needle } = this.state;
    const { onTabOrEnter } = this.props;

    if (
      !!onTabOrEnter &&
      needle !== '' &&
      (keyCode === SimpleInlineSuggest.TAB_KEY ||
        keyCode === SimpleInlineSuggest.ENTER_KEY)
    ) {
      e.preventDefault();
    }
  };

  private handleOnKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { keyCode } = e;
    const { needle } = this.state;
    const { onTabOrEnter } = this.props;

    if (
      !!onTabOrEnter &&
      needle !== '' &&
      (keyCode === SimpleInlineSuggest.TAB_KEY ||
        keyCode === SimpleInlineSuggest.ENTER_KEY)
    ) {
      const newValue = `${this.props.value}${this.state.needle}`;
      const newEvent = {
        ...e,
        currentTarget: {
          ...e.currentTarget,
          value: newValue
        }
      };

      e.currentTarget.setSelectionRange(newValue.length, newValue.length);

      this.setState({
        needle: ''
      });

      this.props.onTabOrEnter!(newEvent);
    }
  };
}
