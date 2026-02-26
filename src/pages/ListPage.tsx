import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Box,
    Typography,
    CircularProgress,
    Chip,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';

interface Employee {
    id: string;
    name: string;
    designation: string;
    salary: number;
    city: string;
    [key: string]: any;
}

const ListPage: React.FC = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                if (user?.data) {
                    const employeeData = Array.isArray(user.data) ? user.data : (user.data.data || []);
                    setEmployees(employeeData);
                } else {
                    setError('No employee data available. Please login again.');
                }
            } catch (err: any) {
                setError(err.message || 'Error loading data');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [user]);

    const handleViewDetails = (employee: Employee) => {
        navigate(`/details/${employee.id}`, { state: { employee } });
    };

    const handleBarGraph = () => {
        navigate('/bar-graph', { state: { employees } });
    };

    const handleViewMap = () => {
        navigate('/map', { state: { employees } });
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f1f5f9' }}>
            {/* Top bar */}
            <Box sx={{ bgcolor: '#fff', borderBottom: '1px solid #e2e8f0', px: 3, py: 2 }}>
                <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1.5 }}>
                    <Typography variant="h5" sx={{ fontWeight: 600, color: '#1e293b' }}>
                        Employee Directory
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1.5 }}>
                        <Button variant="outlined" size="small" onClick={handleBarGraph}>
                            Salary Chart
                        </Button>
                        <Button variant="outlined" size="small" onClick={handleViewMap}>
                            City Map
                        </Button>
                        <Button variant="text" size="small" color="error" onClick={handleLogout}>
                            Logout
                        </Button>
                    </Box>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ py: 3 }} className="animate-fadeIn">
                {error && (
                    <Paper sx={{ p: 2, mb: 2, bgcolor: '#fef2f2', border: '1px solid #fecaca' }}>
                        <Typography color="error" variant="body2">{error}</Typography>
                    </Paper>
                )}

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="body2" sx={{ color: '#64748b' }}>
                        Showing {employees.length} employee{employees.length !== 1 ? 's' : ''}
                    </Typography>
                    <Chip label={`Total: ${employees.length}`} size="small" color="primary" variant="outlined" />
                </Box>

                <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e2e8f0', borderRadius: 2 }}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ bgcolor: '#f8fafc' }}>
                                <TableCell sx={{ fontWeight: 600, color: '#475569' }}>Name</TableCell>
                                <TableCell sx={{ fontWeight: 600, color: '#475569' }}>Designation</TableCell>
                                <TableCell sx={{ fontWeight: 600, color: '#475569' }}>Salary</TableCell>
                                <TableCell sx={{ fontWeight: 600, color: '#475569' }}>City</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 600, color: '#475569' }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {employees.map((employee, index) => (
                                <TableRow
                                    key={employee.id || index}
                                    hover
                                    className={`animate-slideUp stagger-${Math.min(index + 1, 12)}`}
                                    sx={{
                                        cursor: 'pointer',
                                        '&:last-child td': { borderBottom: 0 },
                                    }}
                                >
                                    <TableCell sx={{ fontWeight: 500, color: '#1e293b' }}>{employee.name || 'N/A'}</TableCell>
                                    <TableCell sx={{ color: '#475569' }}>{employee.designation || 'N/A'}</TableCell>
                                    <TableCell sx={{ color: '#059669', fontWeight: 500 }}>
                                        ${(employee.salary || 0).toLocaleString()}
                                    </TableCell>
                                    <TableCell>
                                        <Chip label={employee.city || 'N/A'} size="small" variant="outlined" sx={{ fontSize: '0.8rem' }} />
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button
                                            size="small"
                                            variant="contained"
                                            onClick={() => handleViewDetails(employee)}
                                            sx={{ textTransform: 'none', fontWeight: 500, fontSize: '0.8rem' }}
                                        >
                                            View Details
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </Box>
    );
};

export default ListPage;
