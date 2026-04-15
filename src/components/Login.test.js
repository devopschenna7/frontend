import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from './Login';

test('renders the login form correctly', () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
  
  // Verify that the main heading is present on the screen
  const headingElement = screen.getByText(/Welcome Back/i);
  expect(headingElement).toBeInTheDocument();
});
