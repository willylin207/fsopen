const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('usage: `node mongo.js <yourpassword> <name> <number>` or `node mongo.js <yourpassword>`');
  process.exit(1);
}

const databaseName = 'phonebook';
const [mongopw, name, number] = process.argv.slice(2);
const url = `mongodb+srv://willylin207:${mongopw}@cluster0.n0fayvv.mongodb.net/${databaseName}?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const phonebookEntrySchema = new mongoose.Schema({
  name: String,
  number: String
});

const PhonebookEntry = mongoose.model('PhonebookEntry', phonebookEntrySchema);

(async () => {
  try {
    if (!name || !number) {
      // display all entries in phonebook
      const allEntries = await PhonebookEntry.find({});
      console.log('phonebook:');
      allEntries.forEach(entry => console.log(`${entry.name} ${entry.number}`));
    } else {
      // save name and number to phonebook
      const newEntry = new PhonebookEntry({
        name: name,
        number: number
      });

      await newEntry.save();
      console.log(`added ${name} number ${number} to phonebook`);
    }
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.connection.close();
  }
})();


