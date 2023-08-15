import React from "react";

function Footer() {
  return (
    <footer className="absolute inset-x-0 bottom-0 h-32 bg-white bg-opacity-40 w-full flex p-12 m-auto">
      <div>
      <h1 className="text-xl font-semibold my-auto"><span className="text-blue-500">V</span><span className="text-red-500">s</span> Sports</h1>
      <h1 className="text-lg font-normal my-auto">For Football Tournaments</h1>
      </div>
      <div className="justify-end m-auto">
      <div className="justify-end "><h2 className="text-right text-green-700">Manage Your Tournaments With Us</h2></div>
      </div>
    </footer>
  );
}

export default Footer;
