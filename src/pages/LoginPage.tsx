import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    TextField,
    Button,
    Box,
    Typography,
    Alert,
    Paper,
    CircularProgress,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login, loading, error } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(username, password);
            navigate('/list');
        } catch (err) {
            console.error('Login error:', err);
        }
    };

    return (
        <Box sx={{
            minHeight: '100vh',
            bgcolor: '#eef2f6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Container maxWidth="xs" className="animate-fadeIn">
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                    <Box sx={{
                        width: 52, height: 52, borderRadius: '50%',
                        bgcolor: '#1976d2', display: 'inline-flex',
                        alignItems: 'center', justifyContent: 'center', mb: 1.5
                    }}>
                        <Typography sx={{ color: '#fff', fontSize: 22, lineHeight: 1 }}>&#x1F512;</Typography>
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 600, color: '#1e293b' }}>
                        Employee Portal
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#64748b', mt: 0.5 }}>
                        Sign in to access the dashboard
                    </Typography>
                </Box>

                <Paper elevation={1} sx={{ p: 3.5, borderRadius: 2 }}>
                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}

                    <Box component="form" onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            disabled={loading}
                            margin="normal"
                            size="medium"
                            autoComplete="username"
                        />
                        <TextField
                            fullWidth
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={loading}
                            margin="normal"
                            size="medium"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={loading}
                            sx={{
                                mt: 2.5, py: 1.3,
                                textTransform: 'none',
                                fontSize: '0.95rem',
                                fontWeight: 500,
                            }}
                        >
                            {loading ? <CircularProgress size={22} color="inherit" /> : 'Sign In'}
                        </Button>
                    </Box>
                </Paper>

                <Box sx={{
                    mt: 2.5, p: 2, bgcolor: '#fff',
                    borderRadius: 1.5, border: '1px solid #e2e8f0',
                }}>
                    <Typography variant="body2" sx={{ fontWeight: 500, color: '#475569', mb: 0.5 }}>
                        Test Credentials
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#64748b' }}>
                        Username: <b>testuser</b> &nbsp;|&nbsp; Password: <b>Test123</b>
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default LoginPage;
