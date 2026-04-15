import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EcommerceStore from './EcommerceStore';

describe('EcommerceStore Component', () => {
  test('renders products and handles logout', () => {
    const mockNavigate = jest.fn();
    render(<EcommerceStore navigate={mockNavigate} />);

    // Check if hero and products render
    expect(screen.getByText('New Arrivals Are Here')).toBeInTheDocument();
    expect(screen.getByText('Wireless Noise-Cancelling Headphones')).toBeInTheDocument();
    expect(screen.getByText('Smart Fitness Watch')).toBeInTheDocument();

    // Test logout functionality
    fireEvent.click(screen.getByText('Log Out'));
    expect(mockNavigate).toHaveBeenCalledWith('login');
  });
});
