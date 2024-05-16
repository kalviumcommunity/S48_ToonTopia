// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// function Users() {
//     const [users, setUsers] = useState([]);

//     useEffect(() => {
//         axios.get('http://localhost:3001/users')
//             .then(result => setUsers(result.data))
//             .catch(err => console.error(err));
//     }, []);

//     const handleDelete = (id) => {
//         axios.delete(`http://localhost:3001/users/${id}`)
//             .then(res => {
//                 console.log(res);
//                 setUsers(users.filter(user => user._id !== id));
//             })
//             .catch(err => console.error(err));
//     };

//     return (
//         <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
//             <div className='w-100 bg-white rounded p-3'>
//                 <Link to="/create" className='btn btn-success'>Sign Up</Link>
//                 <table className='table'>
//                     <thead>
//                         <tr>
//                             <th>Name</th>
//                             <th>Email</th>
//                             <th>Age</th>
//                             <th>Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {users.map((user) => (
//                             <tr key={user._id}>
//                                 <td>{user.name}</td>
//                                 <td>{user.email}</td>
//                                 <td>{user.age}</td>
//                                 <td>
//                                     <Link to={`/update/${user._id}`} className='btn btn-success'>Update</Link>
//                                     <button className='btn btn-danger' onClick={() => handleDelete(user._id)}>Delete</button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// }

// export default Users;