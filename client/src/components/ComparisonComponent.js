import React, { Component } from 'react';
import '../styles/ComparisonComponent.css';
import InputForm from './InputForm';
import ComparisonTable from './ComparisonTable';
import LoadingSpinner from './LoadingSpinner';

class ComparisonComponent extends Component {

    constructor(props){
        super(props);

        this.state = {
            features: {},
            loading: false,
            error: ""
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
        if (response.status !== 200)
            throw Error(body.message);

        return body;
    };

    handleSubmission(u1, u2){
        this.setState({
            loading: true
        });

        this.callApi(u1,u2).then( response => {
            this.setState({
                features: response,
                loading: false
            });

        }).catch(err =>{
            this.setState({
                error: err.stack.toString(),
                loading: false
            });
        });
    };

    render() {
        return (
            <div>
                {this.state.error !== "" &&
                <div className="alert alert-danger" onClick={() => {
                    this.setState({error: ""});
                }}>{this.state.error}</div>
                }

                <InputForm onSubmission={this.handleSubmission}/>

                <br/>
                {this.state.loading ? <LoadingSpinner /> : <div />}

                <ComparisonTable features={this.state.features} />
            </div>
        );
    }
}

export default ComparisonComponent;