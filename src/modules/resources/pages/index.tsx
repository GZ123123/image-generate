import { MResourcesCateogry } from "../components";

export default function MResourcesPage({ categories }: any) {
  return (
    <>
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <div className="flex items-start">
          <div>
            <h1 className="flex-1 text-3xl font-extrabold leading-9 text-gray-900 pb-8 dark:text-gray-100 sm:text-6xl sm:leading-10 md:text-6xl md:leading-14">
              Resources.
            </h1>
            <div className="">
              <p>
                Midjourney V5 is renowned for its exceptional generative AI
                capabilities, particularly in terms of its diverse range of
                styles and applications. From UI design and interior design to
                comic books, illustration books, digital art, and fashion
                design, Midjourney V5 offers an extensive scope of creative
                possibilities.
              </p>
              <p>
                Below, we have compiled a list of prompts that are particularly
                noteworthy and useful for generating unique designs using
                Midjourney.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-12">
        <div className="-m-4 flex flex-wrap">
          {categories &&
            categories.map((category: any) => (
              <div key={category._id} className="md p-4 md:w-1/3 max-w-[544px]">
                <MResourcesCateogry category={category} />
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
