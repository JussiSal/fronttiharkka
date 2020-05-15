import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    }
}));

export default function Addtraining(props) {
    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState({ date: '', duration: '', activity: '', customer: '' });
    const [select, setSelect] = useState('');
    const classes = useStyles();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        let uusiaika = training;
        uusiaika.date = new Date(training.date); //aika ei mene oikein ilman tätä kökkeliä , kiitos jaani avusta
        props.addTraining(uusiaika);
        setOpen(false);             
    };

    const handleCancel = () => {
        setOpen(false);
    }

    const handleChange = (event) => {
        setSelect(event.target.value);
        inputChanged(event);
    };

    const inputChanged = (event) => {
        setTraining({ ...training, [event.target.name]: event.target.value });
    }

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Add Training
      </Button>
            <Dialog open={open} onClose={handleCancel} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Training</DialogTitle>
                <DialogContent>

                    <FormControl className={classes.formControl}>
                        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                            Customer
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-placeholder-label-label"
                            id="demo-simple-select-placeholder-label"
                            value={select}
                            onChange={handleChange}
                            displayEmpty
                            name="customer"
                            className={classes.selectEmpty}
                        >
                            {props.customers.map((customer, index) => {
                                let id = customer.links[0].href;
                                return (
                                    <MenuItem key={index} value={id} name="customer">{customer.firstname} {customer.lastname}</MenuItem>)
                            })
                            }
                        </Select>
                    </FormControl>

                    <TextField
                        margin="dense"
                        id="activity"
                        label="Activity"
                        name="activity"
                        value={training.activity}
                        onChange={inputChanged}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="duration"
                        label="Duration"
                        name="duration"
                        value={training.duration}
                        onChange={inputChanged}
                        fullWidth
                    />
                    <TextField
                        label="Date"
                        id="date"
                        name="date"
                        type="datetime-local"
                        value={training.date}
                        onChange={inputChanged}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />


                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}