import { Menu, Popover, Transition } from '@headlessui/react';
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import { useUserInfo } from '@zelly/core/hooks/useUserInfo';
import { Fragment } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Avatar } from '../../components/common/Avatar/Avatar';

const user = {
  name: 'Chelsea Hagon',
  email: 'chelseahagon@example.com',
  role: 'Human Resources Manager',
  imageUrl:
    'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};

const userNavigation = [
  { name: 'Your Profile', href: '#', to: '/' },
  { name: 'Settings', href: '/settings', to: '/settings' },
  { name: 'Sign out', href: '#', to: '/' },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export function Dashboard() {
  const { email, username } = useUserInfo();

  return (
    <div className="min-h-full">
      <Outlet />
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
