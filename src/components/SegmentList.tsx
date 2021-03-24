import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { Segment } from 'types';
import { mediaBreakpoints } from '../components/Media';
import SegmentItem from './SegmentItem';

const SegmentList = ({
  segments,
  handleSegmentSelect,
}: {
  segments: Segment[];
  handleSegmentSelect: (segment: Segment) => any;
}) => {
  const isSmallComputer = useMediaQuery({ maxWidth: mediaBreakpoints.smallComputer });

  const renderedSegments = segments.map(segment => {
    return (
      <SegmentItem
        key={segment.segmentId}
        segment={segment}
        handleSegmentSelect={handleSegmentSelect}
      />
    );
  });

  return (
    <div className="ui relaxed divided list" style={{ padding: isSmallComputer ? '20px 50px' : 0 }}>
      {renderedSegments}
    </div>
  );
};
export default SegmentList;
