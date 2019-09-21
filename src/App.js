import React, { Component } from 'react';
import { apiCall } from './api';
import CreateReview from "./CreateReview"
import Service from './Service'
import './App.css'

class App extends Component {
    state = {
        services: null
    }
    constructor(props) {
        super(props)
        this.getServices()
    }

    getServices = async () => {
        let services = await apiCall('get', '/services')
        this.setState({ services: services })
    }

    viewLawyer = (id) => {

        // get the lawyer object saved into localStorage
        let lawyer = JSON.parse(window.localStorage.getItem(id))
        console.log(lawyer)

        this.setState({
            showLawyer: true,
            lawyer: lawyer
        })

    }


    getServices = async () => {
        let services = await apiCall('get', '/services')
        this.setState({ services: services })
    }

    createReview = async (serviceId, review) => {
        console.log(serviceId, review)
        let createdReview = await apiCall('post', `/services/${serviceId}/review`, { review: review })
        console.log(createdReview)
    }

    upvote = async serviceId => {
        let service = await apiCall('post', `/services/${serviceId}/upvote`)
        console.log(service)
        this.setState({
            lawyer: service
        })
        this.getServices()
    }

    downvote = async serviceId => {
        let service = await apiCall('post', `/services/${serviceId}/downvote`)
        console.log(service)
        this.setState({
            lawyer: service
        })
        this.getServices()
    }

    render() {
        let services = this.state.services ? this.state.services.map(service => {
            return <Service service={service} viewLawyer={this.viewLawyer} upvote={this.upvote} downvote={this.downvote}></Service>
        }) : null

        let lawyer = (
            <div className="animated slideInUp shadow" id="show-one-container" style={{ marginTop: "40px" }} style={{ border: 'none', borderRadius: '5px' }}>
                <div className="container">
                    <div className="">
                        <div className="card-body">
                            <h4 className="card-title"> {this.state.lawyer ? this.state.lawyer.name : ""}</h4>
                            <p className="d-flex justify-content-center card-text" style={{ margin: "0 auto" }}>


                            </p>
                            <CreateReview id={this.state.lawyer ? this.state.lawyer._id : ""} submit={this.createReview} />
                        </div>
                    </div>
                </div>
            </div>
        )

        let lawyerContent = this.state.showLawyer ? lawyer : null

        return (
            <div className="App">
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top shadow" style={{ backgroundColor: '#226CE0' }}>
                    <img src="https://www.pinclipart.com/picdir/big/422-4223386_duck-clipart-bathroom-rubber-duck-with-sunglasses-png.png" alt="" style={{ maxWidth: '75px', maxHeight: '75px' }} className="hover" />
                    <a className="pl-3 navbar-brand" href="#"> SQUEAKY CLEAN - clean your record</a>
                </nav>

                <div className="container mx-0">
                    <div className="row">
                        <div className="col-8">
                            <div className="row justify-content-center">
                                <div className="col-8">
                                    <div className="row justify-content-center">
                                        {services}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-4">
                            {lawyerContent}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default App;
