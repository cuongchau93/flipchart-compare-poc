import React, { Component } from 'react';
import '../styles/InputForm.css';
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';

class InputForm extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            loading: false
        }
    }

    handleSubmit(event) {
        if(event.target.url1.value && event.target.url2.value){
            this.props.onSubmission(event.target.url1.value ,event.target.url2.value);
        }
        event.preventDefault();
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit} id="myForm">
                <FormGroup>
                    <Label for="url1">First URL</Label>
                    <Input type="url" id="url1" name="url1" defaultValue="https://www.lazada.sg/products/samsung-galaxy-s8-64gb-midnight-black-i106217842-s108237124.html" />
                </FormGroup>
                <FormGroup>
                    <Label for="url2">Second URL</Label>
                    <Input type="url" id="url2" name="url2" defaultValue="https://www.lazada.sg/apple-iphone-8-256gb-2gb-ram-grey-60291398.html" />
                </FormGroup>
                <Button>Submit</Button>
            </Form>
        );
    }
}
export default InputForm;