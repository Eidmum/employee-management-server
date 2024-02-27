const express = require('express')
const cors=require("cors");
require('dotenv').config()
const app = express()
app.use(cors());
app.use(express.json());

const port = process.env.PORT||5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASS}@practice.x1enzr7.mongodb.net/?retryWrites=true&w=majority&appName=practice`;

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      const db= client.db("Employee");
      const employees = db.collection("employees");
      console.log("Pinged your deployment. You successfully connected to MongoDB!");

      app.get('/employees',async(req,res)=>{
        const result=await employees.find({}).toArray();
        res.send(result);
      })
      app.post("/employees",async(req,res)=>{
        const newEmployee=req.body;
        const result=await employees.insertOne(newEmployee);
        res.send(result);
      })

      app.delete('/employees/:id',async(req,res)=>{
        const id=req.params.id;
        console.log(id);
        const result=await employees.deleteOne({_id:new ObjectId(id)});
        res.send(result);
      })
    } finally {
      // Ensures that the client will close when you finish/error
      
    }
  }
  run().catch(console.dir);  
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})