/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { IMResourceDetailPage } from "../type";
import Image from "next/image";

export const MResourceDetailPage = ({
  category,
  images,
}: IMResourceDetailPage) => {
  return (
    <>
      <div className="pt-6 xl:pb-6">
        <h1 className="text-3xl font-extrabold leading-9 pt-2 tracking-tight text-gray-900 dark:text-gray-100 sm:text-6xl sm:leading-10 md:text-5xl md:leading-14">
          {category.name}
        </h1>
        <div className="prose prose-li:my-1 prose-pre:my-2 prose-img:my-2 text-base leading-normal sm:leading-relaxed max-w-none pt-6 pb-4 dark:prose-dark">
          <p>
            Midjourney is a powerful and versatile design tool that can help you
            create stunning visuals for logos, fashion, architecture, and UI
            design. With Midjourney, you can unleash your creativity and explore
            endless possibilities to create unique and visually appealing
            designs. Browse our comprehensive list of compositions to see the
            full range of what Midjourney can do.
          </p>
          <p>
            And if you want to take your designs to the next level, you can use
            our <Link href="/builder">TMI Prompt Builder Tool</Link> to select
            from a range of prompts from our library and create truly unique
            compositions..
          </p>
        </div>
      </div>

      <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
        <div className="prose prose-li:my-1 prose-pre:my-2 prose-img:my-2 text-base sm:text-xl leading-normal sm:leading-relaxed max-w-none pt-10 pb-8 dark:prose-dark">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 capitalize">
            {images.map((image) => (
              <div
                key={image._id}
                className="w-full overflow-hidden relative dark:bg-darkbg-700 bg-slate-200"
              >
                <div className="w-full aspect-square overflow-hidden flex items-center ">
                  {image.url && (
                    <Image
                      className="w-full"
                      src={image.url}
                      alt="album cover"
                    />
                  )}
                </div>
                <div className="text-sm  my-2 p-2">{image.key}</div>
                <div className="absolute top-2 right-2 bg-lightbg dark:bg-darkbg shadow-xl p-2 hover:bg-darkbg-800 dark:hover:bg-lightbg hover:text-slate-200 dark:hover:text-darkbg cursor-pointer rounded">
                  <svg
                    stroke="currentColor"
                    fill="none"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="9"
                      y="9"
                      width="13"
                      height="13"
                      rx="2"
                      ry="2"
                    ></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
