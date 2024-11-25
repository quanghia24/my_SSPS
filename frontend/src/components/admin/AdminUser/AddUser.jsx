import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddUser = () => {
  const [formData, setFormData] = useState({
    user_id: '',
    user_name: '',
    name: '',
    password: '',
    image: null,
    day_of_birth: '',
    phone_number: '',
    balance: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      image: e.target.files[0],
    }));
  };

  const handleSendAddUser = async (e) => {
    e.preventDefault();

    const payload = new FormData();
    Object.keys(formData).forEach((key) => {
      payload.append(key, formData[key]);
    });

    const url = 'http://localhost:8000/api/users/';
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: payload,
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCancel = () => {
    setFormData({
      user_id: '',
      user_name: '',
      name: '',
      password: '',
      image: null,
      day_of_birth: '',
      phone_number: '',
      balance: '',
    });
  };

  return (
    <div className="mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="text-center mb-4">Thêm người dùng</h3>
              <form onSubmit={handleSendAddUser}>
                <div className="mb-3">
                  <label className="form-label">MSSV</label>
                  <input
                    type="text"
                    className="form-control"
                    name="user_id"
                    value={formData.user_id}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Tên người dùng</label>
                  <input
                    type="text"
                    className="form-control"
                    name="user_name"
                    value={formData.user_name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Họ và tên</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Mật khẩu</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Ảnh</label>
                  <input
                    type="file"
                    className="form-control"
                    name="image"
                    onChange={handleFileChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Ngày sinh</label>
                  <input
                    type="date"
                    className="form-control"
                    name="day_of_birth"
                    value={formData.day_of_birth}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">SĐT</label>
                  <input
                    type="text"
                    className="form-control"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Số trang in</label>
                  <input
                    type="number"
                    className="form-control"
                    name="balance"
                    value={formData.balance}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="d-flex justify-content-center gap-3">
                  <button type="submit" className="btn btn-primary px-4">
                    Thêm người dùng
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger px-4"
                    onClick={handleCancel}
                  >
                    Hủy bỏ
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
