import { useEffect } from "react";

interface MessageRatingProps {
  messageDetails: Object;
  setMessageDetails: Function;
}

const MessageDetails = ({
  messageDetails,
  setMessageDetails,
}: MessageRatingProps) => {
  useEffect(() => {
    console.log(messageDetails);
  }, [messageDetails]);

  return <>Test</>;
};

export default MessageDetails;
