/* eslint-disable react/jsx-no-useless-fragment */
import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@zelly/core/redux/storeWeb';
import { UserLanguage } from '@zelly/core/types/Utility/User';
import {
  RegisterUserPayload,
  runRegisterUser,
} from '@zelly/core/redux/sagas/registerSaga';
import {
  SelectOption,
} from '../../components/common/SelectMenu/SelectMenu';
import { Link } from 'react-router-dom';
import Header from '../Landing/partials/Header';
import Select from "../../components/common/Select/Select";
import { Oval } from 'react-loader-spinner';

export const RegisterScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector((state: RootState) => state.ui.showLoading);

  const ageRanges = [
    '12-17',
    '18-24',
    '25-34',
    '35-44',
    '45-54',
    '55-64',
    '65-74',
    '75+',
  ];

  const [currentAgeRange, setCurrentAgeRange] = useState(ageRanges[0]);

  function onRegister(data: Omit<RegisterUserPayload, 'type'>) {
    dispatch(runRegisterUser(data));
  }

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: '',
      password: '',
      country: '',
    },
    onSubmit: (_values) => {
      onRegister({ ..._values, ageRange: currentAgeRange });
    },
  });

  return (
    <>
      <div className="flex flex-col min-h-screen overflow-hidden">
        {/*  Site header */}
        <Header />

        {/*  Page content */}
        <main className="flex-grow">
          <section className="bg-gradient-to-b from-gray-100 to-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <div className="pt-32 pb-12 md:pt-40 md:pb-20">
                {/* Page header */}
                <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                  <h1 className="h1">
                    Welcome. We exist to make entrepreneurism easier.
                  </h1>
                </div>

                {/* Form */}
                <div className="max-w-sm mx-auto">
                  <form onSubmit={handleSubmit}>
                    <div className="flex flex-wrap -mx-3 mb-4">
                      <div className="w-full px-3">
                        <label
                          className="block text-gray-800 text-sm font-medium mb-1"
                          htmlFor="email">
                          Email <span className="text-red-600">*</span>
                        </label>
                        <input
                          id="email"
                          type="text"
                          className="form-input w-full text-gray-800"
                          placeholder="Enter your email"
                          required
                          name="email"
                          autoComplete="email"
                          value={values.email}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-4">
                      <div className="w-full px-3">
                        <label
                          className="block text-gray-800 text-sm font-medium mb-1"
                          htmlFor="country">
                          Country <span className="text-red-600">*</span>
                        </label>
                        <input
                          id="country"
                          type="text"
                          className="form-input w-full text-gray-800"
                          placeholder="Your country"
                          required
                          name="country"
                          value={values.country}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-4">
                      <div className="w-full px-3">
                        <label
                          className="block text-gray-800 text-sm font-medium mb-1"
                          htmlFor="ageRange">
                          Age range <span className="text-red-600">*</span>
                        </label>
                            <Select
                              //className="flex-1"
                              options={ageRanges}
                              selectedOption={currentAgeRange}
                              handleChange={(event: any) => {
                                setCurrentAgeRange(event);
                              }}
                            />
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-4">
                      <div className="w-full px-3">
                        <label
                          className="block text-gray-800 text-sm font-medium mb-1"
                          htmlFor="password">
                          Password <span className="text-red-600">*</span>
                        </label>
                        <input
                          id="password"
                          type="password"
                          className="form-input w-full text-gray-800"
                          placeholder="Enter your password"
                          required
                          name="password"
                          autoComplete="current-password"
                          value={values.password}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mt-6">
                      <div className="w-full px-3">
                        <button
                          type="submit"
                          className="btn text-white bg-blue-600 hover:bg-blue-700 w-full">
                          Sign up
                          {isLoading && (
                            <Oval
                              height="24"
                              width="24"
                              color="white"
                              ariaLabel="loading"
                            />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 text-center mt-3">
                      By creating an account, you agree to the{' '}
                      <a className="underline" href="#0">
                        terms & conditions
                      </a>
                      , and our{' '}
                      <a className="underline" href="#0">
                        privacy policy
                      </a>
                      .
                    </div>
                  </form>
                  <div className="flex items-center my-6">
                    <div
                      className="border-t border-gray-300 flex-grow mr-3"
                      aria-hidden="true"></div>
                    <div className="text-gray-600 italic">Or</div>
                    <div
                      className="border-t border-gray-300 flex-grow ml-3"
                      aria-hidden="true"></div>
                  </div>
                  <div className="text-gray-600 text-center mt-6">
                    Already using Zelly?{' '}
                    <Link
                      to="/login"
                      className="text-blue-600 hover:underline transition duration-150 ease-in-out">
                      Sign in
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};
