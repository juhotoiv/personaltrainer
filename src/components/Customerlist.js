import React, { useState, useEffect, forwardRef } from 'react';
import MaterialTable from 'material-table';
import AddTraining from './AddTraining'

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Delete from '@material-ui/icons/Delete';
import { Button } from '@material-ui/core';

export default function Customerlist() {
    const tableIcons = {
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
        DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
        Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
        Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
        ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
        ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
    };    

    const [customers, setCustomers] = useState([]);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
    }

    const saveCustomer = (customer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
        .then(res => fetchData())
        .catch(err => console.error(err))
    }

    const updateCustomer = (customer, link) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
        .then(res => fetchData())
        .catch(err => console.error(err))
    }

    const deleteCustomer = (link, name) => {
        if (window.confirm('Are you sure you want to delete ' + name + '?')) {
            fetch(link, {method: 'DELETE'})
            .then(res => fetchData())
            .catch(err => console.error(err))
        }
    }

    const addTraining = (training) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(training)
        })
        .then(res => fetchData())
        .catch(err => console.error(err))
    }

    useEffect(() => fetchData(), []);

    const checkRowdata = (rowData) => {
        try {
            if (typeof rowData.links !== 'undefined') {
                return (<AddTraining addTraining={addTraining} customerLink={rowData.links[0].href}></AddTraining>);
            }
        }
        catch (e) {
            return (<Button style={{margin: 10}}variant="outlined" color="primary"> Add training</Button>)
        }
    }

    return (
        <MaterialTable
            icons={tableIcons}
            options={{
                pageSize: 10,
                pageSizeOptions: [5, 10, 20, 50],
                toolbar: true,
                paging: true,
            }}
            title="Customer list"
            columns={[
                { title: 'First name', field: 'firstname', defaultSort:'asc' },
                { title: 'Last name', field: 'lastname' },
                { title: 'Email', field: 'email' },
                { title: 'Phone', field: 'phone' },
                { title: 'Address', field: 'streetaddress'},
                { title: 'Postcode', field: 'postcode'},
                { title: 'City', field: 'city'},
                { title: 'Add training', render: rowData => checkRowdata(rowData) }
            ]}
            data={customers}
            actions={[
                {
                    icon: Delete,
                    tooltip: 'Delete customer',
                    onClick: (event, rowData) => deleteCustomer(rowData.links[0].href, rowData.firstname)
                },
              ]}
            editable={{
                onRowAdd: newData =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            saveCustomer(newData)
                            resolve()
                        }, 1000)
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                      setTimeout(() => {
                        updateCustomer(newData, oldData.links[0].href)
                        resolve()
                      }, 1000)
                    }),
            }}
        />
    )
}