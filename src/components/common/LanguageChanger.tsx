import React, { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

// Define props type
interface LanguageChangerProps {
  className?: string;
  color?: string;
}

const LanguageChanger: React.FC<LanguageChangerProps> = ({
  className,
  color = "background",
}) => {
  const [langaugeDropDown, setLangaugeDropDown] = useState(false);

  const handleLanguageChange = (newLocale: string) => {
    console.log(newLocale)
    // Set a cookie and update the URL here (uncomment if needed)
    // document.cookie = `locale=${newLocale}; path=/`;
    // router.replace(`/${newLocale}${pathname}`);
    setLangaugeDropDown(!langaugeDropDown);
  };

  return (
    <div className={`${className}`}>
      <div
        onClick={() => setLangaugeDropDown(!langaugeDropDown)}
        className={`cursor-pointer text-${color} text-xl flex items-center`}
      >
        EN{" "}
        {!langaugeDropDown ? (
          <MdKeyboardArrowDown className={`text-${color}`} />
        ) : (
          <MdKeyboardArrowUp className={`text-${color}`} />
        )}
      </div>

      {langaugeDropDown && (
        <div className="absolute top-full left-0 mt-2 border border-black bg-background py-2 px-7 space-y-4 shadow-lg">
          <p
            className="hover:text-primary cursor-pointer"
            onClick={() => handleLanguageChange("en")}
          >
            EN
          </p>
          <p
            className="hover:text-primary cursor-pointer"
            onClick={() => handleLanguageChange("id")}
          >
            ID
          </p>
        </div>
      )}
    </div>
  );
};

export default LanguageChanger;
