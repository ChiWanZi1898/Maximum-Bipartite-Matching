import {configureStore} from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import matcherReducer from '../features/Matcher/matcherSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    matcher: matcherReducer,
  },
});
