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

  const appHeaderHeight = useSelector((state: RootState) => state.main.appHeaderHeight);

  return (
    <div>
      <AppHeader />
      <div className="layout-content" style={{ paddingTop: appHeaderHeight }}>
        {children}
      </div>
      <AppFooter />
    </div>
  );
};

export default Layout;
