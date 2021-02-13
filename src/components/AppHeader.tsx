import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, RootState } from 'store';
import * as components from '../components';
import * as utils from '../utils';
import { toastError } from '../utils';
import logo from '../images/logo-square.png';
import { Image } from 'semantic-ui-react';

const { Button, Grid, Searchbar, Icon, Auth, Header, Menu } = components;

const AppHeader = (): any => {
  const [loading, setLoading] = React.useState(false);

  const currentUser = useSelector((state: RootState) => state.auth.user);
  const previousView = useSelector((state: RootState) => state.main.previousView);
  const searchType = useSelector((state: RootState) => state.video.searchType);
  const showSearchbar = useSelector((state: RootState) => state.main.showSearchbar);
  const lastViewedSegmentId = useSelector((state: RootState) => state.video.lastViewedSegmentId);
  const lastViewedVideoId = useSelector((state: RootState) => state.video.lastViewedVideoId);

  const dispatch = useDispatch();

  const logoutClick = async () => {
    try {
      await dispatch(logout());
    } catch (err) {
      toastError('There was an error logging out.', err);
    }
  };

  const defaultSegmentId = '156b09ce-7dab-417a-8295-f6f86f1f504a';

  const activeTab = previousView ? previousView : searchType;

  const backText = previousView === 'video' ? 'Back To Video Search' : 'Back To Segment Search';

  const backToPreviousView = () => {
    if (previousView === 'video') {
      utils.history.push(`/videos/${lastViewedVideoId}`);
    } else {
      utils.history.push(`/segments/${lastViewedSegmentId}`);
    }
  };

  return (
    <Grid className="AppHeader">
      <Grid.Row style={{ paddingBottom: 0 }}>
        <Grid.Column style={{ color: 'white ' }} verticalAlign="middle" width={1}></Grid.Column>
        <Grid.Column style={{ color: 'white ' }} verticalAlign="middle" width={3}>
          <Image
            size="small"
            src={logo}
            className="logo"
            alt="My Big TOE guide"
            onClick={() => utils.history.push(`/`)}
          ></Image>
        </Grid.Column>

        <Grid.Column style={{ color: 'white ' }} verticalAlign="middle" width={8}>
          {showSearchbar && <Searchbar />}
          {!showSearchbar && (
            <Button onClick={() => backToPreviousView()}>
              <Icon name="arrow left" />
              {backText}
            </Button>
          )}
        </Grid.Column>
      </Grid.Row>
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
