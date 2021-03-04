import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, RootState } from 'store';
import * as components from '../components';
import * as utils from '../utils';
import { toastError } from '../utils';
import logo from '../images/icon-logo.png';
import { Image } from 'semantic-ui-react';

const { Button, Grid, Searchbar, Icon, Auth, Header, Menu, Link } = components;

const SmallHeader = (): any => {
  const [loading, setLoading] = React.useState(false);

  return (
    // <Grid className="SmallHeader">
    //   <Grid.Column verticalAlign="middle" textAlign="center" width={3}>
    //     <a className="navbar-brand" href="https://www.my-big-toe.com/" rel="home">
    //       <img
    //         src="https://www.my-big-toe.com/wp-content/themes/mybigtoe/images/icon-logo.png"
    //         alt="MBT video search"
    //       />
    //     </a>
    //     <Image
    //       style={{ display: 'initial', maxWidth: '100%', height: 'auto' }}
    //       src={logo}
    //       className="logo"
    //       alt="MBT video search"
    //       onClick={() => (window.location.href = 'http://my-big-toe.com')}
    //     ></Image>
    //   </Grid.Column>

    //   <Grid.Column verticalAlign="middle" width={10}></Grid.Column>

    //   <Grid.Column verticalAlign="middle" width={3}>
    //     {/* <Icon name="sidebar" size="big"></Icon> */}
    //     <button type="button" className="navbar-toggle">
    //       <span className="sr-only">Toggle navigation</span>
    //       <span className="icon-bar"></span>
    //       <span className="icon-bar"></span>
    //       <span className="icon-bar"></span>
    //     </button>
    //   </Grid.Column>

    //   <div className="headerBreak" />
    // </Grid>

    <nav className="navbar navbar-default navbar-fixed-top" role="navigation">
      <div className="container">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="https://www.my-big-toe.com/" rel="home">
            <img
              src="https://www.my-big-toe.com/wp-content/themes/mybigtoe/images/icon-logo.png"
              alt=""
              className="hidden-lg"
            />
          </a>
        </div>
      </div>
    </nav>
  );
};

SmallHeader.defaultProps = {
  showSearchbar: false,
  onHandleSubmit: () => undefined,
  currentVideoId: '',
  currentSegmentId: '',
  searchType: 'video',
};

export default SmallHeader;
