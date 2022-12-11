import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import StickyNote2 from "@mui/icons-material/StickyNote2";
import TextField from "@mui/material/TextField";

const MessageForm = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("Write your message here");
  const [currentPosition, setCurrentPosition] = useState<number[]>([0, 0]);

  const successCallback = (position: object) => {
    console.log(position);
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

  const handleSubmit = () => {
    // post request to back-end
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
