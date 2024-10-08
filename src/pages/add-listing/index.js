import Link from "next/link";
import { Container, Row, Col, Nav, Tab, Form } from "react-bootstrap";
import { LayoutOne } from "@/layouts";
import ShopBreadCrumb from "@/components/breadCrumbs/shop";
import CallToAction from "@/components/callToAction";
import { FaPencilAlt } from "react-icons/fa";
import { useState } from "react";

function AddListingPage() {
  const [formData, setFormData] = useState({
    area: false,
    bedrooms: false,
    rooms: false,
    bathrooms: false,
    furnished: false,
    airconditioned: false,
    view: false,
    floor: false,
    direction: false,
    fireplace: false,
    proximities: {
      bus: false,
      shops: false,
      metro: false,
      supermarkets: false,
      townCentre: false,
      sportsCentre: false,
      park: false,
      tgvStation: false,
      doctor: false,
      taxi: false,
      conventionCentre: false,
      highway: false,
      airport: false,
      tennis: false,
      sea: false,
      busHub: false,
      seaport: false,
      station: false,
      hospital: false,
      clinic: false,
      golf: false,
      movies: false,
      beach: false,
      publicParking: false,
    },
    images: [],
    video: null,
  });

  const [inputValues, setInputValues] = useState({
    propertyTitle: "",
    description: "",
    areaValue: "",
    bedroomsValue: "",
    roomsValue: "",
    bathroomsValue: "",
    viewValue: "",
    floorValue: "",
    directionValue: "",
    priceValue: "",
    propertyID: "",
  });

  // Active tab state
  const [activeKey, setActiveKey] = useState(0);

  // Handle checkbox changes
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  // Handle proximity checkbox changes
  const handleProximityChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      proximities: {
        ...prevState.proximities,
        [name]: checked,
      },
    }));
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  // Handle tab change with validation
  const handleNextStep = () => {
    // Step-specific validation
    if (activeKey === 0) {
      // Validate Step 1: Property Title, Description, Area, and Price
      const { propertyTitle, description, priceValue } = inputValues;
      if (!propertyTitle || !description || !priceValue) {
        alert("Please fill in all required fields in Step 1.");
        return;
      }
    } else if (activeKey === 1) {
      // Validate Step 2: Images and Video
      if (!formData.images.length || !formData.video) {
        alert("Please upload at least one image and one video in Step 2.");
        return;
      }
    }

    // Move to the next step
    setActiveKey((prev) => prev + 1);
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const fileURLs = files.map(file => URL.createObjectURL(file)); // Create URLs for each file
    setFormData(prevData => ({
        ...prevData,
        images: fileURLs, // Assuming you have an `images` field in your formData state
    }));
};
const handleVideoChange = (event) => {
  const file = event.target.files[0]; // Get the first selected video file
  if (file) {
      const fileURL = URL.createObjectURL(file); // Create a URL for the file
      setFormData(prevData => ({
          ...prevData,
          video: fileURL, // Assuming you have a `video` field in your formData state
      }));
  }
};


  const handlePrevStep = () => {
    if (activeKey > 0) setActiveKey((prev) => prev - 1);
  };

  // Handle form submission
  const handleCreateProperty = async () => {
    // Logging current data before submission
    console.log('Submitting form...');
    console.log('Current form data:', formData);

    // Validation
    if (!formData.title || !formData.description || !formData.price || !formData.yearlyTaxRate || !formData.homeownersAssociationFee || !formData.categories.length) {
        console.error('Please fill in all required fields');
        return;
    }

    // API request
    try {
        const response = await fetch('/api/add-listing', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            const result = await response.json();
            console.log(result.message);
            // Reset form or perform other actions
        } else {
            const errorResponse = await response.json();
            console.error('Failed to create property:', errorResponse);
        }
    } catch (error) {
        console.error('Error while submitting the form:', error);
    }
};


  return (
    <>
      <LayoutOne topbar={true}>
        <ShopBreadCrumb
          title="Add Listing"
          sectionPace=""
          currentSlug="Add Listing"
        />
        <div className="ltn__appointment-area pb-120">
          <Container>
            <Row>
              <Col xs={12}>
                <form action="#">
                  <Tab.Container activeKey={activeKey}>
                    <div className="ltn__tab-menu ltn__tab-menu-3 text-center">
                      <Nav className="nav justify-content-center">
                        <Nav.Link eventKey={0}>1. Property Details</Nav.Link>
                        <Nav.Link eventKey={1}>2. Images</Nav.Link>
                        <Nav.Link eventKey={2}>3. Features</Nav.Link>
                        <Nav.Link eventKey={3}>4. Proximities</Nav.Link>
                      </Nav>
                    </div>
                    <Tab.Content>
                      <Tab.Pane eventKey={0}>
                        <div className="ltn__apartments-tab-content-inner">
                          <h6>Property Description</h6>
                          <Row>
                            <div className="col-md-12">
                              <div className="input-item input-item-textarea ltn__custom-icon">
                                <input
                                  type="text"
                                  name="propertyTitle"
                                  placeholder="Property Title"
                                  value={inputValues.propertyTitle}
                                  onChange={handleInputChange}
                                  required
                                />
                              </div>
                              <div className="input-item input-item-textarea ltn__custom-icon">
                                <textarea
                                  name="description"
                                  placeholder="Description"
                                  value={inputValues.description}
                                  onChange={handleInputChange}
                                  required
                                ></textarea>
                              </div>
                            </div>
                          </Row>
                          <Row>
                            <Col xs={12} md={6} lg={6}>
                              <h6>Property Price</h6>
                            </Col>
                            <Col xs={12} md={6} lg={6}>
                              <h6>Property ID</h6>
                            </Col>
                          </Row>
                          <Row>
                            <Col xs={12} md={6}>
                              <div className="input-item input-item-textarea ltn__custom-icon">
                                <input
                                  type="text"
                                  name="priceValue"
                                  placeholder="Price in $ (only numbers)"
                                  value={inputValues.priceValue}
                                  onChange={handleInputChange}
                                  required
                                />
                                <span className="inline-icon">
                                  <FaPencilAlt />
                                </span>
                              </div>
                            </Col>
                            <Col xs={12} md={6}>
                              <div className="input-item input-item-textarea ltn__custom-icon">
                                <input
                                  type="text"
                                  name="propertyID"
                                  placeholder="Property ID"
                                  value={inputValues.propertyID}
                                  onChange={handleInputChange}
                                  required
                                />
                                <span className="inline-icon">
                                  <FaPencilAlt />
                                </span>
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col xs={12} md={6} lg={6}>
                              <h6>Property Category</h6>
                            </Col>
                            <Col xs={12} md={6} lg={6}>
                              <h6>Property Type</h6>
                            </Col>
                          </Row>
                          <Row>
                            <Col xs={12} md={6}>
                              <div className="input-item ltn__custom-icon">
                                <Form.Select
                                  className="nice-select"
                                  name="category"
                                  onChange={handleInputChange}
                                  required
                                >
                                  <option>Make A Selection</option>
                                  <option value="1">Apartment</option>
                                  <option value="2">Villa</option>
                                  <option value="3">Mansion</option>
                                  <option value="4">Chalet</option>
                                  <option value="5">Land</option>
                                  <option value="6">Townhouse</option>
                                  <option value="7">Business Premise</option>
                                  <option value="8">Office</option>
                                </Form.Select>
                              </div>
                            </Col>
                            <Col xs={12} md={6}>
                              <div className="input-item ltn__custom-icon">
                                <Form.Select
                                  className="nice-select"
                                  name="propertyType"
                                  onChange={handleInputChange}
                                  required
                                >
                                  <option>Make A Selection</option>
                                  <option value="1">Buy</option>
                                  <option value="2">Rent</option>
                                  <option value="3">Development</option>
                                </Form.Select>
                              </div>
                            </Col>
                          </Row>
                          <div className="btn-wrapper mt-0">
                            <button
                              type="button"
                              className="btn theme-btn-1 btn-effect-1 text-uppercase"
                              onClick={handleNextStep}
                            >
                              Next Step
                            </button>
                          </div>
                        </div>
                      </Tab.Pane>

                      <Tab.Pane eventKey={1}>
                        <div className="ltn__product-tab-content-inner">
                          {/* File Upload Section for Images and Video */}
                          <Row>
                            <Col xs={12}>
                              <Form.Group>
                                <Form.Label>Upload Images</Form.Label>
                                <Form.Control
                                  type="file"
                                  multiple
                                  accept="image/*"
                                  onChange={handleImageChange}
                                />
                              </Form.Group>
                            </Col>
                            <Col xs={12}>
                              <Form.Group>
                                <Form.Label>Upload Video</Form.Label>
                                <Form.Control
                                  type="file"
                                  accept="video/*"
                                  onChange={handleVideoChange}
                                />
                              </Form.Group>
                            </Col>
                          </Row>

                          <div className="btn-wrapper mt-80">
                            <button
                              type="button"
                              className="btn theme-btn-1 btn-effect-1 text-uppercase"
                              onClick={handlePrevStep}
                            >
                              Prev Step
                            </button>
                            <button
                              type="button"
                              className="btn theme-btn-1 btn-effect-1 text-uppercase"
                              onClick={handleNextStep}
                            >
                              Next Step
                            </button>
                          </div>
                        </div>
                      </Tab.Pane>

                      <Tab.Pane eventKey={2}>
                        <div className="ltn__product-tab-content-inner">
                          <h6>Property Features</h6>
                          <Row>
                            <Col xs={12} md={6}>
                              <label className="checkbox-item">
                                Area
                                <input
                                  type="checkbox"
                                  name="area"
                                  checked={formData.area}
                                  onChange={handleCheckboxChange}
                                />
                                <span className="checkmark"></span>
                              </label>
                              {formData.area && (
                                <Form.Control
                                  className="input-item"
                                  type="text"
                                  placeholder="Enter area"
                                  name="areaValue"
                                  value={inputValues.areaValue}
                                  onChange={handleInputChange}
                                  required={formData.area}
                                />
                              )}
                            </Col>
                            <Col xs={12} md={6}>
                              <label className="checkbox-item">
                                No. of Bedrooms
                                <input
                                  type="checkbox"
                                  name="bedrooms"
                                  checked={formData.bedrooms}
                                  onChange={handleCheckboxChange}
                                />
                                <span className="checkmark"></span>
                              </label>
                              {formData.bedrooms && (
                                <Form.Control
                                  className="input-item"
                                  type="text"
                                  placeholder="Enter number of bedrooms"
                                  name="bedroomsValue"
                                  value={inputValues.bedroomsValue}
                                  onChange={handleInputChange}
                                  required={formData.bedrooms}
                                />
                              )}
                            </Col>
                          </Row>
                          <Row>
                            <Col xs={12} md={6}>
                              <label className="checkbox-item">
                                No. of Rooms
                                <input
                                  type="checkbox"
                                  name="rooms"
                                  checked={formData.rooms}
                                  onChange={handleCheckboxChange}
                                />
                                <span className="checkmark"></span>
                              </label>
                              {formData.rooms && (
                                <Form.Control
                                  className="input-item"
                                  type="text"
                                  placeholder="Enter number of rooms"
                                  name="roomsValue"
                                  value={inputValues.roomsValue}
                                  onChange={handleInputChange}
                                  required={formData.rooms}
                                />
                              )}
                            </Col>
                            <Col xs={12} md={6}>
                              <label className="checkbox-item">
                                No. of Bathrooms
                                <input
                                  type="checkbox"
                                  name="bathrooms"
                                  checked={formData.bathrooms}
                                  onChange={handleCheckboxChange}
                                />
                                <span className="checkmark"></span>
                              </label>
                              {formData.bathrooms && (
                                <Form.Control
                                  className="input-item"
                                  type="text"
                                  placeholder="Enter number of bathrooms"
                                  name="bathroomsValue"
                                  value={inputValues.bathroomsValue}
                                  onChange={handleInputChange}
                                  required={formData.bathrooms}
                                />
                              )}
                            </Col>
                          </Row>
                          <Row>
                            <Col xs={12} md={6}>
                              <label className="checkbox-item">
                                Furnished
                                <input
                                  type="checkbox"
                                  name="furnished"
                                  checked={formData.furnished}
                                  onChange={handleCheckboxChange}
                                />
                                <span className="checkmark"></span>
                              </label>
                            </Col>
                            <Col xs={12} md={6}>
                              <label className="checkbox-item">
                                Air-conditioned
                                <input
                                  type="checkbox"
                                  name="airconditioned"
                                  checked={formData.airconditioned}
                                  onChange={handleCheckboxChange}
                                />
                                <span className="checkmark"></span>
                              </label>
                            </Col>
                          </Row>
                          <Row>
                            <Col xs={12} md={6}>
                              <label className="checkbox-item">
                                View
                                <input
                                  type="checkbox"
                                  name="view"
                                  checked={formData.view}
                                  onChange={handleCheckboxChange}
                                />
                                <span className="checkmark"></span>
                              </label>
                              {formData.view && (
                                <Form.Control
                                  className="input-item"
                                  type="text"
                                  placeholder="Enter view"
                                  name="viewValue"
                                  value={inputValues.viewValue}
                                  onChange={handleInputChange}
                                  required={formData.view}
                                />
                              )}
                            </Col>
                            <Col xs={12} md={6}>
                              <label className="checkbox-item">
                                Floor
                                <input
                                  type="checkbox"
                                  name="floor"
                                  checked={formData.floor}
                                  onChange={handleCheckboxChange}
                                />
                                <span className="checkmark"></span>
                              </label>
                              {formData.floor && (
                                <Form.Control
                                  className="input-item"
                                  type="text"
                                  placeholder="Enter floor"
                                  name="floorValue"
                                  value={inputValues.floorValue}
                                  onChange={handleInputChange}
                                  required={formData.floor}
                                />
                              )}
                            </Col>
                          </Row>
                          <Row>
                            <Col xs={12} md={6}>
                              <label className="checkbox-item">
                                Direction
                                <input
                                  type="checkbox"
                                  name="direction"
                                  checked={formData.direction}
                                  onChange={handleCheckboxChange}
                                />
                                <span className="checkmark"></span>
                              </label>
                              {formData.direction && (
                                <Form.Control
                                  className="input-item"
                                  type="text"
                                  placeholder="Enter direction"
                                  name="directionValue"
                                  value={inputValues.directionValue}
                                  onChange={handleInputChange}
                                  required={formData.direction}
                                />
                              )}
                            </Col>
                            <Col xs={12} md={6}>
                              <label className="checkbox-item">
                                Fireplace
                                <input
                                  type="checkbox"
                                  name="fireplace"
                                  checked={formData.fireplace}
                                  onChange={handleCheckboxChange}
                                />
                                <span className="checkmark"></span>
                              </label>
                            </Col>
                          </Row>
                          <div className="btn-wrapper mt-40">
                            <button
                              type="button"
                              className="btn theme-btn-1 btn-effect-1 text-uppercase"
                              onClick={handlePrevStep}
                            >
                              Prev Step
                            </button>
                            <button
                              type="button"
                              className="btn theme-btn-1 btn-effect-1 text-uppercase"
                              onClick={handleNextStep}
                            >
                              Next Step
                            </button>
                          </div>
                        </div>
                      </Tab.Pane>

                      <Tab.Pane eventKey={3}>
                        <div className="ltn__product-tab-content-inner">
                          <h6>Proximities</h6>
                          <Row>
                            <Col xs={12} md={6} lg={3}>
                              <label className="checkbox-item">
                                Bus
                                <input
                                  type="checkbox"
                                  name="bus"
                                  checked={formData.proximities.bus}
                                  onChange={handleProximityChange}
                                />
                                <span className="checkmark"></span>
                              </label>
                            </Col>
                            <Col xs={12} md={6} lg={3}>
                              <label className="checkbox-item">
                                Shops
                                <input
                                  type="checkbox"
                                  name="shops"
                                  checked={formData.proximities.shops}
                                  onChange={handleProximityChange}
                                />
                                <span className="checkmark"></span>
                              </label>
                            </Col>
                            <Col xs={12} md={6} lg={3}>
                              <label className="checkbox-item">
                                Metro
                                <input
                                  type="checkbox"
                                  name="metro"
                                  checked={formData.proximities.metro}
                                  onChange={handleProximityChange}
                                />
                                <span className="checkmark"></span>
                              </label>
                            </Col>
                            <Col xs={12} md={6} lg={3}>
                              <label className="checkbox-item">
                                Super Markets
                                <input
                                  type="checkbox"
                                  name="supermarkets"
                                  checked={formData.proximities.supermarkets}
                                  onChange={handleProximityChange}
                                />
                                <span className="checkmark"></span>
                              </label>
                            </Col>
                          </Row>
                          <Row>
                            <Col xs={12} md={6} lg={3}>
                              <label className="checkbox-item">
                                Town Centre
                                <input
                                  type="checkbox"
                                  name="townCentre"
                                  checked={formData.proximities.townCentre}
                                  onChange={handleProximityChange}
                                />
                                <span className="checkmark"></span>
                              </label>
                            </Col>
                            <Col xs={12} md={6} lg={3}>
                              <label className="checkbox-item">
                                Sports Centre
                                <input
                                  type="checkbox"
                                  name="sportsCentre"
                                  checked={formData.proximities.sportsCentre}
                                  onChange={handleProximityChange}
                                />
                                <span className="checkmark"></span>
                              </label>
                            </Col>
                            <Col xs={12} md={6} lg={3}>
                              <label className="checkbox-item">
                                Park
                                <input
                                  type="checkbox"
                                  name="park"
                                  checked={formData.proximities.park}
                                  onChange={handleProximityChange}
                                />
                                <span className="checkmark"></span>
                              </label>
                            </Col>
                            <Col xs={12} md={6} lg={3}>
                              <label className="checkbox-item">
                                TGV Station
                                <input
                                  type="checkbox"
                                  name="tgvStation"
                                  checked={formData.proximities.tgvStation}
                                  onChange={handleProximityChange}
                                />
                                <span className="checkmark"></span>
                              </label>
                            </Col>
                          </Row>
                          <Row>
                            <Col xs={12} md={6} lg={3}>
                              <label className="checkbox-item">
                                Doctor
                                <input
                                  type="checkbox"
                                  name="doctor"
                                  checked={formData.proximities.doctor}
                                  onChange={handleProximityChange}
                                />
                                <span className="checkmark"></span>
                              </label>
                            </Col>
                            <Col xs={12} md={6} lg={3}>
                              <label className="checkbox-item">
                                Taxi
                                <input
                                  type="checkbox"
                                  name="taxi"
                                  checked={formData.proximities.taxi}
                                  onChange={handleProximityChange}
                                />
                                <span className="checkmark"></span>
                              </label>
                            </Col>
                            <Col xs={12} md={6} lg={3}>
                              <label className="checkbox-item">
                                Convention Centre
                                <input
                                  type="checkbox"
                                  name="conventionCentre"
                                  checked={
                                    formData.proximities.conventionCentre
                                  }
                                  onChange={handleProximityChange}
                                />
                                <span className="checkmark"></span>
                              </label>
                            </Col>
                            <Col xs={12} md={6} lg={3}>
                              <label className="checkbox-item">
                                Highway
                                <input
                                  type="checkbox"
                                  name="highway"
                                  checked={formData.proximities.highway}
                                  onChange={handleProximityChange}
                                />
                                <span className="checkmark"></span>
                              </label>
                            </Col>
                          </Row>
                          <Row>
                            <Col xs={12} md={6} lg={3}>
                              <label className="checkbox-item">
                                Airport
                                <input
                                  type="checkbox"
                                  name="airport"
                                  checked={formData.proximities.airport}
                                  onChange={handleProximityChange}
                                />
                                <span className="checkmark"></span>
                              </label>
                            </Col>
                            <Col xs={12} md={6} lg={3}>
                              <label className="checkbox-item">
                                Tennis
                                <input
                                  type="checkbox"
                                  name="tennis"
                                  checked={formData.proximities.tennis}
                                  onChange={handleProximityChange}
                                />
                                <span className="checkmark"></span>
                              </label>
                            </Col>
                            <Col xs={12} md={6} lg={3}>
                              <label className="checkbox-item">
                                Sea
                                <input
                                  type="checkbox"
                                  name="sea"
                                  checked={formData.proximities.sea}
                                  onChange={handleProximityChange}
                                />
                                <span className="checkmark"></span>
                              </label>
                            </Col>
                            <Col xs={12} md={6} lg={3}>
                              <label className="checkbox-item">
                                Bus Hub
                                <input
                                  type="checkbox"
                                  name="busHub"
                                  checked={formData.proximities.busHub}
                                  onChange={handleProximityChange}
                                />
                                <span className="checkmark"></span>
                              </label>
                            </Col>
                          </Row>
                          <Row>
                            <Col xs={12} md={6} lg={3}>
                              <label className="checkbox-item">
                                Seaport
                                <input
                                  type="checkbox"
                                  name="seaport"
                                  checked={formData.proximities.seaport}
                                  onChange={handleProximityChange}
                                />
                                <span className="checkmark"></span>
                              </label>
                            </Col>
                            <Col xs={12} md={6} lg={3}>
                              <label className="checkbox-item">
                                Station
                                <input
                                  type="checkbox"
                                  name="station"
                                  checked={formData.proximities.station}
                                  onChange={handleProximityChange}
                                />
                                <span className="checkmark"></span>
                              </label>
                            </Col>
                            <Col xs={12} md={6} lg={3}>
                              <label className="checkbox-item">
                                Hospital
                                <input
                                  type="checkbox"
                                  name="hospital"
                                  checked={formData.proximities.hospital}
                                  onChange={handleProximityChange}
                                />
                                <span className="checkmark"></span>
                              </label>
                            </Col>
                            <Col xs={12} md={6} lg={3}>
                              <label className="checkbox-item">
                                Clinic
                                <input
                                  type="checkbox"
                                  name="clinic"
                                  checked={formData.proximities.clinic}
                                  onChange={handleProximityChange}
                                />
                                <span className="checkmark"></span>
                              </label>
                            </Col>
                          </Row>
                          <Row>
                            <Col xs={12} md={6} lg={3}>
                              <label className="checkbox-item">
                                Golf
                                <input
                                  type="checkbox"
                                  name="golf"
                                  checked={formData.proximities.golf}
                                  onChange={handleProximityChange}
                                />
                                <span className="checkmark"></span>
                              </label>
                            </Col>
                            <Col xs={12} md={6} lg={3}>
                              <label className="checkbox-item">
                                Movies
                                <input
                                  type="checkbox"
                                  name="movies"
                                  checked={formData.proximities.movies}
                                  onChange={handleProximityChange}
                                />
                                <span className="checkmark"></span>
                              </label>
                            </Col>
                            <Col xs={12} md={6} lg={3}>
                              <label className="checkbox-item">
                                Beach
                                <input
                                  type="checkbox"
                                  name="beach"
                                  checked={formData.proximities.beach}
                                  onChange={handleProximityChange}
                                />
                                <span className="checkmark"></span>
                              </label>
                            </Col>
                            <Col xs={12} md={6} lg={3}>
                              <label className="checkbox-item">
                                Zoo
                                <input
                                  type="checkbox"
                                  name="zoo"
                                  checked={formData.proximities.zoo}
                                  onChange={handleProximityChange}
                                />
                                <span className="checkmark"></span>
                              </label>
                            </Col>
                          </Row>
                          <div className="btn-wrapper mt-40">
                            <button
                              type="button"
                              className="btn theme-btn-1 btn-effect-1 text-uppercase"
                              onClick={handlePrevStep}
                            >
                              Prev Step
                            </button>
                            <button
                type="button"
                className="btn theme-btn-1 btn-effect-1 text-uppercase"
                onClick={handleCreateProperty}
            >
                Create Property
            </button>

                          </div>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </form>
              </Col>
            </Row>
          </Container>
        </div>
        <CallToAction />
      </LayoutOne>
    </>
  );
}

export default AddListingPage;
