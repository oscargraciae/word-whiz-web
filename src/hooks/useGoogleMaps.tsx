import { useEffect, useRef, useState } from "react"

const icon: google.maps.Symbol = {
  // path: 'M24 12.4286C24 19.2927 12 29 12 29C12 29 0 19.2927 0 12.4286C0 5.56446 5.37258 0 12 0C18.6274 0 24 5.56446 24 12.4286Z',
  // path: "M-20,0a20,20 0 1,0 40,0a20,20 0 1,0 -40,0",
  path: 'M51,0 C51,28.16699981689453 28.16699981689453,51 0,51 C-28.16699981689453,51 -51,28.16699981689453 -51,0 C-51,-28.16699981689453 -28.16699981689453,-51 0,-51 C28.16699981689453,-51 51,-28.16699981689453 51,0z',
  fillColor: '#3722d3',
  fillOpacity: 0.2,
  scale: 1,
  strokeColor: "#FFF",
  strokeWeight: 3,
};

export const useGoogleMaps = ({ coordsLatLng }: { coordsLatLng?: google.maps.LatLngLiteral | undefined | null }) => {
  const refContainer = useRef<any>();
  const refMap = useRef<google.maps.Map>();
  const refMarker = useRef<google.maps.Marker>();

  useEffect(() => {
    const map = new google.maps.Map(refContainer.current, {
      center: coordsLatLng ?? { lat: 19.4326, lng: -99.1332 },
      zoom: 17,
      scrollwheel: false,
      streetViewControl: false,
      fullscreenControl: false,
      mapTypeControl: false,
      zoomControl: false,
      disableDoubleClickZoom: true,
      zoomControlOptions: { position: google.maps.ControlPosition.TOP_LEFT }
    });

    refMap.current = map;

    if (coordsLatLng) {
      addMarker({ ...coordsLatLng })
    }

  }, []);

  const addMarker = ({ lat, lng } : any) => {
    if (refMap.current) {
      const mark = new google.maps.Marker({ position: { lat, lng }, map: refMap.current, draggable: false, icon })
      refMarker.current = mark;
    }
  }

  const changeLocation = (coords :any) => {
    if (refMap.current) {
      refMap.current.setCenter(coords);
      addMarker(coords);
    }
  }

  const setLatLngLocation = ({ lat, lng, hasMark = false }: { lat: number, lng: number, hasMark: boolean }) => {
    if (!refMap.current) return

    refMap.current.setCenter({ lat, lng })
    if (hasMark) {
      addMarker({ lat, lng })
    }
  }

  return {
    refContainer,
    addMarker,
    changeLocation,
    setLatLngLocation,
  }
}
