import { CDropdown } from "src/common/components/controls";
import { IMBuilderParamProps } from "./types";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

export const MBuilderParam = ({ onChange }: IMBuilderParamProps) => {
  return (
    <div>
      <div className="flex justify-between px-4 py-2 border-b border-gray-200">
        <label>Version</label>

        <CDropdown className={""} options={[]}>
          <PencilSquareIcon width={18} />
        </CDropdown>
      </div>
      <div className="flex justify-between px-4 py-2 border-b border-gray-200">
        <label>Aspect Ratio</label>

        <CDropdown className={""} options={[]}>
          <PencilSquareIcon width={18} />
        </CDropdown>
      </div>
      <div className="flex justify-between px-4 py-2 border-b border-gray-200">
        <label>Chaos</label>

        <CDropdown className={""} options={[]}>
          <PencilSquareIcon width={18} />
        </CDropdown>
      </div>
      <div className="flex justify-between px-4 py-2 border-b border-gray-200">
        <label>Image Weight</label>

        <CDropdown className={""} options={[]}>
          <PencilSquareIcon width={18} />
        </CDropdown>
      </div>
      <div className="flex justify-between px-4 py-2 border-b border-gray-200">
        <label>Upbeta</label>

        <CDropdown className={""} options={[]}>
          <PencilSquareIcon width={18} />
        </CDropdown>
      </div>
      <div className="flex justify-between px-4 py-2 border-b border-gray-200">
        <label>Stylize</label>

        <CDropdown className={""} options={[]}>
          <PencilSquareIcon width={18} />
        </CDropdown>
      </div>
      <div className="flex justify-between px-4 py-2 border-b border-gray-200">
        <label>Seed</label>

        <CDropdown className={""} options={[]}>
          <PencilSquareIcon width={18} />
        </CDropdown>
      </div>
      <div className="flex justify-between px-4 py-2 border-b border-gray-200">
        <label>Tile</label>

        <CDropdown className={""} options={[]}>
          <PencilSquareIcon width={18} />
        </CDropdown>
      </div>
      <div className="flex justify-between px-4 py-2 border-b border-gray-200">
        <label>Anime Style</label>

        <CDropdown className={""} options={[]}>
          <PencilSquareIcon width={18} />
        </CDropdown>
      </div>
      <div className="flex justify-between px-4 py-2 border-b border-gray-200">
        <label>Quality</label>

        <CDropdown className={""} options={[]}>
          <PencilSquareIcon width={18} />
        </CDropdown>
      </div>
      <div className="flex justify-between px-4 py-2 border-b border-gray-200">
        <label>Light Upschale</label>

        <CDropdown className={""} options={[]}>
          <PencilSquareIcon width={18} />
        </CDropdown>
      </div>
      <div className="flex justify-between px-4 py-2 border-b border-gray-200">
        <label>Stop Earlier At</label>

        <CDropdown className={""} options={[]}>
          <PencilSquareIcon width={18} />
        </CDropdown>
      </div>
    </div>
  );
};
