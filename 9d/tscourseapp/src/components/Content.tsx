import Part from "./Part";
import { CoursePart } from "../types";

interface ContentProps {
  courseParts: CoursePart[];
}

const Content = ({ courseParts }: ContentProps) =>{
  return (
    <div>
      {courseParts.map((part, index) => (
        <div key={index}>
          <Part {...part}/>
        </div>
      ))}
    </div>
  );
};

export default Content;