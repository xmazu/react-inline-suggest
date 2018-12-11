import React from 'react';
import styled from 'styled-components';

import { KeyEnum } from './KeyEnum';
import { ShouldRenderSugestionFn, GetSuggestionValueFn } from './types';
import Suggestion from './components/Suggestion';
import Input from './components/Input';
import { filterSuggestions, getNeedleFromString } from './utils';

const Wrapper = styled.div`
  position: relative;
`;

export interface Props<T = string> {
  className?: string;
  suggestions: T[];
  ignoreCase?: boolean;
  switchBetweenSuggestions?: boolean;
  value?: string;
  getSuggestionValue?: GetSuggestionValueFn<T>;
  onBlur?(e: React.FocusEvent<HTMLInputElement>): void;
  onChange(e: React.FormEvent<HTMLInputElement>): void;
  onMatch?(matchedValue: T): void;
  shouldRenderSuggestion?: ShouldRenderSugestionFn;
}

export interface State {
  activeIndex: number;
  needle: string;
  value: string;
}

export class InlineSuggest<T> extends React.Component<Props<T>, State> {
  static defaultProps = {
    ignoreCase: true,
    switchBetweenSuggestions: false,
    value: '',
    suggestions: []
  };

  state = {
    activeIndex: 0,
    needle: '',
    value: ''
  };

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
          needle={this.state.needle}
          shouldRenderSuggestion={this.props.shouldRenderSuggestion}
        />
      </Wrapper>
    );
  }

  private fireOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (this.props.onChange) {
      this.props.onChange(e);
    }
  };

  private handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    const valueFromEvent = e.currentTarget.value;
    const { getSuggestionValue, suggestions, ignoreCase } = this.props;

    const newMatchedArray = filterSuggestions(suggestions, valueFromEvent, {
      ignoreCase: Boolean(ignoreCase),
      getSuggestionValue
    });

    let needle = '';

    if (newMatchedArray.length > 0) {
      needle = getNeedleFromString(
        getSuggestionValue
          ? getSuggestionValue(newMatchedArray[0])
          : String(newMatchedArray[0]),
        valueFromEvent
      );

      if (needle && this.props.onMatch) {
        this.props.onMatch(newMatchedArray[0]);
      }
    }

    this.setState({
      activeIndex: 0,
      needle,
      value: valueFromEvent
    });
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
    const { needle, value } = this.state;
    const {
      getSuggestionValue,
      ignoreCase,
      suggestions,
      switchBetweenSuggestions
    } = this.props;

    if (needle && (keyCode === KeyEnum.TAB || keyCode === KeyEnum.ENTER)) {
      e.preventDefault();
    }

    const { activeIndex } = this.state;

    const matchedSuggestions = filterSuggestions(suggestions, value, {
      ignoreCase: Boolean(ignoreCase),
      getSuggestionValue
    });

    if (switchBetweenSuggestions && keyCode === KeyEnum.UP_ARROW) {
      e.preventDefault();
      this.setNewActiveIndex(
        activeIndex + 1 > matchedSuggestions.length - 1 ? 0 : activeIndex + 1
      );
    }
    if (switchBetweenSuggestions && keyCode === KeyEnum.DOWN_ARROW) {
      e.preventDefault();
      this.setNewActiveIndex(
        activeIndex - 1 < 0 ? matchedSuggestions.length - 1 : activeIndex - 1
      );
    }
  };

  private handleOnKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { keyCode } = e;
    const { needle } = this.state;

    if (
      needle &&
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
        const matchedSuggestions = filterSuggestions(
          this.props.suggestions,
          this.props.value || '',
          {
            ignoreCase: Boolean(this.props.ignoreCase),
            getSuggestionValue: this.props.getSuggestionValue
          }
        );
        this.props.onMatch(matchedSuggestions[this.state.activeIndex]);
      }
    }
  };

  private setNewActiveIndex = (index: number) => {
    const { getSuggestionValue, ignoreCase, suggestions } = this.props;

    const { value } = this.state;

    const matchedSuggestions = filterSuggestions(suggestions, value, {
      ignoreCase: Boolean(ignoreCase),
      getSuggestionValue
    });

    const needle = getNeedleFromString(
      getSuggestionValue
        ? getSuggestionValue(matchedSuggestions[index])
        : String(matchedSuggestions[index]),
      value
    );

    this.setState({
      activeIndex: index,
      needle
    });
  };
}
