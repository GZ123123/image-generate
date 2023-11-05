//#region NODE_MODULE
import Link from "next/link";
//#endregion

//#region SOURCE
//#endregion

export const CFooter = () => {
  return (
    <div className="dark:bg-darkbg bg-lightbg">
      <div className="px-4 py-8 max-w-7xl mx-auto sm:flex border-t-2 border-slate-200 dark:border-slate-900">
        <div className="basis-1/3 text-slate-500 dark:text-slate-500 mb-2 sm:mb-0">
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
        <div className="basis-2/3 flex justify-start md:justify-end">
          <div className="basis-1/3">
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
          <div className="basis-1/3">
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
          <div className="basis-1/3">
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
      </div>
    </div>
  );
};
