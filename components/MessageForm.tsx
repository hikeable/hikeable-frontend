import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { Box, Modal } from "@mui/material";
import { useAuthContext } from "./context/UseAuthContext";

interface MessageFormProps {
  trailID: number;
  currentPosition: Object;
  open: boolean;
  setOpen: Function;
  setIsSubmitted: Function;
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
  p: 4,
};

const MessageForm = ({
  trailID,
  currentPosition,
  open,
  setOpen,
  setIsSubmitted
}: MessageFormProps) => {
  const [value, setValue] = useState<string>("Write your message here");
  const { userId } = useAuthContext();

  const handleClose = () => {
    setOpen(false);
    setValue("Write your message here");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit = async () => {
    let current = new Date();
    await axios({
      method: "post",
      url: "https://hikeable-backend.herokuapp.com/api/trails/messages",
      data: {
        user: userId,
        trail_id: trailID,
        latitude: currentPosition["coordinates"]["latitude"],
        longitude: currentPosition["coordinates"]["longitude"],
        likes: 0,
        dislikes: 0,
        message: value,
        date: `${current.getFullYear()}-${
          current.getMonth() + 1
        }-${current.getDate()}`,
      },
    });
    setIsSubmitted(true);
    handleClose();
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} style={{ cursor: "pointer" }}>
          <TextField
            id="outlined-multiline-static"
            label="Message"
            multiline
            rows={4}
            placeholder={value}
            onChange={handleChange}
          />
          <button
            type="button"
            style={{ cursor: "pointer", zIndex: 99 }}
            onClick={handleSubmit}
            onTouchStart={handleSubmit}
          >
            Submit
          </button>
        </Box>
      </Modal>
    </>
  );
};

export default MessageForm;
