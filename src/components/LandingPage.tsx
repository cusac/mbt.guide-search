import * as React from 'react';
import { useSelector } from 'react-redux';
import { Image } from 'semantic-ui-react';
import { RootState } from 'store';
import { Icon } from '../components';

const LandingPage = (): any => {
  const currentUser = useSelector((state: RootState) => state.auth.user);

  const user = currentUser ? currentUser.firstName : 'Guest';

  return (
    <React.Fragment>
      <div className="videodesc">
        <h2>{'Hello!'}</h2>
        <hr />
        <h2>{'Welcome to the MBT video search tool.'}</h2>
        <p>
          <br />
          Here you can browse video clips from MBT youtube videos that have been organized into
          smaller segments based on a topic.
          <br />
          <br />
          Enter your topic of interest into the search bar above and press enter.
          <br />
          You can click on any video clip listed to the right to view it. And you can create your
          own segments too.
          <br />
          <br />
          Have fun!
        </p>
      </div>
    </React.Fragment>
  );
};

export default LandingPage;
