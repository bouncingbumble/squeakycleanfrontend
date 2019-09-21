import React, { Component } from 'react'

export default class CreateReview extends Component {
    state = {
        body: ''
    }
    constructor(props) {
        super(props)
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.submit(this.props.id, this.state.body)
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <form className="">
                            <label htmlFor="" className='d-block'>Review</label>
                            <textarea className="d-block mb-4" name="body" id="" cols="50" rows="4" onChange={this.handleChange}></textarea>
                            <button onClick={this.handleSubmit} className='btn btn-primary btn-lg'>SUBMIT REVIEW</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
