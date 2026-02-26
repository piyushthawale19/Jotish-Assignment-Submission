import React, { useRef } from 'react';
import Webcam from 'react-webcam';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

interface PhotoModalProps {
    open: boolean;
    onClose: () => void;
    onCapture: (imageSrc: string) => void;
}

const PhotoModal: React.FC<PhotoModalProps> = ({ open, onClose, onCapture }) => {
    const webcamRef = useRef<Webcam>(null);

    const capturePhoto = () => {
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();
            if (imageSrc) {
                onCapture(imageSrc);
                onClose();
            }
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Capture Photo</DialogTitle>
            <DialogContent>
                <div style={{ marginTop: '1rem' }}>
                    <Webcam
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        style={{ width: '100%', borderRadius: '8px' }}
                    />
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={capturePhoto} variant="contained" color="primary">
                    Capture
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default PhotoModal;
