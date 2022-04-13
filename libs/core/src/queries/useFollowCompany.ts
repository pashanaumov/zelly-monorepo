import { useMutation } from 'react-query';
import { userService } from '../services/userService';
import { CompanyId, CompanyProperties } from '../types/Companies/Company';
import { useUserCompanies } from './useUserCompanies';

export function useFollowCompany() {
  const { refetch } = useUserCompanies();
  const { mutateAsync: mutateFollow, isLoading: isMutationLoading } = useMutation('addCompanyToUser', (company: CompanyId) => userService.linkCompanyToUser(company), {
    onSuccess: (data: CompanyProperties[]) => {
      refetch();
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return {
    mutateFollow,
    isMutationLoading,
  };
}
