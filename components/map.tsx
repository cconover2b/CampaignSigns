'use client'
import React, { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

// Function to build content for map info card
const buildMapInfoCardContent = (title: string, body: string): string => {
    return `
        <div class="map_infocard_content">
            <div class="map_infocard_title">${title}</div>
            <div class="map_infocard_body">${body}</div>`;
}

function Map({ coordinates }: { coordinates: number[] }) {
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const initMap = async () => {
            try {
                // Check if Google Maps API is already loaded
                if (!window.google || !window.google.maps) {
                    console.log('Loading Google Maps API...');
                    const loader = new Loader({
                        apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
                        version: 'weekly',
                        libraries: ['places', 'marker'] // Ensure 'places' and 'marker' libraries are loaded
                    });

                    await loader.load();
                    console.log('Google Maps API loaded.');
                }

                // Verify Google Maps API is available
                if (!window.google || !window.google.maps) {
                    throw new Error('Google Maps library not loaded.');
                }

                const { Map } = google.maps;

                // Use 'any' type for AdvancedMarkerElement
                const AdvancedMarkerElement: any = (google.maps as any).marker.AdvancedMarkerElement;

                const position = {
                    lat: coordinates[0],
                    lng: coordinates[1]
                };

                const mapOptions = {
                    center: position,
                    zoom: 17,
                    mapId: 'campaignsigns-1234'
                };

                // Initialize map
                const map = new Map(mapRef.current as HTMLDivElement, mapOptions);
                console.log('Map initialized.');

                // Create marker element
                const markerElement = document.createElement('div');
                markerElement.style.backgroundImage = 'url(/marker_flag.png)';
                markerElement.style.backgroundSize = '32px 32px';
                markerElement.style.width = '32px';
                markerElement.style.height = '32px';
                markerElement.classList.add('marker-drop-animation');

                // Add marker to map
                const marker = new AdvancedMarkerElement({
                    map: map,
                    position: position,
                    title: "Pet found here",
                    content: markerElement,
                });
                
                console.log('Marker added to map.');

                // Create info card and attach to marker
                const infoCard = new google.maps.InfoWindow({
                    position: position,
                    content: buildMapInfoCardContent('Title', 'Body'),
                    minWidth: 200
                });

                infoCard.open({
                    map: map,
                    anchor: marker
                });
                
                console.log('Info card opened.');
            } catch (error) {
                if (error instanceof Error) {
                    console.error(error.message);
                } else {
                    console.error('An unknown error occurred');
                }
            }
        };

        initMap();
    }, [coordinates]);

    return (
        <div style={{ height: '600px' }} ref={mapRef} />
    );
}

export default Map;