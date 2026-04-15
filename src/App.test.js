import { render, screen } from '@testing-library/react';
import App from './App';

test('renders login view by default', () => {
  render(<App />);
  expect(screen.getByText('Welcome Back')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
});
