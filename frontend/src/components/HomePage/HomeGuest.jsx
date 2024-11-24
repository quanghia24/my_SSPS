import { Link } from "react-router-dom";
import logo from "../../assets/image.png";
import image_1 from "../../assets/image_1.png";
import image_2 from "../../assets/image_2.png";
import work from "../../assets/work.png";
import group from "../../assets/Group.png";
import av1 from "../../assets/Avater_01.png";
import Footer from '../NavFooter/Footer';

function HomeGuest() {
  return (
    <>
    <div className="">
      <div className="bg-customBlue fixed w-full z-10 px-14 py-4 flex justify-between">
        <div className="flex gap-4 items-center">
          <img src={logo} alt="" className="w-[80px] h-[80px]" />
          <div className="text-blue-500 text-3xl">SSPS</div>
        </div>
        <div className="text-3xl text-blue-500 gap-40 px-36 flex items-center bg-[#EBF4FF]">
          <div className="">Trang chủ</div>
          <div className="">Giới thiệu</div>
          <div className="">Liên hệ</div>
        </div>
        <div className="items-center flex gap-3">
          <Link
            to="/login"
            className="py-[10px] px-[26px] bg-blue-500 no-underline text-white text-xl rounded-lg"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="py-[10px] px-[26px] bg-blue-500 no-underline text-white text-xl rounded-lg"
          >
            Sign up
          </Link>
        </div>
      </div>
      <div className="w-full h-32 bg-blue-100"></div>
      <div className="flex gap-10 justify-between items-center p-5">
        <div className="">
          <div className="text-5xl text-blue-500 font-bold">
            Student Smart Printing Service
          </div>
          <div className="text-xl text-blue-400 mt-3">
            Cùng trải nghiệm dịch vụ in ấn tuyệt vời, nhanh chóng, tiện dụng tại
            Trường Đại học Bách Khoa TPHCM.
          </div>
          <div className="mt-[60px]">
            <Link
              to="/register"
              className="py-[10px] px-[26px] mt-5 bg-blue-400 no-underline text-white text-xl rounded-lg"
            >
              ĐĂNG KÍ NGAY
            </Link>
          </div>
        </div>
        <img src={image_1} alt="" className="w-[750px] h-[545px]" />
      </div>
      <div className="flex gap-10 justify-between items-center bg-blue-100 py-20 px-10">
        <div className="">
          <div className="text-5xl font-bold">Hỗ trợ sinh viên mọi nơi.</div>
          <div className="text-xl mt-[60px]">
            Có mặt tại hầu hết các địa diểm trong khuôn viên trường.
          </div>
        </div>
        <img src={image_2} alt="" className="w-[845px] h-[532px]" />
      </div>
      <div className="flex gap-52 items-center bg-blue-100 pt-20 pb-72 px-10">
        <img src={work} alt="" className="w-[583px] h-[542px]" />
        <div className="">
          <div className="text-5xl font-bold">Dễ dàng sử dụng</div>
          <div className="text-xl mt-[60px]">
            Tải tài liệu nhanh chóng, in tài liệu tiện lợi.
          </div>
        </div>
      </div>
      <div className="flex relative items-center justify-center bg-customBlue py-32 px-10">
        <img
          src={group}
          alt=""
          className="w-[680px] h-[691px] absolute -bottom-[66px] -left-28"
        />
        <div className="text-white flex flex-col items-center">
          <div className="text-5xl font-bold">PRINTING SERVICE</div>
          <div className="text-xl mt-[40px]">
            Hiện có mặt trên nhiều nền tảng.
          </div>
          <div className="mt-[60px]">
            <Link
              to="/register"
              className="py-[10px] px-[26px] mt-5 bg-blue-400 no-underline text-white text-xl rounded-lg"
            >
              TẢI NGAY
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-blue-100 pt-72 pb-20 px-10">
        <div className="flex flex-col items-center">
          <div className="text-5xl font-bold">Nhận xét từ sinh viên</div>
        </div>
        <div className="grid grid-cols-3 gap-10 mt-20 px-40">
          <div className="bg-white flex flex-col px-12 py-14 rounded-lg">
            <img src={av1} alt="" className="w-[70px] h-[70px] rounded-full" />
            <div className="text-justify mt-8">
              “If you haven’t tried whitepace yet, you need to give it a shot
              for your next event. It’s so easy and intuitive to get a new event
              setup and if you need any help their customer service is seriously
              amazing.”
            </div>
            <div className="flex justify-between items-center mt-8">
              <div className="font-bold">Jessie Owner</div>
              <div className="flex gap-1">
                <svg
                  width={15}
                  height={14}
                  viewBox="0 0 15 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.5 0L9.18386 5.18237H14.6329L10.2245 8.38525L11.9084 13.5676L7.5 10.3647L3.09161 13.5676L4.77547 8.38525L0.367076 5.18237H5.81614L7.5 0Z"
                    fill="#FFE492"
                  />
                </svg>
                <svg
                  width={15}
                  height={14}
                  viewBox="0 0 15 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.5 0L9.18386 5.18237H14.6329L10.2245 8.38525L11.9084 13.5676L7.5 10.3647L3.09161 13.5676L4.77547 8.38525L0.367076 5.18237H5.81614L7.5 0Z"
                    fill="#FFE492"
                  />
                </svg>
                <svg
                  width={15}
                  height={14}
                  viewBox="0 0 15 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.5 0L9.18386 5.18237H14.6329L10.2245 8.38525L11.9084 13.5676L7.5 10.3647L3.09161 13.5676L4.77547 8.38525L0.367076 5.18237H5.81614L7.5 0Z"
                    fill="#FFE492"
                  />
                </svg>
                <svg
                  width={15}
                  height={14}
                  viewBox="0 0 15 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.5 0L9.18386 5.18237H14.6329L10.2245 8.38525L11.9084 13.5676L7.5 10.3647L3.09161 13.5676L4.77547 8.38525L0.367076 5.18237H5.81614L7.5 0Z"
                    fill="#FFE492"
                  />
                </svg>
                <svg
                  width={15}
                  height={14}
                  viewBox="0 0 15 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.5 0L9.18386 5.18237H14.6329L10.2245 8.38525L11.9084 13.5676L7.5 10.3647L3.09161 13.5676L4.77547 8.38525L0.367076 5.18237H5.81614L7.5 0Z"
                    fill="#FFE492"
                  />
                </svg>
              </div>
            </div>
            <div className="">Founder, XYZ Company</div>
          </div>
          <div className="bg-blue-500 text-white flex flex-col px-12 py-14 rounded-lg">
            <img src={av1} alt="" className="w-[70px] h-[70px] rounded-full" />
            <div className="text-justify mt-8">
              “If you haven’t tried whitepace yet, you need to give it a shot
              for your next event. It’s so easy and intuitive to get a new event
              setup and if you need any help their customer service is seriously
              amazing.”
            </div>
            <div className="flex justify-between items-center mt-8">
              <div className="font-bold">Jessie Owner</div>
              <div className="flex gap-1">
                <svg
                  width={15}
                  height={14}
                  viewBox="0 0 15 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.5 0L9.18386 5.18237H14.6329L10.2245 8.38525L11.9084 13.5676L7.5 10.3647L3.09161 13.5676L4.77547 8.38525L0.367076 5.18237H5.81614L7.5 0Z"
                    fill="#FFE492"
                  />
                </svg>
                <svg
                  width={15}
                  height={14}
                  viewBox="0 0 15 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.5 0L9.18386 5.18237H14.6329L10.2245 8.38525L11.9084 13.5676L7.5 10.3647L3.09161 13.5676L4.77547 8.38525L0.367076 5.18237H5.81614L7.5 0Z"
                    fill="#FFE492"
                  />
                </svg>
                <svg
                  width={15}
                  height={14}
                  viewBox="0 0 15 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.5 0L9.18386 5.18237H14.6329L10.2245 8.38525L11.9084 13.5676L7.5 10.3647L3.09161 13.5676L4.77547 8.38525L0.367076 5.18237H5.81614L7.5 0Z"
                    fill="#FFE492"
                  />
                </svg>
                <svg
                  width={15}
                  height={14}
                  viewBox="0 0 15 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.5 0L9.18386 5.18237H14.6329L10.2245 8.38525L11.9084 13.5676L7.5 10.3647L3.09161 13.5676L4.77547 8.38525L0.367076 5.18237H5.81614L7.5 0Z"
                    fill="#FFE492"
                  />
                </svg>
                <svg
                  width={15}
                  height={14}
                  viewBox="0 0 15 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.5 0L9.18386 5.18237H14.6329L10.2245 8.38525L11.9084 13.5676L7.5 10.3647L3.09161 13.5676L4.77547 8.38525L0.367076 5.18237H5.81614L7.5 0Z"
                    fill="#FFE492"
                  />
                </svg>
              </div>
            </div>
            <div className="">Founder, XYZ Company</div>
          </div>
          <div className="bg-blue-500 text-white flex flex-col px-12 py-14 rounded-lg">
            <img src={av1} alt="" className="w-[70px] h-[70px] rounded-full" />
            <div className="text-justify mt-8">
              “If you haven’t tried whitepace yet, you need to give it a shot
              for your next event. It’s so easy and intuitive to get a new event
              setup and if you need any help their customer service is seriously
              amazing.”
            </div>
            <div className="flex justify-between items-center mt-8">
              <div className="font-bold">Jessie Owner</div>
              <div className="flex gap-1">
                <svg
                  width={15}
                  height={14}
                  viewBox="0 0 15 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.5 0L9.18386 5.18237H14.6329L10.2245 8.38525L11.9084 13.5676L7.5 10.3647L3.09161 13.5676L4.77547 8.38525L0.367076 5.18237H5.81614L7.5 0Z"
                    fill="#FFE492"
                  />
                </svg>
                <svg
                  width={15}
                  height={14}
                  viewBox="0 0 15 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.5 0L9.18386 5.18237H14.6329L10.2245 8.38525L11.9084 13.5676L7.5 10.3647L3.09161 13.5676L4.77547 8.38525L0.367076 5.18237H5.81614L7.5 0Z"
                    fill="#FFE492"
                  />
                </svg>
                <svg
                  width={15}
                  height={14}
                  viewBox="0 0 15 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.5 0L9.18386 5.18237H14.6329L10.2245 8.38525L11.9084 13.5676L7.5 10.3647L3.09161 13.5676L4.77547 8.38525L0.367076 5.18237H5.81614L7.5 0Z"
                    fill="#FFE492"
                  />
                </svg>
                <svg
                  width={15}
                  height={14}
                  viewBox="0 0 15 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.5 0L9.18386 5.18237H14.6329L10.2245 8.38525L11.9084 13.5676L7.5 10.3647L3.09161 13.5676L4.77547 8.38525L0.367076 5.18237H5.81614L7.5 0Z"
                    fill="#FFE492"
                  />
                </svg>
                <svg
                  width={15}
                  height={14}
                  viewBox="0 0 15 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.5 0L9.18386 5.18237H14.6329L10.2245 8.38525L11.9084 13.5676L7.5 10.3647L3.09161 13.5676L4.77547 8.38525L0.367076 5.18237H5.81614L7.5 0Z"
                    fill="#FFE492"
                  />
                </svg>
              </div>
            </div>
            <div className="">Founder, XYZ Company</div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default HomeGuest;
