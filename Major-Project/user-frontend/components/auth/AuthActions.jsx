'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { logoutUser } from "@/store/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { UserIcon, ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default function AuthActions() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [mounted, setMounted] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    }

    if (showUserMenu) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [showUserMenu, mounted]);

  if (!mounted) {
    return null;
  }

  if (!user) {
    return (
      <>
        <Link
          href="/login"
          className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white"
        >
          Log in
        </Link>
        <Link
          href="/register"
          className="rounded-full bg-amber-300 px-4 py-2 text-sm font-semibold text-black"
        >
          Sign up
        </Link>
      </>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Link
        href="/purchases"
        className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
      >
        Purchases
      </Link>
      {/* {user.role === "admin" && (
        <Link
          href="/admin"
          className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
        >
          Admin
        </Link>
      )} */}
      
      {/* User Avatar/Icon with Dropdown */}
      <div className="relative" ref={menuRef}>
        <button
          type="button"
          onClick={() => setShowUserMenu(!showUserMenu)}
          className="relative h-10 w-10 flex items-center justify-center rounded-full border border-white/15 bg-white/5 hover:bg-white/10 transition-colors overflow-hidden"
          title={`${user.firstname} ${user.lastname}`}
        >
          {user.avatar?.url ? (
            <Image
              src={user.avatar.url}
              alt={`${user.firstname} ${user.lastname}`}
              fill
              className="object-cover"
            />
          ) : (
            <UserIcon className="h-5 w-5 text-white" />
          )}
        </button>
        
        {/* Dropdown Menu */}
        {showUserMenu && (
          <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-700 rounded-lg shadow-lg py-2 z-50">
            <div className="px-4 py-2 border-b border-gray-700">
              <p className="text-sm font-semibold text-white">
                {user.firstname} {user.lastname}
              </p>
              <p className="text-xs text-gray-400">{user.email}</p>
            </div>
            
            <Link
              href="/profile"
              className="block px-4 py-2 text-sm text-white hover:bg-gray-800 transition-colors"
              onClick={() => setShowUserMenu(false)}
            >
              Profile
            </Link>
            
            <Link
              href="/change-password"
              className="block px-4 py-2 text-sm text-white hover:bg-gray-800 transition-colors"
              onClick={() => setShowUserMenu(false)}
            >
              Change Password
            </Link>
            
            <button
              type="button"
              onClick={async () => {
                await dispatch(logoutUser());
                setShowUserMenu(false);
                router.push("/");
              }}
              className="w-full text-left px-4 py-2 text-sm text-rose-400 hover:bg-gray-800 transition-colors flex items-center gap-2"
            >
              <ArrowLeftStartOnRectangleIcon className="h-4 w-4" />
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
