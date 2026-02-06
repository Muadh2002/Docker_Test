import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the app header', () => {
  render(<App />);
  const headerElement = screen.getByText(/React \+ PHP Learning Project/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders add user form', () => {
  render(<App />);
  const addUserButton = screen.getByText(/Add User/i);
  expect(addUserButton).toBeInTheDocument();
});

test('renders users list section', () => {
  render(<App />);
  const usersListHeading = screen.getByText(/Users List/i);
  expect(usersListHeading).toBeInTheDocument();
});
