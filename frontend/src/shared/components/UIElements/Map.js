import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';

import './Map.css';
import 'mapbox-gl/dist/mapbox-gl.css';

const Map = ({ center, zoom, style, className }) => {
  const mapContainerRef = useRef(null);

  mapboxgl.accessToken =
    'pk.eyJ1IjoiaHlmY2xhc3MyNiIsImEiOiJja2QzNG5hMzQxanhnMnNwdnJ0ZmN1YzB0In0.9wpXECjySi4MS-oOpxwWYQ';

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [center.lng, center.lat],
      zoom,
    });

    new mapboxgl.Marker().setLngLat(center).addTo(map);
    map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
    map.addControl(new mapboxgl.FullscreenControl(), 'top-right');
  }, [center, zoom]);

  return (
    <div
      className={`map ${className}`}
      ref={mapContainerRef}
      style={style}
    ></div>
  );
};

export default Map;
