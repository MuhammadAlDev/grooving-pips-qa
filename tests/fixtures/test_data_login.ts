export const testDataLogin = [
  {
    scenario: 'Valid login credentials',
    email: 'superadmin@groovingpips.com',
    password: 'Qwerty12345!!!',
  },
  {
    scenario: 'Invalid email',
    email: 'invalidemail@groovingpips.com',
    password: 'Qwerty12345!!!',
  },
  {
    scenario: 'Invalid password',
    email: 'superadmin@groovingpips.com',
    password: 'invalidpassword',
  },
  {
    scenario: 'Empty credentials',
    email: '',
    password: '',
  },

];  