import { Grid, Container, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

import Upload from "./Upload";

export default function FormAjouter({ index, data, onChangeProduit }) {
	const onChangeNom = (value) => {
		var tmp = data[index];
		tmp.nom = value;
		onChangeProduit(index, tmp);
	};

	const onChangeCategorie = (value) => {
		var tmp = data[index];
		tmp.categorie = value;
		onChangeProduit(index, tmp);
	};

	const onChangeDescription = (value) => {
		var tmp = data[index];
		tmp.description = value;
		onChangeProduit(index, tmp);
	};

	const onChangeImages = (url, nom) => {
		var tmp = data[index];
		tmp.images.push({ url, nom });
		onChangeProduit(index, tmp);
	};

	const deleteImage = (imageIndex) => {
		const tmp = data[index].images;
		tmp.splice(imageIndex, 1);
		onChangeProduit(index, tmp);
	};

	return (
		<Container maxWidth={"md"}>
			<br />
			<center>
				{" "}
				<h2>Produit N {index + 1}</h2>
			</center>
			<br />
			<Grid container>
				<Grid item xs={6}>
					<TextField
						id="outlined-basic"
						label="Nom de produit"
						variant="outlined"
						required
						style={{ width: "90%" }}
						onChange={(e) => onChangeNom(e.target.value)}
					/>
				</Grid>
				<Grid item xs={6}>
					<Autocomplete
						id="free-solo-demo"
						freeSolo
						options={["test1", "test2"]}
						renderInput={(params) => (
							<TextField {...params} label="Catégorie" required />
						)}
						onChange={(_, e) => onChangeCategorie(e)}
						onInputChange={(e) => onChangeCategorie(e.target.value)}
						style={{ width: "90%" }}
					/>
				</Grid>
			</Grid>
			<br />

			<TextField
				id="outlined-multiline-static"
				label="Description"
				multiline
				required
				rows={4}
				style={{ width: "95%" }}
				onChange={(e) => onChangeDescription(e.target.value)}
			/>
			<br />
			<br />
			<Upload
				onChangeImages={onChangeImages}
				data={data[index].images}
				deleteImage={deleteImage}
			/>
			<br />
		</Container>
	);
}
