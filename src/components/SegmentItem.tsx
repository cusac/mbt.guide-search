import React from 'react';
import { Segment, Video } from 'types';
import { verifyModelType } from '../types';
import { Divider, Grid, StrictGridColumnProps, Visibility } from 'semantic-ui-react';

const SegmentItem = ({
  segment,
  handleSegmentSelect,
}: {
  segment: Segment;
  handleSegmentSelect: (segment: Segment) => any;
}): any => {
  const [itemWidth, setItemWidth] = React.useState(640);
  const [stacked, setStacked] = React.useState(false);
  const [imageColumnWidth, setImageColumnWidth] = React.useState(
    5 as StrictGridColumnProps['width']
  );
  const [textColumnWidth, setTextColumnWidth] = React.useState(
    11 as StrictGridColumnProps['width']
  );

  const { video } = segment;
  let src: string;
  if (verifyModelType<Video>(video, 'Video')) {
    src = video.youtube.snippet.thumbnails.medium.url;
  } else {
    src = '';
  }

  const handleWidthUpdate = (_: any, { calculations }: { calculations: { width: number } }) =>
    setItemWidth(calculations.width);

  React.useEffect(() => {
    if (itemWidth > 640) {
      setImageColumnWidth(5);
      setTextColumnWidth(11);
      setStacked(false);
    } else if (itemWidth > 600) {
      setImageColumnWidth(7);
      setTextColumnWidth(9);
      setStacked(false);
    } else if (itemWidth > 400) {
      setImageColumnWidth(8);
      setTextColumnWidth(8);
      setStacked(false);
    } else {
      setImageColumnWidth(16);
      setTextColumnWidth(16);
      setStacked(true);
    }
  }, [itemWidth]);

  return (
    <Visibility onUpdate={handleWidthUpdate} fireOnMount>
      <div onClick={() => handleSegmentSelect(segment)} className=" video-item item">
        <Grid>
          <Grid.Column width={imageColumnWidth} textAlign="center">
            <img
              className={'ui image' + stacked ? 'stacked' : ''}
              src={src}
              alt={segment.description}
            />
          </Grid.Column>
          <Grid.Column
            width={textColumnWidth}
            textAlign={stacked ? 'center' : 'left'}
            verticalAlign="middle"
          >
            <div className="content">
              <div className="header ">{segment.title}</div>
            </div>
          </Grid.Column>
        </Grid>
        <Divider />
      </div>
    </Visibility>
  );
};
export default SegmentItem;
