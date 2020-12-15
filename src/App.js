import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';

import Aux from './components/HOC/Aux';
import Layout from './components/Layouts/Layout/Layout';
import Spinner from './components/Common/Spinner/Spinner';
// lazy loading
const HomePage = lazy(() => import('./pages/Home/Home'));
const ResultPage = lazy(() => import('./pages/Result/Result'));
const App = () => (
  <Aux>
    <Layout>
      <Switch>
        <Suspense fallback={<Spinner />}>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/result' component={ResultPage} />
        </Suspense>
      </Switch>
    </Layout>
  </Aux>
);

export default App;
