export const config = {
  baseUrl: process.env.NODE_ENV === 'development' 
    ? '' 
    : 'http://localhost:3002',
  assets: {
    logo: '/assets/Passport-logo-RGB.svg'
  }
};
