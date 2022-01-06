const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const PORT = 3000;

let db;

const initializeClient = async() => {
    const client = await MongoClient.connect(
        //MongoDB connection string goes here
    );
    return client.db("AddressDirectory");
}
const getDb = async() => {
    if(!db) {
        db = await initializeClient();
    }
    return db;
}

const app = express();
app.use("/", express.json());

//===================================================================

app.get("/get", async(req,res) => {
    const data = await (await getDb())
        .collection("address-directory")
        .findOne({ uid:req.query.uid });
    //console.log(data);
    if(!data)
        res.json({ found: false }).status(404);
    else
        res.json({ name: data.name, address: data.address, uniqueID: data.uid }).status(200);
});

//===================================================================

app.post("/post", async(req,res) => {
    let uniqueid = "id" + Math.random().toString(16).slice(2)
    try
    {
        const data = await (await getDb())
            .collection("address-directory")
            .insertOne({ name:req.body.name, address:req.body.address, uid:uniqueid });
        //console.log(data)
    }
    catch(err)
    {
        res.json({ success: false }).status(400);
    }
    res.json({ success: true }).status(200);
});

//===================================================================

app.put("/put", async(req,res) => {
    const data = await (await getDb())
        .collection("address-directory")
        .updateOne(
            { uid:req.body.uid }, 
            { $set: { name:req.body.name, address:req.body.address } }
        );
    //console.log(data);
    if(data.modifiedCount==0)
        res.json({ found: false, modified: false }).status(404);
    else
        res.json({ found: true, modified: true }).status(200);
});

//===================================================================

app.delete("/delete", async(req,res) => {
    const data = await (await getDb())
        .collection("address-directory")
        .deleteOne({ uid:req.body.uid });
    //console.log(data);
    if(data.deletedCount==0)
        res.json({ found: false, deleted: false }).status(404);
    else
        res.json({ found: true, deleted: true }).status(200);
});

//===================================================================

app.listen(PORT, () => {
    console.log("---------------------------")
    console.log(">      Server online      <")
    console.log("---------------------------")
});