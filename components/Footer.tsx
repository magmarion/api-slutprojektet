import { FaFacebookSquare, FaGithub, FaInstagram, FaLinkedin, FaPinterestSquare, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="p-4 bg-slate-900">
      <div className=" gap-2 flex items-center justify-center text-white font-bold text-xl">
        <FaFacebookSquare />
        <FaLinkedin />
        <FaInstagram />
        <FaYoutube />
        <FaGithub />
        <FaPinterestSquare />
        <p>© 2025 techgear</p>
      </div>
    </footer>
  );
}
