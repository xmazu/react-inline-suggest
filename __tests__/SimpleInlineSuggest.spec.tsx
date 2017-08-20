import * as React from 'react';
import * as enzyme from 'enzyme';
import * as sinon from 'sinon';

import { SimpleInlineSuggest } from '../src';

const simpleUsers = ['xmazu', 'sam', 'frodo', 'john'];

describe('<SimpleInlineSuggest />', () => {
  it('sets value', () => {
    const wrapper = enzyme.shallow(
      <SimpleInlineSuggest value="john" haystack={simpleUsers} />
    );
    expect(wrapper.find('input').props().value).toBe('john');
  });

  it('does change a value via props', () => {
    const wrapper = enzyme.shallow(
      <SimpleInlineSuggest value="john" haystack={simpleUsers} />
    );
    wrapper.setProps({
      value: 'xmazu'
    });
    expect(wrapper.find('input').props().value).toBe('xmazu');
  });
});
