import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText
} from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { addLeadApiCall, updateLeadApiCall } from '../action';
import { StatusOption, SubscriptionOption, TypeOption } from '../../../helpers/commonFunction';

const LeadSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  phone: Yup.string()
    .matches(
      /^(\+?\d{1,4}[\s-]?)?(\d{10})$/,
      'Invalid phone number format'
    )
    .required('Phone is required'),
  companyName: Yup.string().required('Company name is required'),
  status: Yup.string().required('Status is required'),
  type: Yup.string().required('Type is required'),
  subscription: Yup.string().required('Subscription is required'),
});

const LeadFormModal = ({ open, onClose, lead, refetch = () => { } }) => {

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{lead?._id ? "Edit" : "Add"} lead</DialogTitle>
      <Formik
        initialValues={{
          name: lead?.name || '',
          email: lead?.email || '',
          phone: lead?.phone || '',
          companyName: lead?.companyName || '',
          status: lead?.status || '',
          type: lead?.type || '',
          subscription: lead?.subscription || '',
        }}
        validationSchema={LeadSchema}
        onSubmit={(values, { setSubmitting }) => {
          if (lead?._id) {
            updateLeadApiCall(values, lead._id, setSubmitting, refetch);
          } else {
            addLeadApiCall(values, setSubmitting, refetch);
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting, }) => (
          <Form onSubmit={handleSubmit}>
            <DialogContent dividers>
              <TextField
                fullWidth
                margin="normal"
                id="name"
                name="name"
                label="Name"
                value={values.name}
                onChange={handleChange}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />
              <TextField
                fullWidth
                margin="normal"
                name="email"
                label="Email"
                value={values.email}
                onChange={handleChange}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
              <TextField
                fullWidth
                margin="normal"
                name="phone"
                label="Phone"
                value={values.phone}
                onChange={handleChange}
                error={touched.phone && Boolean(errors.phone)}
                helperText={touched.phone && errors.phone}
              />
              <TextField
                fullWidth
                margin="normal"
                name="companyName"
                label="Company Name"
                value={values.companyName}
                onChange={handleChange}
                error={touched.companyName && Boolean(errors.companyName)}
                helperText={touched.companyName && errors.companyName}
              />
              <div className='my-5'>
                <FormControl fullWidth>
                  <InputLabel id="role-label">Status</InputLabel>
                  <Select
                    labelId="role-label"
                    id="status"
                    name="status"
                    value={values.status}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.status && errors.status)}
                  >
                    {StatusOption.map(option => (
                      <MenuItem value={option.value}>{option.label}</MenuItem>
                    ))}
                  </Select>
                  {touched.status && errors.status && (
                    <FormHelperText error>{errors.status}</FormHelperText>
                  )}
                </FormControl>
              </div>

              <div className='my-5'>
                <FormControl fullWidth>
                  <InputLabel id="role-label">Type</InputLabel>
                  <Select
                    labelId="role-label"
                    id="type"
                    name="type"
                    value={values.type}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.type && errors.type)}
                  >
                    {TypeOption.map(option => (
                      <MenuItem value={option.value}>{option.label}</MenuItem>
                    ))}
                  </Select>
                  {touched.type && errors.type && (
                    <FormHelperText error>{errors.type}</FormHelperText>
                  )}
                </FormControl>
              </div>
              <div className='my-5'>
                <FormControl fullWidth>
                  <InputLabel id="role-label">Subscription</InputLabel>
                  <Select
                    labelId="role-label"
                    id="subscription"
                    name="subscription"
                    value={values.subscription}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.subscription && errors.subscription)}
                  >
                    {SubscriptionOption.map(option => (
                      <MenuItem value={option.value}>{option.label}</MenuItem>
                    ))}
                  </Select>
                  {touched.subscription && errors.subscription && (
                    <FormHelperText error>{errors.subscription}</FormHelperText>
                  )}
                </FormControl>
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose}>Cancel</Button>
              <Button type="submit" variant="contained" color="primary">{lead?._id ? "Update" : "Add"}</Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default LeadFormModal;
