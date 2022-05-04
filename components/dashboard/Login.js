import * as React from "react";
import { useCookies } from "react-cookie";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function Login() {
	const [user, setUser] = React.useState();
	const [mdp, setMdp] = React.useState();
	const [cookie, setCookie] = useCookies(["auth-token"]);
	const [erreur, setErreur] = React.useState(false);

	const valider = async (e) => {
		e.preventDefault();

		const data = JSON.stringify({ utilisateur: user, mdp: mdp });
		const response = await fetch(process.env.API + "login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: data,
		});

		if (response.ok) {
			const res = await response.json();

			setCookie("auth-token", res.message, {
				path: "/",
			});
			window.location.href = "/";
		} else {
			setErreur(true);
		}
	};

	return (
		<Dialog open={true}>
			<form onSubmit={valider}>
				<DialogTitle>Login</DialogTitle>
				<DialogContent>
					{erreur ? (
						<p style={{ color: "red" }}>
							Utilisateur ou mot de passe incorrecte, veuillez réessayer.
						</p>
					) : (
						""
					)}

					<TextField
						autoFocus
						required
						margin="dense"
						label="Utilisateur"
						type="text"
						fullWidth
						variant="standard"
						onChange={(e) => setUser(e.target.value)}
					/>

					<TextField
						autoFocus
						required
						margin="dense"
						label="Mot de passe"
						type="password"
						fullWidth
						variant="standard"
						onChange={(e) => setMdp(e.target.value)}
					/>
				</DialogContent>
				<DialogActions>
					<Button type="submit">Valider</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
}
