import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';  
import LogoBK from'../../assets/logoBK.png'
import './Footer.css';
const Footer = () => {
  return (
    <footer className="text-white"  >
      <div className="footer-container">
        <div className="row pt-3">
          {/* Logo and Description Section */}
          <div className="col-md-3 mb-3 ">
            <div className="d-flex align-items-center mb-3">
              <img src={LogoBK} alt="SSPS Logo" className="me-2"  />
              <span className="h5 mb-0 ssps">SSPS</span>
            </div>
            <p className="small text-white">
              SSPS được tạo ra nhầm hỗ trợ toàn bộ sinh viên DHBK
            </p>
          </div>

          {/* Navigation Links */}
          <div className="col-md-3 mb-3">
            <h4 className="mb-3">Trang chủ</h4>
            <ul className="list-unstyled">
              <li className="mb-2 "><a href="/gioi-thieu" className="text-white text-decoration-none list-homepage">Giới thiệu</a></li>
              <li className="mb-2 list-homepage"><a href="/tin-tuc" className="text-white text-decoration-none">Tin tức</a></li>
              <li className="mb-2 list-homepage"><a href="/dang-nhap" className="text-white text-decoration-none">Đăng nhập</a></li>
            </ul>
          </div>

          {/* Account Section */}
          <div className="col-md-3 mb-3">
            <h4 className="mb-3">Đăng kí tài khoản</h4>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="/huong-dan" className="text-white text-decoration-none">Hướng dẫn</a></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="col-md-3 mb-3">
            <h4 className="mb-3">Liên hệ</h4>
            <ul className="list-unstyled">
              <li className="mb-2 text-white">Giải đáp thắc mắc</li>
              <li className="mb-2 text-white">0900-123-456</li>
              <li className="mb-2 text-white">ssps@hcmut.edu.vn</li>
         
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-top pt-4 mt-4 pb-3">
          <div className="row align-items-center">
            <div className="col-md-4 mb-3 mb-md-0">
              <div className="d-flex align-items-center">
                <select className="form-select form-select-sm text-black border-0" style={{ width: 'auto' }}>
                  <option value="vi">Vietnamese</option>
                  <option value="en">English</option>
                </select>
                <a href="/terms" className="text-white text-decoration-none ms-3">Terms & privacy</a>
                <a href="/security" className="text-white text-decoration-none ms-3">Security</a>
                <a href="/status" className="text-white text-decoration-none ms-3">Status</a>
              </div>
            </div>
            
            <div className="col-md-4 text-center mb-3 mb-md-0">
              <span className="text-white">©2024 SSPS</span>
            </div>
            
            <div className="col-md-4 ">
              <div className="d-flex justify-content-md-end logo-media">
                <a href="#" className="text-white me-3">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="#" className="text-white me-3">
                  <i className="bi bi-twitter"></i>
                </a>
                <a href="#" className="text-white">
                  <i className="bi bi-linkedin"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;