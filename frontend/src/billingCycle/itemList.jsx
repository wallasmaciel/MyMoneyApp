import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, arrayInsert, arrayRemove } from 'redux-form';
import Grid from '../common/layout/grid';
import Input from '../common/form/input';
import ButtonActionBillingCycle from '../common/button/ButtonActionBillingCycle';
import If from '../common/operator/if';
import Select from '../common/form/select';

class ItemList extends Component {

    add(index, item = {}) {
        if(!this.props.readOnly) {
            this.props.arrayInsert('billingCycleForm', this.props.field, index, item);
        }
    }

    remove(index) {
        if(!this.props.readOnly && this.props.list.length > 1) {
            this.props.arrayRemove('billingCycleForm', this.props.field, index);
        }
    }

    renderRows() {
        const list = this.props.list || []; 
        return list.map((item, index) => (
            <tr key={ index }>
                <td>
                    <Field name={ `${ this.props.field }[${ index }].name` } component={ Input } 
                        placeholder='Informe o nome' readOnly={ this.props.readOnly }/>
                </td>
                <td>
                    <Field name={ `${ this.props.field }[${index}].value` } component={ Input }
                        placeholder='Informe o valor' readOnly={ this.props.readOnly } />
                </td>
                <If test={ this.props.showStatus }>
                    <td>
                        <Field name={ `${ this.props.field }[${index}].status` } component={ Select }
                            placeholder='Informe o status' readOnly={ this.props.readOnly }>
                            <option value='PAGO'>PAGO</option>
                            <option value='PENDENTE'>PENDENTE</option>
                            <option value='AGENDADO'>AGENDADO</option>
                        </Field>
                    </td>
                </If>
                <td>    
                    <ButtonActionBillingCycle type='success' 
                        click={() => this.add(index + 1)} icon='plus' />
                    <ButtonActionBillingCycle type='warning' 
                        click={() => this.add(index + 1, item)} icon='clone' />
                    <ButtonActionBillingCycle type='danger' 
                        click={() => this.remove(index)} icon='trash-o' />
                </td>
            </tr>
        ));
    }

    render() {
        return (
            <Grid cols={this.props.cols}>
                <fieldset>
                    <legend>{ this.props.legend }</legend>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Valor</th>
                                <If test={ this.props.showStatus }>
                                    <th>Status</th>
                                </If>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.renderRows() }
                        </tbody>
                    </table>
                </fieldset>
            </Grid>
        );
    }
};

export default connect(
    null, 
    dispatch => bindActionCreators({ arrayInsert, arrayRemove }, dispatch)
)(ItemList); 