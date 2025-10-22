const { MongoClient } = require("mongodb");


  




const drivers = [
  {
    name: "John Doe",
    vehicleType: "Sedan",
    isAvailable: true,
    rating: 4.8
  },
  {
    name: "Alice Smith",
    vehicleType: "SUV",
    isAvailable: false,
    rating: 4.5
  }
];

console.log(drivers);

drivers.forEach((driver) => {
    console.log(driver.name);
});

const count = drivers.push({
    name: "Wafiy",
    vehicleType: "Honda",
    isAvailable: true,
    rating: 14.0
});
console.log(drivers);
console.log(count);

async function main() {
  const uri = "mongodb://127.0.0.1:27017";
  const client = new MongoClient(uri);
  try{
    await client.connect();
    const db = client.db("testDB");

    const driversCollection = db.collection("drivers");


    drivers.forEach(async (driver) => {
      const result = await driversCollection.insertOne(driver);
      console.log('New driver created with result: ${result}');
    });

    const availableDrivers = await db.collection('drivers').find({
      isAvailable: true,
      rating: true,
      rating: { $gte: 4.5}
    }).toArray();
    console.log("Available drivers", availableDrivers);


  } finally {
    await client.close();
  }
}

main();