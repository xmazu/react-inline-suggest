import React, { SFC } from 'react';
import styled from 'styled-components';

import { commonStyles } from './common';

const StyledInput = styled.input`
  position: relative;
  z-index: 1;
  display: inline-block;
  background-color: transparent;
  width: 100%;

  ${commonStyles};
`;

export interface InputProps {
  value: string;
  onBlur?(e: React.FocusEvent<HTMLInputElement>): void;
  onChange(e: React.FormEvent<HTMLInputElement>): void;
  onKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void;
  onKeyUp(e: React.KeyboardEvent<HTMLInputElement>): void;
}

const Input: SFC<InputProps> = props => <StyledInput {...props} />;

export default Input;
