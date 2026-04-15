import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import EcommerceStore from './EcommerceStore';

describe('EcommerceStore Component', () => {
  beforeEach(() => {
    Storage.prototype.getItem = jest.fn(() => 
      JSON.stringify({ firstName: 'Test', lastName: 'User' })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // NEW: Added 'async' here
  test('renders the store dashboard and greets the user', async () => {
    render(
      <BrowserRouter>
        <EcommerceStore />
      </BrowserRouter>
    );
    
    // NEW: Use 'await' and 'findByText' because the name loads inside a useEffect!
    const greeting = await screen.findByText(/Welcome back, Test!/i);
    const mainHeading = screen.getByText(/New Arrivals Are Here/i);
    
    expect(greeting).toBeInTheDocument();
    expect(mainHeading).toBeInTheDocument();
  });
});
