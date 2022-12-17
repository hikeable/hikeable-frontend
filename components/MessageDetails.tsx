import { useEffect, useState } from "react";
import { Modal, Box, Typography } from "@mui/material";
import axios from "axios";

interface MessageRatingProps {
  messageDetails: Object;
  setMessageDetails: Function;
}

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
  const [data, setData] = useState<Object>([]);
  const [messageID, setMessageID] = useState<Number>(0);

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

  useEffect(() => {
    if (messageDetails["selected"] === true) {
      setMessageID(messageDetails["data"]["id"]);
    }
  }, [messageDetails]);

  useEffect(() => {
    fetchMessageLikeData();
  }, [messageID]);

  useEffect(() => {
    console.log(data);
  }, [data])

  return (
    <Modal
      keepMounted
      open={messageDetails["selected"] === true}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography>{messageDetails["data"]["message"]}</Typography>
        <Typography>ID: {messageDetails["data"]["id"]}</Typography>
      </Box>
    </Modal>
  );
};

export default MessageDetails;
