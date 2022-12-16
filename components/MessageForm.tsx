import React, { useEffect, useState } from "react";
import { Alert, AlertTitle, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { Box, Modal, Typography } from "@mui/material";
import { useAuthContext } from "./context/UseAuthContext";

interface MessageFormProps {
  trailID: number;
  currentPosition: Object;
  formOpen: boolean;
  setFormOpen: Function;
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
  pt: 2,
  px: 4,
  pb: 3,
  cursor: "pointer",
};

const MessageForm = ({
  trailID,
  currentPosition,
  formOpen,
  setFormOpen,
  setIsSubmitted,
}: MessageFormProps) => {
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const { userId } = useAuthContext();

  const handleClose = () => {
    setError(false);
    setFormOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit = async () => {
    if (currentPosition["lat"] === null || currentPosition["lng"] === null) {
      setError(true);
      return;
    }

    let current = new Date();
    await axios({
      method: "post",
      url: "https://hikeable-backend.herokuapp.com/api/trails/messages",
      data: {
        user: userId,
        trail_id: trailID,
        latitude: currentPosition["lat"],
        longitude: currentPosition["lng"],
        likes: 0,
        dislikes: 0,
        message: value,
        date: `${current.getFullYear()}-${
          current.getMonth() + 1
        }-${current.getDate()}`,
      },
    });
    setIsSubmitted(true);
    setValue("");
    handleClose();
  };

  const SubmitButton = () => {
    return (
      <Button
        variant="contained"
        disableElevation
        style={{ cursor: "pointer", zIndex: 99 }}
        onClick={handleSubmit}
        onTouchStart={handleSubmit}
      >
        Submit
      </Button>
    );
  };

  return (
    <Modal
      keepMounted
      open={formOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Write Trail Message
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
          Messages that condone violence, hate speech, harmful misinformation,
          or criminal acts are subject to deletion, and the offending user will
          be banned.
        </Typography>
        <TextField
          sx={{ width: 1, mb: 2 }}
          id="outlined-multiline-static"
          label="Message"
          multiline
          rows={3}
          placeholder={"Your message here"}
          value={value}
          onChange={handleChange}
          InputProps={{ endAdornment: <SubmitButton /> }}
        />
        {error === true ? (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            Cannot get location - please ensure{" "}
            <strong>Location Services</strong> are enabled on your device, or
            try again later.
          </Alert>
        ) : (
          <></>
        )}
      </Box>
    </Modal>
  );
};

export default MessageForm;
