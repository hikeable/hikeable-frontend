import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { IconButton } from "@mui/material";
import axios from "axios";
import { GeolocationMessageLike } from "../src/APIFunctions";

interface MessageThumbUpProps {
  recordExists: boolean;
  setRecordExists: Function;
  userId: number | undefined;
  isLiked: boolean;
  setIsLiked: Function;
  likeID: number | null;
  messageID: number | null;
}

const MessageThumbUp = ({
  recordExists,
  setRecordExists,
  userId,
  isLiked,
  setIsLiked,
  likeID,
  messageID,
}: MessageThumbUpProps) => {
  const handleClick = async () => {
    let current = new Date();
    let newGeolocationMessageLike: GeolocationMessageLike =
      new GeolocationMessageLike(
        userId,
        messageID,
        1,
        `${current.getFullYear()}-${
          current.getMonth() + 1
        }-${current.getDate()}`,
        null
      );

    if (!recordExists) {
      await GeolocationMessageLike.post(newGeolocationMessageLike);
      setIsLiked(true);
      setRecordExists(true);
    } else if (isLiked && recordExists) {
      await axios({
        method: "put",
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}api/trails/messages/likes/${likeID}`,
        data: {
          user: userId,
          message_id: messageID,
          value: 0,
          // needs to be fixed
          create_date: `${current.getFullYear()}-${
            current.getMonth() + 1
          }-${current.getDate()}`,
          update_date: null,
        },
      });
      setIsLiked(false);
    } else if (!isLiked && recordExists) {
      await axios({
        method: "put",
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}api/trails/messages/likes/${likeID}`,
        data: {
          user: userId,
          message_id: messageID,
          value: 1,
          // needs to be fixed
          create_date: `${current.getFullYear()}-${
            current.getMonth() + 1
          }-${current.getDate()}`,
          update_date: null,
        },
      });
      setIsLiked(true);
    }
  };

  return (
    <>
      {isLiked === true ? (
        <>
          <IconButton onClick={handleClick}>
            <ThumbUpIcon />
          </IconButton>
        </>
      ) : (
        <>
          <IconButton onClick={handleClick}>
            <ThumbUpOutlinedIcon />
          </IconButton>
        </>
      )}
    </>
  );
};

export default MessageThumbUp;
