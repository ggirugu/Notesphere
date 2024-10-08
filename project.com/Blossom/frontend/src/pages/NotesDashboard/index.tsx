import React, { useState } from 'react';
import { Button, Card, Col, Container, Form, Modal, Row, Pagination, Dropdown, InputGroup, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ig from '../../assets/ig.png'; // Update with actual path
import fb from '../../assets/fb.png'; // Update with actual path
import wa from '../../assets/wa.png'; // Update with actual path

// Define styles for the footer
const footerStyles: React.CSSProperties = {
  backgroundColor: '#1e1e1e',
  color: 'white',
  padding: '20px',
  textAlign: 'center' as 'center',
  borderRadius: '8px',
  marginTop: '40px',
};

// Define styles for the page container to ensure dark theme and proper layout
const pageStyles: React.CSSProperties = {
  backgroundColor: '#121212', // Dark background for the page
  color: '#e0e0e0', // Light text for contrast
  minHeight: '100vh', // Ensure footer stays at the bottom
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};

// Define styles for the notes cards
const cardStyles: React.CSSProperties = {
  backgroundColor: '#ffbf00', // Yellow background for normal view
  color: '#1e1e1e', // Dark text for readability
  minHeight: '200px',
  maxHeight: '200px',
  borderRadius: '10px',
  transition: 'background-color 0.3s ease', // Smooth transition for background color
};

// Define styles for the dark-themed modal
const modalStyles: React.CSSProperties = {
  backgroundColor: '#1e1e1e',
  color: '#e0e0e0',
};

// Define styles for the search bar and add category button
const topControlsStyles: React.CSSProperties = {
  marginBottom: '20px',
};

// Main NotesDashboard component
const NotesDashboard: React.FC = () => {
  // Predefined categories stored as state to allow dynamic additions
  const [categories, setCategories] = useState<string[]>(['Work', 'Personal', 'Study', 'Important', 'Miscellaneous']);

  // State to hold notes
  const [notes, setNotes] = useState<Array<{ id: number; title: string; content: string; category: string; date: Date }>>([
    { id: 1, title: 'Sample Note 1', content: 'This is the content of sample note 1', category: 'Work', date: new Date() },
    { id: 2, title: 'Sample Note 2', content: 'This is the content of sample note 2', category: 'Personal', date: new Date() },
    // Add more notes as required...
  ]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const notesPerPage = 9;

  // State for Modal (create/edit note)
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editNote, setEditNote] = useState<{ id: number; title: string; content: string; category: string; date: Date } | null>(null);
  const [newNote, setNewNote] = useState<{ title: string; content: string; category: string }>({ title: '', content: '', category: categories[0] });

  // State for Category filter
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // State for Viewing Note
  const [viewingNoteId, setViewingNoteId] = useState<number | null>(null);

  // State for Search
  const [searchTerm, setSearchTerm] = useState<string>('');

  // State for Add Category Modal
  const [showAddCategoryModal, setShowAddCategoryModal] = useState<boolean>(false);
  const [newCategory, setNewCategory] = useState<string>('');

  // Function to show the create/edit note modal
  const handleShowModal = (note: { id: number; title: string; content: string; category: string; date: Date } | null = null) => {
    setEditNote(note);
    setNewNote(note ? { title: note.title, content: note.content, category: note.category } : { title: '', content: '', category: categories[0] });
    setShowModal(true);
  };

  // Function to close the create/edit note modal
  const handleCloseModal = () => {
    setShowModal(false);
    setEditNote(null);
  };

  // Function to save a new or edited note
  const handleSaveNote = () => {
    const currentDate = new Date();
    if (editNote) {
      // Edit existing note
      setNotes(notes.map(note => (note.id === editNote.id ? { ...note, ...newNote, date: note.date } : note)));
    } else {
      // Add new note with a unique id and current date
      setNotes([...notes, { id: Date.now(), ...newNote, date: currentDate }]);
    }
    setShowModal(false);
    setEditNote(null);
  };

  // Function to delete a note
  const handleDeleteNote = (id: number) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Function to handle the "Summarize" button (placeholder for future feature)
  const handleSummarize = () => {
    alert('Summarize button clicked!');
  };

  // Function to handle category filtering
  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  // Function to toggle viewing a note
  const handleViewNote = (id: number) => {
    setViewingNoteId(viewingNoteId === id ? null : id); // Toggle view on and off
  };

  // Function to handle adding a new category
  const handleAddCategory = () => {
    if (newCategory.trim() === '') {
      alert('Category name cannot be empty.');
      return;
    }
    if (categories.includes(newCategory.trim())) {
      alert('Category already exists.');
      return;
    }
    setCategories([...categories, newCategory.trim()]);
    setNewCategory('');
    setShowAddCategoryModal(false);
  };

  // Function to handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when search term changes
  };

  // Filter notes based on selected category and search term
  const filteredNotes = notes.filter(note => {
    const matchesCategory = selectedCategory === 'All' || note.category === selectedCategory;
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort notes by creation date (newest first)
  const sortedNotes = filteredNotes.sort((a, b) => b.date.getTime() - a.date.getTime());

  // Get current page notes
  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = sortedNotes.slice(indexOfFirstNote, indexOfLastNote);

  // Generate page numbers for pagination
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(sortedNotes.length / notesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Container fluid style={pageStyles}>
      <Container className="mt-5">
        <h1 className="text-center mb-4">Notes Dashboard</h1>

        {/* Top Controls: Search and Add Category */}
        <Row className="mb-3 justify-content-center" style={topControlsStyles}>
          <Col md={6} className="d-flex justify-content-between align-items-center">
            {/* Search Bar */}
            <InputGroup>
              <FormControl
                placeholder="Search by title..."
                value={searchTerm}
                onChange={handleSearchChange}
                aria-label="Search by title"
                aria-describedby="basic-addon2"
              />
              <Button variant="outline-secondary" onClick={() => setSearchTerm('')}>
                Clear
              </Button>
            </InputGroup>

            {/* Add Category Button (reduced size) */}
            <Button variant="success" onClick={() => setShowAddCategoryModal(true)} size="sm">
              Add Category
            </Button>
          </Col>
        </Row>

        {/* Category Filter Dropdown */}
        <Row className="mb-3 justify-content-center">
          <Col md={6} className="text-center">
            <Dropdown>
              <Dropdown.Toggle variant="info" id="dropdown-basic">
              Filter by Category: {selectedCategory}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleCategoryFilter('All')}>All</Dropdown.Item>
                {categories.map(category => (
                  <Dropdown.Item key={category} onClick={() => handleCategoryFilter(category)}>
                    {category}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>

        {/* Button to create new note */}
        <Row className="mb-3">
          <Col className="text-center">
            <Button variant="primary" onClick={() => handleShowModal()}>
              Create New Note
            </Button>
          </Col>
        </Row>

        {/* Notes Grid */}
        <Row>
          {currentNotes.map(note => (
            <Col md={4} key={note.id} className="mb-4">
              <Card
                style={{
                  ...cardStyles,
                  backgroundColor: viewingNoteId === note.id ? '#1e1e1e' : '#ffbf00', // Change background on view
                  color: viewingNoteId === note.id ? '#e0e0e0' : '#1e1e1e',
                  minHeight: viewingNoteId === note.id ? 'auto' : '200px',
                  maxHeight: viewingNoteId === note.id ? 'auto' : '200px',
                }}
              >
                <Card.Body>
                  <Card.Title>{note.title}</Card.Title>
                  <Card.Text>
                    {viewingNoteId === note.id
                      ? note.content
                      : note.content.length > 30
                      ? `${note.content.substring(0, 30)}...`
                      : note.content}
                  </Card.Text>
                  {viewingNoteId === note.id && (
                    <Card.Subtitle className="mb-2 text-muted" style={{ color: '#e0e0e0' }}>
                      Created on: {note.date.toLocaleString()}
                    </Card.Subtitle>
                  )}
                  <Button variant="info" className="me-2" onClick={() => handleViewNote(note.id)}>
                    {viewingNoteId === note.id ? 'Hide' : 'View'}
                  </Button>
                  <Button variant="warning" className="me-2" onClick={() => handleShowModal(note)}>
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => handleDeleteNote(note.id)}>
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Pagination */}
        <Row className="justify-content-center">
          <Pagination>
            {pageNumbers.map(number => (
              <Pagination.Item key={number} active={number === currentPage} onClick={() => paginate(number)}>
                {number}
              </Pagination.Item>
            ))}
          </Pagination>
        </Row>

        {/* Modal for Creating/Editing Notes */}
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton style={modalStyles}>
            <Modal.Title>{editNote ? 'Edit Note' : 'Create Note'}</Modal.Title>
          </Modal.Header>
          <Modal.Body style={modalStyles}>
            <Form>
              {/* Title Input */}
              <Form.Group controlId="formTitle" className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter title"
                  value={newNote.title}
                  onChange={e => setNewNote({ ...newNote, title: e.target.value })}
                  maxLength={100} // Optional: limit title length
                />
              </Form.Group>

              {/* Content Input */}
              <Form.Group controlId="formContent" className="mb-3">
                <Form.Label>Content</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  maxLength={500} // Limit to 500 characters
                  placeholder="Enter content (max 500 characters)"
                  value={newNote.content}
                  onChange={e => setNewNote({ ...newNote, content: e.target.value })}
                />
                <Form.Text className="text-muted">
                  {newNote.content.length}/500 characters
                </Form.Text>
              </Form.Group>

              {/* Category Selection */}
              <Form.Group controlId="formCategory" className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  as="select"
                  value={newNote.category}
                  onChange={e => setNewNote({ ...newNote, category: e.target.value })}
                >
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer style={modalStyles}>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="info" onClick={handleSummarize}>
              Summarize
            </Button>
            <Button variant="primary" onClick={handleSaveNote}>
              {editNote ? 'Save Changes' : 'Add Note'}
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Modal for Adding New Category */}
        <Modal show={showAddCategoryModal} onHide={() => setShowAddCategoryModal(false)} centered>
          <Modal.Header closeButton style={modalStyles}>
            <Modal.Title>Add New Category</Modal.Title>
          </Modal.Header>
          <Modal.Body style={modalStyles}>
            <Form>
              <Form.Group controlId="formNewCategory" className="mb-3">
                <Form.Label>Category Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter new category"
                  value={newCategory}
                  onChange={e => setNewCategory(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer style={modalStyles}>
            <Button variant="secondary" onClick={() => setShowAddCategoryModal(false)}>
              Cancel
            </Button>
            <Button variant="success" onClick={handleAddCategory}>
              Add Category
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>

      {/* Footer */}
      <div style={footerStyles}>
        <h3>Contact Us</h3>
        <p>Email: example@example.com</p>
        <p>Contact: +1 123 456 7890</p>
        <p>Address: 123 Main Street, City, Country</p>
        <div style={{ marginTop: '20px' }}>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
            <img src={ig} alt="Instagram" style={{ width: '45px', marginRight: '10px' }} />
          </a>
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
            <img src={fb} alt="Facebook" style={{ width: '30px', marginRight: '10px' }} />
          </a>
          <a href="https://api.whatsapp.com/send?phone=1234567890" target="_blank" rel="noopener noreferrer">
            <img src={wa} alt="WhatsApp" style={{ width: '50px' }} />
          </a>
        </div>
      </div>
    </Container>
  );
};

export default NotesDashboard;

