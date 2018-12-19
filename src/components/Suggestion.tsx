import React, { SFC } from 'react';
import styled from 'styled-components';

import { commonStyles } from './common';
import { ShouldRenderSugestionFn } from '../types';

const StyledSuggestion = styled.span`
  display: inline-block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.4;
  ${commonStyles};
  border-color: transparent;
`;

export interface SuggestionProps {
  value?: string;
  needle: string;
  shouldRenderSuggestion?: ShouldRenderSugestionFn;
}

const Suggestion: SFC<SuggestionProps> = ({
  needle,
  shouldRenderSuggestion,
  value
}) => {
  if (shouldRenderSuggestion && value && !shouldRenderSuggestion(value)) {
    return null;
  }

  return (
    <StyledSuggestion>
      {value}
      {needle}
    </StyledSuggestion>
  );
};

export default Suggestion;
