import React from 'react';
import styled from 'styled-components';
import memoize from 'lodash.memoize';

import { KeyEnum } from './KeyEnum';
import { ShouldRenderSugestionFn, GetSuggestionValueFn } from './types';
import Suggestion from './components/Suggestion';
import Input from './components/Input';
import {
  filterSuggestions,
  getNeedleFromString,
  getNextSafeIndexFromArray,
  getPreviousSafeIndexFromArray
} from './utils';

const Wrapper = styled.div`
  position: relative;
`;

export interface Props<T = string> {
  className?: string;
  getSuggestionValue?: GetSuggestionValueFn<T>;
  ignoreCase?: boolean;
  inputValue?: string;
  navigate?: boolean;
  shouldRenderSuggestion?: ShouldRenderSugestionFn;
  suggestions: T[];
  onInputBlur?(value: string): void;
  onInputChange(newValue: string): void;
  onMatch?(matchedValue: T): void;
}

export interface State {
  activeIndex: number;
  focused: boolean;
  value: string;
}

export class InlineSuggest<T> extends React.Component<Props<T>, State> {
  static defaultProps = {
    ignoreCase: true,
    suggestions: [],
    switchBetweenSuggestions: false,
    value: ''
  };

  state = {
    activeIndex: -1,
    focused: false,
    value: ''
  };

  private memoizedFilterSuggestions = memoize(filterSuggestions);

  render() {
    return (
      <Wrapper className={this.props.className}>
        <Input
          value={this.state.value}
          onChange={this.handleOnChange}
          onBlur={this.handleOnBlur}
          onKeyDown={this.handleOnKeyDown}
          onKeyUp={this.handleOnKeyUp}
        />
        <Suggestion
          value={this.state.value}
          needle={this.getNeedle()}
          shouldRenderSuggestion={this.props.shouldRenderSuggestion}
        />
      </Wrapper>
    );
  }

  private fireOnChange = (newValue: string) => {
    if (this.props.onInputChange) {
      this.props.onInputChange(newValue);
    }
  };

  private handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    const valueFromEvent = e.currentTarget.value;
    const { getSuggestionValue, suggestions, ignoreCase } = this.props;

    const newMatchedArray = this.memoizedFilterSuggestions(
      valueFromEvent,
      suggestions,
      Boolean(ignoreCase),
      getSuggestionValue
    );

    this.setState({
      activeIndex: newMatchedArray.length > 0 ? 0 : -1,
      value: valueFromEvent
    });
    this.fireOnChange(valueFromEvent);
  };

  private handleOnBlur = () => {
    if (this.props.onInputBlur) {
      this.props.onInputBlur(this.state.value);
    }
  };

  private handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (this.state.activeIndex === -1) {
      return;
    }

    const { keyCode } = e;
    const { navigate } = this.props;

    const allowedKeyCodes = [
      KeyEnum.TAB,
      KeyEnum.ENTER,
      KeyEnum.UP_ARROW,
      KeyEnum.DOWN_ARROW
    ];

    if (allowedKeyCodes.includes(keyCode)) {
      e.preventDefault();
    }

    if (
      navigate &&
      (keyCode === KeyEnum.DOWN_ARROW || keyCode === KeyEnum.UP_ARROW)
    ) {
      const matchedSuggestions = this.getMatchedSuggestions();
      this.setState({
        activeIndex:
          keyCode === KeyEnum.DOWN_ARROW
            ? getNextSafeIndexFromArray(
                matchedSuggestions,
                this.state.activeIndex
              )
            : getPreviousSafeIndexFromArray(
                matchedSuggestions,
                this.state.activeIndex
              )
      });
    }
  };

  private handleOnKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { keyCode } = e;

    if (
      this.state.activeIndex >= 0 &&
      (keyCode === KeyEnum.TAB ||
        keyCode === KeyEnum.ENTER ||
        keyCode === KeyEnum.RIGHT_ARROW)
    ) {
      const matchedSuggestions = this.getMatchedSuggestions();
      const matchedValue = matchedSuggestions[this.state.activeIndex];

      const newValue = this.props.getSuggestionValue
        ? this.props.getSuggestionValue(matchedValue)
        : String(matchedValue);

      this.setState({
        value: newValue
      });

      this.fireOnChange(newValue);

      if (this.props.onMatch) {
        this.props.onMatch(matchedValue);
      }
    }
  };

  private getMatchedSuggestions = () => {
    return this.memoizedFilterSuggestions(
      this.state.value,
      this.props.suggestions,
      Boolean(this.props.ignoreCase),
      this.props.getSuggestionValue
    ) as T[];
  };

  private getNeedle = () => {
    if (this.state.activeIndex === -1) {
      return '';
    }

    const matchedSuggestions = this.getMatchedSuggestions();

    return getNeedleFromString(
      this.props.getSuggestionValue
        ? this.props.getSuggestionValue(
            matchedSuggestions[this.state.activeIndex]
          )
        : String(matchedSuggestions[this.state.activeIndex]),
      this.state.value
    );
  };
}
