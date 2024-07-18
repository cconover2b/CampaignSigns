'use client'

import React, { useState, useEffect } from 'react';
import { buildUrl } from '@/lib/utils';
import { Ticket } from '@/types';
import { DataTable } from './data-table';
import { columns } from './columns';
import LoadingModal from '../../components/modal/loading-modal';
import Loader from '../../components/ui/loader';

function TicketTable() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTickets = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(buildUrl('ticket'), {
          cache: 'no-cache'
        });
        const ticketsJson: Ticket[] = await response.json();
        setTickets(ticketsJson);
      } catch (error) {
        console.error('Failed to fetch tickets:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTickets();
  }, []);

  return (
    <>
      <DataTable 
        columns={columns}
        data={tickets}
      />
      <LoadingModal open={isLoading} message="Loading tickets..." />
      {isLoading && <Loader size="large" color="#4A90E2" />}
    </>
  );
}

export default TicketTable;