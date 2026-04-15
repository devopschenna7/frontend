import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from './Login';

global.fetch = jest.fn();

describe('Login Component', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    fetch.mockClear();
    mockNavigate.mockClear();
  });

  test('successful login navigates to store', async () => {
    fetch.mockResolvedValueOnce({ ok: true });
    render(<Login navigate={mockNavigate} />);

    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'user1' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'pass123' } });
    fireEvent.click(screen.getByText('Sign In'));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('http://localhost:8080/api/login', expect.any(Object));
      expect(mockNavigate).toHaveBeenCalledWith('store');
    });
  });

  test('failed login shows error message', async () => {
    fetch.mockResolvedValueOnce({ ok: false });
    render(<Login navigate={mockNavigate} />);

    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'user1' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'wrongpass' } });
    fireEvent.click(screen.getByText('Sign In'));

    await waitFor(() => {
      expect(screen.getByText('Invalid username or password')).toBeInTheDocument();
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });
});
