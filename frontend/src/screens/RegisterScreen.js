import {React, useState, useEffect } from "react";
import { Spin } from "antd";
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userActions";
import axios from 'axios'

const RegisterScreen = ({history}) => {
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [photo, setPhoto] = useState(undefined);
	const [uploading, setUploading] = useState(false);

	const dispatch = useDispatch();
	const userRegister = useSelector((state) => state.userRegister);

	const { loading, userInfo } = userRegister;

	const uploadFileHandler = async (e) => {
		const file = e.target.files[0];
		const formData = new FormData();
		formData.append("image", file);
		setUploading(true);

		try {
			const config = {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			};

			const { data } = await axios.post("/upload", formData, config);

			setPhoto(data);
			setUploading(false);
		} catch (e) {
			console.log(e);
			setUploading(false);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch(register(name, email, password, photo))
	};

	useEffect(() => {
		if (userInfo) {
			history.push('/')
		}
	}, [history, userInfo])


	const registerForm = () => (
		<form onSubmit={handleSubmit}>
			<div className="form-group">
				<input
					type="text"
					placeholder="Name"
					className="form-control"
					value={name}
					onChange={(e) => setName(e.target.value)}
					autoFocus
				/>
			</div>

			<div className="form-group">
				<input
					type="email"
					placeholder="Email"
					className="form-control"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</div>

			<div className="form-group">
				<input
					type="password"
					placeholder="Password"
					className="form-control"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>

			<div className="form-group">
				<label>Upload an image:</label><br />
				<input type="file" onChange={uploadFileHandler} className="pt-2" />
				{uploading && <Spin />}
			</div>


			<br />
			<button type="submit" className="btn btn-raised">
				Register
			</button>
		</form>
	);

	return (
		<div className="container p-5">
			<div className="row">
				<div className="col-md-6 offset-md-3">
					{loading ? (
						<Spin size="large" />
					) : (
						<h2>Register</h2>
					)}
					{registerForm()}

					<Link
						to="/login"
						className="float-right text-danger"
					>
						Have an account?
					</Link>
				</div>
			</div>
		</div>
	);
};

export default RegisterScreen;
