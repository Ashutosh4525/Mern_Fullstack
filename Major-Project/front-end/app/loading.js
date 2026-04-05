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
        <div className="preloader flex flex-col justify-center items-center h-screen bg-[#050505]">
            {/* Tailwind Spinner */}
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-amber-300 mb-8"></div>
            
            {/* Animated Text */}
            <div className="txt-loading flex space-x-1">
                <span data-text-preloader="S" className="letters-loading text-2xl font-bold text-amber-300 relative">S</span>
                <span data-text-preloader="T" className="letters-loading text-2xl font-bold text-amber-300 relative">T</span>
                <span data-text-preloader="R" className="letters-loading text-2xl font-bold text-amber-300 relative">R</span>
                <span data-text-preloader="E" className="letters-loading text-2xl font-bold text-amber-300 relative">E</span>
                <span data-text-preloader="A" className="letters-loading text-2xl font-bold text-amber-300 relative">A</span>
                <span data-text-preloader="M" className="letters-loading text-2xl font-bold text-amber-300 relative">M</span>
                <span data-text-preloader="F" className="letters-loading text-2xl font-bold text-amber-300 relative">F</span>
                <span data-text-preloader="O" className="letters-loading text-2xl font-bold text-amber-300 relative">O</span>
                <span data-text-preloader="R" className="letters-loading text-2xl font-bold text-amber-300 relative">R</span>
                <span data-text-preloader="G" className="letters-loading text-2xl font-bold text-amber-300 relative">G</span>
                <span data-text-preloader="E" className="letters-loading text-2xl font-bold text-amber-300 relative">E</span>
            </div>
            
            <p className="text-center mt-4 font-medium uppercase tracking-widest text-amber-300/80">
                Forging your stream...
            </p>
        </div>
    )
}
