import * as React from 'react';
import { useSelector } from 'react-redux';
import { Image } from 'semantic-ui-react';
import { RootState } from 'store';
import { Icon } from '../components';
import bimage from '../images/landing-background-bot.png';
import timage from '../images/landing-background-top.png';

const LandingPage = (): any => {
  const currentUser = useSelector((state: RootState) => state.auth.user);

  const user = currentUser ? currentUser.firstName : 'Guest';

  return (
    <React.Fragment>
      <div className="videodesc">
        <Image src={timage} fluid rounded />

        <h2>{'Hello! Welcome to the MBT Video search tool.'}</h2>
        <p>
          Here you can browse video clips from MBT youtube videos that have been organized into
          smaller segments based on a topic. Enter your topic of interest into the search bar above
          and press enter. You can click on any video clip listed to the right to view it.
        </p>
        <p>Have fun!</p>
        <Image src={bimage} fluid rounded />
      </div>
    </React.Fragment>
  );
};

export default LandingPage;
