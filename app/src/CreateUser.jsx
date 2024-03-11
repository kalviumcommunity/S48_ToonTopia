// import { useState } from "react";
// import axios from 'axios';
// import { useNavigate } from "react-router-dom";
// import "./components/Form.css";
// function CreateUser() {
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [age, setAge] = useState("");
//     const [password, setPassword] = useState("");
//     const [confirmPassword, setConfirmPassword] = useState("");
//     const navigate = useNavigate();

//     const isEmailValid = (email) => {
//         // Simple email validation using a regular expression
//         const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return emailPattern.test(email);
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         // Check if passwords match
//         if (password !== confirmPassword) {
//             console.error("Passwords do not match");
//             return;
//         }

//         // Check if the email is in a valid format
//         if (!isEmailValid(email)) {
//             console.error("Invalid email format");
//             return;
//         }

//         // Create user object
//         const newUser = { name, email, age, password };

//         // Send the user data to the server
//         axios.post("http://localhost:3001/users", newUser)
//             .then(result => {
//                 console.log(result);
//                 navigate('/Home');
//             })
//             .catch(err => console.error(err));
//     }

//     return (
//         <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
//             <div className='w-100 bg-white rounded p-3'>
//                 <form onSubmit={handleSubmit}>
//                     <h2>Sign up</h2>
//                     <div className="mb-2">
//                         <label htmlFor="name">Name</label>
//                         <input type="text" id="name" placeholder="Enter Name" className="form-control"
//                             onChange={(e) => setName(e.target.value)} />
//                     </div>
//                     <div className="mb-2">
//                         <label htmlFor="email">Email</label>
//                         <input type="text" id="email" placeholder="Enter Email" className="form-control"
//                             onChange={(e) => setEmail(e.target.value)} />
//                     </div>
//                     <div className="mb-2">
//                         <label htmlFor="age">Age</label>
//                         <input type="text" id="age" placeholder="Enter Age" className="form-control"
//                             onChange={(e) => setAge(e.target.value)} />
//                     </div>
//                     <div className="mb-2">
//                         <label htmlFor="password">Password</label>
//                         <input type="password" id="password" placeholder="Enter Password" className="form-control"
//                             onChange={(e) => setPassword(e.target.value)} />
//                     </div>
//                     <div className="mb-2">
//                         <label htmlFor="confirmPassword">Confirm Password</label>
//                         <input type="password" id="confirmPassword" placeholder="Confirm Password" className="form-control"
//                             onChange={(e) => setConfirmPassword(e.target.value)} />
//                     </div>
//                     <button type="submit" className="btn btn-success">Submit</button>
//                 </form>
//             </div>
//         </div>
//     )
// }

// export default CreateUser;