import { default as React } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import { Visibility } from 'semantic-ui-react';
import { Button, Popup, Slider, YouTubePlayer } from '../components';
// import type { PlayBackRate } from './YouTubePlayer';

// const playBackRates: [PlayBackRate,PlayBackRate,PlayBackRate,PlayBackRate,PlayBackRate] = [0.25, 0.5, 1, 1.5, 2];
const playBackRates = [0.25, 0.5, 1, 1.5, 2];

const YouTubePlayerWithControls = ({
  videoId,
  duration,
  autoplay,
  controls,
  start,
  end,
  offsetTooltip,
}: {
  videoId: string;
  duration: number;
  autoplay: boolean;
  controls: boolean;
  start: number;
  end: number;
  offsetTooltip: boolean;
}) => {
  const [seconds, setSeconds] = React.useState(start);
  // eslint-disable-next-line no-unused-vars
  const [state, setState] = React.useState('unstarted');
  const [playing, setPlaying] = React.useState(autoplay);
  // const [playBackRate, setPlayBackRate]: [PlayBackRate, any] = React.useState(playBackRates[2]);
  const [playBackRate, setPlayBackRate]: [any, any] = React.useState(playBackRates[2]);
  const [playBackRateIndex, setPlayBackRateIndex] = React.useState(2);
  const [videoRef, setVideoRef] = React.useState(undefined as HTMLDivElement | undefined);
  const [videoHeight, setVideoHeight] = React.useState(640);
  const [videoWidth, setVideoWidth] = React.useState(640);

  const speedUp = () => {
    if (playBackRateIndex >= playBackRates.length - 1) {
      return;
    }

    setPlayBackRateIndex(playBackRateIndex + 1);
  };

  const slowDown = () => {
    if (playBackRateIndex <= 0) {
      return;
    }

    setPlayBackRateIndex(playBackRateIndex - 1);
  };

  const videoResizeObserver = new ResizeObserver(entries => {
    setVideoHeight(entries[0].target.clientHeight);
  });

  const handleVideoWidthUpdate = (_: any, { calculations }: { calculations: { width: number } }) =>
    setVideoWidth(calculations.width);

  React.useEffect(() => {
    if (videoRef && videoRef.clientHeight) {
      videoResizeObserver.observe(videoRef);
    }
  }, [videoRef]);

  // allow playback rate control
  React.useEffect(() => {
    setPlayBackRate(playBackRates[playBackRateIndex]);
  }, [playBackRateIndex]);

  return (
    <div ref={setVideoRef as any} className="videoWrapper">
      <Visibility onUpdate={handleVideoWidthUpdate}>
        <div key={`${start}-${end}`}>
          <YouTubePlayer
            {...{ videoId, seconds, autoplay, start, end, playing, playBackRate }}
            controls={false}
            onStateChange={(state: any) => {
              setState(state);
              switch (state) {
                case 'playing':
                  setPlaying(true);
                  break;

                case 'paused':
                case 'ended':
                  setPlaying(false);
                  break;

                default:
              }
            }}
            onSecondsChange={setSeconds}
          />
        </div>
      </Visibility>
      {controls && (
        <div className="videoControls" style={{ paddingTop: videoHeight + 20 }}>
          <Button.Group>
            <Popup
              trigger={<Button icon="fast backward" onClick={() => setSeconds(start)} />}
              content="Skip to start"
              mouseEnterDelay={400}
              on="hover"
            />
            <Popup
              trigger={
                <Button
                  icon="backward"
                  onClick={() => slowDown()}
                  disabled={playBackRateIndex <= 0}
                />
              }
              content="Decrease playback speed"
              mouseEnterDelay={400}
              on="hover"
            />
            <Popup
              trigger={<Button icon="undo" onClick={() => setSeconds(seconds - 10)} />}
              content="Back 10 seconds"
              mouseEnterDelay={400}
              on="hover"
            />
            <Popup
              trigger={
                <Button icon={playing ? 'pause' : 'play'} onClick={() => setPlaying(!playing)} />
              }
              content={playing ? 'Pause' : 'Play'}
              mouseEnterDelay={400}
              on="hover"
            />
            <Popup
              trigger={<Button icon="redo" onClick={() => setSeconds(seconds + 10)} />}
              content="Forward 10 seconds"
              mouseEnterDelay={400}
              on="hover"
            />
            <Popup
              trigger={
                <Button
                  icon="forward"
                  onClick={() => speedUp()}
                  disabled={playBackRateIndex >= playBackRates.length - 1}
                />
              }
              content="Increase playback speed"
              mouseEnterDelay={400}
              on="hover"
            />
            <Popup
              trigger={<Button icon="fast forward" onClick={() => setSeconds(end)} />}
              content="Skip to end"
              mouseEnterDelay={400}
              on="hover"
            />
          </Button.Group>
          <Slider
            start={[seconds]}
            range={{ min: Math.round(start), max: Math.round(end) }}
            width={videoWidth - 60}
            onHandleUpdate={(i: any, value: any) => setSeconds(value)}
            pips={true}
            offsetTooltip={offsetTooltip}
          />
        </div>
      )}
    </div>
  );
};

YouTubePlayerWithControls.defaultProps = {
  autoplay: false,
  controls: true,
  offsetTooltip: false,
};

export default YouTubePlayerWithControls;
