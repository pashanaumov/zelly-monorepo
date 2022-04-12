import { useMutation } from 'react-query';
import { CompanyId, CompanyProperties } from '../types/Companies/Company';
import { userService } from '../services/userService';
import { useFetchCompanies } from './useFetchCompanies';

export async function addCompanyToUser() {
  const { refetch } = useFetchCompanies();
  const { data, mutate, mutateAsync } = useMutation('addCompanyToUser', (company: CompanyId) => userService.linkCompanyToUser(company), {
    onSuccess: (data: CompanyProperties[]) => {
      console.log(data);
      refetch();
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return {
    mutateAsync,
  };
}
