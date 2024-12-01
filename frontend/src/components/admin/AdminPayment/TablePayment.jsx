import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Contentjson from '../../PrintingLog/contentjson.json';
import FilterPayment from './FilterPayment';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';  // Importing Spinner for loading state

function MyTable() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [document, setDocument] = useState([]);
    const [loading, setLoading] = useState(true); // State for loading

    // State để quản lý modal
    const [showFilter, setShowFilter] = useState(false);

    // Các hàm điều khiển modal
    const handleShowFilter = () => setShowFilter(true);
    const handleCloseFilter = () => setShowFilter(false);

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = document.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(document.length / itemsPerPage);

    const paginationItems = [];
    for (let number = 1; number <= totalPages; number++) {
        paginationItems.push(
            <Pagination.Item
                key={number}
                active={number === currentPage}
                onClick={() => setCurrentPage(number)}
            >
                {number}
            </Pagination.Item>
        );
    }

    const DisplayData = currentItems.map((info) => (
        <tr key={info.id}>
            <td className="my-sm-3 text-center">{info.id}</td>
            <td className="my-sm-5 text-center">{info.purchase_time}</td>
            <td className="my-sm-5 text-center">{info.price}</td>
            <td className="my-sm-5 text-center">{info.amount}</td>
            <td className="my-sm-5 text-center">{info.total_amount}</td>
        </tr>
    ));

    useEffect(() => {
        const fetchPrintingHistory = async () => {
            const tokens = {
                refresh: localStorage.getItem("refresh"),
                access: localStorage.getItem("access"),
            };

            // Kiểm tra token trước khi thực hiện yêu cầu
            if (!tokens.access) {
                console.error("Access token is missing");
                return;
            }

            try {
                setLoading(true);  // Start loading
                const response = await axios.get('http://localhost:8000/api/buys/orders/', {
                    headers: {
                        Authorization: `Bearer ${tokens.access}`,
                    },
                });
                setDocument(response.data); // Cập nhật trạng thái với dữ liệu trả về
                setLoading(false);  // End loading
            } catch (err) {
                console.error("Error fetching printing history:", err);
                setLoading(false);  // End loading on error
            }
        };

        fetchPrintingHistory(); // Gọi hàm khi component được mount
    }, []);

    return (
        <div>
            <div style={{ margin: '-3.5vh', marginLeft: '-9vh' }}>
                <div className='text-4xl font-semibold shadow-xl rounded-br-lg p-3 border border-black w-fit'>
                    Lịch sử thanh toán
                </div>
            </div>

            {/* Nút mở modal */}
            <div className="d-flex align-items-center justify-content-end" style={{ width: '175vh' }}>
                <Button variant="info" onClick={handleShowFilter}>
                    <i className="bi bi-funnel"></i> Lọc kết quả
                </Button>
            </div>

            <div className="d-flex flex-column justify-content-center align-items-center p-2" style={{ height: '50vh', width: '175vh', marginTop: '14vh' }}>
                {/* Loading indicator */}
                {loading ? (
                    <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
                        <Spinner animation="border" role="status" variant="primary">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                ) : (
                    <Table bordered hover className="mb-0" style={{ borderRadius: '20px', overflow: 'hidden', fontSize: '1.3rem' }}>
                        <thead>
                            <tr>
                                <th className="my-sm-3 bg-info text-center">ID</th>
                                <th className="my-sm-5 bg-info text-center">Thời gian</th>
                                <th className="my-sm-5 bg-info text-center">Giá</th>
                                <th className="my-sm-5 bg-info text-center">Số lượng</th>
                                <th className="my-sm-5 bg-info text-center">Số tiền</th>
                            </tr>
                        </thead>
                        <tbody>{DisplayData}</tbody>
                    </Table>
                )}

                {!loading && (
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
                )}
            </div>

            <Modal show={showFilter} onHide={handleCloseFilter} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Lọc kết quả</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FilterPayment />
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default MyTable;
