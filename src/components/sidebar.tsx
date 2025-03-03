export const Sidebar = () => {
  return (
    <div className="fixed w-[280px] h-screen bg-gradient-to-b from-white to-gray-50 border-r border-gray-200 shadow-lg">
      <div className="flex items-center justify-between p-4 bg-white">
        <div className="flex items-center space-x-2">
          <span className="material-symbols-outlined text-blue-600">gavel</span>
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            LawFirm CMS
          </h1>
        </div>
        <span className="material-symbols-outlined cursor-pointer hover:scale-110 transition-all duration-300 hover:text-blue-600">
          menu
        </span>
      </div>

      <nav className="mt-6 px-4">
        <ul className="space-y-2">
          <li>
            <a
              href="/dashboard"
              className="flex items-center p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-all duration-300 group"
            >
              <span className="material-symbols-outlined mr-3 text-blue-600">
                dashboard
              </span>
              <span className="font-medium group-hover:translate-x-1 transition-transform">
                Dashboard
              </span>
            </a>
          </li>
          <li>
            <a
              href="/cases"
              className="flex items-center p-3 rounded-lg hover:bg-gray-100 transition-all duration-300 group"
            >
              <span className="material-symbols-outlined mr-3 group-hover:text-blue-600">
                folder
              </span>
              <span className="font-medium group-hover:translate-x-1 transition-transform">
                Cases
              </span>
            </a>
          </li>
          <li>
            <a
              href="/clients"
              className="flex items-center p-3 rounded-lg hover:bg-gray-100 transition-all duration-300 group"
            >
              <span className="material-symbols-outlined mr-3 group-hover:text-blue-600">
                groups
              </span>
              <span className="font-medium group-hover:translate-x-1 transition-transform">
                Clients
              </span>
            </a>
          </li>
          <li>
            <a
              href="/lawyers"
              className="flex items-center p-3 rounded-lg hover:bg-gray-100 transition-all duration-300 group"
            >
              <span className="material-symbols-outlined mr-3 group-hover:text-blue-600">
                person
              </span>
              <span className="font-medium group-hover:translate-x-1 transition-transform">
                Lawyers
              </span>
            </a>
          </li>
          <li>
            <a
              href="/search"
              className="flex items-center p-3 rounded-lg hover:bg-gray-100 transition-all duration-300 group"
            >
              <span className="material-symbols-outlined mr-3 group-hover:text-blue-600">
                search
              </span>
              <span className="font-medium group-hover:translate-x-1 transition-transform">
                Search
              </span>
            </a>
          </li>
          <li>
            <details className="group">
              <summary className="flex items-center p-4 rounded-lg hover:bg-gray-50/80 transition-all duration-300 cursor-pointer group backdrop-blur-sm border border-transparent hover:border-gray-100 shadow-sm hover:shadow-md">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 mr-4 group-hover:bg-blue-100 transition-colors">
                  <span className="material-symbols-outlined text-blue-600">
                    mail
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold group-hover:translate-x-1 transition-transform">
                    Communication
                  </span>
                  <span className="text-sm text-gray-500 group-hover:translate-x-1 transition-transform delay-75">
                    Manage communications
                  </span>
                </div>
                <span className="material-symbols-outlined ml-auto transform group-open:rotate-180 transition-transform text-gray-500">
                  expand_more
                </span>
              </summary>
              <ul className="pl-12 mt-2 space-y-2">
                <li>
                  <a
                    href="/email"
                    className="block py-2 hover:translate-x-1 transition-transform hover:text-blue-600"
                  >
                    Email
                  </a>
                </li>
                <li>
                  <a
                    href="/invoice"
                    className="block py-2 hover:translate-x-1 transition-transform hover:text-blue-600"
                  >
                    Invoice
                  </a>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <details className="group">
              <summary className="flex items-center p-4 rounded-lg hover:bg-gray-50/80 transition-all duration-300 cursor-pointer group backdrop-blur-sm border border-transparent hover:border-gray-100 shadow-sm hover:shadow-md">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 mr-4 group-hover:bg-blue-100 transition-colors">
                  <span className="material-symbols-outlined text-blue-600">
                    settings
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold group-hover:translate-x-1 transition-transform">
                    Settings
                  </span>
                  <span className="text-sm text-gray-500 group-hover:translate-x-1 transition-transform delay-75">
                    System preferences
                  </span>
                </div>
                <span className="material-symbols-outlined ml-auto transform group-open:rotate-180 transition-transform text-gray-500">
                  expand_more
                </span>
              </summary>
              <ul className="pl-12 mt-2 space-y-2">
                <li>
                  <a
                    href="/profile"
                    className="block py-2 hover:translate-x-1 transition-transform hover:text-blue-600"
                  >
                    Profile
                  </a>
                </li>
                <li>
                  <a
                    href="/security"
                    className="block py-2 hover:translate-x-1 transition-transform hover:text-blue-600"
                  >
                    Security
                  </a>
                </li>
                <li>
                  <a
                    href="/preferences"
                    className="block py-2 hover:translate-x-1 transition-transform hover:text-blue-600"
                  >
                    Preferences
                  </a>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </nav>

      <div className="absolute bottom-0 w-full p-4 bg-white border-t border-gray-200">
        <div className="flex items-center space-x-3 group cursor-pointer">
          <img
            src="https://api.dicebear.com/6.x/avataaars/svg?seed=John"
            alt="Profile"
            className="w-10 h-10 rounded-full ring-2 ring-blue-100 group-hover:ring-blue-200 transition-all duration-300"
          />
          <div className="group-hover:translate-x-1 transition-transform">
            <p className="font-medium">John Doe</p>
            <p className="text-sm text-gray-500">Senior Partner</p>
          </div>
          <span className="material-symbols-outlined ml-auto text-gray-400 group-hover:text-blue-600 transition-colors">
            logout
          </span>
        </div>
      </div>
    </div>
  );
};
