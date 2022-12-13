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
    </>
  );
};

export default MapView;
