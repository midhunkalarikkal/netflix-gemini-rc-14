import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-black text-white pt-16 pb-20 px-48 h-[30vh] custom-text-color">
      <div className="mb-6">
        <p>Questions? Call 000-800-919-1694</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="flex flex-col space-y-5">
          <Link to="/" className="underline custom-text-color">
            FAQ
          </Link>
          <Link to="/" className="underline custom-text-color">
            Cookie Preferences
          </Link>
        </div>
        <div className="flex flex-col space-y-5">
          <Link to="/" className="underline custom-text-color">
            Help Centre
          </Link>
          <Link to="/" className="underline custom-text-color">
            Corporate Information
          </Link>
        </div>
        <div className="flex flex-col space-y-2">
          <Link to="/" className="underline custom-text-color">
            Terms of Use
          </Link>
        </div>
        <div className="flex flex-col space-y-2">
          <Link to="/" className="underline custom-text-color">
            Privacy
          </Link>
        </div>
      </div>
      <div className="mt-6">
        <button className="py-1 px-6 border-white text-white" style={{border : "1px solid #b6b5b4"}}> English </button>
      </div>
    </div>
  );
};

export default Footer;
