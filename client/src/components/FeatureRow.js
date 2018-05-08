import React, { Component } from 'react';

class FeatureRow extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.name}</td>
                <td>{this.props.feature1}</td>
                <td>{this.props.feature2}</td>
            </tr>
        );
    }
}

export default FeatureRow;