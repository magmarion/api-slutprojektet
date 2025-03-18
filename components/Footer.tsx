import { SocialIcon } from "react-social-icons";

export default function Footer() {
  return (
    <footer className="p-4 bg-slate-900">
      <div className=" gap-2 flex items-center justify-center text-white font-bold ">
        <SocialIcon url="https://youtube.com" />
        <SocialIcon url="https://facebook.com" />
        <SocialIcon url="https://instagram.com" />
        <SocialIcon url="https://pinterest.com" />
        <p>© 2025 TECHGEAR</p>
      </div>
    </footer>
  );
}
