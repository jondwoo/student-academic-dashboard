import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import MajorHistory from '../../components/History/MajorHistory/MajorHistory';
import GeHistory from '../../components/History/GeHistory/GeHistory';

import '../../utility/css/table-fixed-height.css';

const CourseHistory = () => {
  return (
    <>
      <Card className="mt-5 text-center">
        <Row>
          <Col>
            <Card.Body>
              <Card.Title>Course History</Card.Title>
            </Card.Body>
          </Col>
        </Row>
      </Card>

      <MajorHistory />
      <div style={{ height: '900px' }}>
        <GeHistory />
      </div>
    </>
  );
};

export default CourseHistory;
