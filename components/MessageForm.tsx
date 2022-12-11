import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import StickyNote2 from "@mui/icons-material/StickyNote2";
import TextField from "@mui/material/TextField";
import axios from "axios";

interface MessageFormProps {
  trailID: number;
  userID: number | undefined;
}

type CurrentPositionObject = {
  latitude: number;
  longitude: number;
};

const MessageForm = ({ userID, trailID }: MessageFormProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("Write your message here");
  const [currentPosition, setCurrentPosition] = useState<
    CurrentPositionObject[]
  >([]);

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

  const handleForm = () => {
    if (!isOpen) {
      setIsOpen(true);
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback, {
        enableHighAccuracy: true,
        timeout: 10000,
      });
    } else {
      setIsOpen(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit = async () => {
    await axios({
      method: "post",
      url: "https://hikeable-backend.herokuapp.com/api/trails/messages",
      data: {
        user: 1,
        trail_id: 1,
        latitude: 1,
        longitude: 1,
        message: "test",
        date: "date",
      },
    });
  };

  return (
    <>
      {isOpen === true ? (
        <>
          <TextField
            id="outlined-multiline-static"
            label="Message"
            multiline
            rows={4}
            placeholder={value}
            onChange={handleChange}
          />
          <Button variant="outlined" onClick={handleSubmit}>
            OK
          </Button>
          <Button variant="outlined" onClick={handleForm}>
            Back
          </Button>
        </>
      ) : (
        <Button
          variant="outlined"
          startIcon={<StickyNote2 />}
          onClick={handleForm}
        >
          Write Message
        </Button>
      )}
    </>
  );
};

export default MessageForm;
