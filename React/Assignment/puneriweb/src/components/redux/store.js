import { configureStore } from '@reduxjs/toolkit';
import playerReducer from './slice/player.slice';
import galleryReducer from './slice/gallery.slice';
import TvReducer from './slice/tv.slice';


const store = configureStore({
    reducer: {
        player: playerReducer,
        gallery: galleryReducer,
        puneritv: TvReducer,
    },
});
export default store;