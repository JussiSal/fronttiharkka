import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Addcust from './AddCustomer';
import Editcust from './EditCustomer';

export default function Customers() {
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        getCustomers();
    }, []);

    const getCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
            .then(response => response.json())
            .then(data => setCustomers(data.content))
            .catch(err => console.error(err))
    }

    const deleteCustomer = (link) => {
        if (window.confirm('Are you sure you want to delete this customer?')) {
            fetch(link, { method: 'DELETE' })
                .then(_ => {
                    setMsg('Customer deleted successfully.');
                    setOpen(true);
                    getCustomers();
                })
                .catch(err => console.error(err))
        }
    }

    const addCustomer = (customer) => {
        fetch('https://customerrest.herokuapp.com/api/customers',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(customer)
            }
        )
            .then(_ => {
                getCustomers();
                setMsg('New customer saved');
                setOpen(true);
            })
            .catch(err => console.error(err))
    }

    const editCustomer = (link, customer) => {
        fetch(link,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(customer)
            }
        )
            .then(_ => getCustomers())
            .then(_ => {
                setMsg('Customer info updated.');
                setOpen(true);
            })
            .catch(err => console.error(err))
    }

    const handleClose = () => {
        setOpen(false);
    }

    const columns = [

        {
            Header: 'First Name',
            accessor: 'firstname'
        },
        {
            Header: 'Last name',
            accessor: 'lastname'
        },
        {
            Header: 'Street Address',
            accessor: 'streetaddress'
        },
        {
            Header: 'Postcode',
            accessor: 'postcode'
        },
        {
            Header: 'City',
            accessor: 'city'
        },
        {
            Header: 'Email',
            accessor: 'email'
        },
        {
            Header: 'Phone',
            accessor: 'phone'
        },
        {
            Cell: row => (
                <Editcust customer={row.original} editCustomer={editCustomer} />
            )
        },
        {
            Cell: row => (
                <Button color="secondary" size="medium" onClick={() => deleteCustomer(row.original.links[0].href)}>Delete</Button>)
        }
    ]

    return (
        <div>
            <Addcust addCustomer={addCustomer} />
            <ReactTable data={customers} columns={columns} defaultPageSize={10} filterable={true} />
            <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={handleClose}
                message={msg}
            />
        </div>
    )
}