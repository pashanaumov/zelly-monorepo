import { Disclosure } from '@headlessui/react';
import { BellIcon } from '@heroicons/react/outline';
import { sagaActions } from '@zelly/core/redux/sagas/sagaActions';
import { RootState } from '@zelly/core/redux/storeWeb';
import AOS from 'aos';
import { PropsWithChildren, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Header from './screens/Landing/partials/Header';

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};

const navigation = [
  { name: 'Dashboard', href: '/dashboard', current: false },
  { name: 'Companies', href: '/companies', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false },
  { name: 'Reports', href: '#', current: false },
];

const userNavigation = [
  { name: 'Your Profile', href: '/dashboard' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export function AppLayout({ children }: PropsWithChildren<{}>) {
  const dispatch = useDispatch();
  const location = useLocation();

  const removeHeader =
    location.pathname === '/login' || location.pathname === '/register';

  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 700,
      easing: 'ease-out-cubic',
    });
  });

  useEffect(() => {
    // @ts-ignore
    document.querySelector('html').style.scrollBehavior = 'auto';
    window.scroll({ top: 0 });
    // @ts-ignore
    document.querySelector('html').style.scrollBehavior = '';
  }, [location.pathname]); // triggered on route change

  async function onLogout() {
    dispatch({ type: sagaActions.LOGOUT_USER });
  }

  if (removeHeader) {
    return <div>{children}</div>;
  }

  return (
    <div className="min-h-full">
      {/*{userToken ? (*/}
      <div className="rounded-lg bg-gradient-to-bl bg-gradient-to-tl from-sky-400 to-blue-500 pb-32">
        <Disclosure
          as="nav"
          className="bg-gradient-to-r from-green-400 to-blue-500 border-indigo-300 border-opacity-25 lg:border-none">
          {({ open }) => (
            <>
              <Header />
              <Disclosure.Panel className="lg:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? 'bg-indigo-700 text-white'
                          : 'text-white hover:bg-indigo-500 hover:bg-opacity-75',
                        'block rounded-md py-2 px-3 text-base font-medium',
                      )}
                      aria-current={item.current ? 'page' : undefined}>
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="pt-4 pb-3 border-t border-indigo-700">
                  <div className="px-5 flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="rounded-full h-10 w-10"
                        src={user.imageUrl}
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-white">
                        {user.name}
                      </div>
                      <div className="text-sm font-medium text-indigo-300">
                        {user.email}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="ml-auto bg-indigo-600 flex-shrink-0 rounded-full p-1 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white">
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-3 px-2 space-y-1">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-md py-2 px-3 text-base font-medium text-white hover:bg-indigo-500 hover:bg-opacity-75">
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <header className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"></div>
        </header>
      </div>
      {/*) : null}*/}

      <main className="-mt-32">
        <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
            {children}
          </div>
        </div>
      </main>
      <footer>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
          <div className="border-t border-gray-200 py-8 text-sm text-gray-500 text-center sm:text-left">
            <span className="block sm:inline">
              &copy; {new Date().getFullYear()} Zelly LLC.
            </span>{' '}
            <span className="block sm:inline">All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
