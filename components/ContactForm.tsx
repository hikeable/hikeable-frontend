import { Box, TextField, Button, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";

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
  const [sent, setSent] = useState<Boolean>(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios({
      method: "post",
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}api/feedback`,
      data: {
        from_name: toSend["from_name"],
        from_email: toSend["from_email"],
        message: toSend["message"],
      },
    });
    setSent(true);
    window.location.reload();
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
          background: "#304b35",
          "&:hover": {
            background: "#64801a",
          },
        }}
        variant="contained"
        type="submit"
        disableElevation
        onClick={onSubmit}
      >
        Submit
      </Button>

      {sent === true ? (
        <Box textAlign={"center"}>
          <Typography color="green">
            Your message was sent successfully!
          </Typography>
        </Box>
      ) : (
        <></>
      )}
    </>
  );
};

export default ContactForm;
