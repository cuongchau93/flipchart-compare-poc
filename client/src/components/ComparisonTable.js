import React, { Component } from 'react';
import { Table } from 'reactstrap';
import FeatureRow from './FeatureRow';
import '../styles/ComparisonTable.css';

class ComparisonTable extends Component {
    render() {
        const rows = [];

        if(this.props.features){
            if(this.props.features.Highlights){
                Object.keys(this.props.features.Highlights).forEach((spec)=>{
                    rows.push(
                        <FeatureRow
                            className="highlighted"
                            name={spec}
                            feature1={this.props.features.Highlights[spec][0]}
                            feature2={this.props.features.Highlights[spec][1]}
                            key={spec+this.props.features.Highlights[spec][0]+this.props.features.Highlights[spec][1]} />
                    );
                });
            }

            if(this.props.features.Specifications){
                Object.keys(this.props.features.Specifications).forEach((spec)=>{
                    rows.push(
                        <FeatureRow
                            className="normal"
                            name={spec}
                            feature1={this.props.features.Specifications[spec][0]}
                            feature2={this.props.features.Specifications[spec][1]}
                            key={spec+this.props.features.Specifications[spec][0]+this.props.features.Specifications[spec][1]} />
                    );
                });
            }
        }

        return (
            <Table responsive hover bordered>
                <thead>
                    <tr>
                        <th>Features</th>
                        <th>Product 1</th>
                        <th>Product 2</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        );
    }
}

export default ComparisonTable;