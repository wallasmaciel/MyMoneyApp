import axios from "axios";
import { toastr } from "react-redux-toastr";
import { showTabs, selectTab } from "../common/tab/tabActions";
import { reset as resetFrom, initialize } from 'redux-form';

const BASE_URL = 'http://localhost:3003/api';
const INITIAL_VALUES = {
    credits: [{}],
    debts: [{}]
};

export function getList() {
    const request = axios.get(`${BASE_URL}/billingCycles`);
    return {
        type: 'BILLING_CYCLES_FETCHED',
        payload: request
    };
};

export function create(values) {
    return submit(values, 'post')
};

export function update(values) {
    return submit(values, 'put');
};

export function remove(values) {
    return submit(values, 'delete');
};

function submit(values, method) {
    return dispatch => {
        const id = values._id ? values._id : '';
        axios[method](`${BASE_URL}/billingCycles/${id}`, values)
            .then(response => {
                toastr.success('Sucesso', 'Operação realizada com sucesso');
                // só posso usar pelo uso do middleware do 'redux-multi'
                dispatch(init());
            })
            .catch(err => {
                if(err)
                    err.response.data.errors.forEach(error => {
                        toastr.error('Erro', error)
                    });
            });
    };
};

export function showUpdate(billingCycle) {
    return [
        showTabs('tabUpdate'), 
        selectTab('tabUpdate'), 
        initialize('billingCycleForm', billingCycle)
    ];
};

export function showDelete(billingCycle) {
    return [
        showTabs('tabDelete'), 
        selectTab('tabDelete'), 
        initialize('billingCycleForm', billingCycle)
    ];
};

export function init() {
    return [
        showTabs('tabList', 'tabCreate'), 
        selectTab('tabList'),
        getList(), 
        initialize('billingCycleForm', INITIAL_VALUES)
    ];
};