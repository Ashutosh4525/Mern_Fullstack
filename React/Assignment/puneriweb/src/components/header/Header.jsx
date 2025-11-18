
import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import logo from '../../assets/logo.gif'

const navigation = [
  { name: 'Player', href: '/player' },
  { name: 'Standings', href: '/standings' },
  { name: 'Fixtures', href: '/fixtures' },
  { name: 'Paltan-World', href: '/paltan-world' },
  { name: 'Tickets', href: '/tickets' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className='container w-full relative'>
      <header className="fixed max-w-9/10 z-50 h-16 w-full flex items-center top-10 parent-skew px-0 py-0">
        <div className='child-skew w-full flex items-center'>
          <nav aria-label="Global" className="w-full flex items-center justify-between lg:justify-center p-4 lg:px-8 child-skew">
            <div className="flex items-center">
              <a href="/player" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  alt=""
                  src={logo}
                  className="child-skew skew-x-15 sm:skew-x-0"
                />
              </a>
            </div>
            <div className="hidden lg:flex flex-1 justify-center items-center gap-x-12">
              {navigation.map((item) => (
                <a key={item.name} href={item.href} className="text-sm/6 font-semibold text-white">
                  {item.name}
                </a>
              ))}
            </div>
            <div className="flex lg:hidden flex-1 justify-end">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-200"
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="size-6 skew-x-15" />
              </button>
            </div>
          </nav>

          
          <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
            <div className='fixed inset-0 z-50 flex justify-end'>
              <DialogPanel className="fixed max-w-9/10 translate-x-4 top-26 inset-x-0 z-50 bg-gray-900 p-6 shadow-lg border-t border-gray-700">
               
                <div className="flex items-center justify-end mb-4">
                  {/* <a href="/" className="-m-1.5 p-1.5">
                    <span className="sr-only">Your Company</span>
                    <img src={logo} alt="Logo" className="h-8 w-auto" />
                  </a> */}
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-md p-2.5 text-gray-200"
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon aria-hidden="true" className="size-6" />
                  </button>
                </div>
               
                <nav>
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="block rounded-lg px-3 py-2 text-base font-semibold text-white hover:bg-white/5"
                    >
                      {item.name}
                    </a>
                  ))}
                </nav>
              </DialogPanel>
            </div>
          </Dialog>
        </div>
      </header>
    </div>
  )
}
