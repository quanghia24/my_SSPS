import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner'; // Import spinner từ Bootstrap
import FilterForm from './FilterForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function MyTable() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [document, setDocument] = useState([]);
    const [loading, setLoading] = useState(true); // Thêm trạng thái loading
    const [showFilter, setShowFilter] = useState(false);

    const handleShowFilter = () => setShowFilter(true);
    const handleCloseFilter = () => setShowFilter(false);

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
            <td className="my-sm-3 text-center">{info.title}</td>
            <td className="my-sm-5 text-center">{info.content}</td>
            <td className="my-sm-5 text-center">{info.rating}</td>
            <td className="my-sm-5 text-center">{info.date_created}</td>
        </tr>
    ));

    useEffect(() => {
        const fetchPrintingHistory = async () => {
            try {
                setLoading(true); // Bắt đầu hiển thị loading
                const tokens = {
                    refresh: localStorage.getItem("refresh"),
                    access: localStorage.getItem("access"),
                };
                const response = await axios.get('http://localhost:8000/api/reports/', {
                    headers: {
                        Authorization: `Bearer ${tokens.access}`,
                    },
                });
                setDocument(response.data);
            } catch (err) {
                console.error("Error fetching data:", err);
            } finally {
                setLoading(false); // Kết thúc loading
            }
        };

        fetchPrintingHistory();
    }, []);

    return (
      <div>
        <div style={{ margin: '-3.5vh', marginLeft: '-9vh' }}>
          <div className="text-4xl font-semibold shadow-xl rounded-br-lg p-3 border border-black w-fit">
            Phản hồi từ người dùng
          </div>
        </div>
        <div
          className="d-flex align-items-center justify-content-end"
          style={{ width: '175vh' }}
        >
          <Button variant="info" onClick={handleShowFilter}>
            <i className="bi bi-funnel"></i> Lọc kết quả
          </Button>
        </div>
        <div
          className="d-flex flex-column justify-content-center align-items-center p-2"
          style={{ height: '50vh', width: '175vh', marginTop: '14vh' }}
        >
          {loading ? (
            <Spinner animation="border" role="status" className="mt-5">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            <>
              <Table
                bordered
                hover
                className="mb-0"
                style={{
                  borderRadius: '20px',
                  overflow: 'hidden',
                  fontSize: '1.3rem',
                }}
              >
                <thead>
                  <tr>
                    <th className="my-sm-3 bg-info text-center">ID</th>
                    <th className="my-sm-3 bg-info text-center">Chủ đề</th>
                    <th className="my-sm-5 bg-info text-center">Nội dung</th>
                    <th className="my-sm-5 bg-info text-center">Rating</th>
                    <th className="my-sm-5 bg-info text-center">Ngày gửi</th>
                  </tr>
                </thead>
                <tbody>{DisplayData}</tbody>
              </Table>
              <Pagination className="justify-content-end mt-3">
                <Pagination.Prev
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                />
                {paginationItems}
                <Pagination.Next
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
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
    )
}

export default MyTable;
