import React, { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { GoogleMapsError, MarkerLibraryError, UnknownError } from '@/lib/errors';

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
                if (!window.google || !window.google.maps) {
                    console.log('Loading Google Maps API...');
                    const loader = new Loader({
                        apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
                        version: 'weekly',
                        libraries: ['places', 'marker']
                    });

                    await loader.load();
                    console.log('Google Maps API loaded.');
                }

                if (!window.google || !window.google.maps) {
                    throw new GoogleMapsError('Google Maps library not loaded.');
                }

                const { Map } = google.maps;

                console.log('google.maps.marker:', google.maps.marker);

                const AdvancedMarkerElement: any = (google.maps as any).marker?.AdvancedMarkerElement;

                if (!AdvancedMarkerElement) {
                    throw new MarkerLibraryError('Google Maps Marker library not loaded or AdvancedMarkerElement is undefined.');
                }
                
                const position = {
                    lat: 33.3528,
                    lng: 111.7890
                    // lat: coordinates[0],
                    // lng: coordinates[1]
                };

                const mapOptions = {
                    center: position,
                    zoom: 17,
                    mapId: 'campaignsigns-1234'
                };

                const map = new Map(mapRef.current as HTMLDivElement, mapOptions);
                console.log('Map initialized.');

                const markerElement = document.createElement('div');
                markerElement.style.backgroundImage = 'url(/marker_flag.png)';
                markerElement.style.backgroundSize = '32px 32px';
                markerElement.style.width = '32px';
                markerElement.style.height = '32px';
                markerElement.classList.add('marker-drop-animation');

                const marker = new AdvancedMarkerElement({
                    map: map,
                    position: position,
                    title: "Pet found here",
                    content: markerElement,
                });
                
                console.log('Marker added to map.');

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
                if (error instanceof GoogleMapsError || error instanceof MarkerLibraryError) {
                    console.error(`[${error.name}] ${error.message}`);
                    console.error(error.stack);
                } else if (error instanceof Error) {
                    console.error(`[UnknownError] ${error.message}`);
                    console.error(error.stack);
                } else {
                    console.error('[UnknownError] An unknown error occurred');
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