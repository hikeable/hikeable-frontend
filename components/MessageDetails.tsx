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
  const [messageID, setMessageID] = useState<number>(0);
  const [recordExists, setRecordExists] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [numberOfLikes, setNumberOfLikes] = useState<number>(0);
  const [likeID, setLikeID] = useState<number>(0);
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
      if (record["user"] === userId) {
        setRecordExists(true);
        setLikeID(record["id"]);
        if (record["value"] === 1) {
          setIsLiked(true);
        }
      }

      count += record["value"];
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
  }, [messageID, isLiked]);

  useEffect(() => {
    filterMessageLikeData();
  }, [data]);

  return (
    <Modal
      keepMounted
      open={messageDetails["selected"] === true}
      onClose={handleClose}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Box sx={style}>
        <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
          Message
        </Typography>
        <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
          Posted on {messageDetails["data"]["date"]}
        </Typography>
        <Typography id="keep-mounted-modal-description" sx={{ mt: 2, mb: 2 }}>
          {messageDetails["data"]["message"]}
        </Typography>
        <MessageThumbUp
          recordExists={recordExists}
          setRecordExists={setRecordExists}
          isLiked={isLiked}
          setIsLiked={setIsLiked}
          messageDetails={messageDetails}
          userId={userId}
          likeID={likeID}
        />

        <>{numberOfLikes}</>
      </Box>
    </Modal>
  );
};

export default MessageDetails;
