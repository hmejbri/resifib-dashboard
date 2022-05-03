import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function Modifier({ open, handleClose, data, token }) {
	const [nom, setNom] = React.useState(data[0].nom);
	const [categorie, setCategorie] = React.useState(data[0].categorie);
	const [description, setDescription] = React.useState(data[0].description);

	const handleSubmit = async () => {
		const data1 = await JSON.stringify({ id: data[0].id, nom, categorie, description });

		const response = await fetch(process.env.API + "modifierProduit", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				"auth-token": token,
			},
			body: data1,
		});

		if (response.ok) location.reload();
		else console.log(response);
	};

	return (
		<div>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Modifier produit</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						label="ID"
						type="text"
						disabled
						fullWidth
						value={data[0].id}
						variant="standard"
					/>

					<TextField
						autoFocus
						margin="dense"
						label="Nom"
						type="text"
						defaultValue={data[0].nom}
						onChange={(e) => setNom(e.target.value)}
						fullWidth
						variant="standard"
					/>

					<TextField
						autoFocus
						margin="dense"
						label="Categorie"
						type="text"
						defaultValue={data[0].categorie}
						onChange={(e) => setCategorie(e.target.value)}
						fullWidth
						variant="standard"
					/>

					<TextField
						autoFocus
						margin="dense"
						label="Description"
						multiline
						rows={4}
						defaultValue={data[0].description}
						onChange={(e) => setDescription(e.target.value)}
						type="text"
						fullWidth
						variant="standard"
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Annuler</Button>
					<Button onClick={handleSubmit}>Valider</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
