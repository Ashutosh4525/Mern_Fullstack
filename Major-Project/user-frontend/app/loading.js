'use client'
import { useEffect } from "react";
export default function Loading() {

     useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

    return (
        <div className="fixed top-0 left-0 w-screen h-screen flex flex-col justify-center items-center bg-linear-to-b from-[#050505] to-[#0a0a0a] p-4 z-9999">
            {/* Animated Spinner */}
            <div className="relative w-24 h-24 mb-8">
                <div className="absolute inset-0 animate-spin rounded-full h-24 w-24 border-2 border-transparent border-t-amber-300 border-r-amber-300/50"></div>
                <div className="absolute inset-2 rounded-full h-20 w-20 border border-amber-300/20"></div>
            </div>
            
            {/* Main Text */}
            <h2 className="text-4xl font-bold text-amber-300 mb-2 text-center">StreamForge</h2>
            
            {/* Loading Message */}
            <p className="text-lg text-amber-300/80 text-center mb-8 font-medium">
                Forging your stream...
            </p>
            
            {/* Animated Dots */}
            <div className="flex gap-2 justify-center">
                <span className="w-3 h-3 bg-amber-300 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
                <span className="w-3 h-3 bg-amber-300/70 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-3 h-3 bg-amber-300/40 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
            </div>
        </div>
    )
}
