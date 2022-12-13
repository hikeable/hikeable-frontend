import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { LargeMap } from "../components";

const MapView = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  const trailID = searchParams.get("trailID");
  const [agree, setAgree] = useState(false);

  const handleDisagree = () => {
    router.back();
  };

  const handleAgree = () => {
    setAgree(true);
  };

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
            <Button onClick={handleDisagree}>Disagree</Button>
            <Button onClick={handleAgree} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
      <LargeMap lat={lat} lon={lon} trailID={trailID} />
    </>
  );
};

export default MapView;
