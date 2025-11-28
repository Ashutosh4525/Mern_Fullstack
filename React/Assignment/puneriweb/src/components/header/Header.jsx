
import { useState,useEffect } from 'react'
// import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import logo from '../../assets/logo.gif'
import { Link } from 'react-router-dom'

const navigation = [
  { name: 'Player', href: '/player' },
  { name: 'Standings', href: '/standings' },
  { name: 'Fixtures', href: '/fixtures' },
  { name: 'Paltan-World', href: '/paltan-world' },
  { name: 'Tickets', href: '/tickets' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  /* Detect scroll direction */
  useEffect(() => {
    function controlHeader() {
      if (window.scrollY > lastScrollY) {
        setShowHeader(false);    // scroll down → hide
      } else {
        setShowHeader(true);     // scroll up → show
      }
      setLastScrollY(window.scrollY);
    }

    window.addEventListener("scroll", controlHeader);
    return () => window.removeEventListener("scroll", controlHeader);
  }, [lastScrollY]);

  return (
    <div className='container w-full relative'>
      <header className={`fixed max-w-9/10 z-50 h-16 flex items-center top-10 parent-skew px-0 py-0 lg:h-10 transition-all duration-500 ease-in-out 
         ${showHeader ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"}`}>
        <div className='child-skew w-full flex items-center'>
          <nav aria-label="Global" className="w-full flex items-center justify-between lg:justify-center p-4 lg:px-8 child-skew">
            <div className="flex items-center">
              <Link to="/hero" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  alt=""
                  src={logo}
                  className="z-50 skew-x-0 lg:skew-x-15 logo"
                />
              </Link>
            </div>
            <div className="hidden lg:flex flex-1 justify-center items-center gap-x-12">
              {navigation.map((item) => (
                <a key={item.name} href={item.href} className="text-sm/6 font-semibold text-white hover:text-[#ff7500] transition-all duration-500">
                  {item.name}
                </a>
              ))}
            </div>
            <div className="flex lg:hidden flex-1 justify-end">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-200"
              >
                {mobileMenuOpen ? (
                  <XMarkIcon aria-hidden="true" className="size-6 skew-x-15" />
                ) : (
                  <Bars3Icon aria-hidden="true" className="size-6 skew-x-15" />
                )}
              </button>

            </div>
          </nav>
        {mobileMenuOpen && (
          <div className="fixed w-full top-25 inset-x-0 -z-10 p-6 bg-black/60 backdrop-blur-lg border-t border-gray-600 child-skew transition-all duration-500 navbar">
            <nav className="flex flex-col text-center gap-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-white text-lg font-semibold hover:bg-white/10 px-3 py-2 rounded"
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        )}
        </div>
      </header>
    </div>
  )
}
