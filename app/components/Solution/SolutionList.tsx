"use client";

import React, { useEffect, useRef } from "react";
import WhiteCard from "../WhiteCard";

interface SolutionItem {
  no: string;
  title: string;
  caption: string;
}

interface SolutionListProps {
  solutions: SolutionItem[];
}

const SolutionList: React.FC<SolutionListProps> = ({ solutions }) => {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100");
            entry.target.classList.remove("opacity-0");
          }
        });
      },
      { threshold: 0.1 }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      cardRefs.current.forEach((ref) => {
        if (ref) {
          observer.unobserve(ref);
        }
      });
    };
  }, []);

  return (
    <div className="flex flex-col lg:flex-row justify-center w-full items-center gap-0 p-2 font-trueno">
      {solutions.map((solution, index) => (
        <div
          key={index}
          ref={(el) => {
            cardRefs.current[index] = el;
          }}
          className="opacity-0 transition-opacity duration-1000 ease-in-out"
        >
          <WhiteCard
            WhiteCardContent={
              <div className="flex items-center h-full">
                <div className="flex items-center justify-center mr-2">
                  <p className="text-6xl font-bold text-black">{solution.no}</p>
                </div>
                <div className="p-10">
                  <div>
                    <p className="text-4xl font-bold text-justify pb-4">
                      {solution.title}
                    </p>
                  </div>
                  <div>
                    <p className="text-justify text-sm lg:text-xl font-light">
                      {solution.caption}
                    </p>
                  </div>
                </div>
              </div>
            }
          />
        </div>
      ))}
    </div>
  );
};

export default SolutionList;
