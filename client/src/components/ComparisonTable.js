import React, { Component } from 'react';
import logo from '../images/logo.svg';
import '../styles/ComparisonTable.css';

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

class ProductTable extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        const rows = [];

        if(this.props.features && this.props.features.Specification){
            Object.keys(this.props.features.Specification).forEach((spec)=>{
                rows.push(
                    <FeatureRow
                        name={spec}
                        feature1={this.props.features.Specification[spec][0]}
                        feature2={this.props.features.Specification[spec][1]}
                        key={spec+this.props.features.Specification[spec][0]+this.props.features.Specification[spec][1]} />
                );
            });
        }

        return (
            <table>
                <thead>
                <tr>
                    <th>Features</th>
                    <th>Product 1</th>
                    <th>Product 2</th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
}

class InputForm extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        if(event.target.url1.value && event.target.url2.value){
            this.props.onSubmission(event.target.url1.value ,event.target.url2.value);
        }
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input name="url1" type="url" placeholder="First Url" /><br/>
                <input name="url2" type="url" placeholder="Second Url" /><br/>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

class ComparisonTable extends Component {

    constructor(props){
        super(props);

        this.state = {
            features: {}
        };
        this.handleSubmission = this.handleSubmission.bind(this);
    }

    callApi = async (u1,u2) => {
        const response = await fetch('/lazada/services/compare', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                url1: u1,
                url2: u2,
            }),
        });

        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);

        return body;
    };

    handleSubmission(u1, u2){
        this.callApi(u1,u2).then( response => {
            this.setState({
                features: response
            });
        });
    };

    render() {
        return (
            <div>
                <InputForm onSubmission={this.handleSubmission}/>
                <ProductTable features={this.state.features} />
            </div>
        );
    }
}



export default ComparisonTable;