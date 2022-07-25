const __DEV__ = process.env['NODE_ENV'] === 'development';

export const zellyUrls = {
  loginUrl: `https://zelly-server.herokuapp.com/auth/login`,
  registerUrl: `https://zelly-server.herokuapp.com/auth/register`,

  changePassword: `https://zelly-server.herokuapp.com/auth/change_password`,
  changeEmail: `https://zelly-server.herokuapp.com/auth/user`,

  getAllCompanies: __DEV__ ? `http://localhost:3000/companies` : `https://zelly-server.herokuapp.com/companies`,
  connectUserToCompany: 'https://zelly-server.herokuapp.com/user/connectCompany',
  getUserCompanies: `https://zelly-server.herokuapp.com/user/relations`,
  removeCompanyFromUser: `https://zelly-server.herokuapp.com/user/removeCompany`,

  checkUser: `https://zelly-server.herokuapp.com/auth/user`,
};
