'use client'

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Ticket, TicketStatus } from '@/types';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { buildUrl } from '@/lib/utils';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import LoadingModal from '../../components/modal/loading-modal';
import Loader from '../../components/ui/loader';

const NewTicketButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [newTicket, setNewTicket] = useState<Partial<Ticket>>({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(buildUrl('ticket/new'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTicket),
      });

      if (response.ok) {
        toast.success('New ticket created successfully');
        setIsOpen(false);
        setNewTicket({});
        router.refresh();
      } else {
        toast.error('Failed to create new ticket');
      }
    } catch (error) {
      console.error('Error creating new ticket:', error);
      toast.error('An error occurred while creating the ticket');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Add New Ticket</Button>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        {/* Sheet content... */}
      </Sheet>
      <LoadingModal open={isLoading} message="Creating new ticket..." />
      {isLoading && <Loader size="large" color="#4A90E2" />}
    </>
  );
};

export default NewTicketButton;