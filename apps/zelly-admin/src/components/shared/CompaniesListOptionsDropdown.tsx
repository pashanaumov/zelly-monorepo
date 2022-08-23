import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

const dropdownOptions = [
  { name: 'Add yearly calculation', path: '/add_yearly_calculation' },
  { name: 'Add quarterly to yearly', path: '/add_quarterly_calculation' },
];

function classNames(...classes: Array<string>) {
  return classes.filter(Boolean).join(' ');
}

interface Props {
  companyId: string;
  companyName: string;
}

export function CompaniesListOptionsDropdown({ companyId, companyName }: Props) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 z-10">
          Options
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          <div className="py-1 z-50">
            {dropdownOptions.map((dropdownOption) => {
              return (
                <Menu.Item key={dropdownOption.path}>
                  {({ active }) => (
                    <Link
                      to={{
                        pathname: dropdownOption.path,
                      }}
                      state={{ companyId, companyName }}
                    >
                      <p
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block px-4 py-2 text-sm',
                          'cursor-pointer'
                        )}
                      >
                        {dropdownOption.name}
                      </p>
                    </Link>
                  )}
                </Menu.Item>
              );
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
