import React, { Component } from 'react'

export default class CreateReview extends Component {
    state = {
        body: '',
        message: ''
    }
    constructor(props) {
        super(props)
    }

    handleChange = e => {
        this.setState({ body: e.target.value })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.setState({ body: '', message: 'Thanks for submitting!' })
        this.props.submit(this.props.id, this.state.body)
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 pl-0">
                        <p style={{ color: 'green' }}>{this.state.message}</p>
                        <form className="d-flex justify-content-center flex-column align-items-start">
                            <label htmlFor="" className='d-block h4' >Create Review</label>
                            <div className="d-flex justify-content-center">
                                <textarea className="d-block mb-4 p-3" name="body" id="" onChange={this.handleChange} value={this.state.body}></textarea>
                            </div>

                            <button onClick={this.handleSubmit} className='btn btn-primary btn-lg' style={{ backgroundColor: '#81B29A', border: 'none', borderRadius: '5px' }}>SUBMIT REVIEW</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
