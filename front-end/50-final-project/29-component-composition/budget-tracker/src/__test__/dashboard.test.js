import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure as configureEnzyme, shallow as enzymeShallowMount } from 'enzyme';
import Dashboard from '../component/dashboard/dashboard';

configureEnzyme({ adapter: new Adapter() });

describe('Dashboard testing', () => {
  test('Simple test for initial state', () => {
    const mountedDashboard = enzymeShallowMount(<Dashboard />);
    expect(mountedDashboard.state('expenses')).toEqual([]);
  });
  test('The dashboard should display Budget Tracker Dashboard', () => {
    const mountedDashboard = enzymeShallowMount(<Dashboard />);
    expect(mountedDashboard.find('h1').text()).toEqual('Budget Tracker Dashboard');
  });

  test('The dashboard should contain an ExpenseForm', () => {
    const mountedDashboard = enzymeShallowMount(<Dashboard />);
    expect(mountedDashboard.find('ExpenseForm')).toBeTruthy();
  });

  test('Expenses should be added correctly to the internal state', () => {
    const mountedDashboard = enzymeShallowMount(<Dashboard />);
    mountedDashboard.setState({
      expenses: [
        {
          title: 'Gregor',
          price: 2000,
        },
        {
          title: 'Hound',
          price: 2000,
        },
      ],
    });

    expect(mountedDashboard.find('ExpenseItem').length).toEqual(2);
    expect(mountedDashboard.find('p').text()).toEqual(' Your total costs are: $4000');
  });
});
