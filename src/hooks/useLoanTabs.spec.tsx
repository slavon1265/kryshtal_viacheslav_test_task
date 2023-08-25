import { act, renderHook } from '@testing-library/react-hooks';
import { useLoanTabs } from './useLoanTabs';
import { loanRequestBaseSample } from '../test/loanRequests';
import { LoanRequest } from '../types';

describe('useLoanTabs hook', () => {
  it('should generate loan tabs correctly', async () => {
    let loanRequestSample = loanRequestBaseSample;
    jest.mock('../data/loans.json', () => ({
      __esModule: true,
      default: {
        loanRequests: [
          {
            ...loanRequestSample,
            status: 'waiting approval',
          },
          {
            ...loanRequestSample,
            status: 'waiting approval',
          },
          {
            ...loanRequestSample,
            status: 'closed',
          },
        ] as LoanRequest[],
      },
    }));

    const { result, waitForNextUpdate } = renderHook(() => useLoanTabs());

    await act(async () => {
      expect(result.current).toHaveLength(0); // Check that initially hook return empty array

      await waitForNextUpdate(); // Wait for the hook to fetch data

      expect(result.current).toHaveLength(2); // Get grouped 2 tabs

      const groupedWaitingApprovalRequestsTab = result.current.find(
        (tab) => tab.status === 'waiting approval',
      );
      const groupedClosedRequestsTab = result.current.find(
        (tab) => tab.status === 'closed',
      );

      // Check that grouping works correctly
      expect(groupedWaitingApprovalRequestsTab?.count).toEqual(2);
      expect(groupedClosedRequestsTab?.count).toEqual(1);
    });
  }, 5000);
});
