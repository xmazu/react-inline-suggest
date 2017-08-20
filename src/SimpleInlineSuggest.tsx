import * as React from 'react';
import { ReactElement } from 'react';

export namespace SimpleInlineSuggest {
  export type Props = {
    value: string;
    haystack: any[];
    onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
    getFn?: (obj: any) => string;
    onMatch?: (v: string | any) => void;
    ignoreCase?: boolean;
  };

  export type State = {
    match: string | any;
    needle: string;
  };
}

export class SimpleInlineSuggest extends React.Component<
  SimpleInlineSuggest.Props,
  SimpleInlineSuggest.State
> {
  static readonly TAB_KEY = 9;
  static readonly ENTER_KEY = 13;

  static defaultProps = {
    ignoreCase: true
  };

  constructor(props: SimpleInlineSuggest.Props) {
    super(props);

    this.state = {
      match: '',
      needle: ''
    };
  }

  render(): ReactElement<any> {
    return (
      <input
        className="simple-inline-suggest"
        value={`${this.props.value}${this.state.needle}`}
        onBlur={this.handleOnBlur}
        onChange={this.handleOnChange}
        onKeyDown={this.handleOnKeyDown}
        onKeyUp={this.handleOnKeyUp}
      />
    );
  }

  private fireOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (this.props.onChange) {
      this.props.onChange(e);
    }
  };

  private handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { currentTarget } = e;
    const { value } = currentTarget;
    const { getFn, haystack, ignoreCase } = this.props;

    const performMatch = value.length > this.props.value.length;
    if (!performMatch) {
      this.fireOnChange(e);
      this.setState({
        needle: ''
      });
      return false;
    }

    const rx = RegExp(`^${value}`, ignoreCase ? 'i' : undefined);
    const match = haystack.find(
      v => (getFn === undefined ? rx.test(v) : rx.test(getFn(v)))
    );

    if (match) {
      const matchedStr = getFn === undefined ? match : getFn(match);
      const originalValue = matchedStr.substr(0, value.length);
      this.setState(
        {
          match,
          needle: matchedStr.replace(originalValue, '')
        },
        () => {
          currentTarget.focus();
          currentTarget.setSelectionRange(value.length, matchedStr.length);
        }
      );
    } else {
      this.setState({
        match,
        needle: ''
      });
    }
    this.fireOnChange(e);
  };

  private handleOnBlur = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      needle: ''
    });
  };

  private handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { keyCode } = e;
    const { needle } = this.state;

    if (
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

    if (
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

      this.fireOnChange(newEvent);

      if (this.props.onMatch) {
        this.props.onMatch(this.state.match);
      } 
    }
  };
}
