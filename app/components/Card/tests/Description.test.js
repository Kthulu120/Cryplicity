/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';

import Description from '../Description';

describe('<Wrapper />', () => {
  it('should render an <div> tag', () => {
    const renderedComponent = shallow(<Description />);
    expect(renderedComponent.type()).toEqual('div');
  });

  it('should have a className attribute', () => {
    const renderedComponent = shallow(<Description />);
    expect(renderedComponent.prop('className')).toBeDefined();
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const renderedComponent = shallow(<Description id={id} />);
    expect(renderedComponent.prop('id')).toEqual(id);
  });

  it('should not adopt an invalid attribute', () => {
    const renderedComponent = shallow(<Description attribute={'test'} />);
    expect(renderedComponent.prop('attribute')).toBeUndefined();
  });
});
