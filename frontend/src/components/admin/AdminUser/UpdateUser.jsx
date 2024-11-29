import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Upload from '../../../assets/upload.svg';
const UpdateUser= () => {
  const [formData, setFormData] = useState({
    id: '0357',
    courseCode: '',
    semester: '',
    documentName: '',
    file: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prevState => ({
      ...prevState,
      file: e.target.files[0]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý logic upload tại đây
    console.log('Form data:', formData);
  };

  const handleCancel = () => {
    setFormData({
      id: '0357',
      courseCode: '',
      semester: '',
      documentName: '',
      file: null
    });
  };

  return (
    <div className=" mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="text-center mb-4">Sửa người dùng</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">MSSV</label>
                  <input
                    type="text"
                    className="form-control"
                    name="id"
                    value={formData.id}
                    onChange={handleInputChange}
                    readOnly
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Họ tên</label>
                  <input
                    type="text"
                    className="form-control"
                    name="courseCode"
                    value={formData.courseCode}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    name="semester"
                    value={formData.semester}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">SĐT</label>
                  <input
                    type="text"
                    className="form-control"
                    name="documentName"
                    value={formData.documentName}
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

export default UpdateUser;