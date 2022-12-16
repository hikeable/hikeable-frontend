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
import MessageRating from "../components/MessageRating";

type LatLngObject = {
  lat: number | null;
  lng: number | null;
};

const MapView = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  const trailID = Number(searchParams.get("trailID"));
  const [agree, setAgree] = useState(false);
  const [currentPosition, setCurrentPosition] = useState<LatLngObject>({
    lat: null,
    lng: null,
  });
  const [formOpen, setFormOpen] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const successCallback = (position: object) => {
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
    <Box>
      <Dialog
        open={!agree}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Terms and Conditions</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ my: 2 }} id="alert-dialog-description">
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
        currentPosition={currentPosition}
        setCurrentPosition={setCurrentPosition}
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
        formOpen={formOpen}
        setFormOpen={setFormOpen}
        setIsSubmitted={setIsSubmitted}
      />
      <MessageRating />
    </Box>
  );
};

export default MapView;
