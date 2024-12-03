import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './style.css'
import { Col, Row } from 'react-bootstrap';
const Profile = () => {
  const [userData, setUserData] = useState({})
  const [paperLog, setPaperLog] = useState([])
  const [orderLog, setOderLog] = useState([])
  const [receiveData, setReceiveData] = useState(false)
  const [receiveLog, setReceiveLog] = useState(false)
  const [receiveOrder, setReceiveOrder] = useState(false)
  const navigate = useNavigate();
  useEffect(() =>{
    const url = 'http://127.0.0.1:8000/api/users/profile/';
    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access')}`,
      },
    })
    .then(res => res.json())
    .then(data => {
      if(data.code === 'token_not_valid') {
        navigate('/')
      };
      setUserData(data)
      setReceiveData(true);
      }
    )
    .catch(err => console.log(err));
  }, [receiveData])

  useEffect(() =>{
    const url2 = 'http://127.0.0.1:8000/api/buys/orders/';
    fetch(url2, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access')}`,
      },
    })
    .then(res => res.json())
    .then(data => {setPaperLog(data); setReceiveLog(true);})
    .catch(err => console.log(err))
  }, [receiveLog])

  useEffect(() =>{
    const url3 = 'http://127.0.0.1:8000/api/prints/orders/';
    fetch(url3, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access')}`,
      },
    })
    .then(res => res.json())
    .then(data => {setOderLog(data); setReceiveOrder(true);})
    .catch(err => console.log(err))
  }, [receiveOrder])
  return (
    <div>
      <div className="container-feedback" style={{height:"110vh"}}>
        <section style={{ backgroundColor: '#eee' }}>
          <div className="container py-5">
            {/* <div className="row">
              <div className="col">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb bg-light rounded-3 p-3 mb-4">
                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                    <li className="breadcrumb-item"><a href="/student/student_home">User</a></li>
                    <li className="breadcrumb-item active" aria-current="page">User Profile</li>
                  </ol>
                </nav>
              </div>
            </div> */}

            <div className="row">
              <div className="col-lg-4">
                <div className="card mb-4">
                  <div className="card-body text-center align-items-center">
                    <div className='flex justify-center'>
                      <img 
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" 
                        alt="avatar" 
                        className="rounded-circle img-fluid" 
                        style={{ width: '150px' }}
                      />
                    </div>
                    <h5 className="my-3">{userData.name}</h5>
                    <p className="text-muted mb-1">{userData.is_staff?"Signed in as an ADMIN": "Signed in as a CUSTOMER"}</p>
                    <p className="text-muted mb-4">{userData.email}</p>
                    <div className="d-flex justify-content-center mb-2">
                      <button type="button" className="btn btn-primary">Edit</button>
                      <button type="button" onClick={() => navigate('/student/printing_history')} className="btn btn-outline-primary ms-1">View printing log</button>
                    </div>
                  </div>
                </div>

                <div className="card mb-4">
                  <div className="card-body p-0">
                    <ul className="list-group list-group-flush">
                      {paperLog
                        .sort((a, b) => new Date(b.purchase_time) - new Date(a.purchase_time)) // Sort in descending order by purchase_time
                        .slice(0, 3) // Take the 4 most recent logs
                        .map((log) => (
                        <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                          {/* <i className="fas fa-globe fa-lg text-warning"></i> */}
                          <div>
                            <strong>Amount:</strong> {log.amount} <br />
                            <strong>Price per unit:</strong> {log.price} VND<br />
                            <strong>Total:</strong> ${log.total_amount} VND<br />
                            <strong>Purchase Time:</strong> {new Date(log.purchase_time).toLocaleString()}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-lg-8">
                <div className="card mb-4">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Full Name</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{userData.name}</p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Email</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{userData.email}</p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">ID</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{userData.user_id}</p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Faculty</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{userData.faculty}</p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Phone</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{userData.phone_number?userData.phone_number:"(+82) 123 456 789"}</p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Balance</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{userData.balance}</p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Money has spent</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{userData.money_spent}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <div className="card mb-10 flex">
                      <div className="card-body">
                        <ul className="list-group list-group-flush">
                      {orderLog
                        .sort((a, b) => new Date(b.timer_start) - new Date(a.timer_start)) // Sort in descending order by purchase_time
                        .slice(0, 3) // Take the 4 most recent logs
                        .map((log) => (
                        <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                          <div>
                            <strong><span className='text-red-500 text-2xl'>{-log.page_cost}</span></strong>  {log.status === 'pending'? <strong className='text-yellow-600'>[ON PENDING]</strong>: <strong className='text-green-600'>[DONE]</strong>}
                            <span>[{new Date(log.timer_start).toLocaleString()}]</span><br />
                            <strong>Order's name:</strong> {log.order_name} <br />
                          </div>
                        </li>
                      ))}
                    </ul>
                        
                      </div>
                    </div>
                  </div>

                  
                </div>
              </div>
            </div>
          </div>
        </section>
        </div>
    </div>
  )
}

export default Profile
