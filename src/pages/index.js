// import { connectToDatabase } from "../db";
// // import * as style from "../styles/globalStyles";
import LoginForm from "../components/Login_Foam";

const MyApp = ({}) => {
  return <LoginForm />;
};
export default MyApp;

// export async function getStaticProps() {
//   try {
//     const db = await connectToDatabase();
//     const users = await db.collection("users").find({}).toArray();
//     return {
//       props: {
//         users: JSON.parse(JSON.stringify(users)),
//       },
//       revalidate: 1,
//     };
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     return {
//       props: {
//         users: [],
//       },
//     };
//   }
// }
