import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Signup from './Signup';

test('renders the first step of the signup form', () => {
  render(
    <BrowserRouter>
      <Signup />
    </BrowserRouter>
  );
  
  // Verify that the Create Account text and step indicator are present
  const headingElement = screen.getByText(/Create Account/i);
  const stepElement = screen.getByText(/Step 1 of 3/i);
  
  expect(headingElement).toBeInTheDocument();
  expect(stepElement).toBeInTheDocument();
});
