import React, { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Container,
    Paper,
    Box,
    Typography,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    LineChart,
    Line,
} from 'recharts';

interface Employee {
    id: string;
    name: string;
    designation: string;
    salary: number;
    city: string;
    [key: string]: any;
}

const BarGraphPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const employees: Employee[] = location.state?.employees || [];
    const [chartType, setChartType] = useState<'bar' | 'line'>('bar');

    const chartData = useMemo(() => {
        return employees.slice(0, 10).map((emp) => ({
            name: emp.name?.split(' ')[0] || 'N/A',
            salary: emp.salary || 0,
            id: emp.id,
        }));
    }, [employees]);

    const stats = useMemo(() => {
        if (chartData.length === 0) return { avg: 0, max: 0, min: 0 };
        const salaries = chartData.map((d) => d.salary);
        const avg = salaries.reduce((a, b) => a + b, 0) / salaries.length;
        return { avg: Math.round(avg), max: Math.max(...salaries), min: Math.min(...salaries) };
    }, [chartData]);

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
                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>Salary Analysis</Typography>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ py: 4 }} className="animate-fadeIn">
                <Paper elevation={0} sx={{ p: 4, border: '1px solid #e2e8f0', borderRadius: 2, mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
                        <Typography variant="h5" sx={{ fontWeight: 600, color: '#1e293b' }}>
                            Salary Comparison - Top 10
                        </Typography>
                        <FormControl size="small" sx={{ minWidth: 160 }}>
                            <InputLabel>Chart Type</InputLabel>
                            <Select
                                value={chartType}
                                label="Chart Type"
                                onChange={(e) => setChartType(e.target.value as 'bar' | 'line')}
                            >
                                <MenuItem value="bar">Bar Chart</MenuItem>
                                <MenuItem value="line">Line Chart</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    <Box sx={{ bgcolor: '#fafbfc', borderRadius: 2, p: 2, border: '1px solid #f0f0f0', minHeight: 400 }}>
                        <ResponsiveContainer width="100%" height={400}>
                            {chartType === 'bar' ? (
                                <BarChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                    <XAxis dataKey="name" stroke="#64748b" fontSize={13} />
                                    <YAxis stroke="#64748b" />
                                    <Tooltip
                                        formatter={(value: any) => `$${value.toLocaleString()}`}
                                        contentStyle={{ border: '1px solid #e2e8f0', borderRadius: 6, fontSize: 13 }}
                                    />
                                    <Legend />
                                    <Bar dataKey="salary" fill="#1976d2" name="Salary ($)" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            ) : (
                                <LineChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                    <XAxis dataKey="name" stroke="#64748b" fontSize={13} />
                                    <YAxis stroke="#64748b" />
                                    <Tooltip
                                        formatter={(value: any) => `$${value.toLocaleString()}`}
                                        contentStyle={{ border: '1px solid #e2e8f0', borderRadius: 6, fontSize: 13 }}
                                    />
                                    <Legend />
                                    <Line type="monotone" dataKey="salary" stroke="#1976d2" strokeWidth={2} name="Salary ($)" dot={{ fill: '#1976d2', r: 4 }} />
                                </LineChart>
                            )}
                        </ResponsiveContainer>
                    </Box>
                </Paper>

                {/* Stats row */}
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr' }, gap: 2 }}>
                    {[
                        { label: 'Average Salary', value: `$${stats.avg.toLocaleString()}`, color: '#1976d2' },
                        { label: 'Highest Salary', value: `$${stats.max.toLocaleString()}`, color: '#059669' },
                        { label: 'Lowest Salary', value: `$${stats.min.toLocaleString()}`, color: '#dc2626' },
                    ].map((stat, idx) => (
                        <Paper
                            key={stat.label}
                            elevation={0}
                            className={`animate-slideUp stagger-${idx + 1} hover-lift`}
                            sx={{
                                p: 3, border: '1px solid #e2e8f0', borderRadius: 2,
                                borderLeft: `3px solid ${stat.color}`,
                            }}
                        >
                            <Typography variant="body2" sx={{ color: '#64748b', mb: 0.5 }}>{stat.label}</Typography>
                            <Typography variant="h5" sx={{ fontWeight: 600, color: stat.color }}>{stat.value}</Typography>
                        </Paper>
                    ))}
                </Box>

                <Box sx={{ mt: 3 }}>
                    <Button variant="outlined" onClick={() => navigate('/list')} sx={{ textTransform: 'none' }}>
                        &larr; Back to Employee List
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

export default BarGraphPage;
