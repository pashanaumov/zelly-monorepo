import { CreateCompanyPayload } from '@zelly/core/types/Companies/Company';
import { useMutation } from 'react-query';
import Toast from '../../components/Toast';
import { companiesService } from '../../services/companiesService';

export function useAddNewCompany(successCb: () => void) {
  const { mutateAsync: addNewCompany, isLoading } = useMutation('addNewCompany', (dataPayload: CreateCompanyPayload) => companiesService.createCompany(dataPayload), {
    onSuccess: (data) => {
      Toast.showToast({
        type: 'success',
        text1: 'Success',
        text2: 'Company has been created',
      });
      successCb();
      return;
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
    addNewCompany,
    isLoading,
  };
}
