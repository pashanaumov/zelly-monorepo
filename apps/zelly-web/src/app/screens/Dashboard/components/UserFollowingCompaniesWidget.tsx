import { useUserCompanies } from '@zelly/core/queries/useUserCompanies';
import { CompanyProperties } from '@zelly/core/types/Companies/Company';
import { useMemo, useState } from 'react';
import { CompanyInformationModal } from '../../Companies/CompanyInformationModal';

export const UserFollowingCompaniesWidget = () => {
  const { data } = useUserCompanies();

  const [currentCompany, setCurrentCompany] = useState<CompanyProperties>();
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState<boolean>(false);

  function showCompanyModal(company: CompanyProperties) {
    setCurrentCompany(company);
    setIsCompanyModalOpen(true);
  }

  const displayData = useMemo(() => (data ? data?.slice(0, 3) : []), [data]);

  return (
    <>
      <div className="flow-root mt-6">
        <ul role="list" className="-my-5 divide-y divide-gray-200">
          {displayData.map((company) => (
            <li key={company.id} className="py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-gray-500">
                    <span className="text-xl font-medium leading-none text-white">
                      {company.companyNameEnglish[0]}
                    </span>
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {company.companyNameEnglish}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {company.industry}
                  </p>
                </div>
                <div>
                  <button
                    onClick={() => showCompanyModal(company)}
                    className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50">
                    View
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <CompanyInformationModal
        setIsCompanyModalOpen={setIsCompanyModalOpen}
        isOpen={isCompanyModalOpen}
        currentCompany={currentCompany}
      />
    </>
  );
};
