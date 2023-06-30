import { Router, Route } from 'react-router-dom';
import * as components from './components';
import React from 'react';
import * as routes from './routes';
import * as services from './services';
import * as utils from './utils';
import { toast } from 'react-toastify';

// Import css
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';
import Layout from 'components/Layout';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

toast.configure();

const App = () => {
  const [, setUser] = React.useState(undefined);
  React.useEffect(() => {
    services.firebaseAuth.onAuthStateChanged(setUser as any);
  }, []);

  try {
    (services as any).stats.postVisit();
  } catch (err) {}

  return (
    <div className="App">
      <components.ErrorBoundary onError={() => <div>Something went wrong!</div>}>
        <Layout>
          <Router history={utils.history}>
            <Route
              path="/"
              exact
              render={props => {
                return <routes.Segments />;
              }}
            />
            <Route
              path="/:segmentId"
              exact
              render={props => {
                const { segmentId } = props.match.params;
                return <routes.Segments {...props} {...{ segmentId }} />;
              }}
            />
          </Router>
        </Layout>
      </components.ErrorBoundary>
    </div>
  );
};

export default App;
