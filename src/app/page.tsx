import Image from "next/image";

export default function Home() {
  return (
    <div id="webcrumbs">
      <div className="w-full bg-white">
        <nav className="flex items-center justify-between p-6 border-b sticky top-0 bg-white z-50">
          <h1 className="text-2xl font-bold">LawPro Solutions</h1>
          <div className="flex gap-8">
            <a className="hover:text-blue-600 transition-all" href="#features">
              Features
            </a>
            <a
              className="hover:text-blue-600 transition-all"
              href="#how-it-works"
            >
              How It Works
            </a>
            <a className="hover:text-blue-600 transition-all" href="#pricing">
              Pricing
            </a>
            <a
              className="hover:text-blue-600 transition-all"
              href="#testimonials"
            >
              Testimonials
            </a>
            <a className="hover:text-blue-600 transition-all" href="#contact">
              Contact
            </a>
          </div>
        </nav>

        <header className="py-24 px-12 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Streamline Your Legal Workflow with Our Case Management Platform
            </h1>
            <p className="text-xl mb-10 text-gray-600">
              Manage cases, clients, lawyers, and documents in one powerful and
              secure system.
            </p>
            <div className="flex gap-4 justify-center">
              <button className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all font-semibold">
                Start Free Trial
              </button>
              <button className="bg-white border-2 border-blue-600 px-8 py-4 rounded-lg hover:bg-blue-50 transform hover:scale-105 transition-all font-semibold">
                Request Demo
              </button>
            </div>
          </div>
        </header>

        <section id="how-it-works" className="py-20 px-12">
          <h2 className="text-3xl font-bold text-center mb-16">How It Works</h2>
          <div className="grid grid-cols-3 gap-8">
            {[
              {
                icon: "add_task",
                title: "Create & Track Cases",
                desc: "Easily add new cases and monitor progress",
              },
              {
                icon: "group_add",
                title: "Assign Lawyers & Set Deadlines",
                desc: "Allocate cases to lawyers with expected completion timelines",
              },
              {
                icon: "payments",
                title: "Manage Clients & Send Invoices",
                desc: "Store client information and send invoices or emails directly",
              },
            ].map((step, index) => (
              <div className="p-8 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all text-center group">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-all">
                  <span className="material-symbols-outlined text-3xl text-blue-600">
                    {step.icon}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="features" className="py-20 px-12 bg-gray-50">
          <h2 className="text-3xl font-bold text-center mb-16">Key Features</h2>
          <div className="grid grid-cols-3 gap-8">
            {[
              {
                icon: "folder_supervised",
                title: "Case Management",
                desc: "Track ongoing, completed, and abandoned cases",
              },
              {
                icon: "group",
                title: "Client Management",
                desc: "Store client details and generate invoices",
              },
              {
                icon: "assignment_ind",
                title: "Lawyer Assignments",
                desc: "Assign cases to lawyers and set timeframes",
              },
              {
                icon: "description",
                title: "Document Management",
                desc: "Upload and manage case-related files",
              },
              {
                icon: "filter_alt",
                title: "Search & Filters",
                desc: "Find cases by name, client, or status",
              },
              {
                icon: "notifications_active",
                title: "Notifications & Reminders",
                desc: "Get alerts for deadlines and updates",
              },
            ].map((feature) => (
              <div className="p-8 bg-white rounded-xl shadow hover:shadow-lg transition-all group">
                <span className="material-symbols-outlined text-4xl text-blue-600 mb-6 group-hover:scale-110 transition-all">
                  {feature.icon}
                </span>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="pricing" className="py-20 px-12">
          <h2 className="text-3xl font-bold text-center mb-16">
            Pricing Plans
          </h2>
          <div className="grid grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "Basic",
                price: "$49",
                features: [
                  "5 Users",
                  "Basic Case Management",
                  "Client Database",
                  "Email Support",
                ],
              },
              {
                title: "Pro",
                price: "$99",
                features: [
                  "20 Users",
                  "Advanced Case Management",
                  "Document Management",
                  "Priority Support",
                ],
              },
              {
                title: "Enterprise",
                price: "Custom",
                features: [
                  "Unlimited Users",
                  "Custom Features",
                  "API Access",
                  "24/7 Support",
                ],
              },
            ].map((plan, index) => (
              <div
                className={`p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all ${
                  index === 1
                    ? "bg-blue-600 text-white transform scale-105"
                    : "bg-white"
                }`}
              >
                <h3 className="text-2xl font-bold mb-4">{plan.title}</h3>
                <div className="text-3xl font-bold mb-6">
                  {plan.price}
                  <span className="text-base font-normal">/month</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li className="flex items-center">
                      <span className="material-symbols-outlined mr-2">
                        check_circle
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-lg font-semibold transition-all transform hover:scale-105 ${
                    index === 1
                      ? "bg-white text-blue-600"
                      : "bg-blue-600 text-white"
                  }`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </section>

        <section id="testimonials" className="py-20 px-12 bg-gray-50">
          <h2 className="text-3xl font-bold text-center mb-16">
            What Our Clients Say
          </h2>
          <div className="grid grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                text: "The platform has revolutionized how we manage our cases. Highly recommended!",
                name: "Robert Anderson",
                role: "Senior Partner, Anderson Legal",
              },
              {
                text: "Intuitive interface and powerful features. Perfect for our growing law firm.",
                name: "Emily Chen",
                role: "Managing Partner, Chen & Associates",
              },
            ].map((testimonial) => (
              <div className="p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all">
                <p className="mb-6 italic text-gray-600">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <span className="material-symbols-outlined text-blue-600">
                      person
                    </span>
                  </div>
                  <div>
                    <p className="font-bold">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="py-20 px-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-16">
              Get Started Today
            </h2>
            <div className="grid grid-cols-2 gap-12">
              <form className="space-y-6">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <textarea
                  placeholder="Message"
                  className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                ></textarea>
                <button className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all w-full font-semibold">
                  Send Message
                </button>
              </form>
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">
                    Contact Information
                  </h3>
                  <div className="space-y-4">
                    <p className="flex items-center">
                      <span className="material-symbols-outlined mr-2">
                        location_on
                      </span>
                      123 Legal Street, NY 10001
                    </p>
                    <p className="flex items-center">
                      <span className="material-symbols-outlined mr-2">
                        phone
                      </span>
                      (555) 123-4567
                    </p>
                    <p className="flex items-center">
                      <span className="material-symbols-outlined mr-2">
                        mail
                      </span>
                      contact@lawpro.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="bg-gray-900 text-white py-12 px-12">
          <div className="grid grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">LawPro Solutions</h3>
              <p className="text-gray-400">
                Advanced legal case management platform
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Platform</h4>
              <div className="space-y-2">
                <a
                  href="#features"
                  className="block text-gray-400 hover:text-white transition-all"
                >
                  Features
                </a>
                <a
                  href="#pricing"
                  className="block text-gray-400 hover:text-white transition-all"
                >
                  Pricing
                </a>
                <a
                  href="#contact"
                  className="block text-gray-400 hover:text-white transition-all"
                >
                  Contact
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <div className="space-y-2">
                <a
                  href="#"
                  className="block text-gray-400 hover:text-white transition-all"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="block text-gray-400 hover:text-white transition-all"
                >
                  Terms of Service
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <i className="fa-brands fa-linkedin text-2xl hover:text-blue-400 transition-all cursor-pointer"></i>
                <i className="fa-brands fa-twitter text-2xl hover:text-blue-400 transition-all cursor-pointer"></i>
                <i className="fa-brands fa-facebook text-2xl hover:text-blue-400 transition-all cursor-pointer"></i>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>© 2024 LawPro Solutions. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
