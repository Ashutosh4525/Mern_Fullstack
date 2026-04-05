'use client'

import { useState } from 'react'
import { Dialog, DialogPanel, Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react'
import { Bars3Icon, XMarkIcon,MagnifyingGlassIcon,ChevronDownIcon } from '@heroicons/react/24/outline'
import AuthActions from '@/components/auth/AuthActions'
import { useRouter } from 'next/navigation'

import Link from 'next/link'


const navigation = [
  { name: 'Home', href: '/' },
  // { name: 'Movies', href: '/movies' },
  // { name: 'TV Shows', href: '/tvshow'},
  { name: 'Contact', href: '/contact' },
  { name: 'Services',href:'/services'}
]

export default function Header(){
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [searchOpen, setSearchOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const router = useRouter()

    const handleSearch = (e) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
            setSearchOpen(false)
            setSearchQuery('')
        }
    };
    return(
        <>
         <header className="fixed inset-x-0 top-0 z-50">
        <nav aria-label="Global" className="mx-auto mt-4 flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-black/45 px-6 py-4 backdrop-blur-xl lg:px-8">
          <div className="flex lg:flex-1">
            <Link href="/" className="flex items-center gap-3">
              <span className="sr-only">StreamForge</span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-300 text-sm font-black text-black">SF</span>
              <span className="text-sm font-semibold uppercase tracking-[0.45em] text-white">StreamForge</span>
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
                    href="/tvshow"
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
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className='size-6 pr-2 mr-2 hover:text-emerald-400 transition-colors'
            >
              <MagnifyingGlassIcon/>
            </button>
            <AuthActions />
          </div>
        </nav>
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-100/10">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-3" onClick={() => setMobileMenuOpen(false)}>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-300 text-sm font-black text-black">SF</span>
                <span className="text-sm font-semibold uppercase tracking-[0.45em] text-white">StreamForge</span>
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-200"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-6 flow-root ">
              <div className="-my-6 divide-y divide-white/10">
                <div className="space-y-2 py-6">
                  <div>
                    <p className="text-gray-400 text-sm">Categories</p>
                    <Link href="/movies" className="block text-white mt-2">Movies</Link>
                    <Link href="/tvshow" className="block text-white mt-2">TV Shows</Link>
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
                <div className="py-6 flex justify-center items-center">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false)
                      setSearchOpen(true)
                    }}
                    className='color-white size-6 hover:text-emerald-400 transition-colors m-4'
                  >
                    <MagnifyingGlassIcon/>
                  </button>
                  <AuthActions />
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      {/* Search Modal */}
      <Dialog open={searchOpen} onClose={setSearchOpen} className="relative z-50">
        <div className="fixed inset-0 bg-black/50" />
        <div className="fixed inset-0 flex items-start justify-center pt-32">
          <DialogPanel className="mx-4 w-full max-w-md rounded-2xl bg-gray-900 p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Search</h2>
              <button
                onClick={() => setSearchOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <XMarkIcon className="size-6" />
              </button>
            </div>
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search movies, TV shows..."
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  autoFocus
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Search
              </button>
            </form>
          </DialogPanel>
        </div>
      </Dialog>
        </>
    )
}
