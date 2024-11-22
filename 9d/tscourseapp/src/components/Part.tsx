import { CoursePart } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = (props: CoursePart)=>{
  switch (props.kind){
    case "basic":
      return (<p>
        <b>{props.name} {props.exerciseCount}</b><br />
        <i>{props.description}</i> 
      </p>)
    case "group":
      return (<p>
        <b>{props.name} {props.exerciseCount}</b><br />
        project excercises {props.groupProjectCount}
      </p>)
    case "background":
      return (<p>
        <b>{props.name} {props.exerciseCount}</b><br />
        <i>{props.description}</i><br />
        submit to {props.backgroundMaterial}
      </p>)
    case "special":
      return (<p>
        <b>{props.name} {props.exerciseCount}</b><br />
        <i>{props.description}</i><br />
        required skills: {props.requirements.join(", ")}
      </p>)
    default:
      return assertNever(props)
  }
}

export default Part