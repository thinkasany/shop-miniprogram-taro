import { useState } from "react";
import "./about.less";

const About = () => {
  const [info, setInfo] = useState<any>({});
  return (
    <div className="container">
      <div className="about-wrap">
        <div className="title">{info.title}</div>
      </div>
    </div>
  );
};

export default About;
