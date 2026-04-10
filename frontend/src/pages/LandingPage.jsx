import React from "react";
import "./landingpage.css";
import { Link } from "react-router-dom";
import { ArrowDown, ChevronDown, Info } from "lucide-react";
import Features from "@/components/Features";

const LandingPage = () => {
  return (
    <div id="main-div">
      <div className="grid-div">
        <div>
            
            <img src="logo.png" alt="" height={"50px"} width={"50px"} />
          <h1 id="main-header">TASKFORGE</h1>

          <div className="subline-div">
            <h2>PLAN IT</h2>
            <h2>• TRACK IT •</h2>
            <h2>FINISH IT</h2>
          </div>

          <div className="content-div">
            <p>
              Turn ideas into action with a powerful Kanban workflow and
              real-time collaboration — all in one place.
            </p>
            <ul>
              <li>Organize tasks visually</li>
              <li>Collaborate instantly with your team</li>
              <li>Stay on track, every step of the way</li>
            </ul>
          </div>

          <div className="button-div">
            <Link className="login" to="/login">
              Get Started
            </Link>
            <div>
              <a href="#features" className="lm-div">
              
                Learn More
              </a>
            </div>
          </div>
        </div>

        <div>
          <div className="image-div">
            <img src="lp2.png" alt="" />
          </div>
        </div>
      </div>

      <br />
      <div className="scroll">
        <p className="scroll-div">Scroll</p>
        <div className="arrow">
          <ChevronDown className="text-gray-500" />
        </div>
      </div>

      <br />

      <section id="features" className="features">
        <h1 className="feature-headline">FEATURES</h1>
        <hr />
        <Features
          heading={"Visual Kanban Boards"}
          subtextone={
            "Create boards, lists, and cards to manage your workflow effortlessly."
          }
          subtexttwo={
            "Drag, drop, and organize tasks the way your brain works."
          }
          imgPath={"dd2.png"}
        />

        <hr />

        <Features
          textLeft={true}
          heading={"Real-Time Team Chat"}
          subtextone={
            "No more switching apps. Chat with your team instantly within tasks and boards."
          }
          subtexttwo={"Stay aligned, share updates, and move faster."}
          imgPath={"chat2.png"}
        />
        <hr />
        <Features
          heading={"Live Updates"}
          subtextone={"See changes as they happen."}
          subtexttwo={
            "Whether it’s task updates or messages — everything syncs in real time."
          }
          imgPath={"lu.png"}
        />
        <hr />
        <Features
          textLeft={true}
          heading={"Smart Collaboration"}
          subtextone={
            "Assign tasks, tag teammates, and track progress together."
          }
          subtexttwo={"Perfect for teams, freelancers, and students."}
          imgPath={"aws.png"}
        />
        <hr />
        <Features
          heading={"Productivity Tracking"}
          subtextone={"Monitor progress across boards and tasks."}
          subtexttwo={"Stay focused and actually finish what you start."}
          imgPath={"home.png"}
        />
        <hr />
      </section>
    </div>
  );
};

export default LandingPage;
