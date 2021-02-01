import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { CustomersTable } from './components/CustomersTable';
import { testCustomers } from '../common/test-data';

test('renders title', () => {
  render(<App />);
  const element = screen.getByText('Agreement Prices');
  expect(element).not.toEqual(null);
});

test('Table renders customers', () => {
  render(<CustomersTable data={testCustomers} onEdit={() => null}  />);
  const element = screen.getByText(testCustomers[0].name);
  expect(element).not.toEqual(null);
});
