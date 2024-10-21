import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Container, Form, Modal, Row, Pagination, Dropdown, InputGroup, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFetchCategoriesService, useCreateCategoryService } from '@/api/categoryServices';
import { useFetchNotesService, useSaveNoteService, useDeleteNoteService } from '@/api/noteServices';
import { getSignedInUserDetails } from "@/utils/authUtils";


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
  background: 'linear-gradient(135deg, #ffffff, #d9f7ff 60%, #a8edff 100%)',
  color: '#121212',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};

const cardStyles: React.CSSProperties = {
  backgroundColor: '#FFFF66', // Sticky note yellow background
  color: '#1e1e1e', // Dark text for readability
  minHeight: '200px',
  maxHeight: '200px',
  borderRadius: '10px',
  padding: '15px', // Padding to give content room to breathe
  boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.2)', // Light shadow to give it a floating effect
  transition: 'background-color 0.3s ease, transform 0.2s ease', // Smooth transition for color and hover effect
  transform: 'rotate(-3deg)', // Slight rotation for a more organic sticky note feel
  margin: '20px', // Space between cards
};

// Define styles for the dark-themed modal
const modalStyles: React.CSSProperties = {
  backgroundColor: '#1e1e1e',
  color: '#e0e0e0',
};

// Custom styles for the top controls
const topControlsStyles = {
  backgroundColor: '#f8f9fa', // Light grey background
  padding: '10px',            // Padding around the controls
  borderRadius: '8px',        // Rounded corners
  boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',  // Subtle shadow for elevation
};

const buttonStyle = {
  marginLeft: '10px',         // Space between Clear and Add Category buttons
};

const reducedButtonSize = {
  fontSize: '0.85rem',        // Slightly smaller font size
  padding: '5px 10px',        // Smaller padding to reduce the size
};

const searchInputStyle = {
  borderColor: '#6c757d',     // Light grey border for input
  borderRadius: '5px 0 0 5px' // Rounded left side of the search input
};

// Predefined default categories
const defaultCategories = ['Work', 'Personal', 'Study', 'Important', 'Miscellaneous'];



