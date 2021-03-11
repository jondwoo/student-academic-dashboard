import React, { useState, useContext, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/esm/Col';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import TimePicker from 'react-bootstrap-time-picker';
import Container from 'react-bootstrap/esm/Container';
import Card from 'react-bootstrap/Card';

import { myContext } from '../../../context/Context';
import { geReqData } from '../../Tables/Requirements/GeRequirements/GeReqData';
import { majorReqCategory } from '../../Tables/Requirements/MajorRequirements/CecsReqData';

export const CurrentCourseForm = (props) => {
  const { addCurrentCourse, user } = useContext(myContext);
  const [courseData, setCourseData] = useState({
    userID: JSON.parse(user).googleId,
    courseType: null,
    courseNo: null,
    courseTitle: null,
    courseUnits: null,
    courseTerm: null,
    courseYear: null,
    designation: null,
    additionalReq: null,
    courseSection: null,
    courseStartTime: null,
    courseEndTime: null,
    courseDays: [],
    courseLocation: null,
  });

  const [courseType, setCourseType] = useState('ge');
  const [courseNumber, setCourseNumber] = useState(null);
  const [courseTitle, setCourseTitle] = useState(null);
  const [courseUnits, setCourseUnits] = useState(0);
  const [courseTerm, setCourseTerm] = useState('Fall');
  const [courseYear, setCourseYear] = useState(null);
  const [courseDesignation, setCourseDesignation] = useState(null);
  const [courseAdditionalReq, setCourseAdditionalReq] = useState(null);
  const [courseSection, setCourseSection] = useState(null);
  const [timePickerStartTime, setTimePickerStartTime] = useState(0);
  const [courseStartTime, setCourseStartTime] = useState(null);
  const [timePickerEndTime, setTimePickerEndTime] = useState(0);
  const [courseEndTime, setCourseEndTime] = useState(null);
  const [courseDays, setCourseDays] = useState([]);
  const [courseLocation, setCourseLocation] = useState(null);

  useEffect(() => {
    if (courseType === 'ge') {
      setCourseDesignation('A1 - Oral Communication');
      setCourseAdditionalReq('Human Diversity');
    } else {
      setCourseDesignation('Lower Div');
      setCourseAdditionalReq(null);
    }
  }, [courseType]);

  const getTime = (dateTime, seconds) => {
    const date = new Date(dateTime.getTime() + (seconds / 60) * 60000);
    let hour = date.getHours().toString();
    let minutes = date.getMinutes().toString();

    if (hour.length === 1) {
      hour = '0' + hour;
    }

    if (minutes.length === 1) {
      minutes = '0' + minutes;
    }

    const time = hour + ':' + minutes;
    return time;
  };

  const handleCourseTypeChange = (val) => {
    setCourseType(val);
    setCourseData({ ...courseData, courseType });
  };

  const handleCourseNumberChange = (e) => {
    setCourseNumber(e.target.value);
    setCourseData({ ...courseData, courseNumber });
  };

  const handleCourseTitleChange = (e) => {
    setCourseTitle(e.target.value);
    setCourseData({ ...courseData, courseTitle });
  };

  const handleCourseUnitChange = (e) => {
    setCourseUnits(e.target.value);
    setCourseData({ ...courseData, courseUnits });
  };

  const handleCourseTermChange = (e) => {
    setCourseTerm(e.target.value);
    setCourseData({ ...courseData, courseTerm });
  };

  const handleCourseYearChange = (e) => {
    setCourseYear(e.target.value);
    setCourseData({ ...courseData, courseYear });
  };

  const handleCourseDesignationChange = (e) => {
    setCourseDesignation(e.target.value);
    setCourseData({ ...courseData, courseDesignation });
  };

  const handleCourseAdditionalReqChange = (e) => {
    setCourseAdditionalReq(e.target.value);
    setCourseData({ ...courseData, courseAdditionalReq });
  };

  const handleCourseSectionChange = (e) => {
    setCourseSection(e.target.value);
    setCourseData({ ...courseData, courseSection });
  };

  const handleTimeStartChange = (seconds) => {
    const dateTime = new Date('July 1, 1999');

    // time in 24h string format
    const time = getTime(dateTime, seconds);
    setTimePickerStartTime(seconds);
    setCourseStartTime(time);
    setCourseData({ ...courseData, courseStartTime });
  };

  const handleTimeEndChange = (seconds) => {
    const dateTime = new Date('July 1, 1999');

    // time in 24h string format
    const time = getTime(dateTime, seconds);
    setTimePickerEndTime(seconds);
    setCourseEndTime(time);
    setCourseData({ ...courseData, courseEndTime });
  };

  const handleCourseDayChange = (days) => {
    setCourseDays(days);
    setCourseData({ ...courseData, courseDays });
  };

  const handleCourseLocationChange = (e) => {
    setCourseLocation(e.target.value);
    setCourseData({ ...courseData, courseLocation });
  };

  const handleSubmit = (e) => {
    // e.preventDefault();

    const newCurrentCourse = {
      userID: courseData.userID,
      courseType: courseData.courseType,
      courseNo: courseData.courseNo,
      courseTitle: courseData.courseTitle,
      courseUnits: courseData.courseUnits,
      courseTerm: courseData.courseTerm,
      courseYear: courseData.courseYear,
      designation: courseData.designation,
      additionalReq: courseData.additionalReq,
      courseSection: courseData.courseSection,
      courseStartTime: courseData.courseStartTime,
      courseEndTime: courseData.courseEndTime,
      courseDays: courseData.courseDays,
      courseLocation: courseData.courseLocation,
    };

    console.log(newCurrentCourse);
    addCurrentCourse(newCurrentCourse);
  };

  return (
    <>
      <Container>
        <Row className="d-flex mt-5 justify-content-center">
          <Col md={9}>
            <Card className="text-center shadow-sm mb-3">
              <Card.Body>
                <Row className="my-2">
                  <Col className="d-flex justify-content-center">
                    <Form onSubmit={handleSubmit}>
                      {/* COURSE TYPE */}
                      <ToggleButtonGroup
                        className="mb-3"
                        type="radio"
                        name="options"
                        defaultValue="ge"
                        onChange={handleCourseTypeChange}
                      >
                        <ToggleButton value="ge">GE Course</ToggleButton>
                        <ToggleButton value="major">Major Course</ToggleButton>
                      </ToggleButtonGroup>

                      {/* COURSE NUMBER */}
                      <Form.Group controlId="courseNo">
                        <Form.Label>Course Number</Form.Label>
                        <Form.Control
                          type="input"
                          name="courseNo"
                          onChange={handleCourseNumberChange}
                        />
                      </Form.Group>

                      {/* COURSE TITLE */}
                      <Form.Group controlId="courseTitle">
                        <Form.Label>Course Title</Form.Label>
                        <Form.Control
                          type="input"
                          name="courseTitle"
                          onChange={handleCourseTitleChange}
                        />
                      </Form.Group>

                      {/* COURSE UNITS */}
                      <Form.Group controlId="courseUnits">
                        <Form.Label>Units</Form.Label>
                        <Form.Control
                          as="select"
                          name="courseUnits"
                          onChange={handleCourseUnitChange}
                        >
                          <option value="0">0</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </Form.Control>
                      </Form.Group>

                      <Row>
                        <Col>
                          {/* COURSE TERM */}
                          <Form.Group controlId="courseTerm">
                            <Form.Label>Term</Form.Label>
                            <Form.Control
                              as="select"
                              name="courseTerm"
                              onChange={handleCourseTermChange}
                            >
                              <option value="Fall">Fall</option>
                              <option value="Spring">Spring</option>
                              <option value="Summer">Summer</option>
                              <option value="Winter">Winter</option>
                            </Form.Control>
                          </Form.Group>
                        </Col>
                        <Col>
                          {/* COURSE YEAR */}
                          <Form.Group controlId="courseYear">
                            <Form.Label>Year</Form.Label>
                            <Form.Control
                              type="input"
                              name="courseYear"
                              onChange={handleCourseYearChange}
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      {/* COURSE DESIGNATION */}
                      {courseType === 'ge' ? (
                        // ge designation
                        <>
                          <Form.Group controlId="designation">
                            <Form.Label>Designation</Form.Label>
                            <Form.Control
                              as="select"
                              name="designation"
                              onChange={handleCourseDesignationChange}
                            >
                              {geReqData.slice(0, 13).map((ge, idx) => {
                                return (
                                  <option
                                    value={`${ge.designation} - ${ge.course}`}
                                    key={idx}
                                  >
                                    {ge.designation} - {ge.course}
                                  </option>
                                );
                              })}
                            </Form.Control>
                          </Form.Group>

                          {/* Additional Req */}
                          <Form.Group controlId="additinalReq">
                            <Form.Label>Additional Requirements</Form.Label>
                            <Form.Control
                              as="select"
                              name="additionalReq"
                              onChange={handleCourseAdditionalReqChange}
                            >
                              <option value="Human Diversity" key={1}>
                                Human Diversity
                              </option>
                              <option value="Global Issues" key={2}>
                                Global Issues
                              </option>
                            </Form.Control>
                          </Form.Group>
                        </>
                      ) : (
                        // major designation
                        <Form.Group controlId="designation">
                          <Form.Label>Designation</Form.Label>
                          <Form.Control
                            as="select"
                            name="designation"
                            onChange={handleCourseDesignationChange}
                          >
                            {majorReqCategory.map((category, idx) => {
                              return (
                                <option value={category} key={idx}>
                                  {category}
                                </option>
                              );
                            })}
                          </Form.Control>
                        </Form.Group>
                      )}

                      {/* COURSE SECTION */}
                      <Form.Group controlId="section">
                        <Form.Label>Section</Form.Label>
                        <Form.Control
                          type="input"
                          name="courseSection"
                          onChange={handleCourseSectionChange}
                        />
                      </Form.Group>

                      {/* COURSE START TIME */}
                      <Form.Group controlId="startTime">
                        <Form.Label>Start Time</Form.Label>
                        <TimePicker
                          onChange={handleTimeStartChange}
                          name="courseStartTime"
                          value={timePickerStartTime}
                          step={5}
                        />
                      </Form.Group>

                      {/* COURSE END TIME */}
                      <Form.Group controlId="endTime">
                        <Form.Label>End Time</Form.Label>
                        <TimePicker
                          onChange={handleTimeEndChange}
                          name="courseStartTime"
                          value={timePickerEndTime}
                          step={5}
                        />
                      </Form.Group>

                      {/* COURSE DAYS */}
                      <Form.Group controlId="day">
                        <Row>
                          <Col className="d-flex flex-column">
                            <Form.Label>Day</Form.Label>
                            <Container>
                              <ToggleButtonGroup
                                type="checkbox"
                                name="courseDays"
                                value={courseDays}
                                onChange={handleCourseDayChange}
                              >
                                <ToggleButton value="Mon">M</ToggleButton>
                                <ToggleButton value="Tues">T</ToggleButton>
                                <ToggleButton value="Wed">W</ToggleButton>
                                <ToggleButton value="Thurs">Th</ToggleButton>
                                <ToggleButton value="Fri">F</ToggleButton>
                                <ToggleButton value="Sat">S</ToggleButton>
                              </ToggleButtonGroup>
                            </Container>
                          </Col>
                        </Row>
                      </Form.Group>

                      {/* COURSE LOCATION */}
                      <Form.Group controlId="location">
                        <Form.Label>Location</Form.Label>
                        <Form.Control
                          type="input"
                          name="courseLocation"
                          onChange={handleCourseLocationChange}
                        />
                      </Form.Group>

                      <Button className variant="primary" type="submit">
                        Submit
                      </Button>
                    </Form>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CurrentCourseForm;
