import { configureStore } from '@reduxjs/toolkit';
import playerReducer from './slice/player.slice';


const store = configureStore({
    reducer: {
        player: playerReducer,
    },
});
export default store;