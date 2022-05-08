const express = require("express")
require("dotenv").config()
const stripe = require("stripe")('sk_test_51Krk56Ir8iQEth9iB4CNLg6jm9rZgQZglO3NmqAizSzSvd6MuYLuWk80j6aA0gaqaW7dxSkkJLDSVxyJOqnQPAbD00PnX421hP')
const bodyParser = require("body-parser")
const cors = require("cors")
var admin = require("firebase-admin")

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors())

var serviceAccount = require("./serviceAccountKeys.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore()

app.listen(5000, () => {
	console.log("Server running on port 5000")
})

app.post("/payment", async (req, res) => {
	let { amount, id } = req.body

	try {
		await stripe.paymentIntents.create({
			amount,
			currency: "USD",
			description: "Notebook dell Alienware M15",
			payment_method: id,
			confirm: true,
		})
		
		res.json({
			message: "Payment successful",
			success: true
		})
	} catch (error) {
		console.log("Error", error)
		res.json({
			message: "Payment failed",
			success: false
		})
	}

})

app.post('/user', async (req, res) => {
	const realizar_compra = req.body.realizar_compra
	const email = 'joaovds21@hotmail.com';
	let user_email = ""
	let id = ""
	let name = ""

	const usersRef = db.collection('users')
	const foundUser = await usersRef.where('email', '==', email).get()

	if(foundUser.empty) {
		console.log('User not found.')
		res.send('User not found')
		return
	}
		
	foundUser.forEach(doc => {
		id = doc.id
		user_email = doc.data().email
		name = doc.data().name
	})

	usersRef.doc(id).update({realizar_compra}).then(console.log(`Compra efetuada.\nID: ${id}\nNome: ${name}\nEmail: ${user_email}`))
})