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
    password: 'Invalidpassword123!',
    expectedResult: 'invalid email or password',
    expectedType: 'error',
  },

  {
    scenario: 'Email without @',
    email: 'invalidemailexample.com',
    password: process.env.LOGIN_PASSWORD!,
    expectedResult: "Please include an '@' in the email address. 'invalidemailexample.com' is missing an '@'.",
    expectedType: 'validation',
  },

  {
    scenario: 'Invalid email format',
    email: 'invalidemail@example',
    password: process.env.LOGIN_PASSWORD!,
    expectedResult: 'invalid email format',
    expectedType: 'error',
  },

  {
    scenario: 'Invalid format password',
    email: process.env.LOGIN_EMAIL!,
    password: 'invalidpassword',
    expectedResult: 'password must contain at least 3 of the following: uppercase, lowercase, number, special character',
    expectedType: 'error',
  },

   {
    scenario: 'Password without number',
    email: process.env.LOGIN_EMAIL!,
    password: 'Invalidpassword!',
    expectedResult: 'invalid email or password',
    expectedType: 'error',
  },

  {
    scenario: 'Password without special character',
    email: process.env.LOGIN_EMAIL!,
    password: 'invpas123',
    expectedResult: 'password must contain at least 3 of the following: uppercase, lowercase, number, special character',
    expectedType: 'error',
  },

    {
    scenario: 'Password lower than 8 characters',
    email: process.env.LOGIN_EMAIL!,
    password: 'Pass123',
    expectedResult: 'password must be at least 8 characters',
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