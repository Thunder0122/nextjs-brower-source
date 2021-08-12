import { useState, useEffect, useRef } from "react";
import { CheckIcon, TriangleDownIcon, XIcon } from "@primer/octicons-react";

type OptionType<T extends string | number> = { value: T; label: string };

export type AppSelectMenuProps<T extends string | number> = {
  value: T;
  options: OptionType<T>[];
  buttonLabel: string;
  menuLabel?: string;
  onChange: (newValue: T) => void;
  className?: string;
};

export default function AppSelectMenu<T extends string | number>({
  value: currentValue,
  options,
  buttonLabel,
  menuLabel,
  onChange,
  className,
}: AppSelectMenuProps<T>): JSX.Element {
  const buttonRef = useRef(null);
  const [open, setOpen] = useState(false);
  const toggle = () => {
    setOpen(!open);
  };
  const close = (e: MouseEvent) => {
    if (e.target === buttonRef.current) {
      return;
    }
    setOpen(false);
  };
  const internalOnChange = (newValue: T) => {
    onChange(newValue);
    setOpen(false);
  };
  const makeHandleKeypress = (
    newValue: T
  ): React.KeyboardEventHandler<HTMLLIElement> => (event) => {
    if (event.key === "Enter" || event.key === " ") {
      internalOnChange(newValue);
    }
  };
  useEffect(() => {
    if (open) {
      document.addEventListener("click", close);
    }
    return () => {
      document.removeEventListener("click", close);
    };
  }, [open]);
  return (
    <>
      <div className="relative">
        <button
          ref={buttonRef}
          type="button"
          onClick={toggle}
          className={`${className} py-1 px-3 font-semibold text-primary bg-primary hover:bg-primary-hover focus:bg-primary-focus active:bg-primary-active rounded-md border border-light hover:border-primary-hover focus:border-primary-hover active:border-primary-hover focus:outline-none`}
        >
          {buttonLabel}
          <TriangleDownIcon />
        </button>
        <div
          className={`${
            !open ? "hidden" : ""
          } overflow-hidden mt-1 right-0 absolute text-sm text-primary bg-primary rounded-md border border-light w-72`}
        >
          {menuLabel ? (
            <header className="flex pl-1 w-full border-b border-light">
              <span className="flex-1">{menuLabel}</span>
              <button type="button" onClick={() => close} className="px-1">
                <XIcon className="text-secondary hover:text-primary fill-current" />
              </button>
            </header>
          ) : null}
          <ul className="mb-[-1px]">
            {options.map(({ label, value }) => (
              <li
                key={label}
                role="menuitem"
                onClick={() => internalOnChange(value)}
                className="flex py-1 pl-4 w-full hover:bg-primary-hover border-b border-light cursor-pointer"
                tabIndex={0}
                onKeyDown={makeHandleKeypress(value)}
              >
                <CheckIcon
                  className={`${
                    value === currentValue ? "visible" : "invisible"
                  }`}
                />
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}