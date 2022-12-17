import { useState } from "react";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { IconButton } from "@mui/material";
import axios from "axios";

interface MessageThumbUpProps {
  recordExists: boolean;
  setRecordExists: Function;
  messageDetails: Object;
  userId: number | undefined;
  isLiked: boolean;
  setIsLiked: Function;
}

const MessageThumbUp = ({
  recordExists,
  setRecordExists,
  messageDetails,
  userId,
  isLiked,
  setIsLiked,
}: MessageThumbUpProps) => {
  const handleClick = async () => {
    let current = new Date();

    if (!recordExists) {
      await axios({
        method: "post",
        url: "https://hikeable-backend.herokuapp.com/api/trails/messages/likes",
        data: {
          user: userId,
          message_id: messageDetails["data"]["id"],
          value: 1,
          create_date: `${current.getFullYear()}-${
            current.getMonth() + 1
          }-${current.getDate()}`,
          update_date: null,
        },
      });
      setIsLiked(true);
      setRecordExists(true);
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
          <IconButton>
            <ThumbUpOutlinedIcon />
          </IconButton>
        </>
      )}
    </>
  );
};

export default MessageThumbUp;
