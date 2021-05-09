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
          smaller segments based on searchable topics.
          <br />
          <br />
          Just enter your topic of interest into the search bar above and press <i>Enter</i>.
          <br />
          You can click on any video clip listed to the right to view it.
          <br />
          <br />
          Have fun!
        </p>
        <br />
        <h3>A Message from Tom:</h3>
        <p>
          <br />
          This tool was created by a generous group of volunteers, including two brilliant software
          developers and a team of volunteers who collectively spent several thousand hours
          reviewing, assessing, evaluating and time-stamping every one of our YouTube videos by
          subject.
          <br />
          <br />
          MBT growth is entirely fueled by the vision and dedication of its volunteers. If you have
          an idea of a project that will help spread the MBT model and grow our community, have
          skills you’d like to contribute, or if you’d like to check out the projects currently
          underway, then please send us an email describing your interest.
          <br />
          <br />
          I think you will find this tool very useful. As always, if you find something of
          significant value in our videos and our new video search tool, please consider supporting
          their production and maintenance through our Patreon account -- or through a one-time
          donation…...the links for contributing and volunteering are below...thank you!
          <br />
          <br />
          <a href="https://www.patreon.com/mybigtoe" target="_blank" rel="noopener noreferrer">
            https://www.patreon.com/mybigtoe
          </a>
          &nbsp;- MBT’s Patreon account. Become a patron of MBT.
          <br />
          <br />
          <a href="https://bit.ly/39lwhen​" target="_blank" rel="noopener noreferrer">
            https://bit.ly/39lwhen​
          </a>
          &nbsp;- One time donation link thru PayPal (no PayPal account required).
          <br />
          <br />
          <a href="mailto:mbtvolunteers@gmail.com" target="_blank" rel="noopener noreferrer">
            mbtvolunteers@gmail.com
          </a>
          &nbsp;- The connection for those who wish to volunteer
        </p>
      </div>
    </React.Fragment>
  );
};

export default LandingPage;
