import { LoanRequestStatus } from '../../types';

type LoanRequestStatusKey =
| 'WAITING_APPROVAL'
| 'TO_BE_DISBURSED'
| 'CLOSED'
| 'PENDING_SETTLEMENT'
| 'REJECTED'
| 'ACTIVE';

type LoanRequestStatusEntity = {
  [key in LoanRequestStatusKey]: LoanRequestStatus
};

export const LOAN_REQUEST_STATUS: LoanRequestStatusEntity  = {
  WAITING_APPROVAL: 'waiting approval',
  TO_BE_DISBURSED: 'to be disbursed',
  CLOSED: 'closed',
  PENDING_SETTLEMENT: 'pending settlement',
  REJECTED: 'rejected',
  ACTIVE: 'active',
};