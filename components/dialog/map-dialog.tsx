// components/dialog/map-dialog.tsx
import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { LatLong } from '@/types';
import Map from '../map';

interface MapDialogProps {
    open: boolean;
    onClose: () => void;
    latlong: LatLong;
}

// 43.6425662,-79.3870568
const MapDialog: React.FC<MapDialogProps> = ({ open, onClose, latlong }) => {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>MapView</DialogTitle>
                </DialogHeader>
                <Map coordinates={latlong.coordinates} />
            </DialogContent>
        </Dialog>
    );
};

export default MapDialog;