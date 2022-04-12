import {useQuery} from 'react-query';
import {companiesService} from '../services/companiesService';
import {userService} from '../services/userService';

export function useUserCompanies() {
  const {isLoading, data, error, refetch} = useQuery('getUserCompanies', () => userService.getLinkedCompanies());

  return {
    isLoading,
    data,
    error,
    refetch
  };
}
