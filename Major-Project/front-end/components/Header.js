'use client'

import { useState } from 'react'
import { Dialog, DialogPanel, Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react'
import { Bars3Icon, XMarkIcon,MagnifyingGlassIcon,ChevronDownIcon } from '@heroicons/react/24/outline'

import Link from 'next/link'


const navigation = [
  { name: 'Home', href: '/home' },
  // { name: 'Movies', href: '/movies' },
  // { name: 'TV Shows', href: '/tv-shows'},
  { name: 'Contact', href: '/contact' },
  { name: 'Services',href:'/services'}
]

export default function Header(){
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    return(
         <header className="fixed inset-x-0 top-0 z-50 bg-black">
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Movie Site</span>
              <img
                alt=""
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                className="h-8 w-auto"
              />
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-200"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12 ">
            <Menu as="div" className="relative">
            <MenuButton className="flex items-center gap-1 text-sm font-semibold text-white">
              Categories
              <ChevronDownIcon className="size-4" />
            </MenuButton>

            <MenuItems className="absolute mt-2 w-40 bg-gray-900 border border-gray-700 rounded-lg shadow-lg">
              <MenuItem>
                {({ active }) => (
                  <Link
                    href="/movies"
                    className={`block px-4 py-2 text-sm ${active ? 'bg-gray-800' : ''}`}
                  >
                    Movies
                  </Link>
                )}
              </MenuItem>

              <MenuItem>
                {({ active }) => (
                  <Link
                    href="/tv-shows"
                    className={`block px-4 py-2 text-sm ${active ? 'bg-gray-800' : ''}`}
                  >
                    TV Shows
                  </Link>
                )}
              </MenuItem>
            </MenuItems>
          </Menu>
            {navigation.map((item) => (
              <Link key={item.name} href={item.href} className="text-sm/6 font-semibold text-white text-center">
                {item.name}
              </Link>
            ))}
            

          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <button className='size-6 pr-2 mr-2'>
                    <MagnifyingGlassIcon/>
            </button>
            <button className='bg-fuchsia-800 rounded-2xl p-1 mr-0.5'>
            <a href="login" className="text-sm/6 font-semibold text-white">
              Log in 
              {/* <span aria-hidden="true">&rarr;</span> */}
            </a>
            </button>
            <button className='bg-fuchsia-800 rounded-2xl p-1 ml-0.5'>
            <a href="sign-up" className="text-sm/6 font-semibold text-white">
              Sign up 
              {/* <span aria-hidden="true">&rarr;</span> */}
            </a>
            </button>
          </div>
        </nav>
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-100/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Movie Site</span>
                <img
                  alt=""
                  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                  className="h-8 w-auto"
                />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-200"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-white/10">
                <div className="space-y-2 py-6">
                  <div>
                    <p className="text-gray-400 text-sm">Categories</p>
                    <Link href="/movies" className="block text-white mt-2">Movies</Link>
                    <Link href="/tv-shows" className="block text-white mt-2">TV Shows</Link>
                  </div>
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/5"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <button className='color-white size-6'>
                    <MagnifyingGlassIcon/>
                  </button>
                  <a
                    href="/login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-white hover:bg-white/5"
                  >
                    Log in
                  </a>
                  <a
                    href="/sign-up"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-white hover:bg-white/5"
                  >
                    Sign-up
                  </a>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>
    )
}