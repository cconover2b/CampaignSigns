'use client';
// app/dashboard/stats.tsx

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { buildUrl } from '@/lib/utils';
import React from 'react';
import {
    MdFiberNew,
    MdOutlineDoneOutline, MdOutlineAssignmentTurnedIn, MdPersonAddDisabled
} from 'react-icons/md';

interface Stats {
    _id: { status: string };
    count: number;
}

async function fetchStats(): Promise<Stats[]> {
    let json: Stats[] = [];

    try {
        const stats = await fetch(buildUrl('stats'), {
            cache: 'no-cache'
        });

        if (!stats.ok) {
            throw new Error('Network response was not ok');
        }

        json = await stats.json();
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error fetching stats:', error.message);
        } else {
            console.error('Unexpected error:', error);
        }
    }

    return json;
}

function Stats() {
    const [statsData, setStatsData] = React.useState<Stats[]>([]);

    React.useEffect(() => {
        fetchStats().then(data => setStatsData(data));
    }, []);

    const statsFor = (token: string) => {
        const filteredStats = statsData.filter(stats => stats._id.status === token);
        return filteredStats.length > 0
            ? filteredStats.map(stats => stats.count).reduce((a, b) => a + b, 0)
            : 0;
    };

    // ... rest of the component
}

export default Stats;