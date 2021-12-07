import { Dialog, Transition } from "@headlessui/react"
import { Link } from "gatsby"
import React, { Fragment } from "react"
import { useRegion } from "../../hooks/use-region"

const MobileMenu = ({ open, setOpen }) => {
  const pages = [
    {
      name: "Create return",
      path: "/create-return",
    },
    {
      name: "FAQ",
      path: "/faq",
    },
    {
      name: "Terms & Conditions",
      path: "/terms-and-conditions",
    },
  ]

  const {
    regions,
    region,
    country,
    actions: { updateRegion },
  } = useRegion()

  const handleRegionChange = e => {
    const { region, country } = JSON.parse(e.target.value)
    updateRegion(region, country)
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 flex z-40 lg:hidden"
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <div className="relative max-w-md w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
            <div className="px-4 pt-5 pb-2 flex">
              <button
                type="button"
                className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                onClick={() => setOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                &times;
              </button>
            </div>

            {/* <Tab.Group as="div" className="mt-2">
              <div className="border-b border-gray-200">
                <Tab.List className="-mb-px flex px-4 space-x-8">
                  {navigation.categories.map(category => (
                    <Tab
                      key={category.name}
                      className={({ selected }) =>
                        classNames(
                          selected
                            ? "text-indigo-600 border-indigo-600"
                            : "text-gray-900 border-transparent",
                          "flex-1 whitespace-nowrap py-4 px-1 border-b-2 text-base font-medium"
                        )
                      }
                    >
                      {category.name}
                    </Tab>
                  ))}
                </Tab.List>
              </div>
              <Tab.Panels as={Fragment}>
                {navigation.categories.map(category => (
                  <Tab.Panel
                    key={category.name}
                    className="pt-10 pb-8 px-4 space-y-10"
                  >
                    <div className="grid grid-cols-2 gap-x-4">
                      {category.featured.map(item => (
                        <div key={item.name} className="group relative text-sm">
                          <div className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75">
                            <img
                              src={item.imageSrc}
                              alt={item.imageAlt}
                              className="object-center object-cover"
                            />
                          </div>
                          <a
                            href={item.href}
                            className="mt-6 block font-medium text-gray-900"
                          >
                            <span
                              className="absolute z-10 inset-0"
                              aria-hidden="true"
                            />
                            {item.name}
                          </a>
                          <p aria-hidden="true" className="mt-1">
                            Shop now
                          </p>
                        </div>
                      ))}
                    </div>
                    {category.sections.map(section => (
                      <div key={section.name}>
                        <p
                          id={`${category.id}-${section.id}-heading-mobile`}
                          className="font-medium text-gray-900"
                        >
                          {section.name}
                        </p>
                        <ul className="mt-6 flex flex-col space-y-6">
                          {section.items.map(item => (
                            <li key={item.name} className="flow-root">
                              <a
                                href={item.href}
                                className="-m-2 p-2 block text-gray-500"
                              >
                                {item.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group> */}

            <div className="border-t border-gray-200 py-6 px-4 space-y-6">
              <div className="flow-root">
                <Link
                  to={"/products"}
                  className="-m-2 p-2 block font-medium text-gray-900"
                >
                  Products
                </Link>
              </div>
              <div className="flow-root">
                <Link
                  to={"/collections"}
                  className="-m-2 p-2 block font-medium text-gray-900"
                >
                  Collections
                </Link>
              </div>
            </div>

            <div className="border-t border-gray-200 py-6 px-4 space-y-6">
              {pages.map(page => (
                <div key={page.name} className="flow-root">
                  <Link
                    to={page.path}
                    className="-m-2 p-2 block font-medium text-gray-900"
                  >
                    {page.name}
                  </Link>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 py-6 px-4 space-y-6">
              <div className="flow-root">
                <Link
                  to="/sign-in"
                  className="-m-2 p-2 block font-medium text-gray-900"
                >
                  Sign in
                </Link>
              </div>
              <div className="flow-root">
                <Link
                  to="/sign-up"
                  className="-m-2 p-2 block font-medium text-gray-900"
                >
                  Create account
                </Link>
              </div>
            </div>

            <div className="border-t border-gray-200 py-6 px-4">
              <select
                className="shadow rounded-md border-none"
                onChange={handleRegionChange}
                defaultValue={JSON.stringify({ region, country })}
              >
                {regions.map((region, index) => {
                  return (
                    <Fragment key={index}>
                      {region.countries.map(country => {
                        return (
                          <option
                            key={country.display_name}
                            value={JSON.stringify({
                              region: region,
                              country: country.display_name,
                            })}
                          >
                            {country.display_name} /{" "}
                            {region.currency_code.toUpperCase()}
                          </option>
                        )
                      })}
                    </Fragment>
                  )
                })}
              </select>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  )
}

export default MobileMenu
