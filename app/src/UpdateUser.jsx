// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// function UpdateUser() {
//     const { id } = useParams();
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [age, setAge] = useState('');
//     const [password, setPassword] = useState(''); // New state for password
//     const navigate = useNavigate();

//     useEffect(() => {
//         axios.get(`http://localhost:3001/getUser/${id}`)
//             .then(response => {
//                 const { name, email, age } = response.data;
//                 setName(name);
//                 setEmail(email);
//                 setAge(age);
//             })
//             .catch(error => console.log(error));
//     }, [id]);

//     const handleUpdate = (e) => {
//         e.preventDefault();
//         axios.put(`http://localhost:3001/users/${id}`, { name, email, age, password })
//             .then(response => {
//                 console.log(response);
//                 navigate('/');
//             })
//             .catch(error => console.log(error));
//     }

//     return (
//         <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
//             <div className='w-100 bg-white rounded p-3'>
//                 <form onSubmit={handleUpdate}>
//                     <h2>Update Users</h2>
//                     <div className="mb-2">
//                         <label htmlFor="name">Name </label>
//                         <input type="text" id="name" placeholder="Enter Name" className="form-control"
//                             value={name} onChange={(e) => setName(e.target.value)} />
//                     </div>
//                     <div className="mb-2">
//                         <label htmlFor="email">Email </label>
//                         <input type="text" id="email" placeholder="Enter Email" className="form-control"
//                             value={email} onChange={(e) => setEmail(e.target.value)} />
//                     </div>
//                     <div className="mb-2">
//                         <label htmlFor="age">Age </label>
//                         <input type="text" id="age" placeholder="Enter Age" className="form-control"
//                             value={age} onChange={(e) => setAge(e.target.value)} />
//                     </div>
//                     <div className="mb-2">
//                         <label htmlFor="password">Password </label>
//                         <input type="password" id="password" placeholder="Enter Password" className="form-control"
//                             value={password} onChange={(e) => setPassword(e.target.value)} />
//                     </div>
//                     <button type="submit" className="btn btn-success">Update</button>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default UpdateUser;