import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-teal-900">
      <div className="max-w-[1300px] mx-auto py-8 px-4 sm:px-6 lg:py-12 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-white sm:text-3xl sm:truncate">
              Mankind
            </h2>
            <p className="mt-2 text-white">Mankind
            is a NABH accredited 950-bed super-specialty hospital located in Kozhikode, India. It is located on Mini Bypass Road, Opp Kovilakam Residency Govindapuram, Kozhikode, Kerala, India
            </p>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <Link to="#" className="ml-6  hover:text-gray-500">
              <span className="sr-only">Facebook</span>
              <FaFacebookF className="h-6 w-6" />
            </Link>
            <Link to="#" className="ml-6  hover:text-gray-500">
              <span className="sr-only">Twitter</span>
              <FaTwitter className="h-6 w-6" />
            </Link>
            <Link to="#" className="ml-6 hover:text-gray-500">
              <span className="sr-only">Instagram</span>
              <FaInstagram className="h-6 w-6" />
            </Link>
            <Link to="#" className="ml-6  hover:text-gray-500">
              <span className="sr-only">YouTube</span>
              <FaYoutube className="h-6 w-6" />
            </Link>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex space-x-6 md:order-2">
            <Link to="#" className="text-base leading-6 text-white hover:text-gray-500">
              About Us
            </Link>
            <Link to="#" className="text-base leading-6 text-white hover:text-gray-500">
              Contact Us
            </Link>
            <Link to="#" className="text-base leading-6 text-white hover:text-gray-500">
              Our Locations
            </Link>
          </div>
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-base leading-6 text-gray-400">
              &copy; 2023 Mankind. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
