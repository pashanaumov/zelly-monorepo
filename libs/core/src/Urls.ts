const __DEV__ = process.env['NODE_ENV'] === 'development';

export const zellyUrls = {
  loginUrl: `https://zelly-server.herokuapp.com/auth/login`,
  registerUrl: `https://zelly-server.herokuapp.com/auth/register`,

  changePassword: `https://zelly-server.herokuapp.com/auth/change_password`,
  changeEmail: `https://zelly-server.herokuapp.com/auth/user`,

  getAllCompanies: __DEV__ ? `http://localhost:3000/companies` : `https://zelly-server.herokuapp.com/companies`,
  getCompanyById: __DEV__ ? `http://localhost:3000/companies/company` : `https://zelly-server.herokuapp.com/companies/company`,

  addYearlyCalculationToCompany: __DEV__ ? `http://localhost:3000/companies/add_yearly_calculation` : `https://zelly-server.herokuapp.com/companies/add_yearly_calculation`,
  addQuarterlyCalculationToYearly: __DEV__ ? `http://localhost:3000/companies/add_quarterly_to_yearly` : `https://zelly-server.herokuapp.com/companies/add_quarterly_to_yearly`,

  getAllCalculationsForCompany: __DEV__
    ? `http://localhost:3000/companies/get_all_yearly_calculations`
    : `https://zelly-server.herokuapp.com/companies/get_all_yearly_calculations`,

  connectUserToCompany: 'https://zelly-server.herokuapp.com/user/connectCompany',
  getUserCompanies: `https://zelly-server.herokuapp.com/user/relations`,
  removeCompanyFromUser: `https://zelly-server.herokuapp.com/user/removeCompany`,

  checkUser: `https://zelly-server.herokuapp.com/auth/user`,
};
