// import { UserRepository } from "./mongo";
// import { User } from "../../entities/User";
// import { MongoClient } from "mongodb";

// const test = () => {
//   const uri = process.env.MONGO_URI;
//   const client = new MongoClient(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });

//   const new_user = new User("joel", "mechanicfox1470@gmail.com", "teste");

//   const userRepo = new UserRepository(client);
//   userRepo.save(new_user);
// };

// export default test;
