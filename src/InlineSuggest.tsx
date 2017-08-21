import * as React from 'react';
import { ReactElement } from 'react';

import { KeyEnum } from './KeyEnum';
import { SuggestType } from './Types';
import { omit } from './util/omit';

const propsToOmit = [
  'haystack', 'getFn', 'onMatch', 'ignoreCase', 'className'
];

export namespace InlineSuggest {
  export type Props = React.HTMLProps<HTMLInputElement> & SuggestType.Props;

  export type State = SuggestType.State;
}

export class InlineSuggest extends React.Component<
  InlineSuggest.Props,
  InlineSuggest.State
> {
  static defaultProps = {
    ignoreCase: true
  };

  constructor(props: InlineSuggest.Props) {
    super(props);

    this.state = {
      match: null,
      needle: ''
    };
  }

  render(): ReactElement<any> {
    return (
      <div className={`inline-suggest ${this.props.className}`}>
        <input
          {...omit(this.props, propsToOmit)}
          style={{ background: 'transparent' }}
          value={this.props.value}
          onChange={this.handleOnChange}
          onBlur={this.handleOnBlur}
          onKeyDown={this.handleOnKeyDown}
          onKeyUp={this.handleOnKeyUp}
        />
        <div>{`${this.props.value}${this.state.needle}`}</div>
      </div>
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

    if (value.length === 0) {
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
      this.setState({
        match,
        needle: matchedStr.replace(originalValue, '')
      });
    } else {
      this.setState({
        match,
        needle: ''
      });
    }
    this.fireOnChange(e);
  };

  private handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    this.setState({
      needle: ''
    });

    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
  };

  private handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { keyCode } = e;
    const { needle } = this.state;

    if (
      needle !== '' &&
      (keyCode === KeyEnum.TAB || keyCode === KeyEnum.ENTER)
    ) {
      e.preventDefault();
    }
  };

  private handleOnKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { keyCode } = e;
    const { needle } = this.state;

    if (
      needle !== '' &&
      (keyCode === KeyEnum.TAB ||
        keyCode === KeyEnum.ENTER ||
        keyCode === KeyEnum.RIGHT_ARROW)
    ) {
      const newValue = `${this.props.value}${this.state.needle}`;
      const newEvent = {
        ...e,
        currentTarget: {
          ...e.currentTarget,
          value: newValue
        }
      };

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
