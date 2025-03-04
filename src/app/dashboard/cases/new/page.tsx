export default function CreateCasePage() {
  return (
    <div className="w-full max-w-[1080px] mx-auto bg-gray-50 p-4 sm:p-6 lg:p-8 font-sans shadow-sm">
      <header className="mb-4 sm:mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Create New Case</h1>
        <div className="flex flex-wrap items-center text-xs sm:text-sm text-gray-600">
          <span className="hover:text-blue-600 transition-colors cursor-pointer">
            Dashboard
          </span>
          <span className="mx-2">&gt;</span>
          <span className="hover:text-blue-600 transition-colors cursor-pointer">
            Cases
          </span>
          <span className="mx-2">&gt;</span>
          <span className="font-medium">Create Case</span>
        </div>
      </header>

      <form>
        <section className="bg-white p-4 sm:p-6 rounded-lg shadow-sm mb-4 sm:mb-6 transition-all duration-300 hover:shadow-md">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 border-b pb-2">
            Case Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label
                htmlFor="caseName"
                className="block text-sm font-medium mb-1"
              >
                Case Name <span className="text-red-500">*</span>
              </label>
              <input
                id="caseName"
                type="text"
                placeholder="Enter case name"
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>
            <div>
              <label
                htmlFor="caseType"
                className="block text-sm font-medium mb-1"
              >
                Case Type <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  id="caseType"
                  className="w-full appearance-none px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white pr-8 transition-all"
                  required
                >
                  <option value="">Select case type</option>
                  <option value="consulting">Consulting</option>
                  <option value="litigation">Litigation</option>
                  <option value="customs">Customs</option>
                  <option value="tax">Tax</option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="text-gray-500"
                    viewBox="0 0 16 16"
                  >
                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                  </svg>
                </div>
              </div>
            </div>
            <div>
              <label
                htmlFor="caseStatus"
                className="block text-sm font-medium mb-1"
              >
                Status
              </label>
              <div className="relative">
                <select
                  id="caseStatus"
                  className="w-full appearance-none px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white pr-8 transition-all"
                >
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                  <option value="abandoned">Abandoned</option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="text-gray-500"
                    viewBox="0 0 16 16"
                  >
                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white p-4 sm:p-6 rounded-lg shadow-sm mb-4 sm:mb-6 transition-all duration-300 hover:shadow-md">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 border-b pb-2">
            Client Information
          </h2>
          <div className="mb-4">
            <details className="rounded-lg border mb-4 sm:mb-6">
              <summary className="cursor-pointer p-3 sm:p-4 bg-gray-50 rounded-t-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center">
                  <span className="material-symbols-outlined mr-2">
                    person_search
                  </span>
                  <span className="font-medium">Select Existing Client</span>
                </div>
              </summary>
              <div className="p-3 sm:p-4 border-t">
                <div className="relative mb-4">
                  <input
                    type="text"
                    placeholder="Search clients by name, phone, or email"
                    className="w-full px-3 sm:px-4 py-2 pl-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <span className="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    search
                  </span>
                </div>
                <div className="max-h-40 overflow-y-auto border rounded-md">
                  <div className="p-2 sm:p-3 border-b hover:bg-blue-50 cursor-pointer transition-colors flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <div>
                      <p className="font-medium">John Smith</p>
                      <p className="text-xs sm:text-sm text-gray-600">
                        john.smith@email.com • (555) 123-4567
                      </p>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 transition-colors w-full sm:w-auto text-center sm:text-left">
                      Select
                    </button>
                  </div>
                  <div className="p-2 sm:p-3 border-b hover:bg-blue-50 cursor-pointer transition-colors flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <div>
                      <p className="font-medium">Sarah Johnson</p>
                      <p className="text-xs sm:text-sm text-gray-600">
                        sarah.johnson@email.com • (555) 987-6543
                      </p>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 transition-colors w-full sm:w-auto text-center sm:text-left">
                      Select
                    </button>
                  </div>
                  <div className="p-2 sm:p-3 hover:bg-blue-50 cursor-pointer transition-colors flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <div>
                      <p className="font-medium">Michael Davis</p>
                      <p className="text-xs sm:text-sm text-gray-600">
                        michael.davis@email.com • (555) 456-7890
                      </p>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 transition-colors w-full sm:w-auto text-center sm:text-left">
                      Select
                    </button>
                  </div>
                </div>
              </div>
            </details>

            <details className="rounded-lg border">
              <summary className="cursor-pointer p-3 sm:p-4 bg-gray-50 rounded-t-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center">
                  <span className="material-symbols-outlined mr-2">
                    person_add
                  </span>
                  <span className="font-medium">Create New Client</span>
                </div>
              </summary>
              <div className="p-3 sm:p-4 border-t">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label
                      htmlFor="clientName"
                      className="block text-sm font-medium mb-1"
                    >
                      Client Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="clientName"
                      type="text"
                      placeholder="Enter client name"
                      className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="clientPhone"
                      className="block text-sm font-medium mb-1"
                    >
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="clientPhone"
                      type="tel"
                      placeholder="(XXX) XXX-XXXX"
                      className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label
                      htmlFor="clientEmail"
                      className="block text-sm font-medium mb-1"
                    >
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="clientEmail"
                      type="email"
                      placeholder="client@example.com"
                      className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>
            </details>
          </div>
        </section>

        <section className="bg-white p-4 sm:p-6 rounded-lg shadow-sm mb-4 sm:mb-6 transition-all duration-300 hover:shadow-md">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 border-b pb-2">
            Lawyer Assignment
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label
                htmlFor="lawyers"
                className="block text-sm font-medium mb-1"
              >
                Assign Lawyer(s) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  id="lawyers"
                  multiple
                  className="w-full h-24 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="lawyer1">
                    Amanda Peterson (Corporate Law)
                  </option>
                  <option value="lawyer2">David Martinez (Tax Law)</option>
                  <option value="lawyer3">Elizabeth Chen (Litigation)</option>
                  <option value="lawyer4">Robert Williams (Customs)</option>
                  <option value="lawyer5">
                    Jennifer Garcia (Criminal Law)
                  </option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Hold Ctrl/Cmd to select multiple lawyers
                </p>
              </div>
            </div>
            <div>
              <label
                htmlFor="deadline"
                className="block text-sm font-medium mb-1"
              >
                Set Deadline (Optional)
              </label>
              <input
                id="deadline"
                type="date"
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
        </section>

        <section className="bg-white p-4 sm:p-6 rounded-lg shadow-sm mb-4 sm:mb-6 transition-all duration-300 hover:shadow-md">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 border-b pb-2">
            File Upload
          </h2>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 text-center hover:border-blue-500 transition-colors mb-4">
            <div className="flex flex-col items-center justify-center">
              <span className="material-symbols-outlined text-3xl sm:text-4xl text-gray-400 mb-2">
                cloud_upload
              </span>
              <p className="mb-2 text-sm text-gray-600">
                Drag and drop your files here
              </p>
              <p className="text-xs text-gray-500 mb-4">
                Supported formats: PDF, DOC, DOCX, JPG, PNG
              </p>
              <label
                htmlFor="fileUpload"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors cursor-pointer"
              >
                Select Files
              </label>
              <input id="fileUpload" type="file" multiple className="hidden" />
            </div>
          </div>
          <div className="bg-gray-50 p-3 rounded-md">
            <div className="flex items-center justify-between">
              <span className="font-medium text-sm sm:text-base">
                Uploaded Files (3)
              </span>
              <button className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 transition-colors">
                Clear All
              </button>
            </div>
            <div className="mt-2 space-y-2">
              <div className="flex items-center justify-between bg-white p-2 rounded-md border">
                <div className="flex items-center overflow-hidden">
                  <span className="material-symbols-outlined text-red-500 mr-2 flex-shrink-0">
                    picture_as_pdf
                  </span>
                  <span className="text-xs sm:text-sm truncate">
                    client_agreement.pdf
                  </span>
                </div>
                <button className="text-gray-500 hover:text-red-500 transition-colors flex-shrink-0 ml-2">
                  <span className="material-symbols-outlined text-sm sm:text-base">
                    close
                  </span>
                </button>
              </div>
              <div className="flex items-center justify-between bg-white p-2 rounded-md border">
                <div className="flex items-center overflow-hidden">
                  <span className="material-symbols-outlined text-blue-500 mr-2 flex-shrink-0">
                    description
                  </span>
                  <span className="text-xs sm:text-sm truncate">
                    case_details.docx
                  </span>
                </div>
                <button className="text-gray-500 hover:text-red-500 transition-colors flex-shrink-0 ml-2">
                  <span className="material-symbols-outlined text-sm sm:text-base">
                    close
                  </span>
                </button>
              </div>
              <div className="flex items-center justify-between bg-white p-2 rounded-md border">
                <div className="flex items-center overflow-hidden">
                  <span className="material-symbols-outlined text-green-500 mr-2 flex-shrink-0">
                    image
                  </span>
                  <span className="text-xs sm:text-sm truncate">
                    evidence_photo.jpg
                  </span>
                </div>
                <button className="text-gray-500 hover:text-red-500 transition-colors flex-shrink-0 ml-2">
                  <span className="material-symbols-outlined text-sm sm:text-base">
                    close
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white p-4 sm:p-6 rounded-lg shadow-sm mb-4 sm:mb-6 transition-all duration-300 hover:shadow-md">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 border-b pb-2">
            Case Description & Notes
          </h2>
          <div className="mb-4">
            <label
              htmlFor="caseDescription"
              className="block text-sm font-medium mb-1"
            >
              Case Description
            </label>
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-gray-50 p-2 border-b flex items-center space-x-1 sm:space-x-2 overflow-x-auto">
                <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                  <span className="material-symbols-outlined text-xs sm:text-sm">
                    format_bold
                  </span>
                </button>
                <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                  <span className="material-symbols-outlined text-xs sm:text-sm">
                    format_italic
                  </span>
                </button>
                <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                  <span className="material-symbols-outlined text-xs sm:text-sm">
                    format_underlined
                  </span>
                </button>
                <span className="border-r h-6"></span>
                <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                  <span className="material-symbols-outlined text-xs sm:text-sm">
                    format_list_bulleted
                  </span>
                </button>
                <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                  <span className="material-symbols-outlined text-xs sm:text-sm">
                    format_list_numbered
                  </span>
                </button>
                <span className="border-r h-6"></span>
                <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                  <span className="material-symbols-outlined text-xs sm:text-sm">
                    link
                  </span>
                </button>
              </div>
              <textarea
                id="caseDescription"
                rows="6"
                className="w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Enter detailed case notes here..."
              ></textarea>
            </div>
          </div>
          <div className="flex items-center mb-4">
            <input
              id="internalRemarks"
              type="checkbox"
              className="w-4 h-4 text-blue-600 border-gray-300 rounded mr-2 focus:ring-blue-500"
            />
            <label htmlFor="internalRemarks" className="text-xs sm:text-sm">
              Add internal remarks (visible only to assigned lawyers)
            </label>
          </div>
          <div className="border rounded-lg p-3 bg-yellow-50 hidden">
            <textarea
              rows="3"
              className="w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent transition-all"
              placeholder="Internal remarks..."
            ></textarea>
          </div>
        </section>

        <section className="bg-white p-4 sm:p-6 rounded-lg shadow-sm mb-4 sm:mb-6 transition-all duration-300 hover:shadow-md">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 border-b pb-2">
            Additional Options
          </h2>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            <div className="flex items-center">
              <input
                id="notifyClient"
                type="checkbox"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded mr-2 focus:ring-blue-500"
              />
              <label htmlFor="notifyClient" className="text-xs sm:text-sm">
                Send email notification to client
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="generateInvoice"
                type="checkbox"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded mr-2 focus:ring-blue-500"
              />
              <label htmlFor="generateInvoice" className="text-xs sm:text-sm">
                Generate invoice for initial consultation
              </label>
            </div>
          </div>
        </section>

        <div className="flex flex-col sm:flex-row sm:justify-end gap-3 sm:gap-4 mt-6 sm:mt-8">
          <button
            type="button"
            className="px-4 sm:px-6 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors flex items-center justify-center sm:justify-start"
          >
            <span className="material-symbols-outlined mr-1 text-sm">
              close
            </span>
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 sm:px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center sm:justify-start group"
          >
            <span className="material-symbols-outlined mr-1 text-sm transform group-hover:rotate-12 transition-transform">
              save
            </span>
            Save & Create Case
          </button>
        </div>
      </form>
    </div>
  );
}
