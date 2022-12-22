import Layout from '../../hocs/Layout'
import { Fragment, useState, useEffect } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { ChevronDownIcon, FilterIcon, MinusSmIcon, PlusSmIcon, ViewGridIcon } from '@heroicons/react/solid'
import {connect} from 'react-redux'
import {get_categories} from '../../redux/actions/categories'
import { get_products, get_filter_products } from '../../redux/actions/products'
import {Link} from 'react-router-dom'

  const filters = [
    {
      id: 'color',
      name: 'Color',
      options: [
        { value: 'white', label: 'White', checked: false },
        { value: 'beige', label: 'Beige', checked: false },
        { value: 'blue', label: 'Blue', checked: true },
        { value: 'brown', label: 'Brown', checked: false },
        { value: 'green', label: 'Green', checked: false },
        { value: 'purple', label: 'Purple', checked: false },
      ],
    },
    {
      id: 'category',
      name: 'Category',
      options: [
        { value: 'new-arrivals', label: 'New Arrivals', checked: false },
        { value: 'sale', label: 'Sale', checked: false },
        { value: 'travel', label: 'Travel', checked: true },
        { value: 'organization', label: 'Organization', checked: false },
        { value: 'accessories', label: 'Accessories', checked: false },
      ],
    },
    {
      id: 'size',
      name: 'Size',
      options: [
        { value: '2l', label: '2L', checked: false },
        { value: '6l', label: '6L', checked: false },
        { value: '12l', label: '12L', checked: false },
        { value: '18l', label: '18L', checked: false },
        { value: '20l', label: '20L', checked: false },
        { value: '40l', label: '40L', checked: true },
      ],
    },
  ]
  

  const Store = ({
  get_categories,
  categories,
  get_products,
  products,
  get_filter_products,
  filtered_products
  }) => {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    
    useEffect (() => {
      get_categories()
      get_products()
    }, [])

    const [open, setOpen] = useState(true)

    return (
    <Layout>
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog as="div" className="fixed inset-0 flex z-40 lg:hidden" onClose={setMobileFiltersOpen}>
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
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto">
                <div className="px-4 flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    className="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Mobile Filters */}
                <form className="mt-4 border-t border-gray-200">
                  <h3 className="sr-only">Categories</h3>
                  <ul role="list" className="font-medium text-gray-900 px-2 py-3">
                    { categories &&
                      categories !== null &&
                      categories !== undefined &&
                      categories.map(category => {
                        if (category.sub_categories.length === 0){
                          return (
                            <div key={category.id} className="flex items-center h-5 my-5">
                              <input type="radio" name='category_id' className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded-full">
                              </input>
                              <label className="ml-3 min-w-0 flex-1 text-gray-500">{category.name}</label>
                            </div>
                          )
                        }else{
                          let result = []
                          result.push(
                            <div key={category.id} className="flex items-center h-5">
                              <input type="radio" name='category_id' className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded-full">
                              </input>
                              <label className="ml-3 min-w-0 flex-1 text-gray-500">{category.name}</label>
                            </div>
                          )

                          category.sub_categories.map(sub_category => {
                            result.push(
                              <div key={sub_category.id} className="ml-5 flex items-center h-5 ml-2 my-5">
                                <input type="radio" name='category_id' className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded-full">
                                </input>
                                <label className="ml-3 min-w-0 flex-1 text-gray-500">{sub_category.name}</label>
                              </div>
                            )
                          })
                          return result
                        }
                      })
                    }
                  </ul>

                  {filters.map((section) => (
                    <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                      {({ open }) => (
                        <>
                          <h3 className="-mx-2 -my-3 flow-root">
                            <Disclosure.Button className="px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900"></span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusSmIcon className="h-5 w-5" aria-hidden="true" />
                                ) : (
                                  <PlusSmIcon className="h-5 w-5" aria-hidden="true" />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-6">
                              
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </form>
              </div>
            </Transition.Child>
          </Dialog>
        </Transition.Root>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10 flex items-baseline justify-between pt-24 pb-6 border-b border-gray-200">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">New Arrivals</h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                     
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button type="button" className="p-2 -m-2 ml-5 sm:ml-7 text-gray-400 hover:text-gray-500">
                <span className="sr-only">View grid</span>
                <ViewGridIcon className="w-5 h-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="p-2 -m-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FilterIcon className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
              


              {/* Filters */}
              <section className='flex gap-6'>
                <div className={`bg-[#CCCCCC] min-h-screen ${open ? "w-72" : "w-16"} duration-500 text-gray-100 px-4`}>
                    {
                      categories &&
                      categories !== null &&
                      categories !== undefined &&
                      categories.map(category => {
                        if(category.sub_categories.length === 0){
                          return(
                            <div key={category.id} className="mt-4 flex flex-col gap-4 relative">
                              <Link to="#" 
                              className={`whitespace-pre duration-500 group flex text-black items-center text-sm 
                              gap-1.5 font-medium p-3
                              ${
                                !open && "opacity-0 translate-x-28 overflow-hidden"
                              } 
                              hover:bg-[#FFE4E7] rounded-md`}>{category.name}</Link>
                            </div>
                          )
                        }
                      })
                    }
                </div>
              </section>




              {/* Product grid */}
              <div className="lg:col-span-3">
                {/* Replace with your content */}
                <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 lg:h-full" />
                {/* /End replace */}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>            
    </Layout>
    )
}

const mapStateToProps = state => ({
  categories: state.Categories.categories,
  products: state.Products.products,
  filtered_products: state.Products.filtered_products
})

export default connect(mapStateToProps, {
 get_categories,
 get_products,
 get_filter_products
})(Store)