import { IconButton } from "@mui/material";
import MoreIcon from "@mui/icons-material/More";

interface MessageIconProps {
  message: Object;
  setMessageDetails: Function;
}

const MessageIcon = ({ message, setMessageDetails }: MessageIconProps) => {
  const handleMessageDetails = () => {
    setMessageDetails({
      selected: true,
      data: {
        message: message["message"],
        likes: message["likes"],
        dislikes: message["dislikes"],
        date: message["date"],
      },
    });
  };

  return (
    <IconButton onClick={handleMessageDetails}>
      <MoreIcon />
    </IconButton>
  );
};

export default MessageIcon;
