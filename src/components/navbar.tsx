export default function Navbar() {
  return (
    <div id="webcrumbs">
      <nav className="w-full bg-white dark:bg-gray-900 border-b shadow-sm transition-all duration-300 ease-in-out">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-semibold text-gray-800 dark:text-white transition-colors duration-200">
                Dashboard
              </h1>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <div className="relative">
                <details className="group">
                  <summary className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200 list-none">
                    <div className="relative">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-600 dark:text-gray-300"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                      </svg>
                      <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 flex items-center justify-center text-xs text-white font-medium">
                        3
                      </span>
                    </div>
                  </summary>
                  <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 origin-top-right ring-1 ring-black ring-opacity-5 transform opacity-0 scale-95 group-open:opacity-100 group-open:scale-100 transition-all duration-200">
                    <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Notifications
                      </h3>
                    </div>
                    <div className="max-h-72 overflow-y-auto">
                      <a
                        href="#"
                        className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150 border-b border-gray-100 dark:border-gray-700"
                      >
                        <div className="flex items-start">
                          <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900 rounded-full p-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-blue-500 dark:text-blue-300"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                            </svg>
                          </div>
                          <div className="ml-3 w-0 flex-1">
                            <p className="text-sm font-medium text-gray-800 dark:text-white">
                              Case Update
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                              Smith v. Johnson case has been updated
                            </p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                              10 minutes ago
                            </p>
                          </div>
                        </div>
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150 border-b border-gray-100 dark:border-gray-700"
                      >
                        <div className="flex items-start">
                          <div className="flex-shrink-0 bg-green-100 dark:bg-green-900 rounded-full p-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-green-500 dark:text-green-300"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"></path>
                            </svg>
                          </div>
                          <div className="ml-3 w-0 flex-1">
                            <p className="text-sm font-medium text-gray-800 dark:text-white">
                              New Message
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                              Jane Smith sent you a message
                            </p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                              1 hour ago
                            </p>
                          </div>
                        </div>
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
                      >
                        <div className="flex items-start">
                          <div className="flex-shrink-0 bg-yellow-100 dark:bg-yellow-900 rounded-full p-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-yellow-500 dark:text-yellow-300"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <circle cx="12" cy="12" r="10"></circle>
                              <line x1="12" y1="8" x2="12" y2="12"></line>
                              <line x1="12" y1="16" x2="12.01" y2="16"></line>
                            </svg>
                          </div>
                          <div className="ml-3 w-0 flex-1">
                            <p className="text-sm font-medium text-gray-800 dark:text-white">
                              Important Alert
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                              Deadline approaching for Wilson case
                            </p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                              Yesterday
                            </p>
                          </div>
                        </div>
                      </a>
                    </div>
                    <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
                      <a
                        href="#"
                        className="block text-sm text-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors duration-150"
                      >
                        View all notifications
                      </a>
                    </div>
                  </div>
                </details>
              </div>

              <button className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-600 dark:text-gray-300"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              </button>

              <div className="relative">
                <details className="group">
                  <summary className="flex items-center space-x-1 cursor-pointer list-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-600 dark:text-gray-300"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="2" y1="12" x2="22" y2="12"></line>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    </svg>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      EN
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-600 dark:text-gray-300"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </summary>
                  <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5 transform opacity-0 scale-95 group-open:opacity-100 group-open:scale-100 transition-all duration-200">
                    <a
                      href="#"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
                    >
                      <span className="mr-2">🇺🇸</span> English
                    </a>
                    <a
                      href="#"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
                    >
                      <span className="mr-2">🇫🇷</span> Français
                    </a>
                  </div>
                </details>
              </div>

              <div className="relative">
                <details className="group">
                  <summary className="flex items-center space-x-3 cursor-pointer list-none">
                    <div className="h-9 w-9 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium text-sm overflow-hidden hover:ring-2 hover:ring-indigo-400 transition-all duration-200">
                      <img
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt="User"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        John Doe
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Attorney
                      </span>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-600 dark:text-gray-300"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </summary>
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5 transform opacity-0 scale-95 group-open:opacity-100 group-open:scale-100 transition-all duration-200">
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                      <p className="text-sm font-medium text-gray-800 dark:text-white">
                        John Doe
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        john.doe@lawfirm.com
                      </p>
                    </div>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
                    >
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-400"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        View Profile
                      </div>
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
                    >
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-400"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M12 15l-3-3m0 0l3-3m-3 3h8M6 3h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"></path>
                        </svg>
                        Account Settings
                      </div>
                    </a>
                    <div className="border-t border-gray-200 dark:border-gray-700"></div>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
                    >
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-3 text-red-500 dark:text-red-400"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                          <polyline points="16 17 21 12 16 7"></polyline>
                          <line x1="21" y1="12" x2="9" y2="12"></line>
                        </svg>
                        Logout
                      </div>
                    </a>
                  </div>
                </details>
              </div>
            </div>

            <div className="md:hidden flex items-center">
              <details className="group">
                <summary className="list-none">
                  <button className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="1"></circle>
                      <circle cx="19" cy="12" r="1"></circle>
                      <circle cx="5" cy="12" r="1"></circle>
                    </svg>
                  </button>
                </summary>
                <div className="absolute right-4 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 origin-top-right ring-1 ring-black ring-opacity-5 transform opacity-0 scale-95 group-open:opacity-100 group-open:scale-100 transition-all duration-200">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
                  >
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-400"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                      </svg>
                      Notifications
                      <span className="ml-auto bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        3
                      </span>
                    </div>
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
                  >
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-400"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                      </svg>
                      Theme
                    </div>
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
                  >
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-400"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="2" y1="12" x2="22" y2="12"></line>
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                      </svg>
                      Language
                    </div>
                  </a>
                  <div className="border-t border-gray-200 dark:border-gray-700 mt-1 pt-1"></div>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
                  >
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-400"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                      View Profile
                    </div>
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
                  >
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-400"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 15l-3-3m0 0l3-3m-3 3h8M6 3h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"></path>
                      </svg>
                      Account Settings
                    </div>
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
                  >
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-3 text-red-500 dark:text-red-400"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                        <polyline points="16 17 21 12 16 7"></polyline>
                        <line x1="21" y1="12" x2="9" y2="12"></line>
                      </svg>
                      Logout
                    </div>
                  </a>
                </div>
              </details>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
