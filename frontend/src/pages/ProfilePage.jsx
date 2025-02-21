import React, { useState } from 'react';
import { Container, Card, Button, Form, Row, Col } from "react-bootstrap";
import Sidebar from '../components/Sidebar';

const Profile = () => {
  // Set initial profile details
  const initialProfile = {
    name: 'Mohammad Abd Rbo  ',
    email: 'mohammadar03@gmail.com',
    
  };

  const [profile, setProfile] = useState(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [newProfile, setNewProfile] = useState(profile);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      setProfile(newProfile); // Save new profile details
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProfile({ ...newProfile, [name]: value });
  };

  return (
    <Container fluid>
      <Row>
        {/* Sidebar - will take full width on small screens and 3/12 on medium+ screens */}
        
          <Sidebar />
        

        {/* Main Content - will take full width on small screens and 9/12 on medium+ screens */}
        <Col xs={12} md={9} className="mt-4">
          <h2 className="text-center mb-4">Profile</h2>
          
          <Card className="p-4 shadow-sm rounded">
            <Card.Body>
              {!isEditing ? (
                <>
                  <h4>Profile Details</h4>
                  <p><strong>Name:</strong> {profile.name}</p>
                  <p><strong>Email:</strong> {profile.email}</p>
                  
                  <Button variant="primary" onClick={handleEditToggle} className="mt-3">
                    Edit Profile
                  </Button>
                </>
              ) : (
                <>
                  <h4>Edit Profile</h4>
                  <Form>
                    <Form.Group controlId="name">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={newProfile.name}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={newProfile.email}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    
                    <div className="mt-3 d-flex gap-2">
                      <Button variant="secondary" onClick={handleEditToggle}>Cancel</Button>
                      <Button variant="primary" onClick={handleEditToggle}>Save Changes</Button>
                    </div>
                  </Form>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
