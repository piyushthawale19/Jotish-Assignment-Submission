import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Container,
    Paper,
    Box,
    Typography,
    Button,
    Divider,
} from '@mui/material';
import PhotoModal from '../components/PhotoModal';

interface Employee {
    id: string;
    name: string;
    designation: string;
    salary: number;
    city: string;
    [key: string]: any;
}

const DetailsPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const employee: Employee = location.state?.employee;
    const [photoModalOpen, setPhotoModalOpen] = useState(false);
    const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);

    if (!employee) {
        return (
            <Container maxWidth="md" sx={{ py: 4 }}>
                <Typography color="error">No employee data found</Typography>
                <Button onClick={() => navigate('/list')} sx={{ mt: 2 }}>Back to List</Button>
            </Container>
        );
    }

    const handleCapturePhoto = (imageSrc: string) => {
        setCapturedPhoto(imageSrc);
        sessionStorage.setItem('capturedPhoto', imageSrc);
        navigate('/photo-result', { state: { photo: imageSrc, employee } });
    };

    const infoFields = [
        { label: 'Employee ID', value: employee.id || 'N/A' },
        { label: 'Designation', value: employee.designation || 'N/A' },
        { label: 'Salary', value: `$${(employee.salary || 0).toLocaleString()}` },
        { label: 'City', value: employee.city || 'N/A' },
    ];

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f1f5f9' }}>
            {/* Top bar */}
            <Box sx={{ bgcolor: '#fff', borderBottom: '1px solid #e2e8f0', px: 3, py: 2 }}>
                <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Button variant="text" onClick={() => navigate('/list')} sx={{ textTransform: 'none', color: '#475569' }}>
                        &larr; Back to List
                    </Button>
                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>Employee Details</Typography>
                </Container>
            </Box>

            <Container maxWidth="md" sx={{ py: 4 }} className="animate-fadeIn">
                <Paper elevation={0} sx={{ p: 4, border: '1px solid #e2e8f0', borderRadius: 2 }}>
                    {/* Employee name header */}
                    <Box className="animate-slideLeft">
                        <Typography variant="h4" sx={{ fontWeight: 600, color: '#1e293b', mb: 0.5 }}>
                            {employee.name || 'N/A'}
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#64748b' }}>
                            {employee.designation || 'Employee'}
                        </Typography>
                    </Box>

                    <Divider sx={{ my: 3 }} />

                    {/* Info grid */}
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2.5, mb: 4 }}>
                        {infoFields.map((field, idx) => (
                            <Box
                                key={field.label}
                                className={`animate-slideUp stagger-${idx + 1}`}
                                sx={{
                                    p: 2.5,
                                    bgcolor: '#f8fafc',
                                    borderRadius: 2,
                                    border: '1px solid #e2e8f0',
                                    transition: 'box-shadow 0.2s ease',
                                    '&:hover': { boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }
                                }}
                            >
                                <Typography variant="caption" sx={{ color: '#94a3b8', textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: 0.5 }}>
                                    {field.label}
                                </Typography>
                                <Typography variant="h6" sx={{ fontWeight: 500, color: '#1e293b', mt: 0.5 }}>
                                    {field.value}
                                </Typography>
                            </Box>
                        ))}
                    </Box>

                    {/* Email / Phone if available */}
                    {(employee.email || employee.phone) && (
                        <Box sx={{ mb: 3, p: 2, bgcolor: '#f8fafc', borderRadius: 2, border: '1px solid #e2e8f0' }}>
                            {employee.email && (
                                <Typography variant="body2" sx={{ color: '#475569', mb: 0.5 }}>
                                    Email: {employee.email}
                                </Typography>
                            )}
                            {employee.phone && (
                                <Typography variant="body2" sx={{ color: '#475569' }}>
                                    Phone: {employee.phone}
                                </Typography>
                            )}
                        </Box>
                    )}

                    {/* Actions */}
                    <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                        <Button
                            variant="contained"
                            onClick={() => setPhotoModalOpen(true)}
                            sx={{ textTransform: 'none' }}
                        >
                            Capture Photo
                        </Button>
                        {capturedPhoto && (
                            <Button
                                variant="outlined"
                                onClick={() => navigate('/photo-result', { state: { photo: capturedPhoto, employee } })}
                                sx={{ textTransform: 'none' }}
                            >
                                View Last Photo
                            </Button>
                        )}
                    </Box>
                </Paper>

                <PhotoModal
                    open={photoModalOpen}
                    onClose={() => setPhotoModalOpen(false)}
                    onCapture={handleCapturePhoto}
                />
            </Container>
        </Box>
    );
};

export default DetailsPage;
