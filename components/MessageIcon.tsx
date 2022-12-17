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
