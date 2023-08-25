import React from 'react';
import { render, screen } from '@testing-library/react';
import LoansList from './LoansList';
import '@testing-library/jest-dom/extend-expect';
import theme from '../../theme/theme';
import { ThemeProvider } from '@mui/material';
import { loanRequestBaseSample } from '../../test/loanRequests';
import { LoanRequest } from '../../types';
import { useLoanTabs } from '../../hooks';

jest.mock('../../hooks');

const mockUseLoanTabs = useLoanTabs as jest.MockedFunction<typeof useLoanTabs>;

describe('LoansList unit tests', () => {
  it('renders tabs with correct labels and counts', async () => {
    let loanRequestSample = loanRequestBaseSample;

    const PENDING_LOAN_REQUESTS_COUNT = 5;

    mockUseLoanTabs.mockReturnValue([
      {
        status: 'pending settlement',
        label: 'Pending',
        count: PENDING_LOAN_REQUESTS_COUNT,
        loanRequests: Array.from(
          { length: PENDING_LOAN_REQUESTS_COUNT },
          (_, index): LoanRequest => ({
            ...loanRequestSample,
            id: index,
            status: 'pending settlement',
          }),
        ),
      },
    ]);

    render(
      <ThemeProvider theme={theme}>
        <LoansList />
      </ThemeProvider>,
    );

    expect(screen.getByText('Pending')).toBeInTheDocument();
    expect(screen.getAllByTestId('tab-pending settlement')).toHaveLength(
      PENDING_LOAN_REQUESTS_COUNT,
    );
  });

  it('display box with "not items" message if there is no loanTabs', () => {
    mockUseLoanTabs.mockReturnValue([]);

    render(
      <ThemeProvider theme={theme}>
        <LoansList />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('no-items-message')).toBeInTheDocument();
    expect(() => screen.getByTestId('loan-request-tabs')).toThrow(
      'Unable to find an element',
    );
  });
});
