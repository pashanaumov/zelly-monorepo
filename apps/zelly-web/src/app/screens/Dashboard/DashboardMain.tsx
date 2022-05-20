import {
  CalculatorIcon,
  ChatIcon,
  InformationCircleIcon,
  TrendingUpIcon,
} from '@heroicons/react/outline';
import React from 'react';
import { useUserInfo } from '@zelly/core/hooks/useUserInfo';
import { Link } from 'react-router-dom';
import { Avatar } from '../../components/common/Avatar/Avatar';
import { UserFollowingCompaniesWidget } from './components/UserFollowingCompaniesWidget';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const stats = [
  { label: '１', value: 'Personal Data' },
  { label: '𝟸', value: 'Personal Data' },
  { label: '３', value: 'Personal Data' },
];

const actions = [
  {
    icon: CalculatorIcon,
    name: 'Calculate footprint',
    href: '#',
    iconForeground: 'text-teal-700',
    iconBackground: 'bg-teal-50',
  },
  {
    icon: InformationCircleIcon,
    name: 'Companies',
    href: '/companies',
    iconForeground: 'text-purple-700',
    iconBackground: 'bg-purple-50',
  },
  {
    icon: ChatIcon,
    name: 'Forums and discussions',
    href: '#',
    iconForeground: 'text-sky-700',
    iconBackground: 'bg-sky-50',
  },
  {
    icon: TrendingUpIcon,
    name: 'User trends',
    href: '#',
    iconForeground: 'text-yellow-700',
    iconBackground: 'bg-yellow-50',
  },
];

const announcements = [
  {
    id: 1,
    title: 'Office closed on July 2nd',
    href: '#',
    preview:
      'Cum qui rem deleniti. Suscipit in dolor veritatis sequi aut. Vero ut earum quis deleniti. Ut a sunt eum cum ut repudiandae possimus. Nihil ex tempora neque cum consectetur dolores.',
  },
  {
    id: 2,
    title: 'New password policy',
    href: '#',
    preview:
      'Alias inventore ut autem optio voluptas et repellendus. Facere totam quaerat quam quo laudantium cumque eaque excepturi vel. Accusamus maxime ipsam reprehenderit rerum id repellendus rerum. Culpa cum vel natus. Est sit autem mollitia.',
  },
  {
    id: 3,
    title: 'Office closed on July 2nd',
    href: '#',
    preview:
      'Tenetur libero voluptatem rerum occaecati qui est molestiae exercitationem. Voluptate quisquam iure assumenda consequatur ex et recusandae. Alias consectetur voluptatibus. Accusamus a ab dicta et. Consequatur quis dignissimos voluptatem nisi.',
  },
];

export const DashboardMain = () => {
  const { username } = useUserInfo();
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <h1 className="sr-only">Profile</h1>
      {/* Main 3 column grid */}
      <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
        {/* Left column */}
        <div className="grid grid-cols-1 gap-4 lg:col-span-2">
          {/* Welcome panel */}
          <section aria-labelledby="profile-overview-title">
            <div className="rounded-lg bg-white overflow-hidden shadow">
              <h2 className="sr-only" id="profile-overview-title">
                Profile Overview
              </h2>
              <div className="bg-white p-6">
                <div className="sm:flex sm:items-center sm:justify-between">
                  <div className="sm:flex sm:space-x-5">
                    <div className="flex-shrink-0">
                      <Avatar />
                    </div>
                    <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                      <p className="text-sm font-medium text-gray-600">
                        Welcome back,
                      </p>
                      <p className="text-xl font-bold text-gray-900 sm:text-2xl">
                        {username}
                      </p>
                      <p className="text-sm font-medium text-gray-600">
                        <p>
                          CO<sub>2</sub> с начала года: 20кг
                        </p>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-200 bg-gray-50 grid grid-cols-1 divide-y divide-gray-200 sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="px-6 py-5 text-sm font-medium text-center">
                    <span className="text-gray-900">{stat.value}</span>{' '}
                    <span className="text-gray-600">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Actions panel */}
          <section aria-labelledby="quick-links-title">
            <div className="rounded-lg bg-gray-200 overflow-hidden shadow divide-y divide-gray-200 sm:divide-y-0 sm:grid sm:grid-cols-2 sm:gap-px">
              <h2 className="sr-only" id="quick-links-title">
                Quick links
              </h2>
              {actions.map((action, actionIdx) => (
                <div
                  key={action.name}
                  className={classNames(
                    actionIdx === 0
                      ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none'
                      : '',
                    actionIdx === 1 ? 'sm:rounded-tr-lg' : '',
                    actionIdx === actions.length - 2 ? 'sm:rounded-bl-lg' : '',
                    actionIdx === actions.length - 1
                      ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none'
                      : '',
                    'relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-cyan-500',
                  )}>
                  <div>
                    <span
                      className={classNames(
                        action.iconBackground,
                        action.iconForeground,
                        'rounded-lg inline-flex p-3 ring-4 ring-white',
                      )}>
                      <action.icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="mt-8">
                    <h3 className="text-lg font-medium">
                      <Link to={action.href}>
                        <a href={'#'} className="focus:outline-none">
                          {/* Extend touch target to entire panel */}
                          <span
                            className="absolute inset-0"
                            aria-hidden="true"
                          />
                          {action.name}
                        </a>
                      </Link>
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">
                      Doloribus dolores nostrum quia qui natus officia quod et
                      dolorem. Sit repellendus qui ut at blanditiis et quo et
                      molestiae.
                    </p>
                  </div>
                  <span
                    className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                    aria-hidden="true">
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24">
                      <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                    </svg>
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right column */}
        <div className="grid grid-cols-1 gap-4">
          {/* Announcements */}
          <section aria-labelledby="announcements-title">
            <div className="rounded-lg bg-white overflow-hidden shadow">
              <div className="p-6">
                <h2
                  className="text-base font-medium text-gray-900"
                  id="announcements-title">
                  Last footprint calculations
                </h2>
                <div className="flow-root mt-6">
                  <ul role="list" className="-my-5 divide-y divide-gray-200">
                    {announcements.map((announcement) => (
                      <li key={announcement.id} className="py-5">
                        <div className="relative focus-within:ring-2 focus-within:ring-cyan-500">
                          <h3 className="text-sm font-semibold text-gray-800">
                            <a
                              href={announcement.href}
                              className="hover:underline focus:outline-none">
                              {/* Extend touch target to entire panel */}
                              <span
                                className="absolute inset-0"
                                aria-hidden="true"
                              />
                              {announcement.title}
                            </a>
                          </h3>
                          <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                            {announcement.preview}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6">
                  <Link to="about">
                    <a
                      href="#"
                      className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                      View all
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Компании за которыми Вы следите */}
          <section aria-labelledby="recent-hires-title">
            <div className="rounded-lg bg-white overflow-hidden shadow">
              <div className="p-6">
                <h2
                  className="text-base font-medium text-gray-900"
                  id="recent-hires-title">
                  You follow
                </h2>
                <UserFollowingCompaniesWidget />
                <div className="mt-6">
                  <Link
                    to={'/companies'}
                    className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    View all
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
