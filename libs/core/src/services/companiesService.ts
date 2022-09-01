import { AllCompanyCalculationsResponse, CompanyId, CompanyProperties, CompanyPropertiesResponse, CreateCompanyPayload } from '../types/Companies/Company';
import { CompanyAddYearlyDataPayload, CompanyQuarterlyDataPayload } from '../types/FootprintCalculations/FootprintCaclulations';
import { zellyUrls } from '../Urls';
import { apiService } from './apiService';

type CompanyIdPayload = {
  companyId: CompanyId;
};

const { POST, GET, PUT } = apiService();

export const companiesService = {
  async createCompany(payload: CreateCompanyPayload) {
    return await POST<CompanyProperties>(zellyUrls.createCompany, { ...payload });
  },

  async editCompany(payload: Partial<CreateCompanyPayload>) {
    return await PUT<CompanyProperties>(zellyUrls.editCompany, { ...payload });
  },

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

  async addQuarterlyToYearlyCalculation(quarterlyData: CompanyQuarterlyDataPayload) {
    return await POST<AllCompanyCalculationsResponse[]>(zellyUrls.addQuarterlyCalculationToYearly, { ...quarterlyData });
  },
};
