import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
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
} from "@mui/material";
import NearMeIcon from "@mui/icons-material/NearMe";
import MessageIcon from "@mui/icons-material/Message";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { LargeMap } from "../components";

const MapView = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  const trailID = searchParams.get("trailID");
  const [agree, setAgree] = useState(false);

  const actions = [
    {
      name: "Leave Map",
      icon: <ExitToAppIcon />,
      onclick: () => router.back(),
    },
    { name: "Write Message", icon: <MessageIcon /> },

    { name: "My Location", icon: <NearMeIcon /> },
  ];

  return (
    <>
      <Dialog
        open={!agree}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Terms and Conditions</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Disclaimer
          </DialogContentText>
          <DialogActions>
            <Button onClick={() => router.back()}>Disagree</Button>
            <Button onClick={() => setAgree(true)} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
      <LargeMap lat={lat} lon={lon} trailID={trailID} />
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
    </>
  );
};

export default MapView;
