import React, { useState } from 'react';

const tutorialsData = [
  {
    id: 1,
    title: '🔥 Full Body Workout at Home',
    category: 'Home',
    videoUrl: 'https://www.youtube.com/embed/UBMk30rjy0o',
    description: 'No equipment needed. Burn calories & build strength right from your living room.',
  },
  {
    id: 2,
    title: '💪 Intense Upper Body Gym Routine',
    category: 'Gym',
    videoUrl: 'https://www.youtube.com/embed/oAPCPjnU1wA',
    description: 'Target your chest, shoulders, and arms with this effective gym workout.',
  },
  {
    id: 3,
    title: '🧘 Yoga Flow for Flexibility',
    category: 'Yoga',
    videoUrl: 'https://www.youtube.com/embed/v7AYKMP6rOE',
    description: 'Stretch your muscles and improve posture with this guided yoga session.',
  },
  {
    id: 4,
    title: '🏃‍♂️ Fat-Burning Cardio Blast',
    category: 'Cardio',
    videoUrl: 'https://www.youtube.com/embed/ml6cT4AZdqI',
    description: 'Boost your heart rate and burn fat with this high-energy cardio workout.',
  },
  {
    id: 5,
    title: '🏡 Quick Core Crusher',
    category: 'Home',
    videoUrl: 'https://www.youtube.com/embed/AnYl6Nk9GOA',
    description: 'Strengthen your abs and core in just 10 minutes.',
  },
  {
    id: 6,
    title: '🧘‍♀️ Morning Yoga Stretch',
    category: 'Yoga',
    videoUrl: 'https://www.youtube.com/embed/4pKly2JojMw',
    description: 'Gentle stretching to kickstart your day with calmness and energy.',
  },
  {
    id: 7,
    title: '💥 HIIT Gym Circuit',
    category: 'Gym',
    videoUrl: 'https://www.youtube.com/embed/ml6cT4AZdqI',
    description: 'Intense HIIT circuit to torch fat and build endurance.',
  },
  {
    id: 8,
    title: '🏃 Cardio Kickboxing Blast',
    category: 'Cardio',
    videoUrl: 'https://www.youtube.com/embed/kfJQU-9VAdA',
    description: 'Combine fun kickboxing moves with fast-paced cardio for maximum burn.',
  },
];

const categories = ['Home', 'Gym', 'Yoga', 'Cardio'];

const Tutorials = () => {
  const [selectedCategory, setSelectedCategory] = useState('Home');

  const filteredTutorials = tutorialsData.filter(
    (tut) => tut.category === selectedCategory
  );

  const getButtonClasses = (category) => {
    const isSelected = selectedCategory === category;

    const base = 'flex items-center gap-2 px-6 py-2 text-sm sm:text-base font-semibold rounded-full transition-all duration-300 shadow-md';

    const iconColorMap = {
      Home: 'bg-blue-600 text-white ring-2 ring-blue-300',
      Gym: 'bg-red-600 text-white ring-2 ring-red-300',
      Yoga: 'bg-green-600 text-white ring-2 ring-green-300',
      Cardio: 'bg-yellow-400 text-black ring-2 ring-yellow-300',
    };

    const defaultBtn = 'bg-white text-gray-800 border border-gray-300 hover:scale-105 hover:bg-gray-100';

    return isSelected ? `${base} ${iconColorMap[category]}` : `${base} ${defaultBtn}`;
  };

  const iconMap = {
    Home: '🏠',
    Gym: '🏋️‍♂️',
    Yoga: '🧘',
    Cardio: '🏃‍♂️',
  };

  return (
    <div className="min-h-screen px-4 sm:px-8 py-12 bg-white transition-all">
      <h1 className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 mb-12">
        Explore Workout Tutorials
      </h1>

      {/* Category Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={getButtonClasses(cat)}
          >
            <span className="text-lg">{iconMap[cat]}</span>
            <span>{cat}</span>
          </button>
        ))}
      </div>

      {/* Tutorial Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {filteredTutorials.map((tutorial) => (
          <div
            key={tutorial.id}
            className="group bg-white backdrop-blur-md rounded-2xl p-5 shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border"
          >
            <div className="aspect-w-16 aspect-h-9 mb-4 rounded-xl overflow-hidden shadow-inner">
              <iframe
                src={tutorial.videoUrl}
                title={tutorial.title}
                className="w-full h-full border-0"
                allowFullScreen
              />
            </div>
            <h2 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
              {tutorial.title}
            </h2>
            <p className="text-sm text-gray-700 mb-2">
              {tutorial.description}
            </p>
            <span className="inline-block mt-1 px-3 py-1 text-xs font-semibold text-white bg-indigo-500 rounded-full">
              {tutorial.category}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tutorials;
