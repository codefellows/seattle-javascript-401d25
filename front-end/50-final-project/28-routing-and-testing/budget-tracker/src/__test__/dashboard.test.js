import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Dashboard from './../component/dashboard';

configure({ adapter: new Adapter() });

describe('Dashboard testing', () => {
  test('Simple test for initial state', () => {
    const mountedDashboard = mount(<Dashboard />);
    expect(mountedDashboard.state('expenses')).toEqual([]);
  });
});
