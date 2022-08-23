import { useAddYearlyCalculation } from '@zelly/core/queries/admin/addYearlyCalculation';
import { CompanyId, CompanyName, CompanyProperties } from '@zelly/core/types/Companies/Company';
import { CompanyAddYearlyDataPayload } from '@zelly/core/types/FootprintCalculations/FootprintCaclulations';
import { useCallback, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AllCompanyCalculations } from '../../components/companyData/AllCompanyCalculations';
import { CompaniesListDropdownList } from '../../components/shared/CompaniesListDropdownList';
import { CompanyQuarterlyCalculationData, CompanyYearlyCalculationData } from '../../types/YearlyCalculationData';

type CompanyRoutePayload = {
  companyId: CompanyId;
  companyName: CompanyName;
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export function AddYearlyCalculation() {
  const params = useLocation();

  const { addYearlyCalculation, isLoading } = useAddYearlyCalculation();

  const [selectedCompany, setSelectedCompany] = useState<CompanyProperties | null>(null);

  const routeState: CompanyRoutePayload | null = (params.state as CompanyRoutePayload) || null;

  const [yearlyCalculationData, setYearlyCalculationData] = useState<CompanyYearlyCalculationData>({
    year: '',
    CO2ScopeOne: '',
    CO2ScopeTwo: '',
    CO2ScopeThree: '',
    Methane: '',
    CO2USD: '',
  });

  const [quarterlyEsgData, setQuarterlyEsgData] = useState<CompanyQuarterlyCalculationData>({
    esg: '',
    quarter: '',
  });

  const buttonDisabled =
    Object.values(yearlyCalculationData).includes('') || Object.values(quarterlyEsgData).includes('');

  const currentCompanyId =
    routeState && routeState.companyId ? routeState.companyId : selectedCompany ? selectedCompany.id : null;

  const _setSelectedCompany = useCallback((selectedCompany: CompanyProperties) => {
    setSelectedCompany(selectedCompany);
  }, []);

  const yearlyDataPayload: CompanyAddYearlyDataPayload | null = useMemo(() => {
    if (!buttonDisabled && currentCompanyId) {
      return {
        companyId: currentCompanyId,
        quarterlyCalculationData: quarterlyEsgData,
        yearlyCalculationData,
      };
    }
    return null;
  }, [buttonDisabled, currentCompanyId, quarterlyEsgData, yearlyCalculationData]);

  const submitDataForCalculation = useCallback(() => {
    if (yearlyDataPayload) {
      addYearlyCalculation(yearlyDataPayload);
    }
    return;
  }, [addYearlyCalculation, yearlyDataPayload]);

  return (
    <div className="w-auto flex flex-row justify-between scroll">
      <div className="mb-32 w-full overflow-y-auto">
        {!routeState && <CompaniesListDropdownList onSetSelectedCompany={_setSelectedCompany} />}
        <form className="space-y-8 divide-y divide-gray-200">
          <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
            <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">Company Information</h3>
                {routeState && routeState.companyName && (
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">{routeState?.companyName}</p>
                )}
              </div>

              <div className="relative flex py-5 items-center">
                <div className="flex-grow border-t border-gray-400"></div>
                <span className="flex-shrink mx-4 text-gray-400">General information</span>
                <div className="flex-grow border-t border-gray-400"></div>
              </div>

              <div className="space-y-6 sm:space-y-5">
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Company name
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      name="companyName"
                      id="companyName"
                      autoComplete="given-name"
                      className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                      disabled={true}
                      value={selectedCompany?.companyNameEnglish || (routeState && routeState.companyName) || ''}
                    />
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label htmlFor="year" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Year
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      name="year"
                      id="year"
                      className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                      onChange={(e) => {
                        setYearlyCalculationData((data) => ({
                          ...data,
                          year: e.target.value,
                        }));
                      }}
                    />
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    CO2 Scope One
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      id="co2scope1"
                      name="co2scope1"
                      type="text"
                      className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                      onChange={(e) => {
                        setYearlyCalculationData((data) => ({
                          ...data,
                          CO2ScopeOne: e.target.value,
                        }));
                      }}
                    />
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label htmlFor="co2scopeTwo" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    CO2 Scope Two
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      name="co2scopeTwo"
                      id="co2scopeTwo"
                      className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                      onChange={(e) => {
                        setYearlyCalculationData((data) => ({
                          ...data,
                          CO2ScopeTwo: e.target.value,
                        }));
                      }}
                    />
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label htmlFor="co2ScopeThree" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    CO2 Scope Three
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      name="co2ScopeThree"
                      id="co2ScopeThree"
                      className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                      onChange={(e) => {
                        setYearlyCalculationData((data) => ({
                          ...data,
                          CO2ScopeThree: e.target.value,
                        }));
                      }}
                    />
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label htmlFor="methane" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Methane
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      name="methane"
                      id="methane"
                      className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                      onChange={(e) => {
                        setYearlyCalculationData((data) => ({
                          ...data,
                          Methane: e.target.value,
                        }));
                      }}
                    />
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label htmlFor="co2Usd" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    CO2 to USD
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      name="co2Usd"
                      id="co2Usd"
                      autoComplete="address-level1"
                      className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                      onChange={(e) => {
                        setYearlyCalculationData((data) => ({
                          ...data,
                          CO2USD: e.target.value,
                        }));
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
            <div className="relative flex py-5 items-center">
              <div className="flex-grow border-t border-gray-400"></div>
              <span className="flex-shrink mx-4 text-gray-400">Quarterly information</span>
              <div className="flex-grow border-t border-gray-400"></div>
            </div>
            <div className="space-y-6 sm:space-y-5">
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="esg" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  ESG
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    name="esg"
                    id="esg"
                    autoComplete="given-name"
                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    onChange={(event) => {
                      setQuarterlyEsgData((quarterly) => ({
                        ...quarterly,
                        esg: event.target.value,
                      }));
                    }}
                  />
                </div>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="quarter" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Quarter
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    name="quarter"
                    id="quarter"
                    autoComplete="given-name"
                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    onChange={(event) => {
                      setQuarterlyEsgData((quarterly) => ({
                        ...quarterly,
                        quarter: event.target.value,
                      }));
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
        <div className="relative flex py-5 items-center">
          <div className="flex-grow border-t border-gray-400"></div>
          <div className="flex-grow border-t border-gray-400"></div>
        </div>
        <button
          disabled={buttonDisabled}
          type="button"
          onClick={submitDataForCalculation}
          className={classNames(
            'items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-center content-center w-full',
            buttonDisabled ? 'bg-gray-600 hover:bg-gray-800' : 'bg-indigo-600 hover:bg-indigo-700',
            'cursor-not-allowed'
          )}
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

      <div className="w-auto flex flex-row justify-end ml-8">
        <AllCompanyCalculations companyId={currentCompanyId} />
      </div>
    </div>
  );
}
