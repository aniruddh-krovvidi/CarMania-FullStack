import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import stripeModule from "stripe";

const stripe = stripeModule(process.env.STRIPE_SECRET_KEY);

const router = express.Router();

router.post("/create-checkout-session", async (req, res) => {
    const { products } = req.body;

    const items = products.map((product) => ({
        price_data: {
            currency: "aed",
            product_data: {
                name: product.title,  
                images: [product.images[0]]
            },
            unit_amount: product.price * 100,
        },
        quantity: 1  // Assuming each item is quantity 1, adjust as per your logic
    }));

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: items,
            mode: "payment",
            success_url: "http://localhost:5173/success.html",  
            cancel_url: "http://localhost:5173/failure.html"   
        });
        res.json({ id: session.id });
    } catch (error) {
        console.error("Error creating checkout session:", error);
        res.status(500).send("Failed to create checkout session");
    }
});

export default router;
