import { useEffect, useRef, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

const belem = [-1.4631897998991463, -48.4955653127071868];

function LeafletControlGeocoder(props) {
    
    const map = useMap();    

    useEffect(() => {

        const geocoder = L.Control.Geocoder.nominatim();

        L.Control.geocoder({
            query: "",
            placeholder: "Pesquisar Logradouro...",
            defaultMarkGeocode: false,
            geocoder
        })
        .on("markgeocode", ({geocode}) => {
            const latitude = geocode.center.lat;
            const longitude = geocode.center.lng;
            map.setView([latitude, longitude], map.getZoom());
            map.fire('dragend');
        })
        .addTo(map);
    }, [map]);

    return null;
}

function MyMarker(props){    
    
    const markerRef = useRef(null);
    const geocoder = L.Control.Geocoder.nominatim();  
    const [text, setText] = useState("Arraste o mapa para posicionar o cursor.")  ;

    const map = useMapEvents({
        drag(){
            markerRef.current.setLatLng(map.getCenter());
        },
        dragend(e){
            markerRef.current.setLatLng(map.getCenter());
            locate();
        }
    });

    const locate = () => {
        const latlng = map.getCenter();                
        geocoder.reverse(latlng, map.getZoom(), results => {                
            if (results[0]){                
                
                const address = results[0].properties.address;

                const cidade = address.city ?? address.town ?? address.city_district ?? "";
                const bairro = address.neighbourhood ?? address.suburb ?? address.place ?? address.village ?? address.city_district ?? "";
                const logradouro = address.road ?? address.street ?? address.street_name ?? address.place ?? "";

                setText(logradouro + ", " + bairro + ", " + cidade + ".");

                props.onChange({
                    latitude: latlng.lat, longitude: latlng.lng, cidade, bairro, logradouro
                });

            }
            else {
                props.onChange({
                    latitude: latlng.lat, longitude: latlng.lng
                });                    
            }
        });
    }

    return (
        <Marker position={props.position} ref={markerRef}>
            <Popup>{text}</Popup>
        </Marker>
    );
}

function Map(props) {

    const [position, setPosition] = useState(props.position.latitude && props.position.longitude ? props.position : belem);

    const update = data => {
        setPosition([data.latitude, data.longitude]);
        props.onChange(data);
    }

    return (
        <MapContainer
            center={position}
            inertia={false}
            zoom={15}
            scrollWheelZoom='center'
            style={{ minHeight: '360px', height: '100%', width: '100wh' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <LeafletControlGeocoder />
            <MyMarker position={position} onChange={data => update(data)}/>                       
        </MapContainer>
    )
}

export default Map;