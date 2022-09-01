import { CreateCompanyPayload } from '@zelly/core/types/Companies/Company';
import { useMutation } from 'react-query';
import Toast from '../../components/Toast';
import { companiesService } from '../../services/companiesService';

export function useEditCompany() {
  const { mutateAsync: editCompany, isLoading } = useMutation(
    'editExistingCompany',
    (dataPayload: CreateCompanyPayload & { id: string }) => companiesService.editCompany(dataPayload),
    {
      onSuccess: (data) => {
        console.log('data', data);

        Toast.showToast({
          type: 'success',
          text1: 'Success',
          text2: 'Company has been edited',
        });

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
    },
  );

  return {
    editCompany,
    isLoading,
  };
}
