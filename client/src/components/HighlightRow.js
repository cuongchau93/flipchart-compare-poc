import React, { Component } from 'react';
import { Badge } from 'reactstrap';

class HighlightRow extends Component {
    render() {
        if(this.props.name === "Product Thumbnail"){
            return (
                <tr className="highlighted">
                    <td>{this.props.name}</td>
                    <td><img className="img-thumbnail" src={this.props.feature1} alt="Product 1 Thumbnail"/></td>
                    <td><img className="img-thumbnail" src={this.props.feature2} alt="Product 2 Thumbnail"/></td>
                </tr>
            );
        } else if(this.props.name === "Scores"){
            return (
                <tr className="highlighted">
                    <td>{this.props.name}</td>
                    <td> <Badge color="primary">{this.props.feature1} ★ </Badge></td>
                    <td> <Badge color="primary">{this.props.feature2} ★ </Badge></td>
                </tr>
            );
        } else {
            return (
                <tr className="highlighted">
                    <td>{this.props.name}</td>
                    <td>{this.props.feature1}</td>
                    <td>{this.props.feature2}</td>
                </tr>
            );
        }
    }
}

export default HighlightRow;