import React from 'react';
import { FaInstagram, FaFacebook, FaEnvelope } from 'react-icons/fa';

const socialMediaData = [
  {
    name: 'Instagram',
    icon: FaInstagram,
    link: 'https://www.instagram.com/',
  },
  {
    name: 'Facebook',
    icon: FaFacebook,
    link: 'https://www.facebook.com/',
  },
  {
    name: 'Newsletter',
    icon: FaEnvelope,
    link: 'https://www.gmail.com',
  },
];

const SocialMedia = () => {
  return (
    <div className="flex justify-center">
      {socialMediaData.map((socialMedia, index) => (
        <a className='p-2 '
          key={index}
          href={socialMedia.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {React.createElement(socialMedia.icon, {
            className: 'text-details',
            size: 24,
          })}
        </a>
      ))}
    </div>
  );
};

export default SocialMedia;
