import React, { Component } from 'react';
import { apiCall } from './api';
import CreateReview from "./CreateReview"
import Service from './Service'
import Reviews from './Reviews'
import './App.css'

class App extends Component {
    state = {
        services: null,
        lawyer: {}
    }
    constructor(props) {
        super(props)
        this.getServices()
    }

    getServices = async () => {
        let services = await apiCall('get', '/services')
        this.setState({ services: services })
    }

    viewLawyer = async (id) => {
        let lawyer = await apiCall('get', `/services/${id}`)

        this.setState({
            showLawyer: true,
            lawyer: lawyer
        })

    }

    viewLawyerZ = () => {
        this.setState({
            showLawyer: false
        })
    }

    getServices = async () => {
        let services = await apiCall('get', '/services')
        services.sort((a, b) => (a.votes > b.votes) ? 1 : -1)
        services.reverse()
        this.setState({ services: services })
    }

    createReview = async (serviceId, review) => {
        // guard against any dumb shit
        if (review.trim() == "" || review.trim() == null || review.trim() == undefined || review.length < 5) {
            alert("Please enter a valid review of at least 5 characters")
        }

        let createdReview = await apiCall('post', `/services/${serviceId}/review`, { review: review })
        console.log(createdReview)
        await this.getServices()

        this.viewLawyer(serviceId)
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
            <div className="animated slideInUp shadow mt-3" id="show-one-container" style={{ marginTop: "40px" }} style={{ border: 'none', borderRadius: '5px' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-12 d-flex justify-content-center align-items-center">
                            <span className="h4 mt-3 text-center"> {this.state.lawyer ? this.state.lawyer.name : ""}</span>
                        </div>
                        <div className="card-body">
                            <p className="d-flex justify-content-center card-text" style={{ margin: "0 auto" }}></p>
                            <CreateReview id={this.state.lawyer ? this.state.lawyer._id : ""} submit={this.createReview} />
                        </div>
                    </div>
                </div>
                <Reviews reviews={this.state.lawyer.reviews} />
            </div>
        )

        let lawyerContent = this.state.showLawyer ? lawyer : null

        return (
            <div className="App">
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top shadow" style={{ backgroundColor: '#226CE0' }}>
                    <div className="d-flex flex-row justify-content-between align-items-center">
                        <div>
                            <img src="https://www.pinclipart.com/picdir/big/422-4223386_duck-clipart-bathroom-rubber-duck-with-sunglasses-png.png" alt="" style={{ maxWidth: '75px', maxHeight: '75px' }} className="hover" />
                            <a className="pl-3 navbar-brand" href="#"> SQUEAKY CLEAN - clean your record</a>
                        </div>
                        <h2 className="ml-5" style={{ color: 'white' }}>Criminal Record Relief Services in Fresno, CA</h2>
                    </div>


                </nav>

                <div className="container-fluid mx-0">
                    <div className="row justify-content-center">
                        <div className="col-10">
                            <div className="row">
                                <div className="col-8">
                                    <div className="row justify-content-center">
                                        {services}
                                    </div>
                                </div>
                                <div className="col-4">
                                    {lawyerContent}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default App;
