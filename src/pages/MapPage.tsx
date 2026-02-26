import React, { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Container,
    Paper,
    Box,
    Typography,
    Button,
} from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface Employee {
    id: string;
    name: string;
    designation: string;
    salary: number;
    city: string;
    [key: string]: any;
}

const MapPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const employees: Employee[] = location.state?.employees || [];

    const cityLocations = useMemo(() => {
        const cityMap = new Map<string, Employee[]>();

        employees.forEach((emp) => {
            const city = emp.city || 'Unknown';
            if (!cityMap.has(city)) cityMap.set(city, []);
            cityMap.get(city)!.push(emp);
        });

        const coordinates: Record<string, [number, number]> = {
            'New York': [40.7128, -74.006],
            'San Francisco': [37.7749, -122.4194],
            'Los Angeles': [34.0522, -118.2437],
            'Chicago': [41.8781, -87.6298],
            'Houston': [29.7604, -95.3698],
            'Phoenix': [33.4484, -112.074],
            'Philadelphia': [39.9526, -75.1652],
            'San Antonio': [29.4241, -98.4936],
            'San Diego': [32.7157, -117.1611],
            'Dallas': [32.7767, -96.797],
            'Seattle': [47.6062, -122.3321],
            'Denver': [39.7392, -104.9903],
            'Boston': [42.3601, -71.0589],
            'Miami': [25.7617, -80.1918],
            'Atlanta': [33.749, -84.388],
            'Mumbai': [19.076, 72.8777],
            'Delhi': [28.7041, 77.1025],
            'Bangalore': [12.9716, 77.5946],
            'Hyderabad': [17.387, 78.4711],
            'Chennai': [13.0827, 80.2707],
            'Pune': [18.5204, 73.8567],
            'Kolkata': [22.5726, 88.3639],
            'London': [51.5074, -0.1278],
            'Paris': [48.8566, 2.3522],
            'Berlin': [52.52, 13.405],
            'Tokyo': [35.6762, 139.6503],
            'Sydney': [33.8688, 151.2093],
            'Toronto': [43.6532, -79.3832],
            'Vancouver': [49.2827, -123.1207],
            'Singapore': [1.3521, 103.8198],
        };

        return Array.from(cityMap.entries()).map(([city, emps]) => {
            const [lat, lng] = coordinates[city] || [0, 0];
            return { city, lat, lng, employees: emps, count: emps.length };
        }).filter((loc) => loc.lat !== 0);
    }, [employees]);

    const centerLat = useMemo(() => {
        if (cityLocations.length === 0) return 20;
        return cityLocations.reduce((s, l) => s + l.lat, 0) / cityLocations.length;
    }, [cityLocations]);

    const centerLng = useMemo(() => {
        if (cityLocations.length === 0) return 78;
        return cityLocations.reduce((s, l) => s + l.lng, 0) / cityLocations.length;
    }, [cityLocations]);

    const markerIcon = (count: number) => L.divIcon({
        html: `<div style="
            background:#1976d2; color:#fff; border-radius:50%;
            width:32px; height:32px; display:flex; align-items:center;
            justify-content:center; font-weight:600; font-size:13px;
            border:2px solid #fff; box-shadow:0 2px 6px rgba(0,0,0,0.25);
        ">${count}</div>`,
        className: 'custom-icon',
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -16],
    });

    if (employees.length === 0) {
        return (
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Typography color="error">No employee data found</Typography>
                <Button onClick={() => navigate('/list')} sx={{ mt: 2 }}>Back to List</Button>
            </Container>
        );
    }

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f1f5f9' }}>
            <Box sx={{ bgcolor: '#fff', borderBottom: '1px solid #e2e8f0', px: 3, py: 2 }}>
                <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Button variant="text" onClick={() => navigate('/list')} sx={{ textTransform: 'none', color: '#475569' }}>
                        &larr; Back to List
                    </Button>
                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>City Map</Typography>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ py: 3 }} className="animate-fadeIn">
                <Paper elevation={0} sx={{ border: '1px solid #e2e8f0', borderRadius: 2, overflow: 'hidden' }}>
                    <Box sx={{ px: 3, py: 2, borderBottom: '1px solid #e2e8f0', bgcolor: '#fafbfc' }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b' }}>
                            Employee Locations
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#64748b' }}>
                            {cityLocations.length} cities &middot; {employees.length} employees
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 280px' }, minHeight: 500 }}>
                        <Box sx={{ height: { xs: 350, md: 500 } }}>
                            <MapContainer
                                center={[centerLat, centerLng]}
                                zoom={4}
                                style={{ height: '100%', width: '100%' }}
                            >
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution='&copy; OpenStreetMap contributors'
                                />
                                {cityLocations.map((loc) => (
                                    <Marker key={loc.city} position={[loc.lat, loc.lng]} icon={markerIcon(loc.count)}>
                                        <Popup>
                                            <Box sx={{ minWidth: 180, p: 0.5 }}>
                                                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{loc.city}</Typography>
                                                <Typography variant="body2" sx={{ color: '#64748b' }}>
                                                    {loc.count} employee{loc.count !== 1 ? 's' : ''}
                                                </Typography>
                                                {loc.employees.map((e) => (
                                                    <Typography key={e.id} variant="caption" display="block" sx={{ color: '#475569' }}>
                                                        {e.name} - {e.designation}
                                                    </Typography>
                                                ))}
                                            </Box>
                                        </Popup>
                                    </Marker>
                                ))}
                            </MapContainer>
                        </Box>

                        <Box sx={{ overflow: 'auto', p: 2, borderLeft: { md: '1px solid #e2e8f0' }, bgcolor: '#fafbfc', maxHeight: { md: 500 } }}>
                            <Typography variant="subtitle2" sx={{ mb: 1.5, color: '#475569', fontWeight: 600 }}>
                                Cities ({cityLocations.length})
                            </Typography>
                            {cityLocations.map((loc, idx) => (
                                <Box
                                    key={loc.city}
                                    className={`animate-slideLeft stagger-${Math.min(idx + 1, 12)}`}
                                    sx={{
                                        mb: 1, p: 1.5, bgcolor: '#fff', borderRadius: 1.5,
                                        border: '1px solid #e2e8f0',
                                        transition: 'box-shadow 0.2s',
                                        '&:hover': { boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }
                                    }}
                                >
                                    <Typography variant="body2" sx={{ fontWeight: 500, color: '#1e293b' }}>
                                        {loc.city}
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: '#64748b' }}>
                                        {loc.count} employee{loc.count !== 1 ? 's' : ''}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Paper>

                <Box sx={{ mt: 2 }}>
                    <Button variant="outlined" onClick={() => navigate('/list')} sx={{ textTransform: 'none' }}>
                        &larr; Back to Employee List
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

export default MapPage;
