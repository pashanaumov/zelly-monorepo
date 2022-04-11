import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '@zelly/core/redux/storeWeb';
import { MainHeader } from './MainHeader';
import db from '@zelly/core/firebase.config';

interface User {
  age: number;
  jobTitle: string;
  name: string;
  userId: number;
}

export const MainContent: FC = () => {
  const user = useSelector((state: RootState) => state.user.user);

  if (!user) {
    return <Link to="/login">Login</Link>;
  }

  return (
    <>
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block"> {user.email}</span>
            <span className="block text-indigo-600">UserId: {user.id}</span>

            <span className="block text-indigo-600">
              Country: {user.country}
            </span>
            <span className="block text-indigo-600">
              Language: {user.language}
            </span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div
              className="inline-flex rounded-md shadow"
              onClick={() => alert('fick')}>
              <a
                href="#"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                Get started
              </a>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <a
                href="#"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50">
                Learn more
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
