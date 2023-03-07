import { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  createTheme,
  ThemeProvider,
  Button,
  TextField,
} from "@mui/material";
import MessageThumbUp from "./MessageThumbUp";
import { useAuthContext } from "./context/UseAuthContext";
import { TMessageLike, TMessageDetailsProps } from "../global";
import { GeolocationMessageLike, MessageReport } from "../src/APIFunctions";

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat",
  },
});

const style = {
  position: "absolute" as "absolute",
  borderRadius: "1rem",
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

const inputFormStyle = {
  width: 1,
  mb: 2,
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "green",
    },
  },
};

const MessageDetails = ({
  messageDetails,
  setMessageDetails,
}: TMessageDetailsProps) => {
  const [data, setData] = useState<TMessageLike[]>([]);
  const [messageID, setMessageID] = useState<number | null>(null);
  const [recordExists, setRecordExists] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [numberOfLikes, setNumberOfLikes] = useState<number>(0);
  const [likeID, setLikeID] = useState<number | null>(null);
  const [reason, setReason] = useState<string>("");
  const { userId } = useAuthContext();

  useEffect(() => {
    setMessageID(messageDetails["data"]["id"]);
  }, [messageDetails]);

  useEffect(() => {
    const fetchMessageLikeData = async () => {
      const fetchedMessageLikeData = await GeolocationMessageLike.getAllByID(
        messageID
      );
      setData(fetchedMessageLikeData?.data);
    };

    if (messageID !== null) fetchMessageLikeData();
  }, [messageID, isLiked]);

  useEffect(() => {
    const filterMessageLikeData = () => {
      let count = 0;
      if (data.length === 0) {
        setRecordExists(false);
        setLikeID(null);
        setIsLiked(false);
        setNumberOfLikes(count);
      } else {
        return data.map((record) => {
          if (record["user"] === userId) {
            setRecordExists(true);
            setLikeID(record["id"]);
            if (record["value"] === 1) setIsLiked(true);
          }

          count += record["value"];
          setNumberOfLikes(count);
        });
      }
    };

    filterMessageLikeData();
  }, [data, userId]);

  const handleClose = () => {
    setMessageDetails({
      selected: "false",
      data: {
        id: null,
        message: null,
        date: null,
      },
    });
    setIsLiked(false);
    setMessageID(null);
  };

  function ChildModal() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setReason(event.target.value);
    };

    const handleReport = async () => {
      const current = new Date();
      const reportedMessage = messageDetails.data.message;

      const newMessageReport: MessageReport = new MessageReport(
        userId,
        messageID,
        reason,
        `${current.getFullYear()}-${
          current.getMonth() + 1
        }-${current.getDate()}`,
        reportedMessage,
        false
      );

      await MessageReport.create(newMessageReport);
      setReason("");
      handleClose();
    };

    const SubmitButton = () => {
      return (
        <Button
          variant="contained"
          disableElevation
          style={{ cursor: "pointer", zIndex: 99 }}
          onClick={handleReport}
          onTouchStart={handleReport}
          sx={{
            background: "#304b35",
            "&:hover": {
              background: "#64801a",
            },
          }}
        >
          Submit
        </Button>
      );
    };

    return (
      <>
        <Button onClick={handleOpen}>Report Message</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
          sx={style}
        >
          <Box sx={style}>
            <Typography
              id="keep-mounted-modal-title"
              variant="h6"
              component="h2"
            >
              Report Message
            </Typography>
            <Typography id="keep-mounted-modal-description" sx={{ mt: 2, mb: 2 }}>
              Please include a brief description of why the message violates our
              guidelines. Any user who abuses the report function needlessly
              will be subject to disciplinary action, including potential
              account suspension or termination.
            </Typography>
            <TextField
              sx={inputFormStyle}
              id="outlined-multiline-static"
              multiline
              rows={3}
              placeholder={"Your reason here"}
              value={reason}
              onChange={handleChange}
              InputProps={{ endAdornment: <SubmitButton /> }}
            />
          </Box>
        </Modal>
      </>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Modal
        keepMounted
        open={messageDetails["selected"] === true}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
        sx={{ borderRadius: "1rem" }}
      >
        <Box sx={style}>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            Message
          </Typography>
          <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
            Posted on {messageDetails["data"]["date"]}
          </Typography>
          <Typography id="keep-mounted-modal-description" sx={{ mt: 2, mb: 2 }}>
            {messageDetails["data"]["message"]}
          </Typography>
          <MessageThumbUp
            recordExists={recordExists}
            setRecordExists={setRecordExists}
            isLiked={isLiked}
            setIsLiked={setIsLiked}
            userId={userId}
            likeID={likeID}
            messageID={messageID}
          />

          <>{numberOfLikes}</>
          <ChildModal />
        </Box>
      </Modal>
    </ThemeProvider>
  );
};

export default MessageDetails;
