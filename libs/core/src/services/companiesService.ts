import { CompanyId, CompanyPropertiesResponse } from '../types/Companies/Company';
import { CompanyAddYearlyDataPayload } from '../types/FootprintCalculations/FootprintCaclulations';
import { zellyUrls } from '../Urls';
import { apiService } from './apiService';

export const companiesService = {
  async getAll() {
    const { GET } = apiService();
    return await GET<CompanyPropertiesResponse[]>(zellyUrls.getAllCompanies);
  },

  async getOneById(companyId: CompanyId) {
    const { POST } = apiService();
    return await POST<CompanyPropertiesResponse>(zellyUrls.getCompanyById, { id: companyId });
  },

  async addYearlyCalculationToCompany(calculationData: CompanyAddYearlyDataPayload) {
    const { POST } = apiService();
    return await POST(zellyUrls.addYearlyCalculationToCompany, calculationData);
  },
};
