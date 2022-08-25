import { CompanyId } from '@zelly/core/types/Companies/Company';
import { CompanyQuarterlyDataPayload } from '@zelly/core/types/FootprintCalculations/FootprintCaclulations';
import { useMutation } from 'react-query';
import Toast from '../../components/Toast';
import { companiesService } from '../../services/companiesService';
import { useGetAllCalculationsForCompany } from './getAllCalculationsForCompany';

export function useAddQuarterlyToYearlyCalculation(companyId: CompanyId, successCb: () => void) {
  const { getAllCalculations } = useGetAllCalculationsForCompany();
  const {
    mutateAsync: addQuarterlyCalculation,
    isError,
    isLoading,
  } = useMutation('addQuarterlyToYearlyCalculation', (quarterlyData: CompanyQuarterlyDataPayload) => companiesService.addQuarterlyToYearlyCalculation(quarterlyData), {
    onSuccess: async (data) => {
      successCb();
      return getAllCalculations(companyId);
    },
    onError: (err: any) => {
      console.log('dang son', err);
      return Toast.showToast({
        type: 'error',
        text1: 'Error',
        text2: err.message,
      });
    },
  });

  return {
    addQuarterlyCalculation,
    isError,
    isLoading,
  };
}
