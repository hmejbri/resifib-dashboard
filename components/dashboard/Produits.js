import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, IconButton } from "@mui/material";
import Modifier from "./Modifier";

const columns = [
	{ field: "id", headerName: "id", width: 80 },
	{ field: "Nom", headerName: "Nom", width: 120 },
	{ field: "Categorie", headerName: "Categorie", width: 200 },
	{ field: "Description", headerName: "Description", width: 250 },
	{
		field: "Date de création",
		headerName: "Date de création",
		width: 200,
	},
	{
		field: "Date de modification",
		headerName: "Date de modification",
		width: 200,
	},
];

export default function Produits({ data, token }) {
	const [selected, setSelected] = React.useState([]);
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const supprimer = async () => {
		if (selected[0] !== "") {
			const data = await JSON.stringify(selected);

			const response = await fetch(process.env.API + "supprimerProduits", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					"auth-token": token,
				},
				body: data,
			});

			if (response.ok) location.reload();
			else console.log(response);
		}
	};

	return (
		<center>
			<div style={{ height: 400, width: "80%" }}>
				{selected.length > 0 ? (
					<div style={{ width: "100%", backgroundColor: "#f0f0f0" }}>
						<IconButton
							color="primary"
							aria-label="supprimer"
							className="btn"
							size="large"
							onClick={supprimer}
						>
							<DeleteIcon />
						</IconButton>

						{selected.length == 1 ? (
							<strong>
								<Button
									variant="contained"
									color="primary"
									size="small"
									onClick={handleClickOpen}
								>
									Modifier
								</Button>
							</strong>
						) : (
							""
						)}

						<Modifier
							open={open}
							handleClose={handleClose}
							data={data[0] ? data.filter((val) => val.id == selected[0]) : ""}
							token={token}
						/>
					</div>
				) : (
					""
				)}

				<DataGrid
					rows={data.map((val) => ({
						id: val.id,
						Nom: val.nom,
						Categorie: val.categorie,
						Description: val.description,
						"Date de création":
							new Date(val.date_creation).toLocaleDateString() +
							" " +
							new Date(val.date_creation).toLocaleTimeString(),
						"Date de modification":
							new Date(val.date_modification).toLocaleDateString() +
							" " +
							new Date(val.date_modification).toLocaleTimeString(),
					}))}
					components={{
						NoRowsOverlay: () => <p>Aucun produit.</p>,
						NoResultsOverlay: () => <p>Aucun produit.</p>,
					}}
					columns={columns}
					pageSize={20}
					rowsPerPageOptions={[20]}
					checkboxSelection
					onSelectionModelChange={(newSelection) => {
						setSelected(newSelection);
					}}
				/>
			</div>
		</center>
	);
}
