import { Dialog, Menu, Transition } from '@headlessui/react';
import {
  BadgeCheckIcon,
  DotsVerticalIcon,
  XIcon,
} from '@heroicons/react/outline';
import { useFollowCompany } from '@zelly/core/queries/useFollowCompany';
import { useUnfollowCompany } from '@zelly/core/queries/useUnfollowCompany';
import { useUserCompanies } from '@zelly/core/queries/useUserCompanies';
import {
  CompanyId,
  CompanyProperties,
} from '@zelly/core/types/Companies/Company';
import { FC, Fragment, useMemo } from 'react';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

interface Props {
  isOpen: boolean;
  currentCompany: CompanyProperties | undefined;
  setIsCompanyModalOpen: (isOpen: boolean) => void;
}

export const CompanyInformationModal: FC<Props> = ({
  isOpen,
  setIsCompanyModalOpen,
  currentCompany,
}) => {
  const { mutateFollow } = useFollowCompany();
  const { mutateUnfollow } = useUnfollowCompany();

  const { data: favouriteCompanies } = useUserCompanies();

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

  const isFavourite = Boolean(
    hasFavouriteCompanies &&
      currentCompany &&
      currentCompany.id in favCompaniesIds,
  );

  function addToFavorites(companyId: CompanyId) {
    mutateFollow(companyId);
  }

  function removeFromFavorites(companyId: CompanyId) {
    mutateUnfollow(companyId);
  }

  if (!currentCompany) {
    return <></>;
  }

  const avatarInitials = currentCompany.companyNameEnglish
    .split(' ')
    .map((n, i, a) => (i === 0 || i + 1 === a.length ? n[0] : null))
    .join('');

  const followButton = isFavourite ? (
    <button
      onClick={() => removeFromFavorites(currentCompany.id)}
      type="button"
      className="inline-flex items-center px-32 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
      Following
      <BadgeCheckIcon className="ml-2 -mr-0.5 h-4 w-4" aria-hidden="true" />
    </button>
  ) : (
    <button
      onClick={() => addToFavorites(currentCompany.id)}
      type="button"
      className="inline-flex items-center px-32 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
      Follow
    </button>
  );

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-hidden z-30"
        onClose={setIsCompanyModalOpen}>
        <div className="absolute inset-0 overflow-hidden">
          <Dialog.Overlay className="bg-zinc-900/80 absolute inset-0" />

          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full">
              <div className="pointer-events-auto w-screen max-w-2xl">
                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                  <div className="px-4 py-6 sm:px-6">
                    <div className="flex items-start justify-between">
                      <Dialog.Title className="text-lg font-medium text-gray-900">
                        {' '}
                        Company Profile{' '}
                      </Dialog.Title>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500"
                          onClick={() => setIsCompanyModalOpen(false)}>
                          <span className="sr-only">Close panel</span>
                          <XIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* Main */}
                  <div className="divide-y divide-gray-200">
                    <div className="pb-6">
                      <div className="h-24 bg-indigo-700 sm:h-20 lg:h-28" />
                      <div className="lg:-mt-15 -mt-12 flow-root px-4 sm:-mt-8 sm:flex sm:items-end sm:px-6">
                        <div>
                          <div className="-m-1 flex">
                            <div className="inline-flex overflow-hidden rounded-lg">
                              <span className="inline-flex items-center justify-center h-44 w-44 rounded-md bg-gray-500">
                                <span className="text-6xl font-lg leading-none text-white">
                                  {avatarInitials}
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-6 sm:ml-6 sm:flex-1">
                          <div>
                            <div className="flex items-center">
                              <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">
                                {currentCompany.companyNameEnglish}
                              </h3>
                              <span className="ml-2.5 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-green-400">
                                <span className="sr-only">Online</span>
                              </span>
                            </div>
                            <p className="text-sm text-gray-500">
                              @ashleyporter
                            </p>
                          </div>
                          <div className="mt-5 flex flex-wrap space-y-3 sm:space-y-0 sm:space-x-3">
                            {followButton}
                            <span className="ml-3 inline-flex sm:ml-0">
                              <Menu
                                as="div"
                                className="relative inline-block text-left">
                                <Menu.Button className="inline-flex items-center rounded-md border border-gray-300 bg-white p-2 text-sm font-medium text-gray-400 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                  <span className="sr-only">
                                    Open options menu
                                  </span>
                                  <DotsVerticalIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </Menu.Button>
                                <Transition
                                  as={Fragment}
                                  enter="transition ease-out duration-100"
                                  enterFrom="transform opacity-0 scale-95"
                                  enterTo="transform opacity-100 scale-100"
                                  leave="transition ease-in duration-75"
                                  leaveFrom="transform opacity-100 scale-100"
                                  leaveTo="transform opacity-0 scale-95">
                                  <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="py-1">
                                      <Menu.Item>
                                        {({ active }) => (
                                          <a
                                            href="#"
                                            className={classNames(
                                              active
                                                ? 'bg-gray-100 text-gray-900'
                                                : 'text-gray-700',
                                              'block px-4 py-2 text-sm',
                                            )}>
                                            View profile
                                          </a>
                                        )}
                                      </Menu.Item>
                                      <Menu.Item>
                                        {({ active }) => (
                                          <a
                                            href="#"
                                            className={classNames(
                                              active
                                                ? 'bg-gray-100 text-gray-900'
                                                : 'text-gray-700',
                                              'block px-4 py-2 text-sm',
                                            )}>
                                            Copy profile link
                                          </a>
                                        )}
                                      </Menu.Item>
                                    </div>
                                  </Menu.Items>
                                </Transition>
                              </Menu>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-5 sm:px-0 sm:py-0">
                      <dl className="space-y-8 sm:space-y-0 sm:divide-y sm:divide-gray-200">
                        <div className="sm:flex sm:px-6 sm:py-5">
                          <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                            Bio
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 sm:ml-6">
                            <p>
                              Enim feugiat ut ipsum, neque ut. Tristique mi id
                              elementum praesent. Gravida in tempus feugiat
                              netus enim aliquet a, quam scelerisque. Dictumst
                              in convallis nec in bibendum aenean arcu.
                            </p>
                          </dd>
                        </div>
                        <div className="sm:flex sm:px-6 sm:py-5">
                          <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                            Location
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 sm:ml-6">
                            {currentCompany.companyCountry}
                          </dd>
                        </div>
                        <div className="sm:flex sm:px-6 sm:py-5">
                          <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                            Industry
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 sm:ml-6">
                            {currentCompany.industry}
                          </dd>
                        </div>
                        <div className="sm:flex sm:px-6 sm:py-5">
                          <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                            Last CO<sub>2</sub>
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 sm:ml-6">
                            {currentCompany.lastCO2Number}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
