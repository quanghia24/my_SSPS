import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios';
import FilterForm from './FilterForm';
import 'bootstrap/dist/css/bootstrap.min.css';

function MyTable() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showFilter, setShowFilter] = useState(false);

    const fetchPrintingHistory = async () => {
        setLoading(true);
        try {
            const tokens = {
                refresh: localStorage.getItem('refresh'),
                access: localStorage.getItem('access'),
            };

            const response = await axios.get('http://localhost:8000/api/prints/orders/', {
                headers: {
                    Authorization: `Bearer ${tokens.access}`,
                },
            });

            setDocuments(response.data);
        } catch (error) {
            console.error('Error fetching printing history:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPrintingHistory();
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = documents.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(documents.length / itemsPerPage);

    const handleShowFilter = () => setShowFilter(true);
    const handleCloseFilter = () => setShowFilter(false);

    const handleClickStatus = (info) => {
        const UpdateContent = {
            print_id: info.id,
            status: "success",
        };
        const url = 'http://127.0.0.1:8000/api/prints/update/';

        axios.patch(url, UpdateContent)
            .then(() => {
                console.log("Status updated successfully");
                setDocuments((prevDocuments) =>
                    prevDocuments.map((doc) =>
                        doc.id === info.id ? { ...doc, status: "success" } : doc
                    )
                );
            })
            .catch((error) => {
                console.error("Error updating status:", error);
            });
    };

    const paginationItems = Array.from({ length: totalPages }, (_, index) => (
        <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => setCurrentPage(index + 1)}
        >
            {index + 1}
        </Pagination.Item>
    ));

    const DisplayData = currentItems.map((info) => (
        <tr key={info.id}>
            <td className="text-center">{info.id}</td>
            <td className="text-center">{info.order_name}</td>
            <td className="text-center">{info.timer_start.slice(0, 10)}</td>
            <td className="text-center">{info.printer}</td>
            <td className="text-center">{info.status}</td>
            <td className="text-center">{info.page_side}</td>
            <td className="text-center">{info.page_cost}</td>
            <td className="text-center">
                <Button variant="primary" onClick={() => handleClickStatus(info)}>
                    <i className="bi bi-check"></i>
                </Button>
            </td>
        </tr>
    ));

    return (
        <div>
            <div style={{ margin: '-3.5vh', marginLeft: '-9vh' }}>
                <div className='text-4xl font-semibold shadow-xl rounded-br-lg p-3 border border-black w-fit'>
                    Lịch sử in
                </div>
            </div>

            <div className="d-flex align-items-center justify-content-end" style={{ width: '175vh' }}>
                <Button variant="info" onClick={handleShowFilter}>
                    <i className="bi bi-funnel"></i> Lọc kết quả
                </Button>
            </div>

            <div className="d-flex flex-column justify-content-center align-items-center p-2" style={{ height: '50vh', width: '175vh', marginTop: '14vh' }}>
                {loading ? (
                    <div className="d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
                        <Spinner animation="border" variant="info" />
                    </div>
                ) : (
                    <>
                        <Table bordered hover className="mb-0" style={{ borderRadius: '20px', overflow: 'hidden', fontSize: '1.3rem' }}>
                            <thead>
                                <tr>
                                    <th className="bg-info text-center">ID</th>
                                    <th className="bg-info text-center">Tên File</th>
                                    <th className="bg-info text-center">Thời gian in</th>
                                    <th className="bg-info text-center">Máy in</th>
                                    <th className="bg-info text-center">Trạng thái</th>
                                    <th className="bg-info text-center">Size</th>
                                    <th className="bg-info text-center">Số trang</th>
                                    <th className="bg-info text-center">Cập nhật</th>
                                </tr>
                            </thead>
                            <tbody>{DisplayData}</tbody>
                        </Table>

                        <Pagination className="justify-content-end mt-3">
                            <Pagination.Prev
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                            />
                            {paginationItems}
                            <Pagination.Next
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                            />
                        </Pagination>
                    </>
                )}
            </div>

            <Modal show={showFilter} onHide={handleCloseFilter} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Lọc kết quả</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FilterForm />
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default MyTable;
