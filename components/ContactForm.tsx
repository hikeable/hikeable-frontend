import { Box, TextField } from "@mui/material";

const ContactForm = () => {
  return (
    <>
      <TextField
        sx={{ my: 2, width: "100%" }}
        id="outlined-basic"
        label="Name"
        variant="outlined"
      />
      <TextField
        sx={{ mb: 2, width: "100%" }}
        id="outlined-basic"
        label="Email"
        variant="outlined"
      />
      <TextField
        sx={{ mb: 2, width: "100%" }}
        id="outlined-multiline-static"
        multiline
        rows={3}
        label="Message"
        variant="outlined"
      />
    </>
  );
};

export default ContactForm;
