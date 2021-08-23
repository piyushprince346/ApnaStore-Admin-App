import './App.css';
import { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './containers/Home';
import Signin from './containers/Signin';
import Signup from './containers/Signup';
import PrivateRoute from '../src/components/HOC/PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { getInitialData, isLoggedIn } from './actions';
import Products from './containers/Products';
import Orders from './containers/Orders';
import Category from './containers/Category';
import NewPage from './containers/NewPage';

function App() {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isLoggedIn());
    }
    if (auth.authenticate) {
      dispatch(getInitialData());
    }
  }, [auth.authenticate]);

  return (
    <div className="App">
      <Switch>
        <PrivateRoute path='/orders' component={Orders} />
        <PrivateRoute path='/products' component={Products} />
        <PrivateRoute path='/category' component={Category} />
        <PrivateRoute path='/page' component={NewPage} />
        <Route path='/signin' component={Signin} />
        <Route path='/signup' component={Signup} />
        <PrivateRoute path='/' component={Home} />
      </Switch>
    </div>
  );
}

export default App;
