import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Coin from './Pages/Coin/Coin';
import Cryptos from './Pages/Cryptos/Cryptos';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import News from './Pages/News/News';
import Footer from './components/Footer/Footer';
import Topbar from './components/HomeCom/topbar/topbar';

function App() {
  return (
    <div>
      <ToastContainer/>
      <Router>
        <Topbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cryptos' element={<Cryptos />} />
          <Route path='/cryptos/:id' element={<Coin />} />
          <Route path='/news' element={<News />} />
          <Route path='/login' element={<Login />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
