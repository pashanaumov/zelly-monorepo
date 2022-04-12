import React, {useMemo} from 'react';
import {useMutation} from 'react-query';
import {userService} from '@zelly/core/services/userService';
import {useFetchCompanies} from '@zelly/core/queries/useFetchCompanies';
import {useUserCompanies} from '@zelly/core/queries/useUserCompanies';
import {LoadingPlaceholder} from '@zelly/core/components/LoadingPlaceholder';
import {CompanyId, CompanyProperties} from '@zelly/core/types/Companies/Company';
import {AddToFavouritesButton} from "./components/AddToFavouritesButton";


export const CompaniesList = () => {
    const {
      data: favouriteCompanies, isLoading: isFavouritesCompaniesLoading, refetch
    } = useUserCompanies();

    const {isLoading, data} = useFetchCompanies();

    const favCompaniesIds = useMemo(() => {
      if (!favouriteCompanies) {
        return {}
      }
      return favouriteCompanies.reduce((prevValue, currentValue) => {
        return {
          ...prevValue,
          [currentValue.id]: currentValue.companyNameEnglish
        }
      }, {})
    }, [favouriteCompanies])

    const hasFavouriteCompanies = Object.keys(favCompaniesIds).length;

    const {
      mutateAsync,
      isLoading: isMutationLoading
    } = useMutation('addCompanyToUser', (company: CompanyId) => userService.linkCompanyToUser(company), {
      onSuccess: (data: CompanyProperties[]) => {
        refetch();
      },
      onError: (err) => {
        console.log(err);
      },
    });


    function addToFavorites
    (companyId: CompanyId) {
      mutateAsync(companyId)
    }

    if (isLoading) {
      return <LoadingPlaceholder/>;
    }

    return (
      <div className='px-4 sm:px-6 lg:px-8'>
        <div className='sm:flex sm:items-center'>
          <div className='sm:flex-auto'>
            <h1 className='text-xl font-semibold text-gray-900'>Users</h1>
            <p className='mt-2 text-sm text-gray-700'>
              A list of all the users in your account including their name, title,
              email and role.
            </p>
          </div>
          <div className='mt-4 sm:mt-0 sm:ml-16 sm:flex-none'>
            <button
              type='button'
              className='inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto'
              onClick={() => {
              }}>
              Add user
            </button>
          </div>
        </div>
        <div className='mt-8 flex flex-col'>
          <div className='-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8'>
            <div className='inline-block min-w-full py-2 align-middle'>
              <div className='overflow-hidden shadow-sm ring-1 ring-black ring-opacity-5'>
                <table className='min-w-full divide-y divide-gray-300'>
                  <thead className='bg-gray-50'>
                  <tr>
                    <th
                      scope='col'
                      className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8'>
                      Company name
                    </th>
                    <th
                      scope='col'
                      className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'>
                      Industry
                    </th>
                    <th
                      scope='col'
                      className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'>
                      Country
                    </th>
                    <th
                      scope='col'
                      className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'>
                      CO<sub>2</sub>
                    </th>
                    <th
                      scope='col'
                      className='relative py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8'>
                      <span className='sr-only'>Edit</span>
                    </th>
                  </tr>
                  </thead>
                  <tbody className='divide-y divide-gray-200 bg-white'>
                  {data &&
                    data.map((company: CompanyProperties) => (
                      <tr key={company.id}>
                        <td
                          className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8'>
                          {company.companyNameEnglish}
                        </td>
                        <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                          {company.industry}
                        </td>
                        <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                          {company.companyCountry}
                        </td>
                        <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                          {company.lastCO2Number}
                        </td>
                        <td
                          className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          {isMutationLoading ? <p>Loading...</p> :
                            <AddToFavouritesButton companyId={company.id} onAddToFavourites={addToFavorites}
                                                   isFavourite={Boolean(hasFavouriteCompanies && company.id in favCompaniesIds)}/>}
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
    );
  }
;