import React from "react";
import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import { BsFacebook, BsInstagram, BsTwitter, BsGithub, BsLinkedin , BsX} from "react-icons/bs";

export default function FooterBar() {
  return (
    <Footer container className="border border-t-8 border-teal-500">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="mt-5 mr-5">
            <Link
              to="/"
              className="self-centered whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white"
            >
              <span className="px-2 py-1 bg-gradient-to-r from-yellow-500 via-orange-500 to-pink-500 rounded-lg text-white">
                Ludeesha's
              </span>
              Blog
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-5 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="/about"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  About us
                </Footer.Link>

                <Footer.Link href="/">Ludeesha's Blog</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow me" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://github.com/ludeesha-cse"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </Footer.Link>
                <Footer.Link
                  href="https://www.linkedin.com/in/ludeesha-nanayakkara-cse/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Linked In
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Privacy Policy</Footer.Link>

                <Footer.Link href="#">Terms and conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright
            href="#"
            by="Ludeesha's blog"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-6 sm:mt-4 mt-4 sm:justify-center">
            <Footer.Icon href="https://www.facebook.com/profile.php?id=100005113785254" icon={BsFacebook} />
            <Footer.Icon href="https://www.instagram.com/_ludeesha_/" icon={BsInstagram} />
            <Footer.Icon href="https://twitter.com/ludeehsananaya1" icon={BsTwitter} />
            <Footer.Icon href="https://github.com/ludeesha-cse" icon={BsGithub} />
            <Footer.Icon href="https://www.linkedin.com/in/ludeesha-nanayakkara-cse/" icon={BsLinkedin} />
          </div>
        </div>
      </div>
    </Footer>
  );
}
