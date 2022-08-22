import Toast from '@zelly/core/components/Toast';
import { companiesService } from '@zelly/core/services/companiesService';
import { CompanyAddYearlyDataPayload } from '@zelly/core/types/FootprintCalculations/FootprintCaclulations';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

export function useAddYearlyCalculation() {
  const navigate = useNavigate();

  const { mutateAsync: addYearlyCalculation, isLoading } = useMutation(
    'addYearlyCalculationToCompany',
    (dataPayload: CompanyAddYearlyDataPayload) => companiesService.addYearlyCalculationToCompany(dataPayload),
    {
      onSuccess: () => {
        Toast.showToast({
          type: 'success',
          text1: 'Success',
          text2: 'Company data has been successfully updated',
        });

        setTimeout(() => {
          navigate('/all_companies');
        }, 1200);
      },
      onError: (err: any) => {
        console.log(err);
        return Toast.showToast({
          type: 'error',
          text1: 'Error',
          text2: err.message,
        });
      },
    },
  );

  return {
    addYearlyCalculation,
    isLoading,
  };
}
