import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { Box, Modal } from "@mui/material";

interface MessageFormProps {
  userID: number;
  trailID: number;
  currentPosition: Object;
  open: boolean;
  setOpen: Function;
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
  userID,
  trailID,
  currentPosition,
  open,
  setOpen,
}: MessageFormProps) => {

  const [value, setValue] = useState<string>("Write your message here");

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
        user: userID,
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
        <Box sx={style}>
          <TextField
            id="outlined-multiline-static"
            label="Message"
            multiline
            rows={4}
            placeholder={value}
            onChange={handleChange}
          />
          <Button variant="outlined" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default MessageForm;
