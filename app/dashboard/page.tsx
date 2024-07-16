// app/dashboard/page.tsx
"use client";

import React, { Suspense } from 'react';
import NewTicketButton from './new-ticket-button.tsx';

const Stats = React.lazy(() => import('./stats'));
const TicketTable = React.lazy(() => import('./ticket-table'));

const DashboardPage: React.FC = () => {
    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <NewTicketButton />
            </div>
            <Suspense fallback={<div>Loading stats...</div>}>
                <Stats />
            </Suspense>
            <Suspense fallback={<div>Loading tickets...</div>}>
                <TicketTable />
            </Suspense>
        </div>
    );
};

export default DashboardPage;