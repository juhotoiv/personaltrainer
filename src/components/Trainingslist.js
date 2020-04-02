import React, { useState, useEffect, forwardRef } from 'react';
import MaterialTable from 'material-table';
import moment from 'moment';

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

export default function Trainingslist() {
    const [trainings, setTrainings] = useState([]);

    useEffect(() => fetchData(), []);

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

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
    }

    const getCustomerName = (customer) => {
        try {
            if (typeof customer.firstname !== 'undefined') {
                let customerName = customer.firstname + " " + customer.lastname;
                return customerName;
            } else {
                return 'Unknown';
            }
        }
        catch (e) {
            console.log('Customer not in database')
            return 'Unknown';
        }
    }

    const deleteTraining = (id) => {
        if (window.confirm('Are you sure you want to delete the training?')) {
            fetch('https://customerrest.herokuapp.com/api/trainings/' + id, {method: 'DELETE'})
            .then(res => fetchData())
            .catch(err => console.error(err))
        }
    }
    
    return (
        <MaterialTable
            icons={tableIcons}
            options={{
                pageSize: 10,
                pageSizeOptions: [5, 10, 20, 50],
                toolbar: true,
                paging: true
            }}
            title="Trainings list"
            columns={[
                { title: 'Activity', field: 'activity' },
                { title: 'Date', field:'date', defaultSort:'asc', render: rowData => moment(rowData.date).format('lll')},
                { title: 'Duration (min)', field: 'duration' },
                { title: 'Customer', 
                render: rowData => getCustomerName(rowData.customer) }
            ]}
            data={trainings}
            actions={[
                {
                    icon: Delete,
                    tooltip: 'Delete training',
                    onClick: (event, rowData) => deleteTraining(rowData.id)
                },
              ]} 
        />
    )
}