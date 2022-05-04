import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function Recherche({ data, recherche }) {
	const chercher = (text) => {
		const T = [];

		data.map((val) => {
			if (val) if (val.nom.toLowerCase().indexOf(text.toLowerCase()) > -1) T.push(val);
		});

		recherche(T);
	};

	return (
		<div>
			<center>
				<Paper
					component="form"
					sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: "60%" }}
				>
					<InputBase
						sx={{ ml: 1, flex: 1 }}
						placeholder="Rechercher un produit"
						inputProps={{ "aria-label": "Rechercher un produit" }}
						onChange={(e) => chercher(e.target.value)}
					/>
					<IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
						<SearchIcon />
					</IconButton>
				</Paper>
			</center>
		</div>
	);
}
