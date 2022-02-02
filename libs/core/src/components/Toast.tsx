import { toast } from 'react-toastify';

type ToastProps = { type?: string; text1?: string; text2?: string };

const Toast = {
  showToast({ text2 }: ToastProps) {
    toast(text2);
  },
};

export default Toast;
