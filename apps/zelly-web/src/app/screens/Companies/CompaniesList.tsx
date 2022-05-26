import { LoadingPlaceholder } from '@zelly/core/components/LoadingPlaceholder';
import { useFetchCompanies } from '@zelly/core/queries/useFetchCompanies';
import { useUserCompanies } from '@zelly/core/queries/useUserCompanies';
import { CompanyProperties } from '@zelly/core/types/Companies/Company';
import React, { useMemo, useState } from 'react';
import { CompanyInformationModal } from './CompanyInformationModal';
import { AddToFavouritesButton } from './components/AddToFavouritesButton';

export const CompaniesList = () => {
  const [currentCompany, setCurrentCompany] = useState<CompanyProperties>();
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState<boolean>(false);

  const { data: favouriteCompanies } = useUserCompanies();
  const { isLoading, data } = useFetchCompanies();

  const favCompaniesIds = useMemo(() => {
    if (!favouriteCompanies) {
      return {};
    }
    return favouriteCompanies.reduce((prevValue, currentValue) => {
      return {
        ...prevValue,
        [currentValue.id]: currentValue.companyNameEnglish,
      };
    }, {});
  }, [favouriteCompanies]);

  const hasFavouriteCompanies = Object.keys(favCompaniesIds).length;

  function showCompanyModal(company: CompanyProperties) {
    setCurrentCompany(company);
    setIsCompanyModalOpen(true);
  }

  if (isLoading) {
    return <LoadingPlaceholder />;
  }

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Companies</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the companies in the Zelly database including their
              name, industry, country and last CO<sub>2</sub> emission numbers.
            </p>
          </div>
        </div>
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle">
              <div className="overflow-hidden shadow-sm ring-1 ring-black ring-opacity-5">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8">
                        Company name
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Industry
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Country
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        CO<sub>2</sub>
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {data &&
                      data.map((company: CompanyProperties) => (
                        <tr key={company.id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                            <button
                              onClick={() => showCompanyModal(company)}
                              type="button"
                              className="inline-flex items-center px-2.5 py-1.5 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                              {company.companyNameEnglish}
                            </button>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {company.industry}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {company.companyCountry}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {company.lastCO2Number}
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <AddToFavouritesButton
                              key={company.id}
                              companyId={company.id}
                              isFavourite={Boolean(
                                hasFavouriteCompanies &&
                                  company.id in favCompaniesIds,
                              )}
                            />
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CompanyInformationModal
        setIsCompanyModalOpen={setIsCompanyModalOpen}
        isOpen={isCompanyModalOpen}
        currentCompany={currentCompany}
      />
    </>
  );
};
