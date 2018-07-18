import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Dashboard from '../components/dashboard/dashboard';

configure({ adapter: new Adapter() });

describe('Dashboard testing', () => {
  let mountedDashboard;
  beforeEach(() => {
    // "mount" will actually mount the component directly to the DOM even though we don't see it
    mountedDashboard = mount(<Dashboard />);
  });
  afterEach(() => {
    // after each test, we take the component out of the DOM to complete our setup/teardown test process
    mountedDashboard.unmount();
  });

  test('Simple test for initial state', () => {
    expect(mountedDashboard.state('expenses')).toEqual([]);
  });

  test('Adding a new expense to the state', () => {
    const mockExpenses = [{ title: 'fake', price: 9.99, _id: '1234' }];
    mountedDashboard.setState({ expenses: mockExpenses });
    expect(mountedDashboard.state('expenses')).toEqual(mockExpenses);
    expect(mountedDashboard.state('expenses')).toHaveLength(1);
    expect(mountedDashboard.find('p').text()).toEqual('Your total costs are: $9.99');
  });
});
