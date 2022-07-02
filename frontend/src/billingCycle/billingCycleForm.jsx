import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
// reduxForm = liga o formulario ao estado é equivalente ao 'connect' do redux
// Field = controlar os campos do formulario 
import { reduxForm, Field, formValueSelector } from 'redux-form';

import { init } from './billingCycleActions';
import LabelAndInput from '../common/form/labelAndInput';
import ItemList from './itemList';
import Summary from './summary';

class BillingCycleForm extends Component {

    calculateSummary() {
        const sum = (t, v) => t + v;
        return {
            sumOfCredits: this.props.credits.map(e => parseFloat(e.value) || 0).reduce(sum), 
            sumOfDebts: this.props.debts.map(e => parseFloat(e.value) || 0).reduce(sum), 
        };
    }
    
    render() {
        const { 
            handleSubmit, 
            readOnly, 
            credits, 
            debts
        } = this.props;

        const {
            sumOfCredits, 
            sumOfDebts
        } = this.calculateSummary();
        // 
        return (
          <form role='form' onSubmit={ handleSubmit }>
            <div className="box-body">
                <Field name='name' component={ LabelAndInput } type='text' readOnly={ readOnly }
                    label='Nome' cols='12 4' placeholder='Informe o nome' />
                <Field name='month' component={ LabelAndInput } type='number' readOnly={ readOnly }
                    label='Mês' cols='12 4' placeholder='Informe o mês' />
                <Field name='year' component={ LabelAndInput } type='number' readOnly={ readOnly }
                    label='Ano' cols='12 4' placeholder='Informe o ano' />

                <Summary credit={ sumOfCredits } debt={ sumOfDebts } />

                <ItemList cols='12 6' list={ credits } readOnly={ readOnly } 
                    field='credits' legend='Créditos' />
                <ItemList cols='12 6' list={ debts } readOnly={ readOnly } 
                    field='debts' legend='Débitos' showStatus={ true } />
            </div>
            <div className="box-footer">
                <button type='submit' className={ `btn btn-${this.props.submitClass}` }>
                    { this.props.submitLabel }</button>
                <button type='button' className='btn btn-default'
                    onClick={ this.props.init }>Cancelar</button>
            </div>
          </form>
        );
    }
};

// billingCycleForm = id do formulario 
const ComponentBillingCycletForm = reduxForm({
    form: 'billingCycleForm', 
    // Evitar a destruição do formulario - normalmente usado para reaproveitar o mesmo formulario 
    destroyOnUnmount: false
})(BillingCycleForm);
// Jogar os valores para o formulario como props 
const selector = formValueSelector('billingCycleForm');
// 
export default connect(
    state => ({
        credits: selector(state, 'credits'),
        debts: selector(state, 'debts')
    }), 
    dispatch => bindActionCreators({init}, dispatch)
)(ComponentBillingCycletForm);