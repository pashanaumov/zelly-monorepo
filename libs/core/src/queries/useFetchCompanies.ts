import { useQuery } from 'react-query';
import { companiesService } from '../services/companiesService';

export function useFetchCompanies() {
  const { isLoading, data, error, refetch } = useQuery('companiesList', () => companiesService.getAll());

  return {
    isLoading,
    data,
    error,
    refetch,
  };
}
