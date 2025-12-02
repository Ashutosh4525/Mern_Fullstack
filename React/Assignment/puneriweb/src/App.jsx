import { Routes,Route,useLocation } from "react-router-dom"
import Footer from "./components/footer/Footer"
import Header from "./components/header/Header"
import Hero from "./components/pages/Hero/Hero"
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Players from "./components/pages/players/Players";
import NotFound from "./components/pages/NotFound";
import PlayersBanner from "./components/pages/players/PlayerBanner";
import SinglePlayer from "./components/pages/players/SinglePlayer";
import PaltanWorld from "./components/pages/PaltanWorld/PaltanWorld";
import SeasonGalleryPage from "./components/pages/PaltanWorld/Season/SeasonList";
import SingleGallery from "./components/pages/PaltanWorld/Season/SingleGallery";
import TvList from "./components/pages/PaltanWorld/PuneriTv/TvList";
function App() {
  const location =useLocation();
  const current = location.pathname;

  const showHeader =
  current === "/" ||
  current === "/hero" ||
  current === "/paltan-world" ||
  current.startsWith("/player") ||
  current.startsWith("/puneri-tv") ||
  current.startsWith("/gallery");
   useEffect(() => {
        AOS.init({
          // Optional: Configure global settings for AOS
          duration: 1000, // Animation duration
          once: true, // Whether animation should only happen once
          disable: "mobile", // Disable AOS on mobile devices
        });
        // AOS.refresh() or AOS.refreshHard() can be called here if needed
        // to re-calculate element positions after dynamic content loading.
      }, []);

  return (
    <>
     {showHeader && <Header />}
     <Routes>
      <Route index element={<Hero/>}/>
      <Route path="/hero" element={<Hero/>}/>
      <Route path="/player" element={<PlayersBanner/>}/>
      <Route path="/player/:id" element={<SinglePlayer />} />
      <Route path="/paltan-world" element={<PaltanWorld/>}/>
      <Route path="/gallery" element={<SeasonGalleryPage/>}/>
      <Route path="/gallery/:id" element={<SingleGallery/>}/>
      <Route path="/puneri-tv" element={<TvList/>}/>
      <Route path="*" element={<NotFound/>}/>
     </Routes>
     {showHeader && <Footer/>}
    </>
  )
}

export default App
