/* This example requires Tailwind CSS v2.0+ */
import { Dialog, Transition } from '@headlessui/react';
import { ChangeEvent, Fragment, useState } from 'react';
import { useChangeUserPassword } from '@zelly/core/queries/auth/useChangeUserPassword';

interface Props {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
}

const loadingSpinner = (
  <svg
    role="status"
    className="inline w-4 h-4 mr-3 text-white animate-spin ml-8"
    viewBox="0 0 100 101"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
      fill="#E5E7EB"
    />
    <path
      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
      fill="currentColor"
    />
  </svg>
);

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export function ChangePasswordModal({ isOpen, setOpen }: Props) {
  const { mutateAsync, isLoading } = useChangeUserPassword(() =>
    setOpen(false),
  );

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');

  const [passwordsDontMatchAlert, setPasswordsDontMatchAlert] = useState(false);

  function changeCurrentPassword(event: ChangeEvent<HTMLInputElement>) {
    setCurrentPassword(event.target.value);
  }

  function changeNewPassword(event: ChangeEvent<HTMLInputElement>) {
    setNewPassword(event.target.value);
  }

  function changeRepeatedPassword(event: ChangeEvent<HTMLInputElement>) {
    setRepeatedPassword(event.target.value);
  }

  async function submitUpdatedPassword() {
    if (newPassword !== repeatedPassword) {
      return setPasswordsDontMatchAlert(true);
    }
    return await mutateAsync({
      oldPassword: currentPassword,
      newPassword: repeatedPassword,
    });
  }

  const isSubmitButtonDisabled =
    !currentPassword || !repeatedPassword || !newPassword;

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-30" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <Dialog.Panel className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-sm sm:w-full sm:p-6">
                <div className="mb-6">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900">
                    Your current password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="focus:ring-sky-500 focus:border-sky-500 flex-grow block w-full min-w-0 rounded-r-md sm:text-sm border-gray-300 rounded"
                    required
                    onChange={changeCurrentPassword}
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="repeat-password"
                    className="block mb-2 text-sm font-medium text-gray-900">
                    New password
                  </label>
                  <div className="mt-1 rounded-md shadow-sm flex">
                    <input
                      type="password"
                      id="repeat-password"
                      className="focus:ring-sky-500 focus:border-sky-500 flex-grow block w-full min-w-0 rounded rounded-r-md sm:text-sm border-gray-300"
                      required
                      onChange={changeNewPassword}
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="repeat-new-password"
                    className="block mb-2 text-sm font-medium text-gray-900">
                    Repeat new password
                  </label>
                  <div className="mt-1 rounded-md shadow-sm flex">
                    <input
                      type="password"
                      id="repeat-password"
                      className="focus:ring-sky-500 focus:border-sky-500 flex-grow block w-full min-w-0 rounded rounded-r-md sm:text-sm border-gray-300"
                      required
                      onChange={changeRepeatedPassword}
                    />
                  </div>
                </div>
                <button
                  type="button"
                  disabled={isSubmitButtonDisabled}
                  onClick={submitUpdatedPassword}
                  className={classNames(
                    'text-white',
                    isSubmitButtonDisabled ? 'bg-gray-200' : 'bg-blue-700',
                    isSubmitButtonDisabled
                      ? 'hover:bg-gray-200'
                      : 'hover:bg-blue-800',
                    'focus:ring-1',
                    'focus:outline-none',
                    'focus:ring-blue-300',
                    'font-medium',
                    'rounded-lg',
                    'text-sm',
                    'px-5',
                    'py-2.5',
                    'text-center',
                  )}>
                  Change password
                  {isLoading && loadingSpinner}
                </button>
                {passwordsDontMatchAlert && (
                  <div
                    id="alert-2"
                    className="flex p-4 mb-4 bg-red-100 rounded-lg dark:bg-red-200 mt-6"
                    role="alert">
                    <svg
                      className="flex-shrink-0 w-5 h-5 text-red-700 dark:text-red-800"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clip-rule="evenodd"></path>
                    </svg>
                    <div className="ml-3 text-sm font-medium text-red-700 dark:text-red-800">
                      New passwords don't match!
                      <br />
                      Try again
                    </div>
                    <button
                      onClick={() => setPasswordsDontMatchAlert(false)}
                      type="button"
                      className="ml-auto -mx-1.5 -my-1.5 bg-red-100 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex h-8 w-8 dark:bg-red-200 dark:text-red-600 dark:hover:bg-red-300"
                      data-dismiss-target="#alert-2"
                      aria-label="Close">
                      <span className="sr-only">Close</span>
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          fill-rule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clip-rule="evenodd"></path>
                      </svg>
                    </button>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
