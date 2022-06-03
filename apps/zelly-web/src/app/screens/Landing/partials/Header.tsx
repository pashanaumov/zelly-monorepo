import { sagaActions } from '@zelly/core/redux/sagas/sagaActions';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { RootState } from '@zelly/core/redux/storeWeb';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [top, setTop] = useState(true);

  const userToken = useSelector((state: RootState) => state.auth.authenticated);

  // detect whether user has scrolled the page down by 10px
  useEffect(() => {
    const scrollHandler = () => {
      window.pageYOffset > 10 ? setTop(false) : setTop(true);
    };
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [top]);

  async function onLogout() {
    dispatch({ type: sagaActions.LOGOUT_USER });
    navigate('/');
  }

  const isAtDashboard = location.pathname === '/dashboard';

  return (
    <header
      className={`fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${
        !top && 'bg-white backdrop-blur-sm shadow-lg'
      }`}>
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Site branding */}
          <div className="flex-shrink-0 mr-4">
            {/* Logo */}
            <Link to="/" className="block" aria-label="Cruip">
              <svg
                className="w-8 h-8"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <radialGradient
                    cx="21.152%"
                    cy="86.063%"
                    fx="21.152%"
                    fy="86.063%"
                    r="79.941%"
                    id="header-logo">
                    <stop stopColor="#4FD1C5" offset="0%" />
                    <stop stopColor="#81E6D9" offset="25.871%" />
                    <stop stopColor="#338CF5" offset="100%" />
                  </radialGradient>
                </defs>
                <rect
                  width="32"
                  height="32"
                  rx="16"
                  fill="url(#header-logo)"
                  fillRule="nonzero"
                />
              </svg>
            </Link>
          </div>

          {/* Site navigation */}
          <nav className="flex flex-grow">
            {!userToken ? (
              <ul className="flex flex-grow justify-end flex-wrap items-center">
                <li>
                  <Link
                    to="/login"
                    className={classNames(
                      'font-medium',
                      top ? 'text-white' : 'text-blue-500',
                      'hover:text-blue-600',
                      'px-5',
                      'py-3',
                      'flex',
                      'items-center',
                      'transition',
                      'duration-150',
                      'ease-in-out',
                    )}>
                    Sign in
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className={classNames(
                      'btn-sm',
                      'outline-none',
                      top ? 'text-white' : 'text-blue-500',
                      'hover:text-blue-800',
                      'ml-3',
                    )}>
                    <span>Sign up</span>
                  </Link>
                </li>
              </ul>
            ) : (
              <ul className="flex flex-grow justify-end flex-wrap items-center">
                {!isAtDashboard && (
                  <li>
                    <Link
                      to="/dashboard"
                      className={classNames(
                        top ? 'text-white' : 'text-blue-500',
                        'bg-transparent',
                        'hover:text-blue-600',
                        'focus:ring-0',
                        'focus:outline-none',
                        'focus:ring-blue-300',
                        'dark:focus:ring-blue-800',
                        'font-medium',
                        'rounded-lg',
                        'text-sm',
                        'px-5',
                        'py-2.5',
                        'text-center',
                        'mr-2',
                        'mb-2',
                        'cursor-pointer',
                      )}>
                      <span>Dashboard</span>
                    </Link>
                  </li>
                )}
                <li>
                  <Link
                    to="/profile"
                    className={classNames(
                      top ? 'text-white' : 'text-blue-500',
                      'bg-transparent',
                      'hover:text-blue-700',
                      'focus:ring-0',
                      'focus:outline-none',
                      'focus:ring-blue-300',
                      'dark:focus:ring-blue-800',
                      'font-medium',
                      'rounded-lg',
                      'text-sm',
                      'px-5',
                      'py-2.5',
                      'text-center',
                      'mr-2',
                      'mb-2',
                      'cursor-pointer',
                    )}>
                    <span>Profile</span>
                  </Link>
                </li>
                <li>
                  <a
                    onClick={onLogout}
                    className={classNames(
                      top ? 'text-white' : 'text-blue-500',
                      'bg-transparent',
                      'hover:text-blue-700',
                      'focus:ring-0',
                      'focus:outline-none',
                      'focus:ring-blue-300',
                      'dark:focus:ring-blue-800',
                      'font-medium',
                      'rounded-lg',
                      'text-sm',
                      'px-5',
                      'py-2.5',
                      'text-center',
                      'mr-2',
                      'mb-2',
                      'cursor-pointer',
                    )}>
                    Logout
                  </a>
                </li>
              </ul>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
