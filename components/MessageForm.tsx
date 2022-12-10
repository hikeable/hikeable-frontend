import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import StickyNote2 from "@mui/icons-material/StickyNote2";
import TextField from "@mui/material/TextField";

const MessageForm = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleFormOpen = () => {
    setIsOpen(true);
    // get current coordinates
  };

  return (
    <>
      {isOpen === true ? (
        <TextField
          id="outlined-multiline-static"
          label="Message"
          multiline
          rows={4}
          placeholder="Write your message here"
        />
      ) : (
        <Button
          variant="outlined"
          startIcon={<StickyNote2 />}
          onClick={handleFormOpen}
        >
          Write Message
        </Button>
      )}
    </>
  );
};

export default MessageForm;
