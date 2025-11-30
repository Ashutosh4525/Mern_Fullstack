import { configureStore } from '@reduxjs/toolkit';
import playerReducer from './slice/player.slice';
import galleryReducer from './slice/gallery.slice';


const store = configureStore({
    reducer: {
        player: playerReducer,
        gallery: galleryReducer,
    },
});
export default store;