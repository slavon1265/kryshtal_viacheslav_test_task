import { useEffect, useMemo, useState } from 'react';
import { LoanRequest } from '../types';
import { getLoanTabs } from '../usecases/loanRequests';

// imitate encapsulated logic of loading loan requests

const loadLoansRequests = async (): Promise<LoanRequest[]> => {
  // eslint-disable-next-line import/extensions
  const loanConfig = await import('../data/loans.json');

  return loanConfig.default.loanRequests as LoanRequest[];
};

export const useLoanTabs = () => {
  const [loanRequests, setLoanRequests] = useState<LoanRequest[]>([]);

  const initLoanRequests = async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const loanRequests = await loadLoansRequests();
      setLoanRequests(loanRequests);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    initLoanRequests();
  }, []);


  return useMemo(() => getLoanTabs(loanRequests), [loanRequests]);
};
