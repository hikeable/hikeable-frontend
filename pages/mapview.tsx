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
import MessageIcon from "@mui/icons-material/Message";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { LargeMap } from "../components";
import MessageForm from "../components/MessageForm";

type CurrentPositionObject = {
  loaded: boolean;
  coordinates: {
    latitude: number | null;
    longitude: number | null;
  };
};

const MapView = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  const trailID = Number(searchParams.get("trailID"));
  const [agree, setAgree] = useState(false);
  const [currentPosition, setCurrentPosition] = useState<CurrentPositionObject>(
    {
      loaded: false,
      coordinates: {
        latitude: null,
        longitude: null,
      },
    }
  );
  const [open, setOpen] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const successCallback = (position: object) => {
    setCurrentPosition({
      loaded: true,
      coordinates: {
        latitude: position["coords"]["latitude"],
        longitude: position["coords"]["longitude"],
      },
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
      onclick: () => setOpen(true),
    },
  ];

  return (
    <Box>
      <Dialog
        open={!agree}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Terms and Conditions</DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <DialogContentText sx={{ mb: 2 }} id="alert-dialog-description">
            For your safety, please refrain from using Hikeable while walking.
            Hikeable is not responsible for any accidents that occur while using
            its products.
          </DialogContentText>
          <DialogActions>
            <Button onClick={() => router.back()}>Disagree</Button>
            <Button onClick={() => setAgree(true)} autoFocus>
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
      />
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
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
        open={open}
        setOpen={setOpen}
        setIsSubmitted={setIsSubmitted}
      />
    </Box>
  );
};

export default MapView;
