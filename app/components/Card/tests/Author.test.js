import React from 'react';
import { shallow } from 'enzyme';

import Author from '../Author';

describe('<StyledButton />', () => {
  it('should render an <button> tag', () => {
    const renderedComponent = shallow(<Author />);
    expect(renderedComponent.type()).toEqual('div');
  });

  it('should have a className attribute', () => {
    const renderedComponent = shallow(<Author />);
    expect(renderedComponent.prop('className')).toBeDefined();
  });
  it('should not adopt an invalid attribute', () => {
    const renderedComponent = shallow(<Author attribute={'test'} />);
    expect(renderedComponent.prop('attribute')).toBeUndefined();
  });
});
