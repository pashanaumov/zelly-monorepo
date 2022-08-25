import { useGetAllCalculationsForCompany } from '@zelly/core/queries/admin/getAllCalculationsForCompany';
import { AllCompanyCalculationsResponse, CompanyId } from '@zelly/core/types/Companies/Company';
import { FC, useCallback, useEffect, useState } from 'react';
import { CompanyDataAccordion } from './CompanyDataAccordion';

interface Props {
  companyId: CompanyId | null;
}

export const AllCompanyCalculations: FC<Props> = ({ companyId }) => {
  const { getAllCalculations, isError, isLoading } = useGetAllCalculationsForCompany();

  const [companyCalculations, setCompanyCalculations] = useState<AllCompanyCalculationsResponse | null>(null);

  const fetchAndAssignCalculations = useCallback(() => {
    if (companyId) {
      getAllCalculations(companyId).then((calculations) => {
        if (calculations.length > 0) {
          setCompanyCalculations(calculations);
        }
      });
    }
  }, [companyId, getAllCalculations]);

  useEffect(() => {
    fetchAndAssignCalculations();
  }, [fetchAndAssignCalculations]);

  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!companyCalculations) {
    return <></>;
  }

  return (
    <aside className="hidden w-96 bg-white p-8 border-l border-gray-200 lg:block overflow-y-scroll">
      <div className="pb-16 space-y-6">
        <div>
          <h3 className="font-medium text-gray-900">Years</h3>
          <dl className="mt-2 border-t border-b border-gray-200 divide-y divide-gray-200">
            {companyCalculations.map((calculation) => {
              return (
                <div className="py-3" key={calculation.id}>
                  <h3>{calculation.year}</h3>
                  {Object.keys(calculation).map((key) => {
                    if (key !== 'calculations') {
                      return (
                        <div key={key} className="py-3 flex justify-between text-sm font-medium">
                          <dt className="text-gray-500">{key}</dt>
                          {/* @ts-ignore */}
                          <dd className="text-gray-900">{calculation[key]}</dd>
                        </div>
                      );
                    }
                    return null;
                  })}
                  <CompanyDataAccordion calculations={calculation.calculations} />
                </div>
              );
            })}
          </dl>
        </div>
      </div>
    </aside>
  );
};
