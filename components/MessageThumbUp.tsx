import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { IconButton } from "@mui/material";

interface MessageThumbUpProps {
  isLiked: boolean;
  setIsLiked: Function;
}

const MessageThumbUp = ({ isLiked, setIsLiked }: MessageThumbUpProps) => {
  return (
    <>
      {isLiked === true ? (
        <>
          <IconButton>
            <ThumbUpIcon />
          </IconButton>
        </>
      ) : (
        <>
          <IconButton>
            <ThumbUpOutlinedIcon />
          </IconButton>
        </>
      )}
    </>
  );
};

export default MessageThumbUp;
