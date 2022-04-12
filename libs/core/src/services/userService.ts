import { CompanyId, CompanyProperties } from '../types/Companies/Company';
import { apiService } from './apiService';
import { zellyUrls } from '../Urls';

export const userService = {
  async linkCompanyToUser(companyId: CompanyId) {
    const { POST } = apiService();
    return await POST<CompanyProperties[]>(zellyUrls.connectUserToCompany, { companyId });
  },
  async removeCompanyFromUser(companyId: CompanyId) {
    const { POST } = apiService();
    return await POST<CompanyProperties[]>(zellyUrls.removeCompanyFromUser, { companyId });
  },
  async getLinkedCompanies() {
    const { GET } = apiService();
    return await GET<CompanyProperties[]>(zellyUrls.getUserCompanies);
  },
};
