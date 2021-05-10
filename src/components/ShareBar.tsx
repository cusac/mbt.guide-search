import React from 'react';
import { useSelector } from 'react-redux';
import { Segment } from 'types';
import { RootState, useAppDispatch } from 'store';
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  MailruShareButton,
  PinterestShareButton,
  RedditShareButton,
  TumblrShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailIcon,
  FacebookIcon,
  FacebookMessengerIcon,
  HatenaIcon,
  InstapaperIcon,
  LineIcon,
  LinkedinIcon,
  LivejournalIcon,
  MailruIcon,
  OKIcon,
  PinterestIcon,
  PocketIcon,
  RedditIcon,
  TelegramIcon,
  TumblrIcon,
  TwitterIcon,
  ViberIcon,
  VKIcon,
  WeiboIcon,
  WhatsappIcon,
  WorkplaceIcon,
} from 'react-share';
import { Grid, Header } from 'semantic-ui-react';

const ShareBar = ({ segment }: { segment?: Segment }): any => {
  const [shareUrl, setShareUrl] = React.useState(window.location.hostname);
  const [title, setTitle] = React.useState('MBT Video Search');
  const [header, setHeader] = React.useState('Share this Tool!');

  const searchType = useSelector((state: RootState) => state.video.searchType);

  const dispatch = useAppDispatch();

  const handleChange = (event: any) => {};

  const onSubmit = async (event: any) => {};

  React.useEffect(() => {
    if (segment) {
      setShareUrl(`${window.location.hostname}/${segment.segmentId}`);
      setTitle(`MBT: ${segment.title}`);
      setHeader(`Share this Segment!`);
    } else {
      setShareUrl(`${window.location.hostname}`);
      setTitle(`MBT Video Search`);
      setHeader(`Share this Tool!`);
    }
  }, [segment]);

  return (
    <React.Fragment>
      <Grid centered>
        <Grid.Row>
          <Header>{header}</Header>
        </Grid.Row>
        <Grid.Row>
          <TwitterShareButton url={shareUrl} title={title} related={['@TomCampbell_MBT']}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>
          <FacebookShareButton url={shareUrl} title={title}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <LinkedinShareButton url={shareUrl} title={title}>
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>
          <PinterestShareButton
            url={shareUrl}
            media="https://user-images.githubusercontent.com/12631935/117592350-0d313b00-b0ed-11eb-9564-d58b2fe4670d.png"
            description={title}
          >
            <PinterestIcon size={32} round />
          </PinterestShareButton>
          <RedditShareButton url={shareUrl} title={title}>
            <RedditIcon size={32} round />
          </RedditShareButton>
          <WhatsappShareButton url={shareUrl} title={title}>
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
        </Grid.Row>
        <Grid.Row></Grid.Row>
      </Grid>
    </React.Fragment>
  );
};

export default ShareBar;
