import  { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import Contentjson from './contentjson.json';
import 'bootstrap/dist/css/bootstrap.min.css';

function MyTable() 
{
    const currentItems = Contentjson.slice(0, 8);
    const DisplayData = currentItems.map((info) => {
        return (
            <tr key={info.id}>
                <td className="my-sm-3 text-center">{info.id}</td>
                <td className="my-sm-5 text-center">{info.studentName}</td>
                <td className="my-sm-3 text-center">{info.printingID}</td>
                <td className="my-sm-5 text-center">{info.printingTime}</td>
                <td className="my-sm-5 text-center">{info.fileName}</td>
            </tr>
        );
    });

    return (
        <div className='d-flex flex-column justify-content-center m-2 pl-2'>
            <div><h1 className='text-primary p-4'>Gần đây</h1></div>
            <div className='w-100 bg-white p-4 rounded' style={{ borderRadius: '20px', overflow: 'hidden' }}>
                <Table bordered hover className='mb-0' style={{ borderRadius: '20px', overflow: 'hidden', fontSize: '1.3rem'  }}>
                    <thead>
                        <tr>
                            <th className="my-sm-3 bg-info text-center">STT</th>
                            <th className="my-sm-3 bg-info text-center">Tên sinh viên</th>
                            <th className="my-sm-3 bg-info text-center">Mã máy in</th>
                            <th className="my-sm-5 bg-info text-center">Thời gian in</th>
                            <th className="my-sm-5 bg-info text-center">Tên file</th>
                        </tr>
                    </thead>
                    <tbody>
                        {DisplayData}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default MyTable;