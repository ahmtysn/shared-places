import React, { useState, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

import LoadingSpinner from "../UIElements/LoadingSpinner";
import Modal from "../../../shared/components/UIElements/Modal/Modal";
import useHttpRequest from "../../hooks/http-hook";
import AuthContext from "../../context/auth-context";
import ErrorModal from "../UIElements/Modal/ErrorModal";
import Button from "../../components/FormElements/Button";
import ConfirmModal from "./Modal/ConfirmModal";

import "./StarRating.css";

function StarRating({ placeId, creatorId, rate, isRated }) {
	const auth = useContext(AuthContext);
	const { isLoading, error, sendRequest, clearError } = useHttpRequest();
	const [rating, setRating] = useState(rate);
	const [ratedAlready, setRatedAlready] = useState(isRated);
	const [showLoginModal, setShowLoginModal] = useState(false);

	const history = useHistory();

	//Login modal to show if user not logged in
	const showWarningHandler = () => setShowLoginModal(true);
	const closeWarningHandler = () => setShowLoginModal(false);

	const rateHandler = ratingValue => {
		if (!auth.token) {
			showWarningHandler();
		} else {
			setRating(ratingValue);
			patchRates(ratingValue);
			setRatedAlready(true);
		}
	};
	const patchRates = async ratingValue => {
		try {
			const response = await sendRequest(
				`http://localhost:5000/api/places/rate/${placeId}`,
				"PATCH",
				JSON.stringify({
					rating: ratingValue,
					isRated: ratedAlready,
				}),
				{
					"Content-Type": "application/json",
					Authorization: `Bearer ${auth.token}`,
				}
			);
			setRating(response.rate.rating);
		} catch (err) {}
	};

	return (
		<>
			{isLoading && <LoadingSpinner asOverlay />}
			<ErrorModal error={error} onClear={clearError} />
			<Modal
				show={showLoginModal}
				onCancel={closeWarningHandler}
				footerClass='place-item__modal-actions'
				footer={
					<Button
						inverse
						onClick={() => {
							history.push("/auth");
						}}
					>
						Log In
					</Button>
				}
			>
				<p>Please login to rate your places</p>
			</Modal>
			<div className='StarRating center'>
				<ReactStars
					className='star'
					edit={auth.userId === creatorId}
					value={rating}
					count={5}
					onChange={rateHandler}
					size={30}
					isHalf={true}
					emptyIcon={<i className='far fa-star' />}
					halfIcon={<i className='fa fa-star-half-alt' />}
					fullIcon={<i className='fa fa-star' />}
					color1={"#e4e5e9"}
					color2={"#ffc107"}
				/>
				<span className='ratings'>{rating}</span>
			</div>
		</>
	);
}

export default StarRating;
