import { Switch } from "@headlessui/react";
import { DevTreeLink } from "../types";
import { classNames } from "../utils";

type Props = {
  item: DevTreeLink;
  handleUrlChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleEnableLink: (socialNetwork: string) => void;
};
const icon = (item: DevTreeLink) => `/social/icon_${item.name}.svg`;
function DevTreeInput({ item, handleUrlChange, handleEnableLink }: Props) {
  return (
    <div className="bg-white shadow-sm p-5 flex items-center gap-3">
      <img
        className="w-12 h-12 object-cover"
        src={icon(item)}
        alt={item.name}
      ></img>

      <input
        type="text"
        className="flex-grow w-full min-w-0 border border-gray-100 rounded-lg"
        value={item.url || ""}
        onChange={handleUrlChange}
        name={item.name}
      />
      <Switch
        checked={item.enabled}
        onChange={() => handleEnableLink(item.name)}
        className={classNames(
          item.enabled ? "bg-blue-500" : "bg-gray-200",
          "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        )}
      >
        <span
          aria-hidden="true"
          className={classNames(
            item.enabled ? "translate-x-5" : "translate-x-0",
            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
          )}
        />
      </Switch>
    </div>
  );
}

export default DevTreeInput;
