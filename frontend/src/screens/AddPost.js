import React, { useState } from "react";
import axios from "axios";
import { Spin } from "antd";
import { useDispatch } from "react-redux";
import { createPost } from "../actions/postActions";

const AddPost = ({history}) => {
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [photo, setPhoto] = useState("");
	const [uploading, setUploading] = useState(false);

	const dispatch = useDispatch();

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

	const handleSubmit = (e) => {
		e.preventDefault()
		dispatch(createPost(title, body, photo))
		history.push("/")
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="form-group">
				<label>Title</label>
				<input
					type="text"
					name="title"
					className="form-control"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
			</div>

			<div className="form-group">
				<label>Body</label>
				<input
					type="text"
					name="body"
					className="form-control"
					value={body}
					onChange={(e) => setBody(e.target.value)}
				/>
			</div>

			<div className="form-group">
				<label>Upload an image:</label><br />
				<input type="file" onChange={uploadFileHandler} className="pt-2" />
				{uploading && <Spin />}
			</div>
			<div className="text-center">
				<button className="btn btn-outline-info ">Submit</button>
			</div>
		</form>
	);
};

export default AddPost;
