import React, { Component } from 'react';
import { apiCall } from './api';

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

    viewLawyer(id){

        // get the lawyer object saved into localStorage
        let lawyer = JSON.parse( window.localStorage.getItem(id) )
        console.log(lawyer)

        this.setState({
            showLawyer : true,
            lawyer : lawyer
        })

    }

    render() {

        let table = (
            <div className="container" style={{marginTop: "40px"}} id="table-container">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Address</th>
                                <th scope="col">Phone No</th>
                                <th scope="col">Upvotes</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.services ? this.state.services.map(s => {
                                {
                                    window.localStorage.setItem(s._id, JSON.stringify(s))

                                    return(
                                        <tr className="table-primary">
                                                <th scope="row"> {s.name} </th>
                                                <td> {s.address ? s.address.address1 : "" }</td>
                                                <td> {s.phone} </td>
                                                <td> {s.votes} </td>
                                                <td>
                                                    <button href={"/" + s._id} type="button" className="btn btn-secondary" onClick={() => this.viewLawyer(s._id)}> View Reviews </button>
                                                </td>
                                        </tr>
                                    )
                                }
                            }) : null}

                        </tbody>
                    </table>
                </div>
        )


        let lawyer = (
            <div className="animated slideInUp" id="show-one-container" style={{ marginTop : "40px"}}>
                <div className="container">
                    <div className="card" style={{width : "400px", margin : '0 auto'}}>
                        <img className="card-img-top" src="http://pappalardolaw.com/wp-content/uploads/2017/02/lawyer-placeholder-female.jpg" alt="Card image" />
                        <div className="card-body">
                            <h4 className="card-title"> { this.state.lawyer ? this.state.lawyer.name : "" }</h4>
                            <p className="card-text" >

                                <li className="list-group-item" style={{ margin : "0 auto"}} >
                                    <i className="fa fa-arrow-up"></i>
                                    <span className="label label-primary"> { this.state.lawyer ? this.state.lawyer.votes : "" } </span>
                                    <i className="fa fa-arrow-down"></i>
	                            </li>
                            </p>
                            <a href="#" className="btn btn-primary">See Profile</a>
                        </div>
                    </div>
                </div>
            </div>
        )

        let tableContent = this.state.showLawyer ? null : table
        let lawyerContent = this.state.showLawyer? lawyer : null

        return (
            <div className="App">


                { /* NAV BAR */ }
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top"  style={{borderStyle : 'solid'}}>
                    <a className="navbar-brand" href="#"> SQEAKY CLEAN</a>
                </nav>

                { /**/ }
                { tableContent }



                {/*container for the reviews*/}
                { lawyerContent }



            </div>
        );
    }
}


export default App;
