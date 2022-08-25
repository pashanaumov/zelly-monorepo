import { CheckIcon } from '@heroicons/react/solid';
import { AllCompanyCalculations, CompanyId } from '@zelly/core/types/Companies/Company';
import { useMemo, useState } from 'react';
import { CompanyQuarterlyCalculationDataModal } from './CompanyQuarterlyCalculationDataModal';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const quarters = ['1', '2', '3', '4'];

interface Props {
  calculation: AllCompanyCalculations;
  companyId: CompanyId;
}

export const CompanyCalculationsDropdownListItem = ({ calculation, companyId }: Props) => {
  const [dataInputModalOpen, setDataInputModalOpen] = useState<boolean>(false);
  const [selectedCalculationId, setSelectedCalculationId] = useState<string | null>(null);

  const availableCalculations = useMemo(() => {
    if (!calculation) return [];
    return quarters.filter((quarter) => !calculation.calculations.map((calc) => calc.quarter).includes(quarter));
  }, [calculation]);

  function closeModal() {
    setDataInputModalOpen(false);
  }

  function openModal(calculationId: string) {
    return () => {
      setSelectedCalculationId(calculationId);
      setDataInputModalOpen(true);
    };
  }

  if (!calculation) {
    return null;
  }

  return (
    <>
      <div className="px-8 py-8">
        <ul role="list">
          {calculation.calculations.map((calculation, eventIdx) => (
            <li key={calculation.id}>
              <div className="relative pb-8">
                <div className="relative flex space-x-3">
                  <div>
                    <span
                      className={classNames(
                        'bg-green-500',
                        'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white'
                      )}
                    >
                      <CheckIcon className="h-5 w-5 text-white" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                    <div>
                      <p className="text-sm text-gray-500">{`Quarter ${calculation.quarter}`} </p>
                    </div>
                    <div className="text-right text-sm whitespace-nowrap text-gray-500">
                      <p>{`ESG: ${calculation.esg}`}</p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-teal-500 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={openModal(calculation.id)}
        >
          Proceed
        </button>
      </div>
      <CompanyQuarterlyCalculationDataModal
        isOpen={dataInputModalOpen}
        closeModal={closeModal}
        calculationId={selectedCalculationId}
        availableCalculations={availableCalculations}
        companyId={companyId}
      />
    </>
  );
};
