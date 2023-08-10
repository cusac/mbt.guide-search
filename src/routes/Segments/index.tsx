/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { isEmpty } from 'lodash';
import React from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { useLocation } from 'react-router-dom';
import ResizeObserver from 'resize-observer-polyfill';
import { Divider, Button, Icon, Image } from 'semantic-ui-react';
import timage from '../../images/cool-background.png';
import {
  RootState,
  searchSegments,
  setLastViewedSegmentId,
  setLoadingSegments,
  setPreviousView,
  setSearchText,
  setSearchType,
  setShowSearchbar,
  useAppDispatch,
  refreshSegmentList,
} from 'store';
import * as components from '../../components';
import LandingPage from '../../components/LandingPage';
import { mediaBreakpoints } from '../../components/Media';
import SegmentViewer from '../../components/SegmentViewer';
import * as services from '../../services';
import * as utils from '../../utils';
import { captureAndLog, toastError } from '../../utils';
import { Segment } from 'types';
import ShareBar from 'components/ShareBar';

const { Grid, SegmentList, Loading, Searchbar } = components;

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Segments = ({ segmentId }: { segmentId?: string }) => {
  const [error, setError] = React.useState();
  const [loadingSelectedSegment, setLoadingSelectedSegment] = React.useState(true);
  const [segments, setSegments] = React.useState(undefined as Array<any> | void);
  const [selectedSegment, setSelectedSegment] = React.useState(undefined as Segment | undefined);
  const [searchTextQuery, setSearchTextQuery] = React.useState('');
  const [videoColumnRef, setVideoColumnRef] = React.useState(
    undefined as HTMLDivElement | undefined
  );
  const [columnHeight, setColumnHeight] = React.useState(1024);
  const [segmentListHeader, setSegmentListHeader] = React.useState('');

  const lastViewedSegmentId = useSelector((state: RootState) => state.video.lastViewedSegmentId);
  const loadingSegments = useSelector((state: RootState) => state.video.loadingSegments);
  const searchSegmentsResult = useSelector((state: RootState) => state.video.searchSegmentsResult);
  const searchText = useSelector((state: RootState) => state.video.searchText);
  const hasSearched = useSelector((state: RootState) => state.video.hasSearched);
  const segmentListTrigger = useSelector((state: RootState) => state.video.segmentListTrigger);

  const dispatch = useAppDispatch();

  const query = useQuery();

  const isSmallComputer = useMediaQuery({ maxWidth: mediaBreakpoints.smallComputer });

  const selectSegment = async (selectSegmentId: string) => {
    dispatch(setLastViewedSegmentId({ lastViewedSegmentId: selectSegmentId }));
    utils.history.push(`/${selectSegmentId}`);
  };

  const videoColumnResizeObserver = new ResizeObserver(entries => {
    setColumnHeight(entries[0].target.clientHeight);
  });

  const shuffleSegments = () => {
    dispatch(refreshSegmentList({}));
  };

  async function fetchRandomSegments() {
    try {
      dispatch(setLoadingSegments({ loadingSegments: true }));

      const $limit = 50;

      const totalSegments = (
        await (services as any).repository.segment.list({
          $count: true,
        })
      ).data;

      const pages = Math.floor(totalSegments / $limit) - 1;

      const $page = Math.floor(Math.random() * pages);

      const segments = (
        await (services as any).repository.segment.list({
          $embed: ['video', 'tags'],
          $limit,
          $page,
        })
      ).data.docs;

      setSegments(segments);
    } catch (err) {
      captureAndLog({ file: 'Segments', method: 'fetchRandomSegments', err });
      toastError(
        'There was an error fetching segment data. Please refresh the page and try again.',
        err
      );
    } finally {
      dispatch(setLoadingSegments({ loadingSegments: false }));
    }
  }

  React.useEffect(() => {
    // We're piggybacking this view to update the stats for now
    services.stats.logStats();

    const queryText = query.get('search');
    setSearchTextQuery(queryText || '');

    if (queryText) {
      dispatch(setSearchText({ searchText: queryText }));
      dispatch(searchSegments({ term: queryText }));
    }

    // Hardcode a default segment for now
    const currentSegmentId = segmentId ? segmentId : lastViewedSegmentId;
    // !segmentId && selectSegment(currentSegmentId);
    dispatch(setPreviousView({ previousView: 'segment' }));
    dispatch(setSearchType({ searchType: 'segment' }));
    dispatch(setShowSearchbar({ showSearchbar: true }));
    dispatch(setLastViewedSegmentId({ lastViewedSegmentId: currentSegmentId }));
    if (isEmpty(searchSegmentsResult)) {
      fetchRandomSegments();
    }
  }, []);

  React.useEffect(() => {
    fetchRandomSegments();
    const url = segmentId ? `/${segmentId}?search=` : `/?search=`;
    utils.history.push(url);
  }, [segmentListTrigger]);

  React.useEffect(() => {
    const queryText = query.get('search');

    if (queryText && queryText !== searchTextQuery) {
      setSearchTextQuery(queryText);
      dispatch(searchSegments({ term: queryText }));
    }
  }, [searchText]);

  React.useEffect(() => {
    const queryText = query.get('search');

    if (queryText !== searchText) {
      setSearchTextQuery(searchText);
      const url = segmentId ? `/${segmentId}?search=${searchText}` : `/?search=${searchText}`;
      utils.history.push(url);
    }
  }, [searchSegmentsResult]);

  React.useEffect(() => {
    setSegmentListHeader(hasSearched ? 'Search Results' : 'Segment Samples');
  }, [hasSearched]);

  React.useEffect(() => {
    if (videoColumnRef && videoColumnRef.clientHeight) {
      videoColumnResizeObserver.observe(videoColumnRef);
    }
  }, [videoColumnRef]);

  React.useEffect(() => {
    searchSegmentsResult && setSegments(searchSegmentsResult);
  }, [searchSegmentsResult]);

  // Fetch the selected segment
  React.useEffect(() => {
    async function fetchSelectedSegment() {
      try {
        setLoadingSelectedSegment(true);

        const segment: Segment = (
          await (services as any).repository.segment.list({
            $embed: ['video', 'tags'],
            segmentId: segmentId,
          })
        ).data.docs[0];

        if (segment) {
          // Log the view to the segment
          await (services as any).stats.logSegmentView({ segmentId: segment._id });

          setSelectedSegment(segment as any);
        }
      } catch (err) {
        setLoadingSelectedSegment(false);
        captureAndLog({ file: 'Segments', method: 'fetchSelectedSegment', err });
        toastError(
          'There was an error fetching the selected segment. Please refresh the page and try again.',
          err
        );
      } finally {
        setLoadingSelectedSegment(false);
      }
    }
    segmentId && fetchSelectedSegment();
  }, [segmentId]);

  return (
    <div>
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column width={16}>
              <div style={{ position: 'relative' }}>
                <Image
                  style={{
                    width: '100%',
                    height: '200px',
                    transform: 'scale(1.5)',
                    marginBottom: '50px',
                  }}
                  src={timage}
                ></Image>
                <div className="image-header">Video Search Tool</div>
              </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={isSmallComputer ? 16 : 11}>
              <Searchbar />

              {!segmentId ? (
                <div>
                  <LandingPage></LandingPage>
                  <ShareBar segment={selectedSegment}></ShareBar>
                </div>
              ) : !loadingSelectedSegment ? (
                selectedSegment ? (
                  <div ref={setVideoColumnRef as any}>
                    <SegmentViewer segment={selectedSegment} />
                    <ShareBar segment={selectedSegment}></ShareBar>
                  </div>
                ) : (
                  <h2 style={{ color: 'black' }}>Segment not found. </h2>
                )
              ) : (
                <Loading>Loading segment...</Loading>
              )}
            </Grid.Column>

            <Grid.Column
              style={{ color: 'white' }}
              verticalAlign="middle"
              width={isSmallComputer ? 16 : 5}
            >
              <Button
                icon
                onClick={() => {
                  shuffleSegments();
                }}
              >
                Shuffle Segments
                <Icon className={'shuffle'} />
              </Button>
              <Divider
                horizontal
                style={{
                  marginTop: isSmallComputer ? '40px' : '20px',
                  marginBottom: isSmallComputer ? '40px' : '45px',
                }}
              >
                {segmentListHeader}
              </Divider>
              {!loadingSegments ? (
                <div>
                  {segments && segments.length > 0 ? (
                    <div style={{ marginTop: 0, overflow: 'auto', maxHeight: columnHeight }}>
                      <SegmentList
                        segments={segments as any}
                        handleSegmentSelect={(segment: any) =>
                          segment && selectSegment(segment.segmentId)
                        }
                      />
                    </div>
                  ) : (
                    <h2 style={{ color: 'black' }}>
                      No segments found!
                      <br />
                      <hr />
                      <br />
                      <small>
                        Try searching for something less specific
                        <br />
                        or click on the tags.
                      </small>
                    </h2>
                  )}
                </div>
              ) : (
                <Loading>Loading segments...</Loading>
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </div>
  );
};

export default Segments;
