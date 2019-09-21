import React, { Component } from 'react'

export default class Service extends Component {
    state = {

    }
    constructor(props) {
        super(props)
    }
    render() {
        let { name, address, phone, votes, reviews, _id } = this.props.service
        return (
            <div className="col-12 mt-3">
                <div class="card px-3 py-1 shadow" style={{ borderRadius: '5px', backgroundColor: '#F4F1DE' }}>
                    <img src="" class="card-img-top" alt=""></img>
                    <div class="card-body">
                        <div className="row justify-content-between">
                            <div className="row justify-content-around align-items-center">
                                <i className="fa fa-arrow-up hover" onClick={() => { this.props.upvote(_id) }}></i>
                                <span class="card-text h3 px-2" style={{ color: '#81B29A', fontWeight: '700' }}>{votes}</span>
                                <i className="fa fa-arrow-down hover" onClick={() => { this.props.downvote(_id) }}></i>
                            </div>
                            <h5 class="card-title">{name}</h5>
                        </div>
                        <div className="row justify-content-between">
                            <p class="card-text">{address ? address.address1 : ""}</p>
                            <p class="card-text">{phone}</p>
                        </div>
                    </div>
                    <button href={"/" + _id} type="button" className="btn btn-secondary mb-2" onClick={() => this.props.viewLawyer(_id)}
                        style={{ backgroundColor: '#E07A5F', border: 'none' }}
                    > {reviews.length} Reviews </button>
                </div>
            </div>
        )
    }
}
