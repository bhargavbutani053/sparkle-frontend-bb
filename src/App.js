import './App.scss';
import { Route, BrowserRouter as Router } from "react-router-dom";
import Home from './components/Home/Home';
import Header from './components/Auth/Header/Header';
import Footer from './components/Auth/Footer/Footer';
import './styles/mixins/global.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
function App() {
  return (
    <>
      <Router>
        {/* <Header /> */}
        <ToastContainer />
        <Route exact path="/" component={Home} />
        {/* <Footer /> */}
      </Router>
    </>
  );
}

export default App;
