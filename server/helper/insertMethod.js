const insertOneData = (dataObject) => {
  db.palace.insertOne(dataObject)
}

const insertManyData = () => {
  db.palace.insertMany(dataObject)
} 