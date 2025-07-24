import React, { useRef, useEffect, useState } from 'react';
import './Map.css';
import MapOL from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import OSM from 'ol/source/OSM';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import { Style, Icon } from 'ol/style';

const Map = (props) => {
    const mapRef = useRef();
    const mapInstanceRef = useRef();
    const { center, zoom } = props;
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!mapRef.current) return;

        // Create marker feature
        const markerFeature = new Feature({
            geometry: new Point(fromLonLat([center.lng, center.lat]))
        });

        // Create marker style
        const markerStyle = new Style({
            image: new Icon({
                anchor: [0.5, 1],
                anchorXUnits: 'fraction',
                anchorYUnits: 'fraction',
                src: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`
          <svg width="30" height="40" viewBox="0 0 30 40" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 0C6.7 0 0 6.7 0 15c0 15 15 25 15 25s15-10 15-25C30 6.7 23.3 0 15 0z" fill="#ff4444" stroke="#fff" stroke-width="2"/>
            <circle cx="15" cy="15" r="6" fill="#fff"/>
          </svg>
        `)
            })
        });

        markerFeature.setStyle(markerStyle);

        // Create vector source and layer for marker
        const vectorSource = new VectorSource({
            features: [markerFeature]
        });

        const vectorLayer = new VectorLayer({
            source: vectorSource
        });

        // Create map
        const map = new MapOL({
            target: mapRef.current,
            layers: [
                new TileLayer({
                    source: new OSM()
                }),
                vectorLayer
            ],
            view: new View({
                center: fromLonLat([center.lng, center.lat]),
                zoom: zoom
            })
        });

        mapInstanceRef.current = map;

        // Handle loading state
        const tileLayer = map.getLayers().getArray()[0];
        const source = tileLayer.getSource();

        source.on('tileloadstart', () => {
            setIsLoading(true);
        });

        source.on(['tileloadend', 'tileloaderror'], () => {
            setIsLoading(false);
        });

        // Initial load complete
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        // Cleanup
        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.setTarget(null);
                mapInstanceRef.current = null;
            }
        };
    }, [center.lat, center.lng, zoom]);

    return (
        <div className={`map ${props.className || ''}`} style={props.style}>
            <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
            {isLoading && (
                <div
                    className="map-loading"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        zIndex: 1000
                    }}
                >
                    Loading map...
                </div>
            )}
        </div>
    );
};

export default Map;