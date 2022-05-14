import { configureStore } from '@reduxjs/toolkit'
import * as reducers from './';


export default configureStore({
  reducer: {
      ...reducers
  },
})