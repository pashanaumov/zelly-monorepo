/* This example requires Tailwind CSS v2.0+ */
import { Dialog, Transition } from '@headlessui/react';
import { CompanyId } from '@zelly/core/types/Companies/Company';
import { Fragment, useCallback, useRef, useState } from 'react';
import { useAddQuarterlyToYearlyCalculation } from '@zelly/core/queries/admin/addQuarterlyToYearlyCalculation';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

interface Props {
  isOpen: boolean;
  companyId: CompanyId;
  calculationId: string | null;
  closeModal: () => void;
  availableCalculations: string[];
}

export function CompanyQuarterlyCalculationDataModal({
  isOpen,
  calculationId,
  closeModal,
  availableCalculations,
  companyId,
}: Props) {
  const [quarter, setQuarter] = useState('');
  const [esg, setEsg] = useState('');

  const cancelButtonRef = useRef(null);

  const { addQuarterlyCalculation, isLoading } = useAddQuarterlyToYearlyCalculation(companyId, closeModal);

  const isButtonDisabled = !quarter || !esg || !availableCalculations.includes(quarter);

  const submitData = useCallback(() => {
    if (calculationId && esg && quarter) {
      const data = {
        yearlyCalculationId: calculationId,
        quarterlyCalculationData: {
          esg,
          quarter,
        },
      };

      addQuarterlyCalculation(data);
    }
  }, [addQuarterlyCalculation, calculationId, esg, quarter]);

  if (!calculationId) {
    return null;
  }

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
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
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full sm:p-6">
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                      Add quarterly data
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        You can add calculation for quarters: &nbsp;
                        {availableCalculations.map((quarter, index) => (
                          <Fragment key={index}>{`${quarter}${
                            availableCalculations.at(-1) === quarter ? '' : ','
                          }`}</Fragment>
                        ))}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                      <label htmlFor="quarter" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                        Quarter
                      </label>
                      <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <input
                          type="text"
                          name="quarter"
                          id="quarter"
                          className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                          onChange={(event) => {
                            setQuarter(event.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                      <label htmlFor="esg" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                        ESG
                      </label>
                      <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <input
                          type="text"
                          name="esg"
                          id="esg"
                          className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                          onChange={(event) => {
                            setEsg(event.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className={classNames(
                      'w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2  text-base font-medium text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm',
                      isButtonDisabled ? 'bg-gray-600 hover:bg-gray-800' : 'bg-indigo-600 hover:bg-indigo-700',
                      isButtonDisabled ? 'cursor-not-allowed' : 'cursor-pointer'
                    )}
                    onClick={submitData}
                  >
                    {isLoading ? (
                      <svg
                        role="status"
                        className="inline w-5 h-5 mr-3 text-white animate-spin"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="#E5E7EB"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentColor"
                        />
                      </svg>
                    ) : (
                      'Submit'
                    )}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
