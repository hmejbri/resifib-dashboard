import Head from "next/head";
import Cookies from "next-cookies";
import { Grid, Button } from "@mui/material";
import Recherche from "../components/dashboard/Recherche";
import Produits from "../components/dashboard/Produits";
import Login from "../components/dashboard/Login";
import { useState } from "react";

export async function getServerSideProps(ctx) {
	const token = Cookies(ctx)["auth-token"];

	if (!token) {
		return {
			props: {
				loggedIn: false,
			},
		};
	} else {
		const response1 = await fetch(process.env.API + "loggedIn", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				"auth-token": token,
			},
		});

		const response2 = await fetch(process.env.API + "produits", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		});

		const data = await response2.json();

		return {
			props: {
				data,
				loggedIn: response1.status == 200,
				token,
			},
		};
	}
}

export default function Home({ data, loggedIn, token }) {
	const [produitRecherche, setProduitRecherche] = useState();

	const recherche = (data) => {
		setProduitRecherche(data);
	};

	return (
		<>
			{!loggedIn ? (
				<>
					<Head>
						<title>RESIFIB | LOGIN</title>
						<link rel="icon" href="/favicon.ico" />
					</Head>
					<Login />
				</>
			) : (
				<div style={{ backgroundColor: "#fcfcfc" }}>
					<Head>
						<title>RESIFIB | DASHBOARD</title>
						<link rel="icon" href="/favicon.ico" />
					</Head>
					<Grid container>
						<Grid item sm={1}></Grid>
						<Grid item xs={5} sm={7}>
							<Button variant="text" href="/">
								<h1 style={{ display: "inline", color: "black" }}>
									RES<p style={{ color: "#2cfc03", display: "inline" }}>I</p>F
									<p style={{ color: "#2cfc03", display: "inline" }}>I</p>B
								</h1>
								&nbsp;
								<h4
									style={{
										display: "inline",
										color: "#3570e6",
										paddingTop: "0.5em",
									}}
								>
									{" "}
									Dashboard
								</h4>
							</Button>
						</Grid>
						<Grid item xs={6} sm={4}>
							<Button
								variant="outlined"
								href="/ajouter"
								style={{ marginLeft: "50%", marginTop: "2em" }}
							>
								Ajouter un produit
							</Button>
						</Grid>
					</Grid>
					<hr />
					<br />

					<Recherche data={data} recherche={recherche} />
					<br />
					<Produits data={produitRecherche ? produitRecherche : data} token={token} />
					<br />
					<br />
					<br />
					<br />
				</div>
			)}
		</>
	);
}
