import { IconButton } from "@mui/material";
import MoreIcon from "@mui/icons-material/More";

interface MessageIconProps {
  message: Object;
  setRatingOpen: Function;
}

const MessageIcon = ({ message, setRatingOpen }: MessageIconProps) => {
  const Console = () => {
    console.log(message);
  };

  return (
    <IconButton onClick={Console}>
      <MoreIcon />
    </IconButton>
  );
};

export default MessageIcon;