const NotesDashboard: React.FC = () => {
  const user = getSignedInUserDetails();
  const userId = user?._id ? user._id : '';

  // Fetch categories from backend
  const { data: categories, isLoading: categoriesLoading, refetch: refetchCategories } = useFetchCategoriesService(userId);
  const { mutate: createCategory } = useCreateCategoryService();

  // Fetch notes from backend
  const { data: notes, isLoading: notesLoading, refetch: refetchNotes } = useFetchNotesService(userId);
  const { mutate: saveNote } = useSaveNoteService();
  const { mutate: deleteNote } = useDeleteNoteService();

  // State for note form, category filter, search, pagination, modal visibility, and viewing notes
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [newNote, setNewNote] = useState({ _id: '', title: '', content: '', category: defaultCategories[0] });
  const [editNote, setEditNote] = useState<any>(null); // The note being edited
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [newCategory, setNewCategory] = useState<string>('');
  const [showAddCategoryModal, setShowAddCategoryModal] = useState<boolean>(false);
  const [viewingNoteId, setViewingNoteId] = useState<string | null>(null); // Track viewing notes

  const notesPerPage = 9;
  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;



  useEffect(() => {

    // Automatically show the modal if there are no notes
    if (notes?.length === 0) {
      setShowModal(true);
    }
  }, [notes]);

  // Handle note creation or update
  const handleSaveNote = () => {
    const noteToSave = editNote ? { ...editNote, ...newNote } : { ...newNote, userId };

    saveNote(noteToSave, {
      onSuccess: () => {
        refetchNotes();
        toast.success(editNote ? 'Note Updated Successfully' : 'Note Added Successfully');
        setShowModal(false);
        setEditNote(null);
        setNewNote({ _id: '', title: '', content: '', category: defaultCategories[0] });
      },
      onError: (error) => {
        toast.error('Error occurred while saving the note');
        console.error("Error saving note", error);
      }
    });
  };




  // Handle note deletion
  const handleDeleteNote = (id: string) => {
    console.log(id);

    if (!id) {
      toast.error("Invalid Note ID");
      return;
    }

    deleteNote(id, {
      onSuccess: () => {
        refetchNotes();
        toast.success('Note Deleted Successfully');
      },
      onError: (error) => {
        toast.error('Error occurred while deleting note');
        console.error("Error deleting note", error);
      }
    });
  };


  // Handle adding a new category
  const handleAddCategory = () => {
    if (!newCategory.trim()) {
      toast.error('Category name cannot be empty.');
      return;
    }
    createCategory({ name: newCategory, userId }, {
      onSuccess: () => {
        refetchCategories();
        setNewCategory('');
        setShowAddCategoryModal(false);
        toast.success('Category Added Successfully');
      },
      onError: (error) => {
        toast.error('Error occurred while adding category');
        console.error("Error adding category", error);
      }
    });
  };

  // Function to toggle viewing a note
  const handleViewNote = (id: string) => {
    console.log(id);
    setViewingNoteId(viewingNoteId === id ? null : id); // Toggle the note view
  };

  // Filtering and searching notes
  const filteredNotes = Array.isArray(notes) ? notes.filter(note => {
    const matchesCategory = selectedCategory === 'All' || note.category === selectedCategory;
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  }) : [];

  // Sort and paginate notes
  const sortedNotes = filteredNotes.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const currentNotes = sortedNotes.slice(indexOfFirstNote, indexOfLastNote);
  const pageNumbers = Array.from({ length: Math.ceil(filteredNotes.length / notesPerPage) }, (_, i) => i + 1);

  return (
    <Container fluid style={pageStyles}>
      <Container className="mt-5">
        <h1 className="text-center mb-4">Notes Dashboard</h1>

        {/* Top controls (Search & Add Category) */}
        <Row className="mb-3 justify-content-center" style={topControlsStyles}>
          <Col md={6} className="d-flex justify-content-between align-items-center">
            <InputGroup>
              <FormControl
                placeholder="Search by title..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                aria-label="Search by title"
                style={searchInputStyle}
              />
              <Button variant="outline-secondary" onClick={() => setSearchTerm('')} style={reducedButtonSize}>Clear</Button>
            </InputGroup>
            <Button variant="success" onClick={() => setShowAddCategoryModal(true)} size="sm" style={{ ...reducedButtonSize, ...buttonStyle }}>Add Category</Button>
          </Col>
        </Row>

        {/* Category filter dropdown */}
        <Row className="mb-3 justify-content-center">
          <Col md={6} className="text-center">
            <Dropdown>
              <Dropdown.Toggle variant="info" id="dropdown-basic">
                Filter by Category: {selectedCategory}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setSelectedCategory('All')}>All</Dropdown.Item>
                {defaultCategories.map(category => (
                  <Dropdown.Item key={category} onClick={() => setSelectedCategory(category)}>
                    {category}
                  </Dropdown.Item>
                ))}
                {categories?.map(category => (
                  <Dropdown.Item key={category.id} onClick={() => setSelectedCategory(category.name)}>
                    {category.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>

        {/* Create New Note Button */}
        <Row className="mb-3">
          <Col className="text-center">
            <Button variant="primary" onClick={() => setShowModal(true)}>Create New Note</Button>
          </Col>
        </Row>

        {/* Notes Grid */}
        <Row>
          {currentNotes.map(note => (
            <Col md={4} key={note._id} className="mb-4">
              <Card style={cardStyles}>
                <Card.Body>

                  <Card.Title>{note.title}</Card.Title>
                  <Card.Text>
                    {viewingNoteId === note._id
                      ? note.content
                      : note.content.length > 30
                        ? `${note.content.substring(0, 30)}...`
                        : note.content}
                  </Card.Text>
                  <Button variant="info" className="me-2" onClick={() => handleViewNote(note._id)}>
                    {viewingNoteId === note._id ? 'Hide' : 'View'}
                  </Button>

                  <Button
                    variant="warning"
                    className="me-2"
                    onClick={() => {
                      setEditNote(note);  // Set the note for editing
                      setShowModal(true); // Show the modal after setting the note
                      setNewNote(note);
                      setShowModal(true);
                    }}
                  >
                    Edit
                  </Button>


                  <Button variant="danger" onClick={() => handleDeleteNote(note._id)}>  {/* Use note._id if note._id is undefined */}
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
              <Pagination.Item key={number} active={number === currentPage} onClick={() => setCurrentPage(number)}>
                {number}
              </Pagination.Item>
            ))}
          </Pagination>
        </Row>

        {/* Note Modal (Create / Edit) */}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton style={modalStyles}>
            <Modal.Title>{editNote ? 'Edit Note' : 'Create Note'}</Modal.Title>
          </Modal.Header>
          <Modal.Body style={modalStyles}>
            <Form>
              <Form.Group controlId="formTitle" className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter title"
                  value={newNote.title}
                  onChange={e => setNewNote({ ...newNote, title: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="formContent" className="mb-3">
                <Form.Label>Content</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  maxLength={500}
                  placeholder="Enter content (max 500 characters)"
                  value={newNote.content}
                  onChange={e => setNewNote({ ...newNote, content: e.target.value })}
                />
                <Form.Text className="text-muted">{newNote.content.length}/500 characters</Form.Text>
              </Form.Group>
              <Form.Group controlId="formCategory" className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  as="select"
                  value={newNote.category}
                  onChange={e => setNewNote({ ...newNote, category: e.target.value })}
                >
                  {defaultCategories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                  {categories?.map(category => (
                    <option key={category.id} value={category.name}>{category.name}</option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer style={modalStyles}>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
            <Button variant="primary" onClick={handleSaveNote}>{editNote ? 'Save Changes' : 'Add Note'}</Button>
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
            <Button variant="secondary" onClick={() => setShowAddCategoryModal(false)}>Cancel</Button>
            <Button variant="success" onClick={handleAddCategory}>Add Category</Button>
          </Modal.Footer>
        </Modal>
      </Container>

      {/* Footer */}
      <div style={footerStyles}>
        <h3>Contact Us</h3>
        <p>Email: example@example.com</p>
        <p>Contact: +1 123 456 7890</p>
        <p>Address: 123 Main Street, City, Country</p>
      </div>

      {/* Toast container for notifications */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar closeOnClick pauseOnHover />
    </Container>
  );
};

export default NotesDashboard;
