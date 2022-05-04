import { useState } from "react";
import Cookies from "next-cookies";
import { Grid, Button, Paper, Container } from "@mui/material";
import FormAjouter from "../components/dashboard/FormAjouter";
import Head from "next/head";

export async function getServerSideProps(ctx) {
	const token = Cookies(ctx)["auth-token"];

	if (!token) {
		return {
			redirect: {
				destination: "/", //usually the login page
				permanent: false,
			},
		};
	} else {
		const response = await fetch(process.env.API + "loggedIn", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				"auth-token": token,
			},
		});

		if (response.status == 400)
			return {
				redirect: {
					destination: "/", //usually the login page
					permanent: false,
				},
			};
		else
			return {
				props: {
					token,
				},
			};
	}
}

export default function Ajouter({ token }) {
	const [nbProduits, setNbProduits] = useState(1);
	const [produitsData, setProduitsData] = useState([{ images: [] }]);

	const onChangeProduit = (index, data) => {
		var T = produitsData;
		T[index] = data;
		setProduitsData(T);
		return 0;
	};

	const [produitsCode, setProduitsCode] = useState([
		<FormAjouter index={0} data={[{ images: [] }]} onChangeProduit={onChangeProduit} key={0} />,
	]);

	const autreProduit = () => {
		setNbProduits(nbProduits + 1);
		setProduitsCode((produitsCode) => [
			...produitsCode,
			<>
				<hr />
				<FormAjouter
					index={nbProduits}
					data={[...produitsData, { images: [] }]}
					onChangeProduit={onChangeProduit}
				/>
			</>,
		]);
		setProduitsData((produitsData) => [...produitsData, {}]);
	};

	const submit = async () => {
		const data = await JSON.stringify(produitsData);

		await fetch(process.env.API + "ajouterProduits", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				"auth-token": token,
			},
			body: data,
		});
	};

	return (
		<div style={{ backgroundColor: "#fcfcfc" }}>
			<Head>
				<title>RESIFIB | AJOUTER PRODUIT</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Grid container>
				<Grid item sm={1}></Grid>
				<Grid item xs={12} sm={11}>
					<Button variant="text" onClick={() => (window.location.href = "/")}>
						<h1 style={{ display: "inline", color: "black" }}>
							RES<p style={{ color: "#2cfc03", display: "inline" }}>I</p>F
							<p style={{ color: "#2cfc03", display: "inline" }}>I</p>B
						</h1>
						&nbsp;
						<h4 style={{ display: "inline", color: "#3570e6", paddingTop: "0.5em" }}>
							{" "}
							Dashboard
						</h4>
					</Button>
				</Grid>
			</Grid>
			<hr />
			<br />
			<Container>
				<Paper elevation="2">
					<form onSubmit={submit}>
						{produitsCode}
						<hr />
						<center>
							<Button type="submit" variant="contained">
								Valider
							</Button>
							&nbsp;&nbsp;
							<Button variant="contained" color="success" onClick={autreProduit}>
								Ajouter un autre produit
							</Button>
						</center>
						<br />
					</form>
				</Paper>
			</Container>
			<br />
			<br />
		</div>
	);
}
