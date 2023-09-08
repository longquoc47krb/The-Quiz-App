import { Popover } from '@headlessui/react';
import { useState } from 'react';
import { LuFilter, LuTrash2 } from 'react-icons/lu';

import { QuizCategoryList } from '@/common/constants';

export function CustomPopover({ onSelectTopic }) {
  const [selectedTopics, setSelectedTopics] = useState([]);
  // Function to toggle topic selection
  const toggleTopic = (topic) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter((item) => item !== topic));
      onSelectTopic(selectedTopics.filter((item) => item !== topic));
    } else {
      setSelectedTopics([...selectedTopics, topic]);
      onSelectTopic([...selectedTopics, topic]);
    }
  };
  const availableTopics = QuizCategoryList.filter(
    (item) => !selectedTopics.includes(item),
  );
  // Function to remove a topic from selectedTopics
  const removeTopic = (topic) => {
    setSelectedTopics(selectedTopics.filter((item) => item !== topic));
    onSelectTopic(selectedTopics.filter((item) => item !== topic));
  };
  const clearTopic = () => {
    setSelectedTopics([]);
    onSelectTopic([]);
  };
  return (
    <Popover className="relative w-screen">
      <Popover.Button className="hover:bg-transparent">
        <LuFilter />
        {selectedTopics.length > 0 && (
          <span className="bg-red-600 text-white font-medium p-[0.2rem] rounded-2xl text-[0.8rem] leading-none absolute top-0 left-5">
            {selectedTopics.length}
          </span>
        )}
      </Popover.Button>
      <Popover.Panel className="absolute menu-list w-[20rem]">
        <h1 className="text-center font-bold border-b border-b-primary-500 pb-2">
          Topic
        </h1>
        <span className="text-sm">Selected Topics:</span>
        <ul className="bg-primary-500/10 rounded-md p-2 min-h-[1.5rem]">
          {selectedTopics.map((topic, index) => (
            <li
              key={index}
              onClick={() => removeTopic(topic)}
              className="bg-primary-900 p-2 rounded-xl text-xs mr-1 mt-1"
            >
              {topic}
            </li>
          ))}
          {selectedTopics.length > 0 && (
            <LuTrash2
              className="bg-red-900 rounded-xl p-1 mr-1 mt-1 inline-block text-gray-400"
              onClick={clearTopic}
            />
          )}
        </ul>
        <div className="mt-2">
          {availableTopics.map((item, index) => (
            <button
              key={index}
              className="bg-primary-900 p-2 rounded-xl text-xs w-fit inline-block mr-1 mt-1"
              onClick={() => toggleTopic(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <img src="/solutions.jpg" alt="" />
      </Popover.Panel>
    </Popover>
  );
}
