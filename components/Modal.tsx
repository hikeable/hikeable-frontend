import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
// import Map from './Map';
import MessageForm from './MessageForm';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

 interface IModal {
  trail:string
 }

export default function BasicModal(trail) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  console.log ("🍒🍒🍒",trail)

 let  arr = [trail.lat]
//  console.log ("🍒🍒🍒",arr, lat)

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            This is the title
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            This is the text content, 
            {arr}
          </Typography>
          {/* <Map lat={trail.lat} lon={trail.lon} trailID={trail.trailID}/> */}
        </Box>
      </Modal>
    </div>
  );
}