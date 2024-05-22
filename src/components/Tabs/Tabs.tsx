import { useState } from "react";

type TabsProps = {
  children: React.ReactNode[];
};

export const Tabs: React.FC<TabsProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleClick = (index: number) => setActiveTab(index);

  return (
    <div>
      <div className="flex gap-5 p-6">
        {children.map((_, i) => (
          <button
            className="px-4 py-2 border border-black duration-300 hover:bg-blue-300"
            key={i}
            onClick={() => handleClick(i)}
          >
            tab item {i + 1}
          </button>
        ))}
      </div>
      <div>
        {children.map((content, index) => (
          <div key={index} className={activeTab === index ? "block" : "hidden"}>
            {content}
          </div>
        ))}
      </div>
    </div>
  );
};
