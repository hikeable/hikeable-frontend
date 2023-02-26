import { IconButton } from "@mui/material";
import MoreIcon from "@mui/icons-material/More";
import { TMessageIconProps } from "../global";

const MessageIcon = ({ message, setMessageDetails }: TMessageIconProps) => {
  const handleMessageDetails = () => {
    setMessageDetails({
      selected: true,
      data: {
        id: message.id,
        message: message.message,
        date: message.date,
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
