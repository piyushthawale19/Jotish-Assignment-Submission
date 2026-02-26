import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Container,
    Paper,
    Box,
    Typography,
    Button,
    Divider,
} from '@mui/material';

interface Employee {
    id: string;
    name: string;
    designation: string;
    salary: number;
    city: string;
    [key: string]: any;
}

const PhotoResultPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const photo: string = location.state?.photo;
    const employee: Employee = location.state?.employee;

    if (!photo) {
        return (
            <Container maxWidth="md" sx={{ py: 4 }}>
                <Typography color="error">No photo found</Typography>
                <Button onClick={() => navigate('/list')} sx={{ mt: 2 }}>Back to List</Button>
            </Container>
        );
    }

    const downloadPhoto = () => {
        const link = document.createElement('a');
        link.href = photo;
        link.download = `photo-${employee?.name || 'captured'}.jpg`;
        link.click();
    };

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f1f5f9' }}>
            <Box sx={{ bgcolor: '#fff', borderBottom: '1px solid #e2e8f0', px: 3, py: 2 }}>
                <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Button
                        variant="text"
                        onClick={() => navigate(`/details/${employee?.id}`, { state: { employee } })}
                        sx={{ textTransform: 'none', color: '#475569' }}
                    >
                        &larr; Back to Details
                    </Button>
                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>Photo Result</Typography>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ py: 3 }} className="animate-fadeIn">
                <Paper elevation={0} sx={{ p: 3, border: '1px solid #e2e8f0', borderRadius: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b' }}>
                        Captured Photo
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#64748b', mb: 2 }}>
                        Taken on {new Date().toLocaleDateString()}
                    </Typography>

                    <Divider sx={{ mb: 3 }} />

                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 3 }}>
                        <Box
                            className="animate-slideUp"
                            sx={{
                                bgcolor: '#fafbfc', borderRadius: 2, border: '1px solid #e2e8f0',
                                overflow: 'hidden', display: 'flex', justifyContent: 'center',
                                alignItems: 'center', minHeight: 400, p: 2,
                            }}
                        >
                            <img
                                src={photo}
                                alt="Captured"
                                style={{
                                    maxWidth: '100%', maxHeight: '100%',
                                    objectFit: 'contain', borderRadius: '6px',
                                }}
                            />
                        </Box>

                        {employee && (
                            <Box
                                className="animate-slideUp stagger-2"
                                sx={{ bgcolor: '#fafbfc', border: '1px solid #e2e8f0', borderRadius: 2, p: 2.5 }}
                            >
                                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1e293b', mb: 2 }}>
                                    Employee Info
                                </Typography>
                                <Divider sx={{ mb: 2 }} />
                                {[
                                    { label: 'Name', value: employee.name },
                                    { label: 'Designation', value: employee.designation },
                                    { label: 'Salary', value: `$${(employee.salary || 0).toLocaleString()}` },
                                    { label: 'City', value: employee.city },
                                ].map((item, i) => (
                                    <Box key={item.label} sx={{ mb: i < 3 ? 2 : 0 }}>
                                        <Typography variant="caption" sx={{ color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                                            {item.label}
                                        </Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 500, color: '#1e293b' }}>
                                            {item.value}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                        )}
                    </Box>

                    <Box sx={{ mt: 3, display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                        <Button variant="contained" onClick={downloadPhoto} sx={{ textTransform: 'none' }}>
                            Download Photo
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => navigate(`/details/${employee?.id}`, { state: { employee } })}
                            sx={{ textTransform: 'none' }}
                        >
                            Take Another Photo
                        </Button>
                        <Button variant="text" onClick={() => navigate('/list')} sx={{ textTransform: 'none', color: '#64748b' }}>
                            Back to List
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default PhotoResultPage;
