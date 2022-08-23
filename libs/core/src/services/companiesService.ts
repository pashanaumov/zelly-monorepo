import { AllCompanyCalculationsResponse, CompanyId, CompanyPropertiesResponse } from '../types/Companies/Company';
import { CompanyAddYearlyDataPayload } from '../types/FootprintCalculations/FootprintCaclulations';
import { zellyUrls } from '../Urls';
import { apiService } from './apiService';

type CompanyIdPayload = {
  companyId: CompanyId;
};

const { POST, GET } = apiService();

export const companiesService = {
  async getAll() {
    return await GET<CompanyPropertiesResponse[]>(zellyUrls.getAllCompanies);
  },

  async getOneById({ companyId }: CompanyIdPayload) {
    return await POST<CompanyPropertiesResponse>(zellyUrls.getCompanyById, { id: companyId });
  },

  async addYearlyCalculationToCompany(calculationData: CompanyAddYearlyDataPayload) {
    return await POST(zellyUrls.addYearlyCalculationToCompany, calculationData);
  },

  async getAllCalculationsForCompany({ companyId }: CompanyIdPayload) {
    return await POST<AllCompanyCalculationsResponse>(zellyUrls.getAllCalculationsForCompany, { companyId });
  },
};
