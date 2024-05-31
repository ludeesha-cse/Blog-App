import { Button } from "flowbite-react";
import React from "react";

export default function CallToAction() {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
      <div className="flex-1 justify-center flex flex-col">
        <h2 className="text-2xl">Want to learn more about Programming</h2>
        <p className='text-gray-500 my-2'>Checkout these resourses with 100 programming projects</p>
        <Button
          className="bg-gradient-to-r 
         from-yellow-300 via-orange-500 to-pink-600 rounded-tl-xl rounded-bl-none"
        >
          <a href="#" target="_blank" rel="noopener noreferrer">
            Learn More
          </a>
        </Button>
      </div>
      <div className="p-7">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY83XJTee0rl64UlXpeOYLKTexOHIQZZd1Lg&s"
          alt=""
        />
      </div>
    </div>
  );
}
