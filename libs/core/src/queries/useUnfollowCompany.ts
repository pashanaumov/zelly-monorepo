import { useMutation } from 'react-query';
import { userService } from '../services/userService';
import { CompanyId, CompanyProperties } from '../types/Companies/Company';
import { useUserCompanies } from './useUserCompanies';

export function useUnfollowCompany() {
  const { refetch } = useUserCompanies();
  const { mutateAsync: mutateUnfollow, isLoading: isMutationUnfollowLoading } = useMutation(
    'removeCompanyFromUser',
    (company: CompanyId) => userService.removeCompanyFromUser(company),
    {
      onSuccess: (data: CompanyProperties[]) => {
        refetch();
      },
      onError: (err) => {
        console.log(err);
      },
    },
  );

  return {
    mutateUnfollow,
    isMutationUnfollowLoading,
  };
}
