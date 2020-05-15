import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function EditCustomer(props) {

    const [customer, setCustomer] = useState({ firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: '' });
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setCustomer(
            {
                firstname: props.customer.firstname,
                lastname: props.customer.lastname,
                streetaddress: props.customer.streetaddress,
                postcode: props.customer.postcode,
                city: props.customer.city,
                email: props.customer.email,
                phone: props.customer.phone
            });
        setOpen(true);
    }

    const handleClose = () => {
        props.editCustomer(props.customer.links[0].href, customer);
        setOpen(false);
    }

    const handleCancel = () => {
        setOpen(false);
    }

    const inputChanged = (event) => {
        setCustomer({ ...customer, [event.target.name]: event.target.value });
    }

    return (
        <div>
            <Button size="small" color="primary" onClick={handleClickOpen}>
                Edit
            </Button>
            <Dialog open={open} onClose={handleCancel} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit {customer.lastname}</DialogTitle>
                <DialogContent>
                <TextField
                        autoFocus
                        margin="dense"
                        id="firstname"
                        label="First name"
                        name="firstname"
                        value={customer.firstname}
                        onChange={inputChanged}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="lastname"
                        label="Last name"
                        name="lastname"
                        value={customer.lastname}
                        onChange={inputChanged}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="streetaddress"
                        label="Street address"
                        name="streetaddress"
                        value={customer.streetaddress}
                        onChange={inputChanged}
                        fullWidth
                    />

                    <TextField
                        margin="dense"
                        id="postcode"
                        label="Postcode"
                        name="postcode"
                        value={customer.postcode}
                        onChange={inputChanged}
                        fullWidth
                    />

                    <TextField
                        margin="dense"
                        id="city"
                        label="City"
                        name="city"
                        value={customer.city}
                        onChange={inputChanged}
                        fullWidth
                    />

                    <TextField
                        margin="dense"
                        id="email"
                        label="Email"
                        name="email"
                        value={customer.email}
                        onChange={inputChanged}
                        fullWidth
                    />

                    <TextField
                        margin="dense"
                        id="phone"
                        label="Phone"
                        name="phone"
                        value={customer.phone}
                        onChange={inputChanged}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )

}