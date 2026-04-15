import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import EcommerceStore from './EcommerceStore';

describe('EcommerceStore Component', () => {
  // Before the test runs, fake the localStorage so the user appears logged in
  beforeEach(() => {
    Storage.prototype.getItem = jest.fn(() => 
      JSON.stringify({ firstName: 'Test', lastName: 'User' })
    );
  });

  // Clean up after the test
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the store dashboard and greets the user', () => {
    render(
      <BrowserRouter>
        <EcommerceStore />
      </BrowserRouter>
    );
    
    // Verify the greeting and main store heading render correctly
    const greeting = screen.getByText(/Welcome back, Test!/i);
    const mainHeading = screen.getByText(/New Arrivals Are Here/i);
    
    expect(greeting).toBeInTheDocument();
    expect(mainHeading).toBeInTheDocument();
  });
});
