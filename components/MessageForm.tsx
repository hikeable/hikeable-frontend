import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import StickyNote2 from "@mui/icons-material/StickyNote2";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { Box, Modal } from "@mui/material";

interface MessageFormProps {
  trailID: number;
  userID: number | undefined;
  currentPosition: Array<Object>;
  setCurrentPosition: Function;
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
  setCurrentPosition,
}: MessageFormProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("Write your message here");

  const successCallback = (position: object) => {
    setCurrentPosition([
      ...currentPosition,
      {
        latitude: position["coords"]["latitude"],
        longitude: position["coords"]["longitude"],
      },
    ]);
  };

  const errorCallback = (error: object) => {
    console.error(error);
  };

  const handleOpen = () => {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback, {
      enableHighAccuracy: true,
      timeout: 10000,
    });
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit = async () => {
    let recentPositionIndex = currentPosition.length - 1;
    let current = new Date();
    await axios({
      method: "post",
      url: "https://hikeable-backend.herokuapp.com/api/trails/messages",
      data: {
        user: userID,
        trail_id: trailID,
        latitude: currentPosition[recentPositionIndex]["latitude"],
        longitude: currentPosition[recentPositionIndex]["longitude"],
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
      <Button onClick={handleOpen}>Write Message</Button>
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
