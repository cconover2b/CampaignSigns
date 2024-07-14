// app/dashboard/row-actions.tsx

import React, { useReducer, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Ticket, TicketStatus, User } from '@/types';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Row } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { MdMoreVert } from 'react-icons/md';
import { AiOutlineUserAdd, AiOutlineUserDelete, AiOutlineCheck } from 'react-icons/ai';
import { BsFillMapFill, BsFillTrashFill } from 'react-icons/bs';
import AlertModal from '@/components/modal/alert-modal';
import { buildUrl } from '@/lib/utils';
import { toast } from 'react-toastify';
import InspectorList from './inspector-list';
import MapDialog from '@/components/dialog/map-dialog';

// Enum for alert dialog reasons
enum AlertDialogReasonEnum {
    NONE = "",
    MARK_COMPLETE = 'complete',
    DELETE = 'delete'
}

// Interface for the state managed by useReducer
interface RowActionReducerProps {
    alertDialog: boolean;
    alertDialogReason: AlertDialogReasonEnum;
    mapDialog: boolean;
}

export function RowActions({ row }: { row: Row<Ticket> }) {
    const ticket = row.original;
    const router = useRouter();
    const [progress, setProgress] = useState(false);
    const [inspectorListOpen, setInspectorListOpen] = useState(false);

    const [state, setState] = useReducer((prevstate: RowActionReducerProps, params: Partial<RowActionReducerProps>) => {
        return { ...prevstate, ...params };
    }, {
        alertDialog: false,
        alertDialogReason: AlertDialogReasonEnum.NONE,
        mapDialog: false,
    });

    const handleDelete = () => {
        setState({
            alertDialog: true,
            alertDialogReason: AlertDialogReasonEnum.DELETE
        });
    };

    const handleMarkComplete = () => {
        setState({
            alertDialog: true,
            alertDialogReason: AlertDialogReasonEnum.MARK_COMPLETE
        });
    };

    const handleConfirm = async () => {
        try {
            setProgress(true);
            if (state.alertDialogReason === AlertDialogReasonEnum.DELETE) {
                await fetch(buildUrl(`ticket/${ticket.id}`), {
                    method: "DELETE"
                });
                toast.success('Ticket deleted');
            } else if (state.alertDialogReason === AlertDialogReasonEnum.MARK_COMPLETE) {
                const response = await fetch(buildUrl(`ticket/${ticket.id}`), {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        status: TicketStatus.COMPLETED
                    })
                });
                if (!response.ok) throw new Error('Failed to mark ticket as complete');
                toast.success('Ticket marked as complete');
            }
            router.refresh();
        } catch (error) {
            console.error('Error in handleConfirm:', error);
            toast.error('An error occurred. Please try again.');
        } finally {
            setProgress(false);
            setState({ alertDialog: false, alertDialogReason: AlertDialogReasonEnum.NONE });
        }
    };

    const handleInspectorAssign = async (inspector: User): Promise<void> => {
        try {
            setProgress(true);
            const response = await fetch(buildUrl(`ticket/${ticket.id}`), {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    status: TicketStatus.ASSIGNED,
                    inspector: inspector.id
                })
            });

            if (!response.ok) {
                throw new Error('Failed to update ticket');
            }

            const data = await response.json();
            toast.success(data.message);
            router.refresh();
        } catch (error) {
            console.error('Error in handleInspectorAssign:', error);
            toast.error("Failed to assign inspector");
        } finally {
            setProgress(false);
        }
    };

    const handleUnassign = async () => {
        try {
            setProgress(true);
            const response = await fetch(buildUrl(`ticket/${ticket.id}`), {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    status: TicketStatus.UNASSIGNED,
                    inspector: null
                })
            });

            if (!response.ok) {
                throw new Error('Failed to unassign ticket');
            }

            const data = await response.json();
            toast.success(data.message);
            router.refresh();
        } catch (error) {
            console.error('Error in handleUnassign:', error);
            toast.error("Failed to unassign ticket");
        } finally {
            setProgress(false);
        }
    };

    const handleMapview = () => {
        setState({
            mapDialog: true
        });
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className='flex h-8 w-8 p-0 data-[state=open]:bg:muted'
                    >
                        <span className='sr-only'>Open Menu</span>
                        <MdMoreVert />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => setInspectorListOpen(true)}>
                        <AiOutlineUserAdd className="mr-2 h-4 w-4" />
                        Update
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setInspectorListOpen(true)}>
                        <AiOutlineUserAdd className="mr-2 h-4 w-4" />
                        Assign
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleUnassign}>
                        <AiOutlineUserDelete className="mr-2 h-4 w-4" />
                        Unassign
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleMapview}>
                        <BsFillMapFill className="mr-2 h-4 w-4" />
                        Map View
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-green-600" onClick={handleMarkComplete}>
                        <AiOutlineCheck className="mr-2 h-4 w-4" />
                        Mark complete
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600" onClick={handleDelete}>
                        <BsFillTrashFill className="mr-2 h-4 w-4" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <MapDialog
                open={state.mapDialog}
                onClose={() => setState({ mapDialog: false })}
                latlong={ticket.latlong!}
            />
            <InspectorList 
                open={inspectorListOpen} 
                setOpen={setInspectorListOpen} 
                onInspectorAssign={handleInspectorAssign} 
            />
            <AlertModal
                open={state.alertDialog}
                onClose={() => setState({
                    alertDialog: false,
                    alertDialogReason: AlertDialogReasonEnum.NONE
                })}
                onConfirm={handleConfirm}
            />
        </>
    );
}

export default RowActions;