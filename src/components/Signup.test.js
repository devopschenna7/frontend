import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Signup from './Signup';

global.fetch = jest.fn();

describe('Signup Component - Full Flow', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => { fetch.mockClear(); });

  test('completes full signup flow successfully', async () => {
    fetch.mockResolvedValue({ ok: true, status: 200 }); // Mock for both check-availability and signup
    render(<Signup navigate={mockNavigate} />);

    // Step 1
    fireEvent.change(screen.getByPlaceholderText('Mobile (10 digits)'), { target: { value: '1234567890' } });
    fireEvent.click(screen.getByText('Next'));

    // Step 2
    fireEvent.change(screen.getByPlaceholderText('Choose Username'), { target: { value: 'newuser' } });
    fireEvent.click(screen.getByText('Next'));

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Create Password')).toBeInTheDocument();
    });

    // Step 3
    fireEvent.change(screen.getByPlaceholderText('Create Password'), { target: { value: 'secure123' } });
    fireEvent.change(screen.getByPlaceholderText('Re-enter Password'), { target: { value: 'secure123' } });
    fireEvent.click(screen.getByText('Complete Signup'));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('login');
    });
  });

  test('shows error if passwords do not match', async () => {
    fetch.mockResolvedValueOnce({ ok: true, status: 200 }); 
    render(<Signup navigate={mockNavigate} />);

    // Fast-forward to Step 3
    fireEvent.change(screen.getByPlaceholderText('Mobile (10 digits)'), { target: { value: '1234567890' } });
    fireEvent.click(screen.getByText('Next'));
    fireEvent.change(screen.getByPlaceholderText('Choose Username'), { target: { value: 'user' } });
    fireEvent.click(screen.getByText('Next'));

    await waitFor(() => screen.getByPlaceholderText('Create Password'));

    // Input mismatching passwords
    fireEvent.change(screen.getByPlaceholderText('Create Password'), { target: { value: 'pass1' } });
    fireEvent.change(screen.getByPlaceholderText('Re-enter Password'), { target: { value: 'pass2' } });
    fireEvent.click(screen.getByText('Complete Signup'));

    expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
