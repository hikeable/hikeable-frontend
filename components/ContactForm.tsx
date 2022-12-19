import { Box, TextField, Button, Typography } from "@mui/material";
import { useState } from "react";

const ContactForm = () => {
  const [toSend, setToSend] = useState<Object>({
    from_name: "",
    from_email: "",
    message: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    {
      /* --- METHOD TO SEND THE MAIL --- */
    }
    console.log(toSend);
  };

  const handleChange = (e) => {
    setToSend({ ...toSend, [e.target.name]: e.target.value });
  };

  return (
    <>
    <Typography></Typography>
      <TextField
        sx={{ my: 2, width: "100%" }}
        id="outlined-basic"
        
        variant="outlined"
        name="from_name"
        onChange={handleChange}
        required
      />
      <TextField
        sx={{ mb: 2, width: "100%" }}
        id="outlined-basic"
        
        variant="outlined"
        name="from_email"
        onChange={handleChange}
        required
      />
      <TextField
        sx={{ mb: 2, width: "100%" }}
        id="outlined-multiline-static"
        multiline
        rows={4}
        
        variant="outlined"
        name="message"
        onChange={handleChange}
        required
      />
      <Button variant="contained" disableElevation onClick={onSubmit}>
        Submit
      </Button>
    </>
  );
};

export default ContactForm;
