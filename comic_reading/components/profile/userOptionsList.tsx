import { useEffect, useRef } from "react";

interface UserOptionsListProps {
  selectedOption: string;
  role: string;
  setSelectedOption: (option: string) => void;
}

function UserOptionsList({ selectedOption, setSelectedOption, role }: UserOptionsListProps) {
    const options = ["Thông tin cá nhân", "Lịch sử đọc truyện", "Thông tin theo dõi", "Đổi mật khẩu", ];
    if (role === 'POSTER') {
      options.push("Lịch sử đăng truyện");
    }
    const markerRef = useRef<HTMLDivElement | null>(null);
    const optionRefs = useRef<(HTMLDivElement | null)[]>([]);
  
    useEffect(() => {
      const index = options.indexOf(selectedOption);
      const selectedOptionRef = optionRefs.current[index];
      if (selectedOptionRef && markerRef.current) {
        markerRef.current.style.transform = `translateX(${selectedOptionRef.offsetLeft}px)`;
        markerRef.current.style.width = `${selectedOptionRef.offsetWidth}px`;
      }
    }, [selectedOption, options]);
  
    return (
      <div className="relative flex flex-wrap w-fit h-fit bg-[#4B4B4B] rounded">
        {options.map((option, index) => (
          <div 
            key={index} 
            ref={(el) => optionRefs.current[index] = el}
            className={`p-2 m-2 rounded transition-colors duration-200 cursor-pointer ${selectedOption === option ? 'text-white' : 'text-gray-400'}`}
            onClick={() => setSelectedOption(option)}
          >
            {option}
          </div>
        ))}
        <div ref={markerRef} className="absolute bottom-0 left-0 h-1 bg-white transition-transform duration-200 ease-in-out" />
      </div>
    );
  }



function OtherUserOptionsList({ selectedOption, setSelectedOption, role }: UserOptionsListProps) {
  const options = ["Thông tin cá nhân", "Lịch sử đọc truyện", "Thông tin theo dõi", "Lịch sử đăng truyện", ];
  const markerRef = useRef<HTMLDivElement | null>(null);
  const optionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const index = options.indexOf(selectedOption);
    const selectedOptionRef = optionRefs.current[index];
    if (selectedOptionRef && markerRef.current) {
      markerRef.current.style.transform = `translateX(${selectedOptionRef.offsetLeft}px)`;
      markerRef.current.style.width = `${selectedOptionRef.offsetWidth}px`;
    }
  }, [selectedOption, options]);

  return (
    <div className="relative flex flex-wrap w-fit h-fit bg-[#4B4B4B] rounded">
      {options.map((option, index) => (
        <div 
          key={index} 
          ref={(el) => optionRefs.current[index] = el}
          className={`p-2 m-2 rounded transition-colors duration-200 cursor-pointer ${selectedOption === option ? 'text-white' : 'text-gray-400'}`}
          onClick={() => setSelectedOption(option)}
        >
          {option}
        </div>
      ))}
      <div ref={markerRef} className="absolute bottom-0 left-0 h-1 bg-white transition-transform duration-200 ease-in-out" />
    </div>
  );
}

export {OtherUserOptionsList, UserOptionsList};
