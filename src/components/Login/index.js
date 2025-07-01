import React from 'react'
import SwiperCore, {Autoplay} from 'swiper'
import {Swiper, SwiperSlide} from 'swiper/react' //  Use Swiper react components
import 'swiper/swiper-bundle.min.css'

SwiperCore.use([Autoplay]) //  Register the module

const Login = () => (
  <div className="relative h-screen w-full">
    {/* Swiper Carousel */}
    <Swiper
      modules={[Autoplay]}
      autoplay={{delay: 3000}}
      loop
      className="h-full w-full"
    >
      <SwiperSlide>
        <img
          src="https://source.unsplash.com/1600x900/?nature"
          alt="Slide 1"
          className="h-full w-full object-cover"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://source.unsplash.com/1600x900/?city"
          alt="Slide 2"
          className="h-full w-full object-cover"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://source.unsplash.com/1600x900/?mountains"
          alt="Slide 3"
          className="h-full w-full object-cover"
        />
      </SwiperSlide>
    </Swiper>

    {/* Overlay Login Form */}
    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
      <form className="bg-white p-6 rounded-xl shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  </div>
)

export default Login
