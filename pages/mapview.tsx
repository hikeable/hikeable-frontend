import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  SpeedDial,
  SpeedDialIcon,
  SpeedDialAction,
  Box,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material";
import MessageIcon from "@mui/icons-material/Message";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { LargeMap } from "../components";
import MessageForm from "../components/MessageForm";
import MessageDetails from "../components/MessageDetails";
import { TLatLng } from "../global";

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat",
  },
});

const MapView = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  const trailID = Number(searchParams.get("trailID"));
  const [agree, setAgree] = useState(false);
  const [currentPosition, setCurrentPosition] = useState<TLatLng>({
    lat: 0,
    lng: 0,
  });
  const [formOpen, setFormOpen] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [messageDetails, setMessageDetails] = useState<Object>({
    selected: false,
    data: {
      id: null,
      message: null,
      date: null,
    },
  });

  const successCallback = (position: GeolocationPosition) => {
    setCurrentPosition({
      lat: position["coords"]["latitude"],
      lng: position["coords"]["longitude"],
    });
  };

  const errorCallback = (error: object) => {
    console.error(error);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback, {
      enableHighAccuracy: true,
      timeout: 10000,
    });
  }, []);

  const actions = [
    {
      name: "Leave Map",
      icon: <ExitToAppIcon />,
      onclick: () => router.back(),
    },
    {
      name: "Write Message",
      icon: <MessageIcon />,
      onclick: () => setFormOpen(true),
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Dialog
          open={!agree}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          PaperProps={{
            style: { borderRadius: "1rem" },
          }}
        >
          <DialogTitle id="alert-dialog-title">
            Terms and Conditions
          </DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ my: 2 }} id="alert-dialog-description">
              For your safety, please refrain from using Hikeable while walking.
              Hikeable is not responsible for any accidents that occur while
              using its products.
            </DialogContentText>
            <DialogActions>
              <Button sx={{ color: "#5e7119" }} onClick={() => router.back()}>
                Disagree
              </Button>
              <Button
                sx={{ color: "#5e7119" }}
                onClick={() => setAgree(true)}
                autoFocus
              >
                Agree
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
        <LargeMap
          lat={lat}
          lon={lon}
          trailID={trailID}
          isSubmitted={isSubmitted}
          setIsSubmitted={setIsSubmitted}
          currentPosition={currentPosition}
          setCurrentPosition={setCurrentPosition}
          setMessageDetails={setMessageDetails}
        />
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          FabProps={{
            sx: {
              backgroundColor: "#304b35",
              "&:hover": {
                bgcolor: "#64801a",
              },
            },
          }}
          sx={{ position: "fixed", bottom: 16, right: 16 }}
          icon={<SpeedDialIcon />}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              tooltipTitle={action.name}
              icon={action.icon}
              onClick={action.onclick}
            />
          ))}
        </SpeedDial>
        <MessageForm
          trailID={trailID}
          currentPosition={currentPosition}
          formOpen={formOpen}
          setFormOpen={setFormOpen}
          setIsSubmitted={setIsSubmitted}
        />
        <MessageDetails
          messageDetails={messageDetails}
          setMessageDetails={setMessageDetails}
        />
      </Box>
    </ThemeProvider>
  );
};

export default MapView;
