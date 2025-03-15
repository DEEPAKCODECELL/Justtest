import React, { useEffect, useState, useRef } from "react";
import { View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import tw from "../../tailwind";

const NearbyProvidersMap = () => {
    const [userLocation, setUserLocation] = useState(null);
    const [filteredProviders, setFilteredProviders] = useState([]);
    const mapRef = useRef(null);

    // Hardcoded active providers
    const providers = [
        { id: 1, name: "Provider 1", latitude: 12.926633642913128, longitude: 77.61528879611251 },
        { id: 2, name: "Provider 2", latitude: 12.937493817134566, longitude: 77.60996765378445 },
        { id: 3, name: "Provider 3", latitude: 12.934838379751351, longitude: 77.61109973844063 },
        { id: 4, name: "Provider 4", latitude: 12.926374223918351, longitude: 77.61689946542496 },
        { id: 5, name: "Provider 5", latitude: 12.931419384563638, longitude: 77.61651496912818 },
        { id: 6, name: "Provider 6", latitude: 12.958335179939134, longitude: 77.58671628568027 } // 10km away
    ];

    // Function to calculate distance (Haversine formula)
    const getDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Radius of Earth in km
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distance in km
    };

    useEffect(() => {
        (async () => {
            let location = {
                coords: {
                    latitude: 12.93173502213596,
                    longitude: 77.61492567223628,
                }
            }
            setUserLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });

            // Filter providers within 5 km
            const nearby = providers.filter(provider => {
                return getDistance(
                    location.coords.latitude,
                    location.coords.longitude,
                    provider.latitude,
                    provider.longitude
                ) <= 5; // 5 km radius
            });

            setFilteredProviders(nearby);
        })();
    }, []);

    useEffect(() => {
        if (userLocation && mapRef.current) {
            const markers = [
                userLocation,
                ...filteredProviders.map(p => ({
                    latitude: p.latitude,
                    longitude: p.longitude
                }))
            ];

            mapRef.current.fitToCoordinates(markers, {
                edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
                animated: true
            });
        }
    }, [userLocation, filteredProviders]);

    return (
        <View style={tw`flex-1`}>
            {userLocation && (
                <MapView
                    ref={mapRef}
                    provider={PROVIDER_GOOGLE}
                    style={tw`h-80 w-full rounded-lg`}
                    customMapStyle={mapStyle}
                    scrollEnabled={false}
                    zoomEnabled={false}
                    rotateEnabled={false}
                    pitchEnabled={false}
                >
                    {/* User Marker */}
                    <Marker coordinate={userLocation} title="You" pinColor="blue" tappable={false} />

                    {/* Nearby Providers */}
                    {filteredProviders.map(provider => (
                        <Marker
                            key={provider.id}
                            coordinate={{ latitude: provider.latitude, longitude: provider.longitude }}
                            title={provider.name}
                            pinColor="red"
                            tappable={false}
                        />
                    ))}
                </MapView>
            )}
        </View>
    );
};

const mapStyle = [
    { elementType: "geometry", stylers: [{ color: "#ffffff" }] },
    { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
    { elementType: "labels.text.fill", stylers: [{ visibility: "off" }] },
    { elementType: "labels.text.stroke", stylers: [{ visibility: "off" }] },
    { featureType: "road", elementType: "geometry", stylers: [{ color: "#f5f5f5" }] },
    { featureType: "landscape.man_made", elementType: "geometry", stylers: [{ color: "#f5f5f5" }] },
    { featureType: "water", elementType: "geometry", stylers: [{ color: "#e0e0e0" }] },
    { featureType: "poi", stylers: [{ visibility: "off" }] },
    { featureType: "transit", stylers: [{ visibility: "off" }] }
];

export default NearbyProvidersMap;
