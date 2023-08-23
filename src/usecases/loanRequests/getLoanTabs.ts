/* eslint-disable no-console */
import { LoanRequest, LoanRequestStatus } from '../../types';
import { LOAN_REQUEST_STATUS } from '../../entities/loanRequests';

type LoanTypeEntity<T> = LoanRequest & { status: T };

export type LoanRequestsGroupedByStatus = {
  [key in LoanRequestStatus]: LoanTypeEntity<key>[];
};

export type LoanRequestTab = {
  label: string;
  count: number;
  status: LoanRequestStatus;
  loanRequests: LoanRequest[];
};

const groupLoanRequestByStatus = (loanRequests: LoanRequest[]): LoanRequestsGroupedByStatus  => {
  return loanRequests.reduce((config, loanRequest) => {
    const loanStatusConfig = config[loanRequest.status] ?? [];
    return {
      ...config,
      [loanRequest.status]: [ ...loanStatusConfig, loanRequest ],
    };
  }, {} as LoanRequestsGroupedByStatus);
};

export const getLoanTabs = (loanRequests: LoanRequest[]): LoanRequestTab[]  => {
  const groupedLoanRequests = groupLoanRequestByStatus(loanRequests);

  const getLoanRequestData = (status: LoanRequestStatus) => {
    return {
      loanRequests: groupedLoanRequests[status] ?? [],
      count: groupedLoanRequests[status]?.length ?? 0,
    };
  };

  const prioritizedStatusConfig = [
    {
      label: 'Approved Loans',
      status: LOAN_REQUEST_STATUS.TO_BE_DISBURSED,
    },
    {
      label: 'Requests',
      status: LOAN_REQUEST_STATUS.WAITING_APPROVAL,
    },
    {
      label: 'Pending',
      status:  LOAN_REQUEST_STATUS.PENDING_SETTLEMENT,
    },
    {
      label: 'Active Loans',
      status: LOAN_REQUEST_STATUS.ACTIVE,
    },
    {
      label: 'Closed Loans',
      status:  LOAN_REQUEST_STATUS.CLOSED,
    },
    {
      label: 'Rejected Loans',
      status:  LOAN_REQUEST_STATUS.REJECTED,
    },
  ];

  return prioritizedStatusConfig.map(config => ({
    ...config,
    ...getLoanRequestData(config.status),
  })).filter(tab => tab.count > 0);
};