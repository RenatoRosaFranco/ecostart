import React from 'react';
import './Review.scss';
import { avatar } from "../../utils/userUtils";

const Review = ({ review }) => {
    const { reviewerName, rating, content, date } = review;

    return (
        <div className='review'>
            <div className="review-avatar">
                <img src={avatar()} alt={`${reviewerName} avatar`} className='reviewer-avatar' />
            </div>
            <div className="review-content">
                <div className="review-header">
                    <h3 className="reviewer-name">{reviewerName}</h3>
                    <div className="review-rating">
                        {Array.from({ length: rating }, (_, index) => (
                            <span key={index} className='star'>⭐</span>
                        ))}
                    </div>
                </div>

                <div className="review-body">
                    <p>{content}</p>
                </div>

                <div className="review-footer">
                    <small>{new Date(date).toLocaleDateString()}</small>
                </div>
            </div>
        </div>
    );
};

export default Review;