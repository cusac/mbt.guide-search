import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, RootState } from 'store';
import * as components from '../components';
import * as utils from '../utils';
import { toastError } from '../utils';
import logo from '../images/logo-dark.png';
import { Dropdown, Image, Container } from 'semantic-ui-react';
import { Media } from './Media';

const { Button, Grid, Searchbar, Icon, Auth, Header, Menu, Link } = components;

const AppHeader = (): any => {
  const [loading, setLoading] = React.useState(false);

  return (
    <Grid className="AppHeader">
      <Media greaterThan="computer">
        {(mediaClassNames, renderChildren) => {
          return renderChildren ? (
            <Grid.Row style={{ paddingTop: 30, paddingBottom: '0px' }} centered>
              <Grid.Column style={{ color: 'white', padding: 0 }} verticalAlign="middle" width={14}>
                <Image
                  src={logo}
                  className="logo"
                  alt="MBT video search"
                  onClick={() => (window.location.href = 'http://my-big-toe.com')}
                ></Image>
              </Grid.Column>
            </Grid.Row>
          ) : null;
        }}
      </Media>

      <Media lessThan="largescreen">
        {(mediaClassNames, renderChildren) => {
          return renderChildren ? (
            <Grid.Row style={{ paddingTop: 30, paddingBottom: '0px' }} centered>
              <Grid.Column style={{ color: 'white', padding: 0 }} verticalAlign="middle" width={13}>
                <Image
                  src="https://www.my-big-toe.com/wp-content/themes/mybigtoe/images/icon-logo.png"
                  className="logo"
                  alt="MBT video search"
                  onClick={() => (window.location.href = 'http://my-big-toe.com')}
                ></Image>
              </Grid.Column>
            </Grid.Row>
          ) : null;
        }}
      </Media>

      <Grid.Row centered>
        <Media greaterThan="computer">
          {(mediaClassNames, renderChildren) => {
            return renderChildren ? (
              <Grid.Column verticalAlign="middle" width={4}></Grid.Column>
            ) : null;
          }}
        </Media>

        <Grid.Column verticalAlign="middle" width={12} only="computer">
          <Menu>
            <Menu.Item>
              <div className="headerLinks">
                <a href="https://www.my-big-toe.com/">HOME</a>
              </div>
            </Menu.Item>
            <Menu.Item>
              <div className="headerLinks">
                <a href="https://www.my-big-toe.com/about">ABOUT</a>
              </div>
            </Menu.Item>
            <Menu.Item>
              <div className="headerLinks">
                <a href="https://www.my-big-toe.com/about">VIDEOS</a>
              </div>
            </Menu.Item>
            <Dropdown item simple text="STORE" icon={null} className="headerLinks">
              <Dropdown.Menu>
                <Dropdown.Item>PAPER BACK BOOKS</Dropdown.Item>
                <Dropdown.Item>HARD BACK BOOKS</Dropdown.Item>
                <Dropdown.Item>BINURAL BEATS</Dropdown.Item>
                <Dropdown.Item>{'PAYMENTS & DONATIONS'}</Dropdown.Item>
                <Dropdown.Item>{'MBT T-SHIRTS & MORE'}</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Menu.Item>
              <div className="headerLinks">
                <a href="https://www.my-big-toe.com/about">EVENTS</a>
              </div>
            </Menu.Item>
            <Menu.Item>
              <div className="headerLinks">
                <a href="https://www.my-big-toe.com/about">LINKS</a>
              </div>
            </Menu.Item>
            <Menu.Item>
              <div className="headerLinks">
                <a href="https://www.my-big-toe.com/about">DOWNLOADS</a>
              </div>
            </Menu.Item>
            <Menu.Item>
              <div className="headerLinks">
                <a href="https://www.my-big-toe.com/about">SUPPORT MBT</a>
              </div>
            </Menu.Item>
            <Menu.Item>
              <div className="headerLinks">
                <a href="https://www.my-big-toe.com/about">CONTACT</a>
              </div>
            </Menu.Item>
          </Menu>
          {/* <Menu>
            <Menu.Item name="home">
              <div className="headerLinks">
                <a href="https://www.my-big-toe.com/">HOME</a>
              </div>
            </Menu.Item>
            <Menu.Item name="about">
              <div className="headerLinks">
                <a href="https://www.my-big-toe.com/about">ABOUT</a>
              </div>
            </Menu.Item>
            <Menu.Item name="videos">
              <div className="headerLinks">
                <a href="https://www.my-big-toe.com/media">VIDEOS</a>
              </div>
            </Menu.Item>
            <Menu.Item name="videos">
              <div className="headerLinks">
                <a href="https://www.my-big-toe.com/media">VIDEOS</a>
              </div>
            </Menu.Item>
            <Dropdown options={options}>
              <div className="headerLinks">
                <a href="https://www.my-big-toe.com/media">STORE</a>
              </div>
            </Dropdown>
            <Menu.Item name="videos">
              <div className="headerLinks">
                <a href="https://www.my-big-toe.com/media">VIDEOS</a>
              </div>
            </Menu.Item>
            <Menu.Item name="videos">
              <div className="headerLinks">
                <a href="https://www.my-big-toe.com/media">VIDEOS</a>
              </div>
            </Menu.Item>
            <Menu.Item name="videos">
              <div className="headerLinks">
                <a href="https://www.my-big-toe.com/media">SUPPORT MBT</a>
              </div>
            </Menu.Item>
            <Menu.Item name="videos">
              <div className="headerLinks">
                <a href="https://www.my-big-toe.com/media">VIDEOS</a>
              </div>
            </Menu.Item>
            <Menu.Item name="videos">
              <div className="headerLinks">
                <a href="https://www.my-big-toe.com/media">VIDEOS</a>
              </div>
            </Menu.Item>
          </Menu> */}
          {/* <Grid stackable columns={2} centered>
            <Grid.Column width={12} floated="right">
              <Grid columns={7}>
                <Grid.Column>
                  <div className="headerLinks">
                    <a href="https://www.my-big-toe.com/">HOME</a>
                  </div>
                </Grid.Column>
                <Grid.Column>
                  <div className="headerLinks">
                    <a href="https://www.my-big-toe.com/about">ABOUT</a>
                  </div>
                </Grid.Column>
                <Grid.Column>
                  <div className="headerLinks">
                    <a href="https://www.my-big-toe.com/media">VIDEOS</a>
                  </div>
                </Grid.Column>
                <Grid.Column>
                  <div className="headerLinks">
                    <a href="https://www.my-big-toe.com/store1">STORE</a>
                  </div>
                </Grid.Column>
                <Grid.Column>
                  <div className="headerLinks">
                    <a href="https://www.mbtevents.com/">EVENTS</a>
                  </div>
                </Grid.Column>
                <Grid.Column>
                  <div className="headerLinks">
                    <a href="https://www.my-big-toe.com/mbt-links">LINKS</a>
                  </div>
                </Grid.Column>
                <Grid.Column>
                  <div className="headerLinksActive">VIDEO SEARCH</div>
                </Grid.Column>
              </Grid>
            </Grid.Column>

            <Grid.Column width={4} floated="left">
              <Grid columns={2}>
                <Grid.Column>
                  <div className="headerLinks">
                    <a href="https://www.my-big-toe.com/support">SUPPORT MBT</a>
                  </div>
                </Grid.Column>
                <Grid.Column>
                  <div className="headerLinks">
                    <a href="https://www.my-big-toe.com/contact">CONTACT</a>
                  </div>
                </Grid.Column>
              </Grid>
            </Grid.Column>
          </Grid> */}
        </Grid.Column>

        <Grid.Column verticalAlign="middle" width={13} only="tablet">
          <Menu>
            <Menu.Item>
              <div className="headerLinks">
                <a href="https://www.my-big-toe.com/">HOME</a>
              </div>
            </Menu.Item>
            <Menu.Item>
              <div className="headerLinks">
                <a href="https://www.my-big-toe.com/about">ABOUT</a>
              </div>
            </Menu.Item>
            <Menu.Item>
              <div className="headerLinks">
                <a href="https://www.my-big-toe.com/about">VIDEOS</a>
              </div>
            </Menu.Item>
            <Dropdown item simple text="STORE" icon={null} className="headerLinks">
              <Dropdown.Menu>
                <Dropdown.Item>PAPER BACK BOOKS</Dropdown.Item>
                <Dropdown.Item>HARD BACK BOOKS</Dropdown.Item>
                <Dropdown.Item>BINURAL BEATS</Dropdown.Item>
                <Dropdown.Item>{'PAYMENTS & DONATIONS'}</Dropdown.Item>
                <Dropdown.Item>{'MBT T-SHIRTS & MORE'}</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Menu.Item>
              <div className="headerLinks">
                <a href="https://www.my-big-toe.com/about">EVENTS</a>
              </div>
            </Menu.Item>
            <Menu.Item>
              <div className="headerLinks">
                <a href="https://www.my-big-toe.com/about">DOWNLOADS</a>
              </div>
            </Menu.Item>
          </Menu>

          <Menu>
            <Menu.Item>
              <div className="headerLinks">
                <a href="https://www.my-big-toe.com/about">SUPPORT MBT</a>
              </div>
            </Menu.Item>
            <Menu.Item>
              <div className="headerLinks">
                <a href="https://www.my-big-toe.com/about">CONTACT</a>
              </div>
            </Menu.Item>
          </Menu>
          {/* <Menu>
            <Menu.Item name="home">
              <div className="headerLinks">
                <a href="https://www.my-big-toe.com/">HOME</a>
              </div>
            </Menu.Item>
            <Menu.Item name="about">
              <div className="headerLinks">
                <a href="https://www.my-big-toe.com/about">ABOUT</a>
              </div>
            </Menu.Item>
            <Menu.Item name="videos">
              <div className="headerLinks">
                <a href="https://www.my-big-toe.com/media">VIDEOS</a>
              </div>
            </Menu.Item>
            <Menu.Item name="videos">
              <div className="headerLinks">
                <a href="https://www.my-big-toe.com/media">VIDEOS</a>
              </div>
            </Menu.Item>
            <Dropdown options={options}>
              <div className="headerLinks">
                <a href="https://www.my-big-toe.com/media">STORE</a>
              </div>
            </Dropdown>
            <Menu.Item name="videos">
              <div className="headerLinks">
                <a href="https://www.my-big-toe.com/media">VIDEOS</a>
              </div>
            </Menu.Item>
            <Menu.Item name="videos">
              <div className="headerLinks">
                <a href="https://www.my-big-toe.com/media">VIDEOS</a>
              </div>
            </Menu.Item>
            <Menu.Item name="videos">
              <div className="headerLinks">
                <a href="https://www.my-big-toe.com/media">SUPPORT MBT</a>
              </div>
            </Menu.Item>
            <Menu.Item name="videos">
              <div className="headerLinks">
                <a href="https://www.my-big-toe.com/media">VIDEOS</a>
              </div>
            </Menu.Item>
            <Menu.Item name="videos">
              <div className="headerLinks">
                <a href="https://www.my-big-toe.com/media">VIDEOS</a>
              </div>
            </Menu.Item>
          </Menu> */}
          {/* <Grid stackable columns={2} centered>
            <Grid.Column width={12} floated="right">
              <Grid columns={7}>
                <Grid.Column>
                  <div className="headerLinks">
                    <a href="https://www.my-big-toe.com/">HOME</a>
                  </div>
                </Grid.Column>
                <Grid.Column>
                  <div className="headerLinks">
                    <a href="https://www.my-big-toe.com/about">ABOUT</a>
                  </div>
                </Grid.Column>
                <Grid.Column>
                  <div className="headerLinks">
                    <a href="https://www.my-big-toe.com/media">VIDEOS</a>
                  </div>
                </Grid.Column>
                <Grid.Column>
                  <div className="headerLinks">
                    <a href="https://www.my-big-toe.com/store1">STORE</a>
                  </div>
                </Grid.Column>
                <Grid.Column>
                  <div className="headerLinks">
                    <a href="https://www.mbtevents.com/">EVENTS</a>
                  </div>
                </Grid.Column>
                <Grid.Column>
                  <div className="headerLinks">
                    <a href="https://www.my-big-toe.com/mbt-links">LINKS</a>
                  </div>
                </Grid.Column>
                <Grid.Column>
                  <div className="headerLinksActive">VIDEO SEARCH</div>
                </Grid.Column>
              </Grid>
            </Grid.Column>

            <Grid.Column width={4} floated="left">
              <Grid columns={2}>
                <Grid.Column>
                  <div className="headerLinks">
                    <a href="https://www.my-big-toe.com/support">SUPPORT MBT</a>
                  </div>
                </Grid.Column>
                <Grid.Column>
                  <div className="headerLinks">
                    <a href="https://www.my-big-toe.com/contact">CONTACT</a>
                  </div>
                </Grid.Column>
              </Grid>
            </Grid.Column>
          </Grid> */}
        </Grid.Column>
      </Grid.Row>

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
