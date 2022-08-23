import { companiesService } from '@zelly/core/services/companiesService';
import { CompanyId } from '@zelly/core/types/Companies/Company';
import { useMutation } from 'react-query';
import Toast from '../../components/Toast';

export function useGetAllCalculationsForCompany() {
  const {
    mutateAsync: getAllCalculations,
    isError,
    isLoading,
  } = useMutation('getAllCalculationsForCompany', (companyId: CompanyId) => companiesService.getAllCalculationsForCompany({ companyId }), {
    onSuccess: async (data) => {
      return data;
    },
    onError: (err: any) => {
      console.log(err);
      return Toast.showToast({
        type: 'error',
        text1: 'Error',
        text2: err.message,
      });
    },
  });

  return {
    getAllCalculations,
    isError,
    isLoading,
  };
}
