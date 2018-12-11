import React from 'react';
import { shallow } from 'enzyme';

import { InlineSuggest } from '../index';

const simpleUsers = ['xmazu', 'sam', 'frodo', 'john'];

describe('<SimpleInlineSuggest />', () => {
  it('sets value', () => {
    const wrapper = shallow(
      <InlineSuggest value="john" haystack={simpleUsers} />
    );
    expect(wrapper.find('input').props().value).toBe('john');
  });

  it('does change a value via props', () => {
    const wrapper = shallow(
      <InlineSuggest value="john" haystack={simpleUsers} />
    );
    wrapper.setProps({
      value: 'xmazu'
    });
    expect(wrapper.find('input').props().value).toBe('xmazu');
  });
});
