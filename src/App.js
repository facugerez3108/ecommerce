import {Provider} from 'react-redux';
import store from './store';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Cart from './containers/pages/Cart'
import Home from './containers/Home';
import Error404 from './containers/errors/Error404';
import Activate from './containers/auth/Activate';
import Login from './containers/auth/Login';
import Signup from './containers/auth/Signup';
import ResetPassword from './containers/auth/ResetPassword';
import ResetPasswordConfirm from './containers/auth/ResetPasswordConfirm';
import Store from './containers/pages/Store';
import ProductDetail from './containers/pages/ProductDetail';
import SearchPage from './containers/pages/SearchPage';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* Display Error 404 */}
          <Route path="*" element={<Error404 />} />
          <Route path="/activate/:uid/:token" element={<Activate />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/reset_password" element={<ResetPassword />} />
          <Route path="password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm />} />
          <Route exact path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </Router>
    </Provider>
    
  );
}

export default App;
