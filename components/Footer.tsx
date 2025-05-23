import { FaFacebookSquare, FaGithub, FaInstagram, FaLinkedin, FaPinterestSquare, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="p-4 bg-gradient-to-b from-[#3D5300] to-[#616F47]">
      <div className=" gap-2 flex items-center justify-center text-[#FEFAE1] font-bold text-xl">
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
