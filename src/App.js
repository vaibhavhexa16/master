import React, { useState,useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

function App() {
  const [search, setSearch] = useState('');
  const [user, setUser] = useState([]);
  const [error, setError] = useState(null);

    // function to fetch api  //
    const getUsersData = async () => {
      try {
        const data = await axios.get(
          "https://fakestoreapi.com/users"
        );
        setUser(data.data);
      }catch (error) {
        setError(error);
      }
    }

    // useeffect as coponentdidmount //
  useEffect(() => {
    getUsersData();
  }, []);

  return (
    <div>
      {error ? <p>An error occurred: {error.message}</p> : 
        <Container>
          <h1 className='text-center mt-4'>Employee Details</h1>
          <Form>
            <InputGroup className='my-3'>

              {/* onChange for search */}
              <Form.Control
                onChange={(e) => setSearch(e.target.value)}
                placeholder='Search FirstName, Lastname or Email'
              />
            </InputGroup>
          </Form>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {user
                .filter((item) => {
                  if (search == "") {
                    return item;
                  } else if (item.name.firstname.toLowerCase().includes(search.toLowerCase())) 
                  {
                    return item;
                  }else if (item.name.lastname.toLowerCase().includes(search.toLowerCase())) 
                  {
                    return item;
                  }else if (item.email.toLowerCase().includes(search.toLowerCase())) 
                  {
                    return item;
                  }  
                })
                .map((item, index) => (
                  <tr key={index}>
                    <td>{item.name.firstname}</td>
                    <td>{item.name.lastname}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Container>
      }
    </div>
  );
}

export default App;
