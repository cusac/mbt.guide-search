import React from 'react';
import { useSelector } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import { AppHeader, Menu, Icon, Sticky } from '../components';
import logo from '../images/logo-wide.png';
import { RootState } from 'store';
import { history } from 'utils';

const Layout = ({ children }: { children: any }) => {
  const [contextRef, setContextRef] = React.useState(undefined);

  const lastViewedSegmentId = useSelector((state: RootState) => state.video.lastViewedSegmentId);
  const lastViewedVideoId = useSelector((state: RootState) => state.video.lastViewedVideoId);
  const currentUser = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="column" style={{ flex: 1 }}>
      <AppHeader />
      <div className="layout-content">{children}</div>
    </div>
  );
};

export default Layout;
