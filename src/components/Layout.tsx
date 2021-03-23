import React from 'react';
import { useSelector } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import { AppHeader, Menu, Icon, Sticky, SmallHeader } from '../components';
import logo from '../images/logo-wide.png';
import { RootState } from 'store';
import { history } from 'utils';
import { Media } from './Media';
import AppFooter from './AppFooter';

const Layout = ({ children }: { children: any }) => {
  const [contextRef, setContextRef] = React.useState(undefined);

  const lastViewedSegmentId = useSelector((state: RootState) => state.video.lastViewedSegmentId);
  const lastViewedVideoId = useSelector((state: RootState) => state.video.lastViewedVideoId);
  const currentUser = useSelector((state: RootState) => state.auth.user);

  return (
    <div>
      <AppHeader />
      <div className="layout-content">{children}</div>
      <AppFooter />
    </div>
  );
};

export default Layout;
