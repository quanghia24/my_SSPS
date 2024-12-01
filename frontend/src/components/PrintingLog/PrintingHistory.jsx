import  { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import Contentjson from './contentjson.json';
import 'bootstrap/dist/css/bootstrap.min.css';
import Search from './search';
import Navbar from '../NavFooter/NavBar';
import Footer from '../NavFooter/Footer';
import './PrintingHistory.css';
import axios from 'axios';
function PrintingHistory() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [document,setDocument]=useState([]);
    // Calculate the indices of the first and last items on the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // Get the items for the current page
    const currentItems = document.slice(indexOfFirstItem, indexOfLastItem);

    // Calculate the total number of pages
    const totalPages = Math.ceil(document.length / itemsPerPage);

    // Create the pagination items
    const paginationItems = [];
    for (let number = 1; number <= totalPages; number++) {
        paginationItems.push(
            <Pagination.Item key={number} active={number === currentPage} onClick={() => setCurrentPage(number)}>
                {number}
            </Pagination.Item>
        );
    }

    useEffect(()=>{
        const fetchPrintingHistory = async () =>{
            console.log(localStorage.getItem('access'));
            try{
                const tokens = {
                    refresh: localStorage.getItem('refresh'),
                    access: localStorage.getItem('access'),
                };
            const response = await axios.get('http://localhost:8000/api/prints/orders/',{
                headers:{
                    Authorization: `Bearer ${tokens.access}`,
            },
            body: {
                "user_id": localStorage.getItem('user_id')
            }
            });

            
            
            //need user.id
            setDocument(response.data);
            console.log("hello",response.data);
            }catch(err){
                console.log(err);
                alert('Failed to fetch data');
            };
            
        }
        fetchPrintingHistory(); 
    },[]);

    const DisplayData = currentItems.map((info) => {
        return (
            
            <tr key={info.id}>
                <td className="my-sm-5 text-center">{info.id}</td>
                
                <td className="my-sm-5 text-center">{info.order_name}</td>
                <td className="my-sm-5 text-center">{info.timer_start.slice(0, 10)}</td>
                <td className="my-sm-5 text-center">{info.page_side}</td>
                <td className="my-sm-5 text-center">{info.printer}</td>
                <td className="my-sm-5 text-center">{info.page_cost}</td>
            </tr>
        );
    });

    return (
        <div className='printing-history-container'>
        

        <div className='d-flex flex-column justify-content-center align-items-center p-5' style={{ height: 'auto', width: 'auto'}}>
       <div> <h1 className='text-black'>Printing Log</h1></div>
       <Search/>
            <div className='w-100 p-4 rounded ' style={{ borderRadius: '20px', overflow: 'hidden' }}>
                <Table bordered hover className='mb-0 ' style={{ borderRadius: '20px', overflow: 'hidden', fontSize: '1.3rem'  }}>
                    <thead>
                        <tr>
                            <th className="my-sm-5 text-center table-title">STT</th>
                            
                            <th className="my-sm-5 text-center table-title">Mã đơn hàng</th>
                            <th className="my-sm-5 text-center table-title">Thời gian in</th>
                            <th className="my-sm-5 text-center table-title">Size</th>
                            <th className="my-sm-5 text-center table-title">Máy in</th>
                            <th className="my-sm-5 text-center table-title">Số trang</th>
                        </tr>
                    </thead>
                    <tbody>
                        {DisplayData}
                    </tbody>
                </Table>
                <Pagination className="justify-content-end mt-3">
                    <Pagination.Prev 
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
                        disabled={currentPage === 1}
                    />
                    {paginationItems}
                    <Pagination.Next 
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
                        disabled={currentPage === totalPages}
                    />
                </Pagination>
            </div>
        </div>
       
        </div>
    );
}

export default PrintingHistory;