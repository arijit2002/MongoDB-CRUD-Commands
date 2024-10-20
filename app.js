const {MongoClient} = require('mongodb');
const prompt=require("prompt-sync")({sigint:true});
 
async function main(){
    const uri='mongodb://localhost:27017/mycompany?retryWrites=true&w=majority'
    const client= new MongoClient(uri);
    await client.connect();
 
    const myDB=client.db("mycompany");
    const myColl=myDB.collection("customers");
 
    const choice=prompt('Enter Your Choice(1-7): ');
 
    if (choice=='1'){
        read_all(client, myColl);
    }
    else if (choice=='2'){
        insert_one(client, myColl);
    }
    else if (choice=='3'){
        update_one(client, myColl);
    }
    else if (choice=='4'){
        delete_one(client, myColl);
    }
    else if (choice=='5'){
        insert_many(client, myColl);
    }
    else if (choice=='6'){
        update_many(client, myColl);
    }
    else if (choice=='7'){
        delete_many(client, myColl);
    }
    else{
        console.log('WRONG CHOICE!');
        client.close();
    }
 
 
}main().catch(console.error);
 
async function read_all(client, myColl){
    result=await myColl.find({}).toArray();
    console.log(result);
    client.close();
}
 
async function insert_one(client, myColl){
    const document={_id:902, name:'Rohit Sharma', item:'Item_902'};
    const result=await myColl.insertOne(document);
    console.log(`A document has been inserted with ID: ${result.insertedId}`);
    client.close();
}
 
async function update_one(client, myColl){
    const filter={_id:902};
    const update_doc={$set:{item:'Item_002_updated', update_date:new Date(Date.now())}};
    await myColl.updateOne(filter, update_doc);
    console.log('Document Updated!');
    client.close();
}
 
async function delete_one(client, myColl){
    const filter={_id:901};
    await myColl.deleteOne(filter);
    console.log('Document Deleted!');
    client.close();
}
 
async function insert_many(client, myColl){
    const docs=[{_id:903, name:'Rohan'},{_id:904, name:'Sumit'},{_id:905, name:'Sunny'},{_id:906, name:'Prateek'},{_id:907, name:'Sucheta'},{_id:908, name:'Sudipa'}];
    await myColl.insertMany(docs);
    console.log('Documents Inserted!');
    client.close();
}
 
async function update_many(client, myColl){
    const filter={_id:{$gt:902}};
    const update_doc={$set:{item:'Item_xyz'}};
    await myColl.updateMany(filter, update_doc);
    console.log('Documents Updated!');
    client.close();
}
 
async function delete_many(client, myColl){
    const filter={_id:{$gt:905}};
    await myColl.deleteMany(filter);
    console.log('Documents Deleted!');
    client.close();
}