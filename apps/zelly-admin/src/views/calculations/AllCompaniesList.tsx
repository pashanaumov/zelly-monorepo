import { useFetchCompanies } from '@zelly/core/queries/useFetchCompanies';
import { CompaniesListOptionsDropdown } from '../../components/shared/CompaniesListOptionsDropdown';

const tableHeading = ['id', 'Company name', 'Company country', 'Industry', 'Last CO2', 'Options'];

export const AllCompaniesList = () => {
  const { isLoading, data } = useFetchCompanies();

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">All companies</h1>
          <p className="mt-2 text-sm text-gray-700">All companies in Zelly's database</p>
        </div>
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle">
              <div className="overflow-hidden shadow-sm ring-1 ring-black ring-opacity-5">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      {tableHeading.map((heading) => {
                        return (
                          <th
                            key={heading}
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            {heading}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {data &&
                      data.map((companyData) => (
                        <tr key={companyData.id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                            {companyData.id}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {companyData.companyNameEnglish}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {companyData.companyCountry}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{companyData.industry}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {companyData.lastCO2Number}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <CompaniesListOptionsDropdown
                              companyId={companyData.id}
                              companyName={companyData.companyNameEnglish}
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
      )}
    </div>
  );
};
