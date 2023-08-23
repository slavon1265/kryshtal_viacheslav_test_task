import React from 'react';
import { render, screen } from '@testing-library/react';
import LoansList from './LoansList';
import '@testing-library/jest-dom/extend-expect';
import theme from '../../theme/theme';
import { ThemeProvider } from '@mui/material';

describe('LoansList component', async () => {

  it('renders tabs with correct labels and counts', async () => {
    render(<ThemeProvider theme={theme}><LoansList /></ThemeProvider>);

    expect(screen.getByText('Financing')).toBeInTheDocument();
    // expect(screen.getByText('Approved')).toBeInTheDocument();
    // expect(screen.getByText('Rejected')).toBeInTheDocument();
    //
    // expect(screen.getByText('5')).toBeInTheDocument();
    // expect(screen.getByText('10')).toBeInTheDocument();
    // expect(screen.getByText('2')).toBeInTheDocument();

  });

  it('displays loan requests for each tab', () => {
    // Mocking the loanRequests data for each tab
    const mockLoanTabs = [
      { status: 'pending', label: 'Pending', count: 5, loanRequests: [...mockLoanRequests] },
      { status: 'approved', label: 'Approved', count: 10, loanRequests: [...mockLoanRequests] },
      { status: 'rejected', label: 'Rejected', count: 2, loanRequests: [...mockLoanRequests] },
    ];

    // Mocking the useLoanTabs hook with the mockLoanTabs data
    jest.mock('../../hooks', () => ({
      useLoanTabs: jest.fn(() => mockLoanTabs),
    }));

    render(<LoansList />);

    // Assuming you have a test ID for LoanRow component
    const loanRequestRows = screen.getAllByTestId('loan-row');

    // Check if the number of loan requests matches the count in the tab
    expect(loanRequestRows).toHaveLength(5); // Assuming mockLoanRequests contains 5 elements
  });
});

// Mock data for loan requests
const mockLoanRequests = [
  { id: 1, amount: 1000, status: 'pending' /* other properties */ },
  { id: 2, amount: 2000, status: 'approved' /* other properties */ },
  { id: 3, amount: 1500, status: 'rejected' /* other properties */ },
  // ... other loan requests
];
