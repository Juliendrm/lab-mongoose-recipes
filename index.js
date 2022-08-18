const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");
const { findOneAndUpdate } = require("./models/Recipe.model");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

const filter = { title: "Rigatoni alla Genovese" };
const update = { duration: 100 };
// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(async () => {
    // async pour run les process en meme temps. Permet d'attendre qu'une etape de la fonction se finisse avamt de passer a la prochaine.
    // Run your code here, after you have insured that the connection was made
    await Recipe.create({
      title: "Apple pie",
      level: "Easy Peasy",
      ingredients: "apple",
      cuisine: "Français",
      dishType: "breakfast",
      duration: 30,
      creator: "Julien",
    });
    await Recipe.insertMany(data);
    await Recipe.findOneAndUpdate(filter, update, { new: true });
    if ((Recipe.findOneAndUpdate = true)) {
      console.log("Duration updated");
    }
    await Recipe.deleteOne({ title: "Carrot Cake" });
    if ((Recipe.deleteOne = true)) {
      console.log("Deleted");
    }
    await mongoose.disconnect();
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
