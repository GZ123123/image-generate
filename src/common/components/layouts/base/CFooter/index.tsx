//#region NODE_MODULE
import Link from "next/link";
//#endregion

//#region SOURCE
//#endregion

export const CFooter = () => {
  return (
    <div className="dark:bg-darkbg bg-lightbg">
      <div className="px-4 xl:px-0 py-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-8 gap-6 lg:gap-4 border-t-2 border-slate-200 dark:border-slate-900">
        <div className="lg:col-span-2 text-slate-500 dark:text-slate-500">
          <div className="sm:mb-3 mb-1 flex items-center gap-2 uppercase font-bold text-slate-300">
            <h3 className="text-2xl text-slate-800 dark:text-slate-200 font-bold">
              {process.env.NEXT_PUBLIC_TITLE}
            </h3>
          </div>
          <div>
            Copyright © 2023 <div className="sm:block hidden"></div> All rights
            reserved
          </div>
        </div>
        <div className="md:col-span-2 lg:col-span-4 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <div className="mb-3 text-slate-800 dark:text-slate-200 font-bold">
              Products
            </div>
            <div className="mt-1">
              <Link
                className="text-slate-500 hover:text-magenta"
                target="_BLANK"
                href="/builder"
              >
                Builder
              </Link>
            </div>
            <div className="mt-1">
              <Link className="text-slate-500 hover:text-magenta" href="/blog">
                Blog
              </Link>
            </div>
            <div className="mt-1">
              <Link
                className="text-slate-500 hover:text-magenta"
                href="/generate"
              >
                Generate
              </Link>
            </div>
            {/* <div className="mt-1">
              <Link
                className="text-slate-500 hover:text-magenta"
                target="_BLANK"
                href="/builder"
              >
                iOS
              </Link>
            </div>
            <div className="mt-1">
              <Link
                className="text-slate-500 hover:text-magenta"
                target="_BLANK"
                href="/builder"
              >
                Android
              </Link>
            </div> */}
          </div>
          <div className="md:col-span-2">
            <div className="mb-3 text-slate-800 dark:text-slate-200 font-bold">
              About
            </div>
            <div className="mt-1">
              <span className="text-slate-500 hover:text-magenta cursor-pointer">
                234 Ngo Tat To, Phuong 22, Quan Binh Thanh, Tp.HCM
              </span>
            </div>
            <div className="mt-1">
              <span className="text-slate-500 hover:text-magenta cursor-pointer">
                Email: <a href="mailto:tmtprompt@gmail.com">tmtprompt@gmail.com</a>
              </span>
            </div>
            <div className="mt-1">
              <span className="text-slate-500 hover:text-magenta cursor-pointer">
                SĐT/Zalo: <a href="tel:0836384168">08.36.38.41.68</a> 
              </span>
            </div>
            {/* <div className="mt-1">
              <span className="text-slate-500 hover:text-magenta cursor-pointer">
                Privacy
              </span>
            </div> */}
          </div>
          <div>
            <div className="mb-3 text-slate-800 dark:text-slate-200 font-bold">
              Social
            </div>
            <div className="mt-1">
              <Link
                className="text-slate-500 hover:text-magenta"
                target="_BLANK"
                href="https://discord.gg/bdVtADUg"
              >
                Discord
              </Link>
            </div>
            <div className="mt-1">
              <Link
                className="text-slate-500 hover:text-magenta"
                target="_BLANK"
                href="https://www.facebook.com/aithucchien"
              >
                Facebook
              </Link>
            </div>
            <div className="mt-1">
              <Link
                className="text-slate-500 hover:text-magenta"
                target="_BLANK"
                href="https://zalo.me/g/wzbuks983"
              >
                Zalo
              </Link>
            </div>
          </div>
        </div>
        <div className="md:col-span-3 lg:col-span-2">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d739.9110799119481!2d106.71630850507029!3d10.787350459303171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f535715bdd7%3A0xc4bf9c532e558bf6!2sS%C3%A2n%20golf%20Him%20Lam!5e0!3m2!1svi!2s!4v1700200394250!5m2!1svi!2s" 
            height="250" 
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade" 
            className="max-w-full w-full"
          />
        </div>
      </div>
    </div>
  );
};
