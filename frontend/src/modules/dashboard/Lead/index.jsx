import React from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, Button, IconButton, Dialog, DialogTitle, DialogContent,
    DialogContentText, DialogActions,
    Grid,
    TextField,
    MenuItem,
    Box
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LeadFormModal from './LeadFormModal';
import { useDispatch, useSelector } from 'react-redux';
import { deleteLeadApiCall, fetchLeadList } from '../action';
import usePagination from '../../../components/Pagination';
import Loader from '../../../components/Loader';
import { StatusOption, SubscriptionOption, TypeOption } from '../../../helpers/commonFunction';
// import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import dayjs from 'dayjs';


const Lead = () => {

    const { data, loading, total } = useSelector(state => state.lead);
    const dispatch = useDispatch();

    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
    const [selectedLead, setSelectedLead] = React.useState(null);
    const [formDialogOpen, setFormDialogOpen] = React.useState(false);
    const [filters, setFilters] = React.useState({
        page: 0,
        limit: 10,
        search: '',
        fromDate: '',
        toDate: '',
        status: '',
        subscription: '',
        type: ''
    });
    const [dateRange, setDateRange] = React.useState([null, null]);

    React.useEffect(() => {
        fetchLeadList(filters, dispatch);
    }, [dispatch, filters]);

    const [paging] = usePagination(total, filters, setFilters);

    const handleDeleteOpen = (lead) => {
        setSelectedLead(lead);
        setDeleteDialogOpen(true);
    };

    const handleDeleteClose = () => {
        setDeleteDialogOpen(false);
        setSelectedLead(null);
    };

    const confirmDelete = () => {
        deleteLeadApiCall(selectedLead._id, refetchLeadList);
    };

    const handleAddLead = () => {
        setSelectedLead(null);
        setFormDialogOpen(true);
    }

    const handleEdit = (lead) => {
        setSelectedLead(lead);
        setFormDialogOpen(true);
    };

    const refetchLeadList = () => {
        fetchLeadList(filters, dispatch);
        setDeleteDialogOpen(false);
        setFormDialogOpen(false);
        setSelectedLead(null);
    }


    return (
        <div style={{ padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                <h1 className="text-3xl font-bold text-gray-800">Leads</h1>
                <Button variant="contained" color="primary" onClick={handleAddLead}>
                    Add New Lead
                </Button>
            </div>

            {/* Search & Filter */}
            {/* Filters Section */}
            <Grid container spacing={2} style={{ marginBottom: 16 }}>
                <Grid item xs={12} sm={4} md={3}>
                    <TextField
                        fullWidth
                        label="Search"
                        variant="outlined"
                        value={filters.search || ''}
                        onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value, page: 0 }))}
                    />
                </Grid>

                <Grid item xs={12} sm={4} md={3}>
                    <TextField
                        fullWidth
                        select
                        label="Status"
                        variant="outlined"
                        value={filters.status || ''}
                        onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value, page: 0 }))}
                    >
                        {StatusOption.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>

                <Grid item xs={12} sm={4} md={3}>
                    <TextField
                        fullWidth
                        select
                        label="Type"
                        variant="outlined"
                        value={filters.type || ''}
                        onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value, page: 0 }))}
                    >
                        {TypeOption.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>

                <Grid item xs={12} sm={4} md={3}>
                    <TextField
                        fullWidth
                        select
                        label="Subscription"
                        variant="outlined"
                        value={filters.subscription || ''}
                        onChange={(e) => setFilters(prev => ({ ...prev, subscription: e.target.value, page: 0 }))}
                    >
                        {SubscriptionOption.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>

                {/* <Grid item xs={12} sm={6} md={4}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateRangePicker
                            startText="From Date"
                            endText="To Date"
                            value={dateRange}
                            onChange={(newValue) => {
                                setDateRange(newValue);
                                setFilters(prev => ({
                                    ...prev,
                                    fromDate: newValue[0] ? newValue[0].startOf('day').toISOString() : undefined,
                                    toDate: newValue[1] ? newValue[1].endOf('day').toISOString() : undefined,
                                    page: 0,
                                }));
                            }}
                            renderInput={(startProps, endProps) => (
                                <React.Fragment>
                                    <TextField {...startProps} fullWidth margin="dense" />
                                    <Box sx={{ mx: 1 }}> to </Box>
                                    <TextField {...endProps} fullWidth margin="dense" />
                                </React.Fragment>
                            )}
                        />
                    </LocalizationProvider>
                </Grid> */}

                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        label="From Date"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={filters.fromDate || ''}
                        onChange={(e) => setFilters(prev => ({ ...prev, fromDate: e.target.value, page: 0 }))}
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        label="To Date"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={filters.toDate || ''}
                        onChange={(e) => setFilters(prev => ({ ...prev, toDate: e.target.value, page: 0 }))}
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={3} style={{ display: 'flex', alignItems: 'center' }}>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => setFilters({ page: 0, limit: 10 })}
                        fullWidth
                    >
                        Reset Filters
                    </Button>
                </Grid>
            </Grid>

            {
                data && data.length && !loading ? (
                    <>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Phone</TableCell>
                                        <TableCell>Company Name</TableCell>
                                        <TableCell>Source</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Type</TableCell>
                                        <TableCell>Subscription</TableCell>
                                        <TableCell>CreatedAt</TableCell>
                                        <TableCell align="center">Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.map((lead) => (
                                        <TableRow key={lead._id}>
                                            <TableCell>{lead._id}</TableCell>
                                            <TableCell>{lead.name}</TableCell>
                                            <TableCell>{lead.email}</TableCell>
                                            <TableCell>{lead.phone}</TableCell>
                                            <TableCell>{lead.companyName}</TableCell>
                                            <TableCell>{lead.source}</TableCell>
                                            <TableCell>{lead.status}</TableCell>
                                            <TableCell>{lead.type}</TableCell>
                                            <TableCell>{lead.subscription}</TableCell>
                                            <TableCell>{new Date(lead.createdAt).toLocaleDateString()}</TableCell>
                                            <TableCell align="center">
                                                <IconButton color="primary" onClick={() => handleEdit(lead)}>
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton color="error" onClick={() => handleDeleteOpen(lead)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            {paging}
                        </TableContainer>
                    </>
                ) : loading ? (
                    <Loader />
                ) : (
                    <div className='record_not_found'>No Record Found</div>
                )
            }


            {/* Delete Dialog */}
            <Dialog open={deleteDialogOpen} onClose={handleDeleteClose}>
                <DialogTitle>Delete Lead</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete <strong>{selectedLead?.name}</strong>?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteClose}>Cancel</Button>
                    <Button onClick={confirmDelete} color="error" variant="contained">Delete</Button>
                </DialogActions>
            </Dialog>

            <LeadFormModal
                open={formDialogOpen}
                onClose={() => setFormDialogOpen(false)}
                lead={selectedLead}
                refetch={refetchLeadList}
            />

        </div>
    );
};

export default Lead;
