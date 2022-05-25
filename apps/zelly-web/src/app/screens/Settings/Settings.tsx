import { Switch } from '@headlessui/react';
import Toast from '@zelly/core/components/Toast';
import { useUserInfo } from '@zelly/core/hooks/useUserInfo';
import { useChangeUserEmail } from '@zelly/core/queries/auth/useChangeUserEmail';
import { ChangeEvent, useRef, useState } from 'react';
import { ChangePasswordModal } from './ChangePasswordModal';

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

export function Settings() {
  const { email } = useUserInfo();

  const { mutateAsync, isLoading } = useChangeUserEmail(() =>
    showSuccessAlert(),
  );

  const [availableToHire, setAvailableToHire] = useState(true);
  const [privateAccount, setPrivateAccount] = useState(false);

  const initEmail = useRef(email).current;
  const [userEmail, setUserEmail] = useState<string>(initEmail);

  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState(false);

  function openPasswordChangeModal() {
    setIsChangePasswordModalOpen(true);
  }

  function changeUserEmail(event: ChangeEvent<HTMLInputElement>) {
    setUserEmail(event.target.value);
  }

  function showSuccessAlert() {
    return Toast.showToast({
      type: 'success',
      text1: 'Success',
      text2: 'Successfully updated settings',
    });
  }

  async function updateUserEmail() {
    return await mutateAsync(userEmail);
  }

  const saveButtonDisabled = userEmail === initEmail;

  return (
    <>
      <div>
        <main className="relative">
          <div className="max-w-screen-xl mx-auto pb-6 px-4 sm:px-6 lg:pb-16 lg:px-8">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
                <form
                  className="divide-y divide-gray-200 lg:col-span-9"
                  action="#"
                  method="POST">
                  {/* Profile section */}
                  <div className="py-6 px-4 sm:p-6 lg:pb-8">
                    <div>
                      <h2 className="text-lg leading-6 font-medium text-gray-900">
                        Profile
                      </h2>
                    </div>

                    <div className="mt-6 flex flex-col lg:flex-row">
                      <div className="flex-grow space-y-6">
                        <div>
                          <label
                            htmlFor="username"
                            className="block text-sm font-medium text-gray-700">
                            Email
                          </label>
                          <div className="mt-1 rounded-md shadow-sm flex">
                            <input
                              onChange={changeUserEmail}
                              type="text"
                              name="username"
                              id="username"
                              autoComplete="username"
                              className="focus:ring-sky-500 focus:border-sky-500 flex-grow block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                              defaultValue={userEmail || ''}
                            />
                          </div>
                        </div>
                        <div>
                          <button
                            onClick={openPasswordChangeModal}
                            type="button"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center cursor-pointer">
                            Change password
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Privacy section */}
                  <div className="pt-6 divide-y divide-gray-200">
                    <div className="px-4 sm:px-6">
                      <div>
                        <h2 className="text-lg leading-6 font-medium text-gray-900">
                          Privacy
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                          Ornare eu a volutpat eget vulputate. Fringilla commodo
                          amet.
                        </p>
                      </div>
                      <ul role="list" className="mt-2 divide-y divide-gray-200">
                        <Switch.Group
                          as="li"
                          className="py-4 flex items-center justify-between">
                          <div className="flex flex-col">
                            <Switch.Label
                              as="p"
                              className="text-sm font-medium text-gray-900"
                              passive>
                              Receive newsletter
                            </Switch.Label>
                            <Switch.Description className="text-sm text-gray-500">
                              Nulla amet tempus sit accumsan. Aliquet turpis sed
                              sit lacinia.
                            </Switch.Description>
                          </div>
                          <Switch
                            checked={availableToHire}
                            onChange={setAvailableToHire}
                            className={classNames(
                              availableToHire ? 'bg-indigo-500' : 'bg-gray-200',
                              'ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500',
                            )}>
                            <span
                              aria-hidden="true"
                              className={classNames(
                                availableToHire
                                  ? 'translate-x-5'
                                  : 'translate-x-0',
                                'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
                              )}
                            />
                          </Switch>
                        </Switch.Group>
                        <Switch.Group
                          as="li"
                          className="py-4 flex items-center justify-between">
                          <div className="flex flex-col">
                            <Switch.Label
                              as="p"
                              className="text-sm font-medium text-gray-900"
                              passive>
                              Receive updates about my companies
                            </Switch.Label>
                            <Switch.Description className="text-sm text-gray-500">
                              Pharetra morbi dui mi mattis tellus sollicitudin
                              cursus pharetra.
                            </Switch.Description>
                          </div>
                          <Switch
                            checked={privateAccount}
                            onChange={setPrivateAccount}
                            className={classNames(
                              privateAccount ? 'bg-indigo-500' : 'bg-gray-200',
                              'ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500',
                            )}>
                            <span
                              aria-hidden="true"
                              className={classNames(
                                privateAccount
                                  ? 'translate-x-5'
                                  : 'translate-x-0',
                                'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
                              )}
                            />
                          </Switch>
                        </Switch.Group>
                      </ul>
                    </div>
                    <div className="mt-4 py-4 px-4 flex justify-end sm:px-6">
                      <button
                        disabled={userEmail === initEmail}
                        onClick={updateUserEmail}
                        type="button"
                        className={classNames(
                          'ml-5',
                          saveButtonDisabled ? 'bg-gray-200' : 'bg-sky-700',
                          'border',
                          'border-transparent',
                          'rounded-md',
                          'shadow-sm',
                          'py-2',
                          'px-4',
                          'inline-flex',
                          'justify-center',
                          'text-sm',
                          'font-medium',
                          'text-white',
                          saveButtonDisabled
                            ? 'hover:bg-gray-200'
                            : 'hover:bg-sky-800',
                          'focus:outline-none',
                          'focus:ring-2',
                          'focus:ring-offset-2',
                          'focus:ring-sky-500',
                        )}>
                        Save
                        {isLoading && loadingSpinner}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
      {isChangePasswordModalOpen && (
        <ChangePasswordModal
          isOpen={isChangePasswordModalOpen}
          setOpen={setIsChangePasswordModalOpen}
        />
      )}
    </>
  );
}
