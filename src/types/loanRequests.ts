export type LoanRequest = {
  id: number
  externalId: string
  amount: number
  duration: number
  status: LoanRequestStatus
  monthlyPayment: number
  interestRate: number
  externalProductId: number
  createdAt: string
  updatedAt: null | string
  rejectedAt: null | string
  approvedAt: null | string
  rejectionReason: null | string
  closedAt: null | string
  activatedAt: null | string
  account: Account
};

export type LoanRequestStatus = 'waiting approval' // Requests
| 'to be disbursed' // Approved Loans
| 'closed' // Closed Loans
| 'pending settlement' // Pending
| 'rejected' // Rejected Loans
| 'active'; // Active Loans

export type Account = {
  id: number
  providerId: string
  accountNumber: string
  iban: string
  currency: string
  type: string
  holder: string
  holderType: string
  isCompanyPublished: boolean
  createdAt: string
  loanLimit: number
  company: Company
};

export type Company = {
  id: number
  legalForm: string
  name: string
  registrationNumber: string
  registrationDistrict: string
  registrationDate: string
  riskClass: any
  loanLimit: any
  country: string
  street: string
  state: string
  postcode: string
  city: string
  employees: Employee[]
  isDataComplete: boolean
};

export type Employee = {
  id: number
  name: string
  roleName: string
};
