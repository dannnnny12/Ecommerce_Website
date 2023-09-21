//pk_test_51NsKZqARFBcbodXEz2AcSNaOCg2mflMwf13mBkq0U6yb1QC7udK0VP1u77Eg1paJYzB0ENp6hBE8V3TOFQapTwJB00piHTgAKa    :public key of stripe
//sk_test_51NsKZqARFBcbodXEPvhV9MRBlfD3alSHgw2JHaEmubF9dZUEkRYqnL4UXLNcFFLbZZsavzy5XU7pOkdQFSDDByCh00a4iFFX5L   :secret key of stripe
//coat id: price_1NsKpNARFBcbodXEkbZCXuGc
//camera id: price_1NsKocARFBcbodXEJnDyhzAu
//cookie id: price_1NsKnOARFBcbodXEYHkhSpNJ
//glasses id: price_1NsKmUARFBcbodXEBi45faAd
//coffee id: price_1NsKlmARFBcbodXEjjKBM54F

const express = require('express');
var cors = require('cors');
const stripe = require('stripe')('sk_test_51NsKZqARFBcbodXEPvhV9MRBlfD3alSHgw2JHaEmubF9dZUEkRYqnL4UXLNcFFLbZZsavzy5XU7pOkdQFSDDByCh00a4iFFX5L');
const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.post("/checkout", async (req,res) => {
    /*
    req.body.items
    [
        {
            id: 1,
            quantity: 3
        }
    ]
    BUT stripe wants:
    [
        {
            price: 1,
            quantity: 3
        }
    ]
    */
    console.log(req.body);
    const items = req.body.items;
    let lineItems = []; //create an array to put products, and return by stripe format
    items.forEach((item)=> {
        lineItems.push(
            {
                price: item.id,
                quantity: item.quantity
            }
        )
    });
    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode:'payment',
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel"
    });

    res.send(JSON.stringify({
        url: session.url
    }));

});

app.listen(4000, ()=> console.log("listening on port 4000"));
