import { useSelector } from 'react-redux';
import React from 'react';
import { RootState, setLastViewedSegmentId, setSearchText, useAppDispatch } from 'store';
import * as components from '../components';
import { Button, Container, Grid, Icon, Label, Link, List } from '../components';
import * as utils from '../utils';
import SegmentDetails from './SegmentDetails';

const SegmentViewer = ({ segment }: { segment: any }) => {
  const dispatch = useAppDispatch();

  const currentUser = useSelector((state: RootState) => state.auth.user);
  const currentUserScope = useSelector((state: RootState) => state.auth.scope);
  const lastViewedSegmentId = useSelector((state: RootState) => state.video.lastViewedSegmentId);

  React.useEffect(() => {
    segment &&
      segment.segmentId !== lastViewedSegmentId &&
      dispatch(setLastViewedSegmentId({ lastViewedSegmentId: segment.segmentId }));
  }, []);

  const canEdit =
    segment && currentUser
      ? currentUser.email === (segment as any).ownerEmail ||
        utils.hasPermission({ currentScope: currentUserScope, requiredScope: ['Admin'] })
      : false;

  const { start, end } = segment as any;
  return (
    <div>
      <div className="vidHeader">
        <div className="vidTitle">{(segment as any).title}</div>
      </div>
      <components.YouTubePlayerWithControls
        {...{ videoId: (segment as any).videoYtId, start, end }}
        autoplay
        duration={(segment as any).videoDuration}
        end={(segment as any).end}
        start={(segment as any).start}
        offsetTooltip={true}
      />

      {/* <Button style={{ margin: 15, marginTop: 50 }}>
        <Icon name="edit" />
        <Link to={{ pathname: `https://mbt.guide` }} target="_blank">
          Create Your Own Video Segments!
        </Link>
      </Button> */}

      <br />
      <SegmentDetails segment={segment} />
    </div>
  );
};

export default SegmentViewer;
