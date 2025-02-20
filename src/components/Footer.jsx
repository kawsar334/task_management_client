const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto px-4 text-center">
        <h3 className="text-xl font-semibold">Task Manager</h3>
        <p className="text-gray-400 text-sm mt-2">
          Organize your tasks efficiently and stay productive.
        </p>

        {/* Links Section */}
        <div className="flex justify-center gap-6 mt-4">
          <a href="#" className="text-gray-400 hover:text-white transition">Home</a>
          <a href="#" className="text-gray-400 hover:text-white transition">Tasks</a>
          <a href="#" className="text-gray-400 hover:text-white transition">Features</a>
          <a href="#" className="text-gray-400 hover:text-white transition">Contact</a>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center gap-4 mt-4">
          <a href="#" className="hover:text-blue-400 transition">
            <i className="fa-brands fa-facebook text-xl"></i>
          </a>
          <a href="#" className="hover:text-blue-500 transition">
            <i className="fa-brands fa-twitter text-xl"></i>
          </a>
          <a href="#" className="hover:text-pink-500 transition">
            <i className="fa-brands fa-instagram text-xl"></i>
          </a>
          <a href="#" className="hover:text-blue-600 transition">
            <i className="fa-brands fa-linkedin text-xl"></i>
          </a>
        </div>

        {/* Copyright */}
        <p className="text-gray-500 text-sm mt-4">
          © {new Date().getFullYear()} Task Manager. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
