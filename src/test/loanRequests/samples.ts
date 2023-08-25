import { LoanRequest } from '../../types';

export const loanRequestBaseSample: LoanRequest = {
  'id': 1,
  'externalId': 'G81FV',
  'amount': 1000,
  'duration': 1,
  'status': 'waiting approval',
  'monthlyPayment': 1050,
  'interestRate': 5,
  'externalProductId': 1,
  'createdAt': '2021-09-14T13:59:52.895Z',
  'updatedAt': null,
  'rejectedAt': null,
  'approvedAt': null,
  'rejectionReason': null,
  'closedAt': null,
  'activatedAt': null,
  'account': {
    'id': 123,
    'providerId': 'A675345978112114692.1',
    'accountNumber': '4711951501',
    'iban': 'DE40••••••••••••951501',
    'currency': 'EUR',
    'type': 'Savings account',
    'holder': 'Demo Demo',
    'holderType': 'business',
    'isCompanyPublished': true,
    'createdAt': '2021-07-13T10:09:22.032Z',
    'loanLimit': 3,
    'company': {
      'id': 76,
      'legalForm': 'GmbH',
      'name': 'Nancy Logan',
      'registrationNumber': 'HRB 178881 B',
      'registrationDistrict': 'Charlottenburg',
      'registrationDate': '2021-07-06T00:00:00.000Z',
      'riskClass': null,
      'loanLimit': null,
      'country': 'Germany',
      'street': 'Alley Street 8',
      'state': 'state',
      'postcode': '56789',
      'city': 'Berlin',
      'employees': [
        {
          'id': 10,
          'name': 'Nancy Logan',
          'roleName': 'Director',
        },
        {
          'id': 11,
          'name': 'test',
          'roleName': 'test',
        },
      ],
      'isDataComplete': true,
    },
  },
};