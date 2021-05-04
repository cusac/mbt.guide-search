import React from 'react';
import { useMediaQuery } from 'react-responsive';
import ResizeObserver from 'resize-observer-polyfill';
import { setAppHeaderHeight, useAppDispatch } from 'store';
import { Media, mediaBreakpoints } from './Media';

const AppHeader = (): any => {
  const [loading, setLoading] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [appHeaderRef, setAppHeaderRef] = React.useState(undefined as HTMLDivElement | undefined);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const isSmallComputer = useMediaQuery({ maxWidth: mediaBreakpoints.smallComputer });
  const isTablet = useMediaQuery({
    query: `(max-height: ${mediaBreakpoints.tablet - 1}px), (max-width: ${mediaBreakpoints.tablet -
      1}px)`,
  });

  const dispatch = useAppDispatch();

  const appHeaderResizeObserver = new ResizeObserver(entries => {
    dispatch(setAppHeaderHeight({ appHeaderHeight: entries[0].target.clientHeight }));
  });

  React.useEffect(() => {
    if (appHeaderRef && appHeaderRef.clientHeight) {
      appHeaderResizeObserver.observe(appHeaderRef);
    }
  }, [appHeaderRef]);

  return (
    <div className="AppHeader">
      <header className="header" role="banner">
        <nav
          className="navbar navbar-default navbar-fixed-top"
          role="navigation"
          ref={setAppHeaderRef as any}
        >
          <div className="container">
            <div className="navbar-header">
              <button
                type="button"
                className="navbar-toggle"
                data-toggle="collapse"
                data-target=".navbar-ex1-collapse"
                onClick={toggleVisibility}
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="https://www.my-big-toe.com/" rel="home">
                <Media greaterThan="computer">
                  {(mediaClassNames, renderChildren) => {
                    return renderChildren ? (
                      <img
                        src="https://www.my-big-toe.com/wp-content/themes/mybigtoe/images/logo-dark.png"
                        alt=""
                        className="visible-lg-block"
                      />
                    ) : null;
                  }}
                </Media>
                <Media lessThan="largescreen">
                  {(mediaClassNames, renderChildren) => {
                    return renderChildren ? (
                      <img
                        src="https://www.my-big-toe.com/wp-content/themes/mybigtoe/images/icon-logo.png"
                        alt=""
                        className="hidden-lg"
                      />
                    ) : null;
                  }}
                </Media>
              </a>
            </div>

            <nav
              className={`navbar-collapse navbar-ex1-collapse collapse collapsed ${
                visible ? 'is-expanded' : ''
              } ${isSmallComputer && !isTablet ? 'medium-menu' : ''} ${
                isTablet ? 'small-menu' : ''
              }`}
              style={{ height: visible ? undefined : '1px' }}
            >
              <ul id="menu-main-menu" className="nav navbar-nav navbar-right">
                <li
                  id="menu-item-6"
                  className="menu-item menu-item-type-post_type menu-item-object-page menu-item-home menu-item-6"
                >
                  <a href="https://www.my-big-toe.com/">Home</a>
                </li>
                <li
                  id="menu-item-137"
                  className="menu-item menu-item-type-post_type menu-item-object-page menu-item-137"
                >
                  <a href="https://www.my-big-toe.com/about/">About</a>
                </li>
                <li
                  id="menu-item-9"
                  className="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-4 current_page_item menu-item-9"
                >
                  <a href="https://videosearch.my-big-toe.com">Video Search</a>

                  <ul className="sub-menu">
                    <li
                      id="menu-item-241"
                      className="menu-item menu-item-type-post_type menu-item-object-page menu-item-241"
                    >
                      <a href="https://www.my-big-toe.com/media/">Videos</a>
                    </li>
                  </ul>
                </li>
                <li
                  id="menu-item-10"
                  className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-10"
                >
                  <a href="https://www.my-big-toe.com/store1">Store</a>
                  <ul className="sub-menu">
                    <li
                      id="menu-item-142"
                      className="menu-item menu-item-type-taxonomy menu-item-object-product_cat menu-item-142"
                    >
                      <a href="https://www.my-big-toe.com/product-category/paperback-books/">
                        Paperback Books
                      </a>
                    </li>
                    <li
                      id="menu-item-141"
                      className="menu-item menu-item-type-taxonomy menu-item-object-product_cat menu-item-141"
                    >
                      <a href="https://www.my-big-toe.com/product-category/hardback-books/">
                        Hardback Books
                      </a>
                    </li>
                    <li
                      id="menu-item-389"
                      className="menu-item menu-item-type-custom menu-item-object-custom menu-item-389"
                    >
                      <a href="http://www.mbtevents.com/store">Binaural Beats</a>
                    </li>
                    <li
                      id="menu-item-140"
                      className="menu-item menu-item-type-taxonomy menu-item-object-product_cat menu-item-140"
                    >
                      <a href="https://www.my-big-toe.com/product-category/reseller-payment/">
                        Payments &amp; Donations
                      </a>
                    </li>
                    <li
                      id="menu-item-1088"
                      className="menu-item menu-item-type-custom menu-item-object-custom menu-item-1088"
                    >
                      <a href="https://shop.spreadshirt.com/my-big-toe/">MBT T-Shirts &amp; More</a>
                    </li>
                  </ul>
                </li>
                <li
                  id="menu-item-11"
                  className="menu-item menu-item-type-custom menu-item-object-custom menu-item-11"
                >
                  <a target="_blank" rel="noopener noreferrer" href="https://www.mbtevents.com/">
                    Events
                  </a>
                </li>
                <li
                  id="menu-item-956"
                  className="menu-item menu-item-type-post_type menu-item-object-page menu-item-956"
                >
                  <a href="https://www.my-big-toe.com/mbt-links/">Links</a>
                </li>
                <li
                  id="menu-item-396"
                  className="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-396"
                >
                  <a href="https://www.my-big-toe.com/downloads/">Downloads</a>
                  <ul className="sub-menu">
                    <li
                      id="menu-item-241"
                      className="menu-item menu-item-type-post_type menu-item-object-page menu-item-241"
                    >
                      <a href="https://www.my-big-toe.com/workshop-gems/">
                        Workshop Slides and Gems
                      </a>
                    </li>
                    <li
                      id="menu-item-397"
                      className="menu-item menu-item-type-custom menu-item-object-custom menu-item-397"
                    >
                      <a href="http://www.my-big-toe.com/uploads/MBT%20Figures%20and%20Equations.pdf">
                        Figures &amp; Equations
                      </a>
                    </li>
                  </ul>
                </li>
                <li
                  id="menu-item-1022"
                  className="menu-item menu-item-type-post_type menu-item-object-page page_item page-item-1016 current_page_item menu-item-1022"
                >
                  <a href="https://www.my-big-toe.com/support/" aria-current="page">
                    Support MBT
                  </a>
                </li>
                <li
                  id="menu-item-324"
                  className="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-324"
                >
                  <a href="https://mbt.guide/contact">Contact</a>
                  <ul className="sub-menu">
                    <li
                      id="menu-item-420"
                      className="menu-item menu-item-type-post_type menu-item-object-page menu-item-420"
                    >
                      <a href="https://www.my-big-toe.com/customer-service/">Customer Service</a>
                    </li>
                  </ul>
                </li>
                <li
                  className="menu-item wpmenucartli wpmenucart-display-standard menu-item empty-wpmenucart"
                  id="wpmenucartli"
                >
                  <a className="wpmenucart-contents empty-wpmenucart" style={{ display: 'none' }}>
                    &nbsp;
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </nav>
      </header>
      <div className="page-heading">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="entry-title"></h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

AppHeader.defaultProps = {};

export default AppHeader;
