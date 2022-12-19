import { Box, TextField, Button, Typography } from "@mui/material";
import { useState } from "react";

const style = {
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "green",
    },
  },
};

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
      <Typography mb={1}>Name:</Typography>
      <TextField
        sx={style}
        id="outlined-basic"
        variant="outlined"
        name="from_name"
        onChange={handleChange}
        required
      />
      <Typography my={1}>Email:</Typography>
      <TextField
        sx={style}
        id="outlined-basic"
        variant="outlined"
        name="from_email"
        onChange={handleChange}
        required
      />
      <Typography my={1}>Message:</Typography>
      <TextField
        sx={style}
        id="outlined-multiline-static"
        multiline
        rows={4}
        variant="outlined"
        name="message"
        onChange={handleChange}
        required
      />
      <Button
        sx={{
          my: 2,
          width: "8vw",
          background: "#304b35",
          "&:hover": {
            background: "#64801a",
          },
        }}
        variant="contained"
        disableElevation
        onClick={onSubmit}
      >
        Submit
      </Button>
    </>
  );
};

export default ContactForm;
