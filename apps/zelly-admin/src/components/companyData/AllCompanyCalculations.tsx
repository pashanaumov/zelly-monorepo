import { PencilIcon, PlusSmIcon as PlusSmIconSolid } from '@heroicons/react/solid';
import { useGetAllCalculationsForCompany } from '@zelly/core/queries/admin/getAllCalculationsForCompany';
import { AllCompanyCalculationsResponse, CompanyId } from '@zelly/core/types/Companies/Company';
import { FC, Suspense, useCallback, useEffect, useState } from 'react';
import Accordion from '../../views/base/accordion/Accordion';
import { CompanyDataAccordion } from './CompanyDataAccordion';

const currentFile = {
  name: 'IMG_4985.HEIC',
  size: '3.9 MB',
  source:
    'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
  information: {
    'Uploaded by': 'Marie Culver',
    Created: 'June 8, 2020',
    'Last modified': 'June 8, 2020',
    Dimensions: '4032 x 3024',
    Resolution: '72 x 72',
  },
  sharedWith: [
    {
      id: 1,
      name: 'Aimee Douglas',
      imageUrl:
        'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=1024&h=1024&q=80',
    },
    {
      id: 2,
      name: 'Andrea McMillan',
      imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=oilqXxSqey&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  ],
};

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
