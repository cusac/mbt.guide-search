import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, RootState } from 'store';
import * as components from '../components';
import * as utils from '../utils';
import { toastError } from '../utils';
import logo from '../images/logo-dark.png';
import { Image } from 'semantic-ui-react';

const { Button, Grid, Searchbar, Icon, Auth, Header, Menu, Link } = components;

const AppHeader = (): any => {
  const [loading, setLoading] = React.useState(false);

  return (
    <Grid className="AppHeader">
      <Grid.Row style={{ paddingTop: 30 }}>
        <Grid.Column style={{ color: 'white ' }} verticalAlign="middle" width={2}></Grid.Column>
        <Grid.Column style={{ color: 'white ' }} verticalAlign="middle" width={3}>
          <Image
            src={logo}
            className="logo"
            alt="MBT video search"
            onClick={() => (window.location.href = 'http://my-big-toe.com')}
          ></Image>
        </Grid.Column>
      </Grid.Row>

      <Grid.Column verticalAlign="middle" width={4}></Grid.Column>

      <Grid.Column verticalAlign="middle" width={10}>
        <Grid.Row style={{ paddingBottom: 0 }}>
          <div className="headerLinks">
            <a href="https://www.my-big-toe.com/">HOME</a>
          </div>
          <div className="headerLinks">
            <a href="https://www.my-big-toe.com/about">ABOUT</a>
          </div>
          <div className="headerLinks">
            <a href="https://www.my-big-toe.com/media">VIDEOS</a>
          </div>
          <div className="headerLinks">
            <a href="https://www.my-big-toe.com/store1">STORE</a>
          </div>
          <div className="headerLinks">
            <a href="https://www.mbtevents.com/">EVENTS</a>
          </div>
          <div className="headerLinks">
            <a href="https://www.my-big-toe.com/mbt-links">LINKS</a>
          </div>
          <div className="headerLinksActive">VIDEO SEARCH</div>
          <div className="headerLinks">
            <a href="https://www.my-big-toe.com/support">SUPPORT MBT</a>
          </div>
          <div className="headerLinks">
            <a href="https://www.my-big-toe.com/contact">CONTACT</a>
          </div>
        </Grid.Row>
      </Grid.Column>

      <div className="headerBreak" />
    </Grid>
  );
};

AppHeader.defaultProps = {
  showSearchbar: false,
  onHandleSubmit: () => undefined,
  currentVideoId: '',
  currentSegmentId: '',
  searchType: 'video',
};

export default AppHeader;
