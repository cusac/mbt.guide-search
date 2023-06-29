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

  // itemscope="itemscope"
  // itemscope=""

  return (
    <div className="AppHeader">
      <header
        id="site-header"
        className="minimal-header clr"
        data-height="81"
        itemType="https://schema.org/WPHeader"
        role="banner"
      >
        <div id="site-header-inner" className="clr container">
          <div id="site-logo" className="clr" itemType="https://schema.org/Brand">
            <div id="site-logo-inner" className="clr">
              <a
                href="https://thomasc251.sg-host.com/en/"
                className="custom-logo-link"
                rel="home"
                aria-current="page"
              >
                <img
                  width="385"
                  height="118"
                  src="https://thomasc251.sg-host.com/wp-content/uploads/2023/05/A-Big-Picture-Theory-of-Everything-by-Tom-Campbell-black-full-size.png"
                  className="custom-logo"
                  alt="My Big TOE"
                  decoding="async"
                  srcSet="https://thomasc251.sg-host.com/wp-content/uploads/2023/05/A-Big-Picture-Theory-of-Everything-by-Tom-Campbell-black-full-size.png 385w, https://thomasc251.sg-host.com/wp-content/uploads/2023/05/A-Big-Picture-Theory-of-Everything-by-Tom-Campbell-black-full-size-300x92.png 300w"
                  sizes="(max-width: 385px) 100vw, 385px"
                />
              </a>
            </div>
          </div>

          <div id="site-navigation-wrap" className="clr">
            <nav
              id="site-navigation"
              className="navigation main-navigation clr"
              itemType="https://schema.org/SiteNavigationElement"
              role="navigation"
            >
              <ul id="menu-main-menu" className="main-menu dropdown-menu sf-menu">
                <li
                  id="menu-item-19207"
                  className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children dropdown menu-item-19207"
                >
                  <a href="#" className="menu-link">
                    <span className="text-wrap">
                      About
                      <i className="nav-arrow fa fa-angle-down" aria-hidden="true" role="img"></i>
                    </span>
                  </a>
                  <ul className="sub-menu" style={{ opacity: 0, visibility: 'hidden' }}>
                    <li
                      id="menu-item-15917"
                      className="menu-item menu-item-type-post_type menu-item-object-page menu-item-15917"
                    >
                      <a
                        href="https://thomasc251.sg-host.com/en/my-big-toe-new-scientific-model-reality/"
                        className="menu-link"
                      >
                        <span className="text-wrap">My Big TOE</span>
                      </a>
                    </li>{' '}
                    <li
                      id="menu-item-17619"
                      className="menu-item menu-item-type-post_type menu-item-object-page menu-item-17619"
                    >
                      <a
                        href="https://thomasc251.sg-host.com/en/tom-campbell/"
                        className="menu-link"
                      >
                        <span className="text-wrap">Tom Campbell</span>
                      </a>
                    </li>{' '}
                    <li
                      id="menu-item-11849"
                      className="menu-item menu-item-type-post_type menu-item-object-page menu-item-11849"
                    >
                      <a
                        href="https://thomasc251.sg-host.com/en/quantum-physics-experiments/"
                        className="menu-link"
                      >
                        <span className="text-wrap">The Quantum Physics Experiments</span>
                      </a>
                    </li>{' '}
                    <li
                      id="menu-item-13880"
                      className="menu-item menu-item-type-post_type menu-item-object-page menu-item-13880"
                    >
                      <a
                        href="https://thomasc251.sg-host.com/en/how-engage-my-big-toe/"
                        className="menu-link"
                      >
                        <span className="text-wrap">How to Engage My Big TOE</span>
                      </a>
                    </li>{' '}
                    <li
                      id="menu-item-13840"
                      className="menu-item menu-item-type-post_type menu-item-object-page menu-item-13840"
                    >
                      <a
                        href="https://thomasc251.sg-host.com/en/computer-metaphors-terminology/"
                        className="menu-link"
                      >
                        <span className="text-wrap">Computer Metaphors and Terminology</span>
                      </a>
                    </li>
                  </ul>
                </li>
                <li
                  id="menu-item-12870"
                  className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children dropdown menu-item-12870"
                >
                  <a href="#" className="menu-link">
                    <span className="text-wrap">
                      Theory
                      <i className="nav-arrow fa fa-angle-down" aria-hidden="true" role="img"></i>
                    </span>
                  </a>
                  <ul className="sub-menu" style={{ opacity: 0, visibility: 'hidden' }}>
                    <li
                      id="menu-item-274"
                      className="menu-item menu-item-type-post_type menu-item-object-page menu-item-274"
                    >
                      <a
                        href="https://thomasc251.sg-host.com/en/overview-of-my-big-toe/"
                        className="menu-link"
                      >
                        <span className="text-wrap">Overview</span>
                      </a>
                    </li>{' '}
                    <li
                      id="menu-item-18141"
                      className="menu-item menu-item-type-post_type menu-item-object-page menu-item-18141"
                    >
                      <a
                        href="https://thomasc251.sg-host.com/en/philosophical-foundations/"
                        className="menu-link"
                      >
                        <span className="text-wrap">Part 1: Philosophical Foundations</span>
                      </a>
                    </li>{' '}
                    <li
                      id="menu-item-18240"
                      className="menu-item menu-item-type-post_type menu-item-object-page menu-item-18240"
                    >
                      <a
                        href="https://thomasc251.sg-host.com/en/core-elements/"
                        className="menu-link"
                      >
                        <span className="text-wrap">Part 2: Core Elements</span>
                      </a>
                    </li>{' '}
                    <li
                      id="menu-item-18306"
                      className="menu-item menu-item-type-post_type menu-item-object-page menu-item-18306"
                    >
                      <a
                        href="https://thomasc251.sg-host.com/en/consciousness-evolution/"
                        className="menu-link"
                      >
                        <span className="text-wrap">Part 3: Consciousness Evolution</span>
                      </a>
                    </li>{' '}
                    <li
                      id="menu-item-18307"
                      className="menu-item menu-item-type-post_type menu-item-object-page menu-item-18307"
                    >
                      <a
                        href="https://thomasc251.sg-host.com/en/introductory-videos/"
                        className="menu-link"
                      >
                        <span className="text-wrap">Introductory Videos</span>
                      </a>
                    </li>{' '}
                    <li
                      id="menu-item-1012"
                      className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1012"
                    >
                      <a href="https://thomasc251.sg-host.com/en/glossary/" className="menu-link">
                        <span className="text-wrap">Glossary</span>
                      </a>
                    </li>
                  </ul>
                </li>
                <li
                  id="menu-item-19208"
                  className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children dropdown menu-item-19208"
                >
                  <a href="#" className="menu-link">
                    <span className="text-wrap">
                      Explore
                      <i className="nav-arrow fa fa-angle-down" aria-hidden="true" role="img"></i>
                    </span>
                  </a>
                  <ul className="sub-menu" style={{ opacity: 0, visibility: 'hidden' }}>
                    <li
                      id="menu-item-281"
                      className="menu-item menu-item-type-post_type menu-item-object-page menu-item-281"
                    >
                      <a
                        href="https://thomasc251.sg-host.com/en/video-search-tools/"
                        className="menu-link"
                      >
                        <span className="text-wrap">Videos &amp; Search Tools</span>
                      </a>
                    </li>{' '}
                    <li
                      id="menu-item-323"
                      className="menu-item menu-item-type-post_type menu-item-object-page menu-item-323"
                    >
                      <a
                        href="https://thomasc251.sg-host.com/en/cart/books-audiobooks/"
                        className="menu-link"
                      >
                        <span className="text-wrap">Books &amp; Audiobooks</span>
                      </a>
                    </li>{' '}
                    <li
                      id="menu-item-17376"
                      className="menu-item menu-item-type-post_type menu-item-object-page menu-item-17376"
                    >
                      <a
                        href="https://thomasc251.sg-host.com/en/my-big-toe-podcast/"
                        className="menu-link"
                      >
                        <span className="text-wrap">Podcast</span>
                      </a>
                    </li>{' '}
                    <li
                      id="menu-item-4649"
                      className="menu-item menu-item-type-post_type menu-item-object-page menu-item-4649"
                    >
                      <a
                        href="https://thomasc251.sg-host.com/en/interviews-conversations/"
                        className="menu-link"
                      >
                        <span className="text-wrap">Interviews &amp; Conversations</span>
                      </a>
                    </li>{' '}
                    <li
                      id="menu-item-4669"
                      className="menu-item menu-item-type-post_type menu-item-object-page menu-item-4669"
                    >
                      <a
                        href="https://thomasc251.sg-host.com/en/workshops-lectures/"
                        className="menu-link"
                      >
                        <span className="text-wrap">Workshops &amp; Lectures</span>
                      </a>
                    </li>{' '}
                    <li
                      id="menu-item-17354"
                      className="menu-item menu-item-type-post_type menu-item-object-page menu-item-17354"
                    >
                      <a
                        href="https://thomasc251.sg-host.com/en/applying-my-big-toe-daily-life/"
                        className="menu-link"
                      >
                        <span className="text-wrap">Daily-Life Applications</span>
                      </a>
                    </li>{' '}
                    <li
                      id="menu-item-6417"
                      className="menu-item menu-item-type-post_type menu-item-object-page menu-item-6417"
                    >
                      <a
                        href="https://thomasc251.sg-host.com/en/resources-other-languages/"
                        className="menu-link"
                      >
                        <span className="text-wrap">Resources in Other Languages</span>
                      </a>
                    </li>
                  </ul>
                </li>
                <li
                  id="menu-item-19209"
                  className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children dropdown menu-item-19209"
                >
                  <a href="#" className="menu-link">
                    <span className="text-wrap">
                      Connect
                      <i className="nav-arrow fa fa-angle-down" aria-hidden="true" role="img"></i>
                    </span>
                  </a>
                  <ul className="sub-menu" style={{ opacity: 0, visibility: 'hidden' }}>
                    <li
                      id="menu-item-1996"
                      className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1996"
                    >
                      <a href="https://thomasc251.sg-host.com/en/mbt-events/" className="menu-link">
                        <span className="text-wrap">MBT Events</span>
                      </a>
                    </li>{' '}
                    <li
                      id="menu-item-9967"
                      className="menu-item menu-item-type-post_type menu-item-object-page menu-item-9967"
                    >
                      <a href="https://thomasc251.sg-host.com/en/mbt-forum/" className="menu-link">
                        <span className="text-wrap">MBT Forum</span>
                      </a>
                    </li>{' '}
                    <li
                      id="menu-item-2015"
                      className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2015"
                    >
                      <a
                        href="https://thomasc251.sg-host.com/en/fireside-chats/"
                        className="menu-link"
                      >
                        <span className="text-wrap">Fireside Chats</span>
                      </a>
                    </li>{' '}
                    <li
                      id="menu-item-2003"
                      className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2003"
                    >
                      <a
                        href="https://thomasc251.sg-host.com/en/social-media/"
                        className="menu-link"
                      >
                        <span className="text-wrap">Social Media</span>
                      </a>
                    </li>
                  </ul>
                </li>
                <li
                  id="menu-item-10198"
                  className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children dropdown menu-item-10198"
                >
                  <a href="#" className="menu-link">
                    <span className="text-wrap">
                      Shop
                      <i className="nav-arrow fa fa-angle-down" aria-hidden="true" role="img"></i>
                    </span>
                  </a>
                  <ul className="sub-menu" style={{ opacity: 0, visibility: 'hidden' }}>
                    <li
                      id="menu-item-10197"
                      className="menu-item menu-item-type-post_type menu-item-object-page menu-item-10197"
                    >
                      <a href="https://thomasc251.sg-host.com/en/bookshop/" className="menu-link">
                        <span className="text-wrap">Books</span>
                      </a>
                    </li>{' '}
                    <li
                      id="menu-item-12744"
                      className="menu-item menu-item-type-post_type menu-item-object-page menu-item-12744"
                    >
                      <a
                        href="https://thomasc251.sg-host.com/en/toms-park-virtual-imaginality-experience/"
                        className="menu-link"
                      >
                        <span className="text-wrap">Tom’s Park</span>
                      </a>
                    </li>{' '}
                    <li
                      id="menu-item-13866"
                      className="menu-item menu-item-type-post_type menu-item-object-page menu-item-13866"
                    >
                      <a
                        href="https://thomasc251.sg-host.com/en/exploring-consciousness-larger-reality/"
                        className="menu-link"
                      >
                        <span className="text-wrap">
                          Exploring Consciousness and the Larger Reality
                        </span>
                      </a>
                    </li>{' '}
                    <li
                      id="menu-item-14454"
                      className="menu-item menu-item-type-post_type menu-item-object-page menu-item-14454"
                    >
                      <a
                        href="https://thomasc251.sg-host.com/en/shop-binaural-beats/"
                        className="menu-link"
                      >
                        <span className="text-wrap">Binaural Beats</span>
                      </a>
                    </li>{' '}
                    <li
                      id="menu-item-12746"
                      className="menu-item menu-item-type-post_type menu-item-object-page menu-item-12746"
                    >
                      <a
                        href="https://thomasc251.sg-host.com/en/shop-mbt-merchandise/"
                        className="menu-link"
                      >
                        <span className="text-wrap">MBT Merchandise</span>
                      </a>
                    </li>
                  </ul>
                </li>
                <li
                  id="menu-item-12867"
                  className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children dropdown menu-item-12867"
                >
                  <a href="#" className="menu-link">
                    <span className="text-wrap">
                      Contribute
                      <i className="nav-arrow fa fa-angle-down" aria-hidden="true" role="img"></i>
                    </span>
                  </a>
                  <ul className="sub-menu" style={{ opacity: 0, visibility: 'hidden' }}>
                    <li
                      id="menu-item-1988"
                      className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1988"
                    >
                      <a
                        href="https://thomasc251.sg-host.com/en/contribute-donations/"
                        className="menu-link"
                      >
                        <span className="text-wrap">Donate</span>
                      </a>
                    </li>{' '}
                    <li
                      id="menu-item-5095"
                      className="menu-item menu-item-type-post_type menu-item-object-page menu-item-5095"
                    >
                      <a
                        href="https://thomasc251.sg-host.com/en/support-mbt-volunteering/"
                        className="menu-link"
                      >
                        <span className="text-wrap">Volunteer</span>
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="woo-menu-icon wcmenucart-toggle-cart toggle-cart-widget">
                  <a href="https://thomasc251.sg-host.com/en/cart/" className="wcmenucart">
                    <span className="wcmenucart-count">
                      <i className=" icon-handbag" aria-hidden="true" role="img"></i>
                      <span className="wcmenucart-details count">0</span>
                    </span>
                  </a>
                </li>

                <li className="search-toggle-li">
                  <a
                    href="https://thomasc251.sg-host.com/en/#/"
                    className="site-search-toggle search-dropdown-toggle"
                  >
                    <span className="screen-reader-text">Toggle website search</span>
                    <i className=" icon-magnifier" aria-hidden="true" role="img"></i>
                  </a>
                </li>
              </ul>
              <div id="searchform-dropdown" className="header-searchform-wrap clr">
                <form
                  aria-label="Search this website"
                  role="search"
                  method="get"
                  className="searchform"
                  action="https://thomasc251.sg-host.com/en/"
                >
                  <input
                    aria-label="Insert search query"
                    type="search"
                    id="ocean-search-form-1"
                    className="field"
                    autoComplete="off"
                    placeholder="Search"
                    name="s"
                  />
                  <input type="hidden" name="lang" value="en" />
                </form>
              </div>
              {/* <!-- #searchform-dropdown --> */}
            </nav>
            {/* <!-- #site-navigation --> */}
          </div>
          {/* <!-- #site-navigation-wrap --> */}

          <div className="oceanwp-mobile-menu-icon clr mobile-right">
            <a href="https://thomasc251.sg-host.com/en/cart/" className="wcmenucart">
              <span className="wcmenucart-count">
                <i className=" icon-handbag" aria-hidden="true" role="img"></i>
                <span className="wcmenucart-details count">0</span>
              </span>
            </a>

            <a
              href="https://thomasc251.sg-host.com/en/#/mobile-menu-toggle"
              className="mobile-menu"
              aria-label="Mobile Menu"
            >
              <i className="fa fa-bars" aria-hidden="true"></i>
              <span className="oceanwp-text">Menu</span>
              <span className="oceanwp-close-text">Close</span>
            </a>
          </div>
          {/* <!-- #oceanwp-mobile-menu-navbar --> */}
        </div>
        {/* <!-- #site-header-inner --> */}

        <div
          id="mobile-dropdown"
          className="clr"
          style={{ boxSizing: 'border-box', display: 'none' }}
        >
          <nav className="clr" itemType="https://schema.org/SiteNavigationElement">
            <ul id="menu-main-menu-1" className="menu">
              <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-19207">
                <a href="#">
                  About<span className="dropdown-toggle" tabIndex={0}></span>
                </a>
                <ul className="sub-menu">
                  <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-15917">
                    <a href="https://thomasc251.sg-host.com/en/my-big-toe-new-scientific-model-reality/">
                      My Big TOE
                    </a>
                  </li>
                  <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-17619">
                    <a href="https://thomasc251.sg-host.com/en/tom-campbell/">Tom Campbell</a>
                  </li>
                  <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-11849">
                    <a href="https://thomasc251.sg-host.com/en/quantum-physics-experiments/">
                      The Quantum Physics Experiments
                    </a>
                  </li>
                  <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-13880">
                    <a href="https://thomasc251.sg-host.com/en/how-engage-my-big-toe/">
                      How to Engage My Big TOE
                    </a>
                  </li>
                  <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-13840">
                    <a href="https://thomasc251.sg-host.com/en/computer-metaphors-terminology/">
                      Computer Metaphors and Terminology
                    </a>
                  </li>
                </ul>
              </li>
              <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-12870">
                <a href="#">
                  Theory<span className="dropdown-toggle" tabIndex={0}></span>
                </a>
                <ul className="sub-menu">
                  <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-274">
                    <a href="https://thomasc251.sg-host.com/en/overview-of-my-big-toe/">Overview</a>
                  </li>
                  <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-18141">
                    <a href="https://thomasc251.sg-host.com/en/philosophical-foundations/">
                      Part 1: Philosophical Foundations
                    </a>
                  </li>
                  <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-18240">
                    <a href="https://thomasc251.sg-host.com/en/core-elements/">
                      Part 2: Core Elements
                    </a>
                  </li>
                  <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-18306">
                    <a href="https://thomasc251.sg-host.com/en/consciousness-evolution/">
                      Part 3: Consciousness Evolution
                    </a>
                  </li>
                  <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-18307">
                    <a href="https://thomasc251.sg-host.com/en/introductory-videos/">
                      Introductory Videos
                    </a>
                  </li>
                  <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1012">
                    <a href="https://thomasc251.sg-host.com/en/glossary/">Glossary</a>
                  </li>
                </ul>
              </li>
              <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-19208">
                <a href="#">
                  Explore<span className="dropdown-toggle" tabIndex={0}></span>
                </a>
                <ul className="sub-menu">
                  <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-281">
                    <a href="https://thomasc251.sg-host.com/en/video-search-tools/">
                      Videos &amp; Search Tools
                    </a>
                  </li>
                  <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-323">
                    <a href="https://thomasc251.sg-host.com/en/cart/books-audiobooks/">
                      Books &amp; Audiobooks
                    </a>
                  </li>
                  <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-17376">
                    <a href="https://thomasc251.sg-host.com/en/my-big-toe-podcast/">Podcast</a>
                  </li>
                  <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-4649">
                    <a href="https://thomasc251.sg-host.com/en/interviews-conversations/">
                      Interviews &amp; Conversations
                    </a>
                  </li>
                  <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-4669">
                    <a href="https://thomasc251.sg-host.com/en/workshops-lectures/">
                      Workshops &amp; Lectures
                    </a>
                  </li>
                  <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-17354">
                    <a href="https://thomasc251.sg-host.com/en/applying-my-big-toe-daily-life/">
                      Daily-Life Applications
                    </a>
                  </li>
                  <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-6417">
                    <a href="https://thomasc251.sg-host.com/en/resources-other-languages/">
                      Resources in Other Languages
                    </a>
                  </li>
                </ul>
              </li>
              <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-19209">
                <a href="#">
                  Connect<span className="dropdown-toggle" tabIndex={0}></span>
                </a>
                <ul className="sub-menu">
                  <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1996">
                    <a href="https://thomasc251.sg-host.com/en/mbt-events/">MBT Events</a>
                  </li>
                  <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-9967">
                    <a href="https://thomasc251.sg-host.com/en/mbt-forum/">MBT Forum</a>
                  </li>
                  <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2015">
                    <a href="https://thomasc251.sg-host.com/en/fireside-chats/">Fireside Chats</a>
                  </li>
                  <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2003">
                    <a href="https://thomasc251.sg-host.com/en/social-media/">Social Media</a>
                  </li>
                </ul>
              </li>
              <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-10198">
                <a href="#">
                  Shop<span className="dropdown-toggle" tabIndex={0}></span>
                </a>
                <ul className="sub-menu">
                  <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-10197">
                    <a href="https://thomasc251.sg-host.com/en/bookshop/">Books</a>
                  </li>
                  <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-12744">
                    <a href="https://thomasc251.sg-host.com/en/toms-park-virtual-imaginality-experience/">
                      Tom’s Park
                    </a>
                  </li>
                  <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-13866">
                    <a href="https://thomasc251.sg-host.com/en/exploring-consciousness-larger-reality/">
                      Exploring Consciousness and the Larger Reality
                    </a>
                  </li>
                  <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-14454">
                    <a href="https://thomasc251.sg-host.com/en/shop-binaural-beats/">
                      Binaural Beats
                    </a>
                  </li>
                  <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-12746">
                    <a href="https://thomasc251.sg-host.com/en/shop-mbt-merchandise/">
                      MBT Merchandise
                    </a>
                  </li>
                </ul>
              </li>
              <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-12867">
                <a href="#">
                  Contribute<span className="dropdown-toggle" tabIndex={0}></span>
                </a>
                <ul className="sub-menu">
                  <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1988">
                    <a href="https://thomasc251.sg-host.com/en/contribute-donations/">Donate</a>
                  </li>
                  <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-5095">
                    <a href="https://thomasc251.sg-host.com/en/support-mbt-volunteering/">
                      Volunteer
                    </a>
                  </li>
                </ul>
              </li>

              <li className="woo-menu-icon wcmenucart-toggle-cart toggle-cart-widget">
                <a href="https://thomasc251.sg-host.com/en/cart/" className="wcmenucart">
                  <span className="wcmenucart-count">
                    <i className=" icon-handbag" aria-hidden="true" role="img"></i>
                    <span className="wcmenucart-details count">0</span>
                  </span>
                </a>
              </li>

              <li className="search-toggle-li">
                <a
                  href="https://thomasc251.sg-host.com/en/#/"
                  className="site-search-toggle search-dropdown-toggle"
                >
                  <span className="screen-reader-text">Toggle website search</span>
                  <i className=" icon-magnifier" aria-hidden="true" role="img"></i>
                </a>
              </li>
            </ul>
            <div id="mobile-menu-search" className="clr">
              <form
                aria-label="Search this website"
                method="get"
                action="https://thomasc251.sg-host.com/en/"
                className="mobile-searchform"
              >
                <input
                  aria-label="Insert search query"
                  value=""
                  className="field"
                  id="ocean-mobile-search-2"
                  type="search"
                  name="s"
                  autoComplete="off"
                  placeholder="Search"
                />
                <button aria-label="Submit search" type="submit" className="searchform-submit">
                  <i className=" icon-magnifier" aria-hidden="true" role="img"></i>{' '}
                </button>
                <input type="hidden" name="lang" value="en" />{' '}
              </form>
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
};

AppHeader.defaultProps = {};

export default AppHeader;
