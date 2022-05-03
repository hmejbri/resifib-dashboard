import { useState, useEffect } from "react";
import Image from "next/image";
import ImageUploading from "react-images-uploading";
import { AiOutlineCloudUpload } from "react-icons/ai";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Grid, IconButton } from "@mui/material";

export default function Upload({ onChangeImages, data, deleteImage }) {
	const [nbImages, setNbImages] = useState(0);
	const [images, setImages] = useState([]);

	const submit = (im) => {
		onChangeImages(im.data_url, im.file.name);
		setNbImages(nbImages + 1);
	};

	useEffect(() => {
		if (nbImages == 0) setImages([]);
		else
			data.forEach((val, index) =>
				index == 0
					? setImages([
							<Grid item xs={12 / nbImages} key={index} className="container">
								<Image
									width={200}
									height={200}
									src={val.url}
									className="imageProduit"
								/>
								<IconButton
									color="primary"
									aria-label="supprimer"
									className="btn"
									onClick={() => {
										deleteImage(index);
										setNbImages(nbImages - 1);
									}}
								>
									<DeleteIcon />
								</IconButton>
							</Grid>,
					  ])
					: setImages((images) => [
							...images,
							<Grid item xs={12 / nbImages} key={index} className="container">
								<Image
									width={200}
									height={200}
									src={val.url}
									className="imageProduit"
								/>
								<IconButton
									color="primary"
									aria-label="supprimer"
									className="btn"
									onClick={() => {
										deleteImage(index);
										setNbImages(nbImages - 1);
									}}
								>
									<DeleteIcon />
								</IconButton>
							</Grid>,
					  ])
			);
	}, [nbImages]);

	return (
		<div>
			<Grid container>
				{data.forEach((val, index) => (
					<Grid item xs={12 / (nbImages + 1)} key={index}>
						<img src={val.url} />
					</Grid>
				))}

				<Grid item xs={12}>
					<center>
						<ImageUploading onChange={(im) => submit(im[0])} dataURLKey="data_url">
							{({ onImageUpload, dragProps }) => (
								<Button
									id="Button"
									color="primary"
									variant="contained"
									startIcon={<AiOutlineCloudUpload />}
									onClick={onImageUpload}
									{...dragProps}
								>
									Télécharger
								</Button>
							)}
						</ImageUploading>
					</center>
				</Grid>
			</Grid>

			<br />

			<Grid container>{images}</Grid>
		</div>
	);
}
