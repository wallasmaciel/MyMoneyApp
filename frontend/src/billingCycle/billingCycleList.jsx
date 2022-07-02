import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getList, showUpdate, showDelete } from "./billingCycleActions";
import ButtonActionBillingCycle from "../common/button/ButtonActionBillingCycle";

class BillingCycleList extends Component {

    componentWillMount() {
        this.props.getList();
    }

    renderRows() {
        const list = this.props.list || [];
        return list.map(bc => (
            <tr key={bc._id}>
                <td>{bc.name}</td>
                <td>{bc.month}</td>
                <td>{bc.year}</td>
                <td>
                    <ButtonActionBillingCycle type='warning' click={() => this.props.showUpdate(bc)}
                        icon='pencil' />
                    <ButtonActionBillingCycle type='danger' click={() => this.props.showDelete(bc)}
                        icon='trash-o' />
                </td>
            </tr>
        ));
    }

    render() {
        return (
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Mês</th>
                            <th>Ano</th>
                            <th className="table-actions">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderRows()}
                    </tbody>
                </table>
            </div>
        );
    }
};

export default connect(
    state => ({list: state.billingCycle.list}), 
    dispatch => bindActionCreators({getList, showUpdate, showDelete}, dispatch)
)(BillingCycleList);