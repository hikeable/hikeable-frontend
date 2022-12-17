import React, { useState } from 'react';
import { Paper, Button, Modal, TextField } from '@mui/material';

const ScrollableText: React.FC = () => {
  const [text, setText] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Button onClick={handleModalOpen}>Edit text</Button>
      <Paper elevation={1} style={{ overflowY: 'scroll', height: '500px' }}>
        {text}
      </Paper>
      <Modal open={modalOpen} onClose={handleModalClose}>
        <div>
          <TextField value={text} onChange={handleTextChange} />
          <Button onClick={handleModalClose}>Save</Button>
        </div>
      </Modal>
    </>
  );
};

export default ScrollableText;
