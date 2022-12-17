import { useEffect, useState } from "react";
import { Modal, Box, Typography } from "@mui/material";
import axios from "axios";
import MessageThumbUp from "./MessageThumbUp";
import { useAuthContext } from "./context/UseAuthContext";

interface MessageRatingProps {
  messageDetails: Object;
  setMessageDetails: Function;
}

type messageLikeObject = {
  id: number;
  user: number;
  message_id: number;
  value: number;
  create_date: string;
  update_date: string | null;
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  cursor: "pointer",
};

const MessageDetails = ({
  messageDetails,
  setMessageDetails,
}: MessageRatingProps) => {
  const [data, setData] = useState<messageLikeObject[]>([]);
  const [messageID, setMessageID] = useState<Number>(0);
  const [recordExists, setRecordExists] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [numberOfLikes, setNumberOfLikes] = useState<Number>(0);
  const { userId } = useAuthContext();

  const handleClose = () => {
    setMessageDetails({
      selected: "false",
      data: {
        message: null,
        date: null,
      },
    });
  };

  const fetchMessageLikeData = async () => {
    const fetchedMessageLikeData = await axios.get(
      `https://hikeable-backend.herokuapp.com/api/trails/messages/${messageID}/likes`
    );
    setData(fetchedMessageLikeData.data);
  };

  const filterMessageLikeData = () => {
    let count = 0;
    return data.map((record) => {
      if (record.user === userId) setRecordExists(true);

      count += record.value;
      setNumberOfLikes(count);
    });
  };

  useEffect(() => {
    if (messageDetails["selected"] === true) {
      setMessageID(messageDetails["data"]["id"]);
    }
  }, [messageDetails]);

  useEffect(() => {
    fetchMessageLikeData();
  }, [messageID]);

  useEffect(() => {
    filterMessageLikeData();
  }, [data]);

  return (
    <Modal
      keepMounted
      open={messageDetails["selected"] === true}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography>Message: {messageDetails["data"]["message"]}</Typography>
        <MessageThumbUp recordExists={recordExists} setRecordExists={setRecordExists} isLiked={isLiked} setIsLiked={setIsLiked} messageDetails={messageDetails} userId={userId}/>
        <Typography>
          Likes: <>{numberOfLikes}</>
        </Typography>
      </Box>
    </Modal>
  );
};

export default MessageDetails;
