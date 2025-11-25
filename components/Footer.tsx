import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { client } from '@/sanity/lib/client';

export default async function Footer() {
  const query = `*[_type == "footer"][0]`;
  const footer = await client.fetch(query);

  if (!footer) return null;

  return (
    <footer className="bg-black text-white pt-20">
      {/* Row 1 */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
        {/* Column 1: Logo */}
        <div>
          {footer.logo && (
            <Image
              src={urlFor(footer.logo).url()}
              alt="Footer Logo"
              width={150}
              height={50}
            />
          )}
        </div>

        {/* Columns 2,3,4 */}
        {footer.columns?.map((col: any, idx: number) => (
          <div key={idx}>
            <h3 className="text-lg font-bold mb-4">{col.heading}</h3>
            <ul className="flex flex-col gap-4">
              {col.links?.map((link: any, i: number) => (
                <li key={i} className="mb-2">
                  <a href={link.url} className="hover:text-gray-400 transition">
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Row 2: Social Icons */}
      <div className="container mx-auto flex justify-center mt-6 space-x-4">
        {footer.socials?.map((social: any, idx: number) => (
          <a key={idx} href={social.url} target="_blank" rel="noopener noreferrer">
            <i className={`${social.icon} text-2xl hover:text-gray-400 transition`}></i>
          </a>
        ))}
      </div>

      {/* Row 3: Copyright */}
      <div className="mx-auto text-center mt-6 py-6 bg-gray-400">
        {footer.copyright}
      </div>
    </footer>
  );
}
