// export default function Loading(){
//     return(
//         <>
//          <div className="flex justify-center items-center h-screen">
//            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-amber-300"></div>
//             <div className="txt-loading">
//                 <span data-text-preloader="S" class="letters-loading">S</span>
//                 <span data-text-preloader="T" class="letters-loading">T</span>
//                 <span data-text-preloader="R" class="letters-loading">R</span>
//                 <span data-text-preloader="E" class="letters-loading">E</span>
//                 <span data-text-preloader="A" class="letters-loading">A</span>
//                 <span data-text-preloader="M" class="letters-loading">M</span>
//                 <span data-text-preloader="F" class="letters-loading">F</span>
//                 <span data-text-preloader="O" class="letters-loading">O</span>
//                 <span data-text-preloader="R" class="letters-loading">R</span>
//                 <span data-text-preloader="G" class="letters-loading">G</span>
//                 <span data-text-preloader="E" class="letters-loading">E</span>
//             </div>
//              <p className="text-center">Forging your stream...</p>
//          </div>
//         </>
//     )
// }

export default function Loading() {
    return (
        <div className="fixed inset-0 flex flex-col justify-center items-center bg-linear-to-b from-[#050505] to-[#0a0a0a] p-4 z-50">
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
