import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

const mapview = () => {
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
            You are now using Hikeable's interactive map mode. Here, you can
            read and write helpful messages for other Hikeable users to interact
            with using your device's GPS coordinates. For your and others'
            safety, please refrain from using Hikeable while walking. Hikeable
            is not responsible for any accidents that may occur while using its
            products. Messages that condone violence, hate speech, harmful
            misinformation, or criminal acts will be deleted, and the offending
            user will be banned.
          </DialogContentText>
          <DialogActions>
            <Button onClick={handleDisagree}>Disagree</Button>
            <Button onClick={handleAgree} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default mapview;
