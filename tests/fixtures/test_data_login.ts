declare const process: {
  env: Record<string, string | undefined>;
};

export interface LoginTestData {
  scenario: string;
  email: string;
  password: string;
  expectedResult: string;
  expectedType: 'success' | 'error' | 'validation';
}

export const testDataLogin: LoginTestData[] = [
  {
    scenario: 'Valid login credentials',
    email: process.env.LOGIN_EMAIL!,
    password: process.env.LOGIN_PASSWORD!,
    expectedResult: 'Login successful',
    expectedType: 'success',
  },

  {
    scenario: 'Invalid email',
    email: 'invalidemail@example.com',
    password: process.env.LOGIN_PASSWORD!,
    expectedResult: 'email not found',
    expectedType: 'error',
  },

  {
    scenario: 'Invalid password',
    email: process.env.LOGIN_EMAIL!,
    password: 'invalidpassword',
    expectedResult: 'password must contain at least 3 of the following: uppercase, lowercase, number, special character',
    expectedType: 'error',
  },

  {
    scenario: 'Empty credentials',
    email: '',
    password: '',
    expectedResult: 'Please fill out this field.',
    expectedType: 'validation',
  },
];