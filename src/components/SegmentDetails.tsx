import { default as React } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Divider } from 'semantic-ui-react';
import { setSearchText, useAppDispatch } from 'store';
import { Segment, SegmentTag } from 'types';
import { Container, Grid, Label, List } from '../components';
import { mediaBreakpoints } from '../components/Media';
import * as utils from '../utils';

const SegmentDetails = ({ segment }: { segment: Segment }) => {
  const dispatch = useAppDispatch();

  const isTablet = useMediaQuery({ maxWidth: mediaBreakpoints.tablet });

  const segmentTags = ((segment.tags as SegmentTag[]) || [])
    .filter(tag => !!tag.tag)
    .map(tag => {
      tag.tag.name = tag.tag.name.toLowerCase().trim();
      return tag;
    });

  return (
    <div>
      {!isTablet ? (
        <Container>
          <Grid relaxed celled="internally">
            <Grid.Row>
              <Grid.Column verticalAlign="middle" width={3}>
                <Label>From Video:</Label>
              </Grid.Column>
              <Grid.Column textAlign="left" width={13}>
                <List horizontal bulleted>
                  <List.Item>
                    <List.Content>
                      <a
                        href={`https://youtube.com/watch?v=${(segment as any).videoYtId}&t=${
                          segment.start
                        }`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {segment.videoTitle}
                      </a>
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Content>
                      {utils.timeFormat.to(segment.start)} - {utils.timeFormat.to(segment.end)}
                    </List.Content>
                  </List.Item>
                </List>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column verticalAlign="middle" width={3}>
                <Label>Description:</Label>
              </Grid.Column>
              <Grid.Column textAlign="left" width={13}>
                {segment.description || 'No description available.'}
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column verticalAlign="middle" width={3}>
                <Label>Segment Length:</Label>
              </Grid.Column>
              <Grid.Column textAlign="left" width={13}>
                {utils.timeFormat.to(segment.end - segment.start)}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column verticalAlign="middle" width={3}>
                <Label>Tags:</Label>
              </Grid.Column>
              <Grid.Column textAlign="left" width={13}>
                <List horizontal bulleted>
                  {segmentTags.map(tag => (
                    <List.Item
                      key={tag.tag._id}
                      onClick={() => {
                        utils.history.push(`/${segment.segmentId}?search=${tag.tag.name}`);
                        dispatch(setSearchText({ searchText: tag.tag.name }));
                      }}
                    >
                      <List.Content>
                        <List.Header>
                          <a>{tag.tag.name}</a>
                        </List.Header>
                      </List.Content>
                    </List.Item>
                  ))}
                </List>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      ) : (
        <Container>
          <Divider horizontal>
            <Label>From Video</Label>
          </Divider>
          <List horizontal bulleted style={{ textAlign: 'left' }}>
            <List.Item>
              <List.Content>{segment.videoTitle}</List.Content>
            </List.Item>
            <List.Item>
              <List.Content>
                {utils.timeFormat.to(segment.start)} - {utils.timeFormat.to(segment.end)}
              </List.Content>
            </List.Item>
          </List>
          <Divider horizontal>
            <Label>Description</Label>
          </Divider>
          {segment.description || 'No description available.'}
          <Divider horizontal>
            <Label>Segment Length</Label>
          </Divider>
          {utils.timeFormat.to(segment.end - segment.start)}
          <Divider horizontal>
            <Label>Tags</Label>
          </Divider>
          <List horizontal>
            {segmentTags.map(tag => (
              <List.Item
                key={tag.tag._id}
                onClick={() => {
                  utils.history.push(`/${segment.segmentId}?search=${tag.tag.name}`);
                  dispatch(setSearchText({ searchText: tag.tag.name }));
                }}
              >
                <List.Content>
                  <List.Header>
                    <a>{tag.tag.name}</a>
                  </List.Header>
                </List.Content>
              </List.Item>
            ))}
          </List>
          <br />
          <br />
        </Container>
      )}
    </div>
  );
};

export default SegmentDetails;
