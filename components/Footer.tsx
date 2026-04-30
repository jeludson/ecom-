import Link from "next/link";
import { Instagram, Youtube, Facebook, ArrowUpRight, Mail } from "lucide-react";

const footerLinks = [
  {
    title: "Company",
    links: ["About", "Careers", "Blog"],
  },
  {
    title: "Support",
    links: ["Help Center", "Returns", "Shipping"],
  },
  {
    title: "Legal",
    links: ["Privacy Policy", "Terms of Service"],
  },
];

const socialLinks = [
  { name: "Instagram", icon: Instagram, link: "https://instagram.com/novacommerce" },
  { name: "YouTube", icon: Youtube, link: "https://youtube.com/novacommerce" },
  { name: "Facebook", icon: Facebook, link: "https://facebook.com/novacommerce" },
  { name: "Gmail", icon: Mail, link: "mailto:contact@novacommerce.com" },
];

export default function Footer() {
  return (
    <footer className="bg-background border-t border-white/10 pt-20 pb-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
        {/* Logo & Info */}
        <div className="lg:col-span-2">
          <Link href="/" className="flex items-center space-x-2 mb-6">
            <span className="text-3xl font-bold gradient-text">NovaCommerce</span>
          </Link>
          <p className="text-white/60 mb-8 max-w-sm">
            Experience the future of smart shopping with our luxury collection and cutting-edge design.
          </p>
          <div className="flex space-x-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.link}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-primary transition-colors duration-300"
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Links */}
        {footerLinks.map((section) => (
          <div key={section.title}>
            <h4 className="text-lg font-semibold mb-6">{section.title}</h4>
            <ul className="space-y-4">
              {section.links.map((link) => (
                <li key={link}>
                  <Link
                    href={`/${link.toLowerCase().replace(/ /g, "-")}`}
                    className="text-white/60 hover:text-primary transition-colors flex items-center group"
                  >
                    {link}
                    <ArrowUpRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom Bar */}
      <div className="container mx-auto px-6 mt-20 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-white/40 text-sm">
        <p>© {new Date().getFullYear()} NovaCommerce. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          <Link href="/cookies" className="hover:text-white transition-colors">Cookies Settings</Link>
        </div>
      </div>
    </footer>
  );
}
