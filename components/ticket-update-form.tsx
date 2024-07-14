import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Ticket, TicketStatus } from '@/types';
import { toast } from 'react-toastify';
import { buildUrl } from '@/lib/utils';

interface TicketUpdateFormProps {
    ticket: Ticket;
    onClose: () => void;
    onUpdate: () => void;
}

const TicketUpdateForm: React.FC<TicketUpdateFormProps> = ({ ticket, onClose, onUpdate }) => {
    const [updatedTicket, setUpdatedTicket] = useState<Partial<Ticket>>({
        submitterName: ticket.submitterName,
        submitterPhone: ticket.submitterPhone,
        submitterEmail: ticket.submitterEmail,
        notes: ticket.notes,
        status: ticket.status,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setUpdatedTicket(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(buildUrl(`ticket/${ticket.id}`), {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTicket),
            });

            if (!response.ok) {
                throw new Error('Failed to update ticket');
            }

            toast.success('Ticket updated successfully');
            onUpdate();
            onClose();
        } catch (error) {
            console.error('Error updating ticket:', error);
            toast.error('Failed to update ticket');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="submitterName">Submitter Name</Label>
                <Input
                    id="submitterName"
                    name="submitterName"
                    value={updatedTicket.submitterName}
                    onChange={handleInputChange}
                    placeholder="Submitter Name"
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="submitterPhone">Submitter Phone</Label>
                <Input
                    id="submitterPhone"
                    name="submitterPhone"
                    value={updatedTicket.submitterPhone}
                    onChange={handleInputChange}
                    placeholder="Submitter Phone"
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="submitterEmail">Submitter Email</Label>
                <Input
                    id="submitterEmail"
                    name="submitterEmail"
                    value={updatedTicket.submitterEmail}
                    onChange={handleInputChange}
                    placeholder="Submitter Email"
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Input
                    id="notes"
                    name="notes"
                    value={updatedTicket.notes}
                    onChange={handleInputChange}
                    placeholder="Notes"
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <select
                    id="status"
                    name="status"
                    value={updatedTicket.status}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                >
                    {Object.values(TicketStatus).map(status => (
                        <option key={status} value={status}>{status}</option>
                    ))}
                </select>
            </div>
            <div className="flex justify-end space-x-2">
                <Button type="button" onClick={onClose} variant="outline">Cancel</Button>
                <Button type="submit">Update Ticket</Button>
            </div>
        </form>
    );
};

export default TicketUpdateForm;