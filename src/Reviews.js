import React, { Component } from 'react'

export default class Reviews extends Component {
    render() {
        return (
            <div className="container" style={{ marginTop: "40px" }} id="reviews-container">
                {
                    this.props.reviews ? this.props.reviews.map((review) => {
                        return (
                            review.body ? (
                                <div>
                                    <div className="alert alert-dismissible alert-warning">
                                        <p class="mb-0" id={review._id}>
                                            {review.body}
                                        </p>
                                    </div>
                                    <hr />
                                </div>
                            ) : null
                        )
                    }) : ""
                }
            </div>
        )
    }
}
