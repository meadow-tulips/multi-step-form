import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux'
import './App.css';
import Home from './pages/home';
import Thankyou from './pages/thankyou';
import store from './redux/configure'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/thankyou' element={<Thankyou />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
