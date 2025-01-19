"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { IoClose } from "react-icons/io5";

interface ModalContextType {
  showModal: (
    content: ReactNode,
    title?: string,
    onSubmit?: (result: boolean) => void
  ) => void;
  hideModal: (result?: boolean) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<ReactNode | null>(null);
  const [title, setTitle] = useState<string | undefined>();
  const [onSubmitCallback, setOnSubmitCallback] = useState<
    ((result: boolean) => void) | null
  >(null);

  const showModal = (
    newContent: ReactNode,
    newTitle?: string,
    onSubmit?: (result: boolean) => void
  ) => {
    setContent(newContent);
    setTitle(newTitle);
    setOnSubmitCallback(() => onSubmit || null);
    setIsOpen(true);
  };

  const hideModal = (result?: boolean) => {
    if (onSubmitCallback) {
      onSubmitCallback(result ?? false);
    }
    setIsOpen(false);
    setContent(null);
    setTitle(undefined);
    setOnSubmitCallback(null);
  };

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center mx-4">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={() => hideModal(false)} // Close without submission
          ></div>
          <div className="relative bg-background text-foreground  mt-20 rounded-md shadow-md z-10 max-w-xl w-full sm:mx-4 dark:bg-background">
            {title && (
              <div className="flex justify-between bg-primary items-center rounded-t-md p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-background dark:text-white">
                  {title}
                </h3>
                <div onClick={() => hideModal(false)}>
                  {" "}
                  <IoClose className="text-2xl text-background dark:text-white" />
                </div>
              </div>
            )}
            <div className="overflow-y-auto  max-h-[450px] p-4">{content}</div>
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
