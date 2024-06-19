import React, { useState } from 'react';
import { Row, Col, Button, InputGroup, FormControl, Dropdown } from 'react-bootstrap';
import IndexPage from '../pages/indexPage';
import styles from '@/styles/Home.module.css';
import Link from 'next/link';

const PostList = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };
  const options = ["Title", "Contents", "Author"];

  return (
    <>
      <Row className={styles.btnContainer}>
        <Col className="d-flex justify-content-end">
            <Button as={Link} href="/freeboard/create" className={styles.postBtn}>
              Create Post
            </Button>
        </Col>
      </Row>
      <Row className={styles.freeboard}>
        <Row className={styles.postSection}>
          <IndexPage />
        </Row>
        <Row className="d-flex">
          <Col xs={12} md={4} style={{ flex: 1 }}>
            <Dropdown className={styles.dropdown}>
              <Dropdown.Toggle className={styles.dropdownMenu}>
                {selectedOption || 'Select an option'}
              </Dropdown.Toggle>
              <Dropdown.Menu className="w-100">
                {options.map((option, index) => (
                  <Dropdown.Item key={index} onClick={() => handleOptionClick(option)}>
                    {option}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col xs={12} md={8} style={{ flex: 4 }}>
            <InputGroup>
              <FormControl placeholder="Type search keyword..." aria-label="Search" />
            </InputGroup>
          </Col>
        </Row>
      </Row>
    </>
  );
}

export default PostList;
