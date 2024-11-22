import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { Col, Row } from 'react-bootstrap';

function FilterForm() {
    const [mssv, setMssv] = useState('');

    const [dateRange, setDateRange] = useState({ start: '', end: '' });
    const [sortOrder, setSortOrder] = useState('newest');

    const handleFilter = () => {
        console.log('MSSV:', mssv);
  
        console.log('Date Range:', dateRange);
        console.log('Sort Order:', sortOrder);
        // Thực hiện các hành động lọc tại đây
    };

    return (
        <div
            className="justify-container-center rounded"
            style={{ maxWidth: '400px', backgroundColor: '#fff', padding: '2vh', marginLeft:'3vh' }}
        >
            
            <Form>
     
                <Form.Group className="mb-3">
                    <Form.Label>MSSV</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Nhập MSSV"
                        value={mssv}
                        onChange={(e) => setMssv(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Thời gian</Form.Label>
                    <Row>
                        <Col>
                            <Form.Control
                                type="date"
                                value={dateRange.start}
                                onChange={(e) =>
                                    setDateRange({ ...dateRange, start: e.target.value })
                                }
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                type="date"
                                value={dateRange.end}
                                onChange={(e) =>
                                    setDateRange({ ...dateRange, end: e.target.value })
                                }
                            />
                        </Col>
                    </Row>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Sắp xếp</Form.Label>
                    <InputGroup>
                        <Form.Check
                            type="switch"
                            id="sortOrderSwitch"
                            label={sortOrder === 'newest' ? 'Mới nhất' : 'Cũ nhất'}
                            checked={sortOrder === 'newest'}
                            onChange={(e) =>
                                setSortOrder(e.target.checked ? 'newest' : 'oldest')
                            }
                        />
                    </InputGroup>
                </Form.Group>

                <Button
                    variant="primary"
                    className="w-100"
                    onClick={handleFilter}
                >
                    Lọc
                </Button>
            </Form>
        </div>
    );
}

export default FilterForm;
