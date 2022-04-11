import { apiService } from './useApiService';
import { CompanyPropertiesResponse } from '../types/Companies/Company';
import { zellyUrls } from '../Urls';

export const companiesService = {
  async getAll() {
    const { GET } = apiService();
    return await GET<CompanyPropertiesResponse[]>(zellyUrls.getAllCompanies);
  },
};
