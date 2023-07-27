// const { MongoClient, ObjectId } = require("mongodb");

// const url = process.env.URL_DB;
// const collectionName = "encuestas";

// async function convertDatesToObjects() {
//   try {
//     const client = new MongoClient(url);
//     await client.connect();

//     const db = client.db();
//     const collection = db.collection(collectionName);

//     // Obtener todos los documentos que contienen fechas en formato string
//     const documents = await collection.find({}).toArray();

//     // Función para convertir una fecha en formato "MM/DD/YYYY HH:mm" a un objeto Date
//     const convertStringToDate = (dateString) => {
//       const [datePart, timePart] = dateString.split(" ");
//       const [month, day, year] = datePart.split("/");
//       const [hours, minutes] = timePart.split(":");
//       return new Date(`${year}-${month}-${day}T${hours}:${minutes}:00.000Z`);
//     };

//     // Función para recorrer el objeto y convertir las fechas en objetos Date
//     const convertDatesInObject = (obj) => {
//       for (const key in obj) {
//         if (typeof obj[key] === "string") {
//           // Comprueba si el valor de la propiedad es una fecha en formato "MM/DD/YYYY HH:mm"
//           if (/^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}$/.test(obj[key])) {
//             obj[key] = convertStringToDate(obj[key]);
//           }
//         } else if (typeof obj[key] === "object") {
//           // Si es un objeto, recorre recursivamente sus propiedades
//           convertDatesInObject(obj[key]);
//         }
//       }
//     };

//     // Recorrer todos los documentos y convertir las fechas en objetos Date
//     for (const doc of documents) {
//       convertDatesInObject(doc);
//       // Actualizar el documento en la base de datos con los nuevos valores de fecha
//       await collection.updateOne({ _id: ObjectId(doc._id) }, { $set: doc });
//     }

//     console.log("Conversión completada con éxito.");
//   } catch (error) {
//     console.error("Error al convertir las fechas:", error);
//   } finally {
//     client.close();
//   }
// }

// convertDatesToObjects();
