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

    render() {
        return (
            <div className="App">
                { /* NAV BAR */}
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top" style={{ borderStyle: 'solid' }}>
                    <img src="https://www.pinclipart.com/picdir/big/422-4223386_duck-clipart-bathroom-rubber-duck-with-sunglasses-png.png" alt="" style={{ maxWidth: '75px', maxHeight: '75px' }} />
                    <a className="pl-3 navbar-brand" href="#"> SQUEAKY CLEAN - clean your record</a>
                </nav>

                { /* table of all lawyers in the area */}
                <div className="container" style={{ marginTop: "40px" }}>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Address</th>
                                <th scope="col">Phone No</th>
                                <th scope="col">Column heading</th>
                            </tr>
                        </thead>
                        <tbody>

                            {this.state.services ? this.state.services.map(s => {
                                {
                                    console.log(s)
                                    return (
                                        <tr className="table-primary">
                                            <th scope="row"> {s.name} </th>
                                            <td> {s.address.address1}</td>
                                            <td> {s.phone} </td>
                                            <td>Column content</td>
                                        </tr>
                                    )
                                }
                            }) : null}


                        </tbody>
                    </table>
                </div>




            </div>
        );
    }
}


export default App;
