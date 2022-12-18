import React, { useEffect, useState } from "react";
import {
  Paper,
  Button,
  Modal,
  TextField,
  Box,
  List,
  ListItem,
  Dialog,
  DialogContent,
  ListItemText,
} from "@mui/material";
import { Typography } from "@mui/joy";
import axios from "axios";
import { useAuthContext } from "./context/UseAuthContext";

interface ScrollableTextProps {
  trailID: number;
}

type commentsDataObject = {
  id: number;
  user: number;
  userName: string;
  trail_id: number;
  comment: string;
  date: string;
};

const ScrollableText = ({ trailID }: ScrollableTextProps) => {
  const [value, setValue] = useState("");
  const [comments, setComments] = useState<commentsDataObject[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const { user, userId } = useAuthContext();

  const userNameTag = user?.displayName;
  let firstName;
  if (userNameTag) {
    const split = userNameTag.split(" ");
    firstName = split[0];
  }

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    cursor: "pointer",
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleSubmit = async () => {
    let current = new Date();
    console.log("userId =", userId);
    console.log("trail_id =", trailID);
    console.log("username =", firstName);

    console.log(
      "date =",
      `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`
    );

    await axios({
      method: "post",
      url: "https://hikeable-backend.herokuapp.com/api/trails/comments",
      data: {
        user: userId,
        userName: firstName,
        trail_id: trailID,
        comment: value,
        date: `${current.getFullYear()}-${
          current.getMonth() + 1
        }-${current.getDate()}`,
      },
    });

    setValue("");
    handleModalClose();
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    const fetchedCommentsData = await axios.get(
      `https://hikeable-backend.herokuapp.com/api/trails/${trailID}/comments`
    );
    console.log(fetchedCommentsData.data);
    if (!comments) {
      setComments(fetchedCommentsData.data);
    } else {
      setComments([...fetchedCommentsData.data]);
    }
  };

  const SubmitButton = () => {
    return (
      <Button
        variant="contained"
        disableElevation
        style={{ cursor: "pointer", zIndex: 99 }}
        onClick={() => {
          handleSubmit();
          fetchComments();
          fetchComments();
        }}
        onTouchStart={handleSubmit}
      >
        Submit
      </Button>
    );
  };

  return (
    <>
      <Button onClick={handleModalOpen}>Add a comment</Button>
      <Modal
        keepMounted
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" component="h2">
            Write Trail Comment
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
            Messages that condone violence, hate speech, harmful misinformation,
            or criminal acts are subject to deletion, and the offending user
            will be banned.
          </Typography>
          <TextField
            sx={{ width: 1, mb: 2 }}
            id="outlined-multiline-static"
            label="Message"
            multiline
            rows={3}
            placeholder={"Your message here"}
            value={value}
            onChange={handleTextChange}
            InputProps={{ endAdornment: <SubmitButton /> }}
          />
        </Box>
      </Modal>
      <Paper
        elevation={1}
        style={{ overflowY: "scroll", height: "100px", width: "48vw" }}
      >
        <List>
          {comments.map((comment) => (
            <ListItemText key={comment.id}>
              {" "}
              {comment.date} {comment.userName} {comment.comment}{" "}
              {comment.trail_id}
            </ListItemText>
          ))}
        </List>
      </Paper>
    </>
  );
};

export default ScrollableText;
