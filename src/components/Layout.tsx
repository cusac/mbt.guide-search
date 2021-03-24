import React from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { RootState } from 'store';
import { mediaBreakpoints } from '../components/Media';
import { AppHeader } from '../components';
import AppFooter from './AppFooter';

const Layout = ({ children }: { children: any }) => {
  const [contextRef, setContextRef] = React.useState(undefined);

  const isTablet = useMediaQuery({
    query: `(max-height: ${mediaBreakpoints.tablet}px), (max-width: ${mediaBreakpoints.tablet -
      1}px)`,
  });

  const appHeaderHeight = useSelector((state: RootState) => state.main.appHeaderHeight);

  return (
    <div>
      <AppHeader />
      <div className="layout-content" style={{ paddingTop: isTablet ? '0px' : appHeaderHeight }}>
        {children}
      </div>
      <AppFooter />
    </div>
  );
};

export default Layout;
