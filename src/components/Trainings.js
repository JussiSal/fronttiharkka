import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import moment from 'moment-with-locales-es6';
import Addtrng from './AddTraining';


export default function Trainings() {
    const [trainings, setTrainings] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('')

    useEffect(() => {
        getTrainings();
        getCustomers();
    }, [])

    const getCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
            .then(response => response.json())
            .then(data => setCustomers(data.content))
            .catch(err => console.error(err))
    }

    const getTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response => response.json())
            .then(
                data => {
                    let data2 = data;
                    data2.map((trng) => {
                        trng.customer.name = trng.customer.firstname + ' ' + trng.customer.lastname 
                    })

                    setTrainings(data2)
                })
            .catch(err => console.error(err))
    }

    const deleteTraining = (link) => {
        console.log(link)
        if (window.confirm("Are you sure you want to delete this training?")) {
            fetch(link, { method: 'DELETE' })
                .then(_ => {
                    setMsg('Training deleted successfully.');
                    setOpen(true);
                    getTrainings();
                })
                .catch(err => console.error(err))
        }
    }

    const addTraining = (training) => {
        console.log(training);
        fetch('https://customerrest.herokuapp.com/api/trainings/',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(training)
            }
        )
            .then(_ => {
                setMsg('New training saved.');
                setOpen(true);
                getTrainings();
            })
            .catch(err => console.error(err))
    }

    const handleClose = () => {
        setOpen(false);
    }

    const columns = [

        {
            Header: 'Date',
            id: 'date', //jotain hajoaa välillä ehkä kun tätä ei ole, miksi? Vai hajoaako jostain muusta syystä?
            accessor: trning => { return moment(trning.date).locale('fi').format('L LT') }, 
        },
        {
            Header: 'Duration',
            accessor: 'duration',

        },
        {
            Header: 'Activity',
            accessor: 'activity'
        },
        {
            Header: 'Customer',
            accessor: 'customer.name',
        },
        {
            Cell: row => (
                <Button color="secondary" size="small" onClick={() => deleteTraining("https://customerrest.herokuapp.com/api/trainings/" + row.original.id)}>Delete</Button>)
        }
    ]

    return (
        <div>
            <Addtrng addTraining={addTraining} customers={customers}/>
            <ReactTable data={trainings} columns={columns} defaultPageSize={10} filterable={true} />
            <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={handleClose}
                message={msg}
            />

        </div>
    )
}