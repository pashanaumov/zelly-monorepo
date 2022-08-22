import { useMutation } from 'react-query';
import { companiesService } from '../../services/companiesService';
import { CompanyId, CompanyProperties } from '../../types/Companies/Company';

export function useGetCompanyById() {
  const {
    mutateAsync: getCompanyById,
    isLoading,
    error,
  } = useMutation('getCompanyById', (companyId: CompanyId) => companiesService.getOneById(companyId), {
    onSuccess: async (data: CompanyProperties) => {
      return data;
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return {
    getCompanyById,
    isLoading,
    error,
  };
}
