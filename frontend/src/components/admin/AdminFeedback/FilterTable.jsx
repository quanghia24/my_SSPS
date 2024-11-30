import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Contentjson from '../../PrintingLog/contentjson.json';
import FilterForm from './FilterForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';


function MyTable() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [document,setDocument]=useState([]);

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
    // const handleClickCheck = () => {   
    //     console.log("Check"); 
    // }
    const DisplayData = currentItems.map((info) => (
        <tr key={info.id}>
            <td className="my-sm-3 text-center">{info.id}</td>
            {/* <td className="my-sm-5 text-center">{info.user}</td> */}
            <td className="my-sm-3 text-center">{info.title}</td>
            <td className="my-sm-5 text-center">{info.content}</td>
            {/* <td className="my-sm-5 text-center">{info.printer}</td> */}
             <td className="my-sm-5 text-center">{info.rating}</td>
            <td className="my-sm-5 text-center">{info.date_created}</td>
            {/* <td className="my-sm-5 text-center">{info.page_cost}</td> */}
            {/* <Button variant="primary " className="me-2 " style={{marginLeft:'10vh'}} onClick={handleClickCheck}>
            <i className="bi bi-check"></i>
            </Button> */}

        </tr> 
    ));
    useEffect(()=>{
        const fetchPrintingHistory = async () =>{
            try{
                const tokens = {
                    refresh: localStorage.getItem("refresh"),
                    access: localStorage.getItem("access"),
                  };
            const response = await axios.get('http://localhost:8000/api/reports/',{
                headers:{
                    Authorization: `Bearer ${tokens.access}`,
                },
            });
            // console.log(response.data);
            // console.log("1111");
            setDocument(response.data);
            }catch(err){
                console.log(err);
                // alert('Failed to fetch data');
            };
        }
            fetchPrintingHistory(); 
        
    },[]);

    return (
        <div >
             <div  style={{margin: '-3.5vh', marginLeft: '-9vh'}}>
        <div className='text-4xl font-semibold shadow-xl rounded-br-lg p-3 border border-black w-fit'>
          Lịch sử in
        </div>
      </div>
          
            {/* Nút mở modal */}
            <div className="d-flex align-items-center justify-content-end" style={{ width: '175vh'}}>
          <Button variant="info" onClick={handleShowFilter}>
            <i className="bi bi-funnel"></i> Lọc kết quả
          </Button>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center p-2" style={{ height: '50vh', width: '175vh', marginTop:'14vh'}}>
                <Table bordered hover className="mb-0" style={{ borderRadius: '20px', overflow: 'hidden', fontSize: '1.3rem' }}>
                    <thead>
                        <tr>
                            <th className="my-sm-3 bg-info text-center">ID</th>
                            {/* <th className="my-sm-5 bg-info text-center">Sinh viên</th> */}
                            <th className="my-sm-3 bg-info text-center">Chủ đề</th>
                            <th className="my-sm-5 bg-info text-center">Nội dung</th>
                            <th className="my-sm-5 bg-info text-center">Rating</th>
                             <th className="my-sm-5 bg-info text-center">Ngày gửi</th>
                            {/* <th className="my-sm-5 bg-info text-center">Size</th>
                            <th className="my-sm-5 bg-info text-center">Số trang</th>
                            <th className="my-sm-5 bg-info text-center">Cập nhật</th> */}
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
