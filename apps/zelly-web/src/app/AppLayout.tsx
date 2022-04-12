import {Fragment, PropsWithChildren, useEffect} from 'react';
import {Disclosure, Menu, Transition} from '@headlessui/react';
import {SearchIcon} from '@heroicons/react/solid';
import {BellIcon, MenuIcon, XIcon} from '@heroicons/react/outline';
import {useDispatch, useSelector} from 'react-redux';
import {sagaActions} from '@zelly/core/redux/sagas/sagaActions';
import {Link, useLocation} from 'react-router-dom';
import {RootState} from '@zelly/core/redux/storeWeb';

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
};
const navigation = [
  {name: 'Dashboard', href: '/dashboard', current: false},
  {name: 'Companies', href: '/companies', current: false},
  {name: 'Projects', href: '#', current: false},
  {name: 'Calendar', href: '#', current: false},
  {name: 'Reports', href: '#', current: false}
];

const userNavigation = [
  {name: 'Your Profile', href: '/dashboard'},
  {name: 'Settings', href: '#'},
  {name: 'Sign out', href: '#'}
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export function AppLayout({children}: PropsWithChildren<{}>) {
  const dispatch = useDispatch();
  const location = useLocation();

  const userToken = useSelector((state: RootState) => state.auth.authenticated);

  async function onLogout() {
    dispatch({type: sagaActions.LOGOUT_USER});
  }

  return (
    <>
      <div className='min-h-full'>
        {/*{userToken ? (*/}
        <div className='rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 pb-32'>
          <Disclosure
            as='nav'
            className='bg-gradient-to-r from-cyan-500 to-blue-500 border-indigo-300 border-opacity-25 lg:border-none'>
            {({open}) => (
              <>
                <div className='max-w-7xl mx-auto px-2 sm:px-4 lg:px-8'>
                  <div
                    className='relative h-16 flex items-center justify-between lg:border-b lg:border-indigo-400 lg:border-opacity-25'>
                    <div className='px-2 flex items-center lg:px-0'>
                      <div className='flex-shrink-0'>
                        <img
                          className='block h-8 w-8'
                          src='https://tailwindui.com/img/logos/workflow-mark-indigo-300.svg'
                          alt='Workflow'
                        />
                      </div>
                      <div className='hidden lg:block lg:ml-10'>
                        <div className='flex space-x-4'>
                          {userToken ? <>
                            {navigation.map((item) => (
                              <Link to={item.href}>
                                <a
                                  key={item.name}
                                  href={item.href}
                                  className={classNames(
                                    item.current
                                      ? 'bg-indigo-700 text-white'
                                      : 'text-white hover:bg-indigo-500 hover:bg-opacity-75',
                                    'rounded-md py-2 px-3 text-sm font-medium'
                                  )}
                                  aria-current={
                                    item.current ? 'page' : undefined
                                  }>
                                  {item.name}
                                </a>
                              </Link>
                            ))}
                          </> : <div>Login</div>}
                        </div>
                      </div>
                    </div>

                    {userToken &&
                      <>
                        <div className='flex-1 px-2 flex justify-center lg:ml-6 lg:justify-end'>
                          <div className='max-w-lg w-full lg:max-w-xs'>
                            <label htmlFor='search' className='sr-only'>
                              Search
                            </label>
                            <div className='relative text-gray-400 focus-within:text-gray-600'>
                              <div className='pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center'>
                                <SearchIcon
                                  className='h-5 w-5'
                                  aria-hidden='true'
                                />
                              </div>
                              <input
                                id='search'
                                className='block w-full bg-white py-2 pl-10 pr-3 border border-transparent rounded-md leading-5 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white focus:border-white sm:text-sm'
                                placeholder='Search'
                                type='search'
                                name='search'
                              />
                            </div>
                          </div>
                        </div>


                        <div className='flex lg:hidden'>
                          {/* Mobile menu button */}
                          <Disclosure.Button
                            className='bg-indigo-600 p-2 rounded-md inline-flex items-center justify-center text-indigo-200 hover:text-white hover:bg-indigo-500 hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white'>
                            <span className='sr-only'>Open main menu</span>
                            {open ? (
                              <XIcon
                                className='block h-6 w-6'
                                aria-hidden='true'
                              />
                            ) : (
                              <MenuIcon
                                className='block h-6 w-6'
                                aria-hidden='true'
                              />
                            )}
                          </Disclosure.Button>
                        </div>
                        <div className='hidden lg:block lg:ml-4'>
                          <div className='flex items-center'>
                            <button
                              type='button'
                              className='bg-indigo-600 flex-shrink-0 rounded-full p-1 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white'>
                              <span className='sr-only'>View notifications</span>
                              <BellIcon className='h-6 w-6' aria-hidden='true'/>
                            </button>

                            {/* Profile dropdown */}
                            <Menu
                              as='div'
                              className='ml-3 relative flex-shrink-0'>
                              <div>
                                <Menu.Button
                                  className='bg-indigo-600 rounded-full flex text-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white'>
                                  <span className='sr-only'>Open user menu</span>
                                  <img
                                    className='rounded-full h-8 w-8'
                                    src={user.imageUrl}
                                    alt=''
                                  />
                                </Menu.Button>
                              </div>
                              <Transition
                                as={Fragment}
                                enter='transition ease-out duration-100'
                                enterFrom='transform opacity-0 scale-95'
                                enterTo='transform opacity-100 scale-100'
                                leave='transition ease-in duration-75'
                                leaveFrom='transform opacity-100 scale-100'
                                leaveTo='transform opacity-0 scale-95'>
                                <Menu.Items
                                  className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
                                  {userNavigation.map((item) => (
                                    <Menu.Item key={item.name}>
                                      {({active}) => (
                                        <Link
                                          to={item.href}
                                          onClick={
                                            item.name === 'Sign out'
                                              ? onLogout
                                              : () => {
                                              }
                                          }>
                                          <a
                                            href={'#'}
                                            className={classNames(
                                              active ? 'bg-gray-100' : '',
                                              'block py-2 px-4 text-sm text-gray-700'
                                            )}>
                                            {item.name}
                                          </a>
                                        </Link>
                                      )}
                                    </Menu.Item>
                                  ))}
                                </Menu.Items>
                              </Transition>
                            </Menu>
                          </div>
                        </div>
                      </>
                    }
                  </div>
                </div>

                <Disclosure.Panel className='lg:hidden'>
                  <div className='px-2 pt-2 pb-3 space-y-1'>
                    {navigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as='a'
                        href={item.href}
                        className={classNames(
                          item.current
                            ? 'bg-indigo-700 text-white'
                            : 'text-white hover:bg-indigo-500 hover:bg-opacity-75',
                          'block rounded-md py-2 px-3 text-base font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}>
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                  <div className='pt-4 pb-3 border-t border-indigo-700'>
                    <div className='px-5 flex items-center'>
                      <div className='flex-shrink-0'>
                        <img
                          className='rounded-full h-10 w-10'
                          src={user.imageUrl}
                          alt=''
                        />
                      </div>
                      <div className='ml-3'>
                        <div className='text-base font-medium text-white'>
                          {user.name}
                        </div>
                        <div className='text-sm font-medium text-indigo-300'>
                          {user.email}
                        </div>
                      </div>
                      <button
                        type='button'
                        className='ml-auto bg-indigo-600 flex-shrink-0 rounded-full p-1 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white'>
                        <span className='sr-only'>View notifications</span>
                        <BellIcon className='h-6 w-6' aria-hidden='true'/>
                      </button>
                    </div>
                    <div className='mt-3 px-2 space-y-1'>
                      {userNavigation.map((item) => (
                        <Disclosure.Button
                          key={item.name}
                          as='a'
                          href={item.href}
                          className='block rounded-md py-2 px-3 text-base font-medium text-white hover:bg-indigo-500 hover:bg-opacity-75'>
                          {item.name}
                        </Disclosure.Button>
                      ))}
                    </div>
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <header className='py-10'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
              <h1 className='text-3xl font-bold text-white'>
                {location.pathname}
              </h1>
            </div>
          </header>
        </div>
        {/*) : null}*/}

        <main className='-mt-32'>
          <div className='max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8'>
            <div className='bg-white rounded-lg shadow px-5 py-6 sm:px-6'>
              {children}
            </div>
          </div>
        </main>
        <footer>
          <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl'>
            <div className='border-t border-gray-200 py-8 text-sm text-gray-500 text-center sm:text-left'>
              <span className='block sm:inline'>
                &copy; {new Date().getFullYear()} Zelly LLC.
              </span>{' '}
              <span className='block sm:inline'>All rights reserved.</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}