import { CompanyProperties } from '@zelly/core/types/Companies/Company';
import { useEditCompany } from '@zelly/core/queries/admin/editCompany';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { CompaniesListDropdownList } from '../../components/shared/CompaniesListDropdownList';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export const EditCompany = () => {
  const { editCompany, isLoading } = useEditCompany();

  const [selectedCompany, setSelectedCompany] = useState<CompanyProperties | null>(null);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      companyNameEnglish: (selectedCompany && selectedCompany?.companyNameEnglish) || '',
      companyCountry: (selectedCompany && selectedCompany?.companyCountry) || '',
      industry: (selectedCompany && selectedCompany?.companyCountry) || '',
      quasiESGOwner: (selectedCompany && selectedCompany?.quasiESGOwner) || '',
      lastCO2Number: (selectedCompany && selectedCompany?.lastCO2Number) || '',
      climateAgendaWebLink: (selectedCompany && selectedCompany?.climateAgendaWebLink) || '',
    },
    onSubmit: async (values) => {
      if (selectedCompany && selectedCompany.id) {
        editCompany({ ...values, id: selectedCompany.id });
      }
    },
  });

  const { companyNameEnglish, industry, quasiESGOwner, climateAgendaWebLink, companyCountry } = formik.values;

  const buttonDisabled = !companyNameEnglish || !industry || !quasiESGOwner || !climateAgendaWebLink || !companyCountry;

  return (
    <div className="w-auto flex flex-row justify-between scroll">
      <div className="mb-32 w-full overflow-y-auto">
        <CompaniesListDropdownList onSetSelectedCompany={setSelectedCompany} />
        <form onSubmit={formik.handleSubmit} className="space-y-8 divide-y divide-gray-200">
          <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
            <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
              <div className="relative flex py-5 items-center">
                <div className="flex-grow border-t border-gray-400"></div>
                <span className="flex-shrink mx-4 text-gray-400">Edit company</span>
                <div className="flex-grow border-t border-gray-400"></div>
              </div>

              <div className="space-y-6 sm:space-y-5">
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="companyNameEnglish"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Company name
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      name="companyNameEnglish"
                      id="companyNameEnglish"
                      autoComplete="given-name"
                      className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      onChange={formik.handleChange}
                      value={formik.values.companyNameEnglish}
                      required={true}
                    />
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label htmlFor="companyCountry" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Company country
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      name="companyCountry"
                      id="companyCountry"
                      autoComplete="given-name"
                      className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      onChange={formik.handleChange}
                      value={formik.values.companyCountry}
                      required={true}
                    />
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label htmlFor="industry" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Industry
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      name="industry"
                      id="industry"
                      className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      onChange={formik.handleChange}
                      value={formik.values.industry}
                      required={true}
                    />
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label htmlFor="quasiESGOwner" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Quasi ESG Owner
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      id="quasiESGOwner"
                      name="quasiESGOwner"
                      type="text"
                      className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      onChange={formik.handleChange}
                      value={formik.values.quasiESGOwner}
                      required={true}
                    />
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label htmlFor="lastCO2Number" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Last C0<sub>2</sub> number
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      name="lastCO2Number"
                      id="lastCO2Number"
                      className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      onChange={formik.handleChange}
                      value={formik.values.lastCO2Number}
                      required={true}
                    />
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="climateAgendaWebLink"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Climate Agenda Web Link
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      name="climateAgendaWebLink"
                      id="climateAgendaWebLink"
                      className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      onChange={formik.handleChange}
                      value={formik.values.climateAgendaWebLink}
                      required={true}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-gray-400"></div>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>
          <button
            disabled={buttonDisabled}
            type="submit"
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
        </form>
      </div>
    </div>
  );
};
