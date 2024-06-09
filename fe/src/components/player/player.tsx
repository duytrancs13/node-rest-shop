import { createPortal } from "react-dom";
import React, { useState } from "react";

import ReactPlayer from "react-player";
import Text from "components/text";

import "./style.scss";

interface PlayerProps {
  linkUrl: string;
}

const owlClass = "player-icon";
const coursePlayerOwlClass = "course-player";

const Player: React.FC<PlayerProps> = ({ linkUrl }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className={owlClass}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width="80"
        height="80"
        viewBox="0 0 80 80"
        className={`${owlClass}__icon`}
        onClick={() => setIsOpen(true)}
      >
        <defs>
          <filter
            id="prefix__b"
            width="113.8%"
            height="113.8%"
            x="-6.9%"
            y="-6.9%"
            filterUnits="objectBoundingBox"
          >
            <feGaussianBlur
              in="SourceAlpha"
              result="shadowBlurInner1"
              stdDeviation="5"
            ></feGaussianBlur>
            <feOffset
              dy="1"
              in="shadowBlurInner1"
              result="shadowOffsetInner1"
            ></feOffset>
            <feComposite
              in="shadowOffsetInner1"
              in2="SourceAlpha"
              k2="-1"
              k3="1"
              operator="arithmetic"
              result="shadowInnerInner1"
            ></feComposite>
            <feColorMatrix
              in="shadowInnerInner1"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"
            ></feColorMatrix>
          </filter>
          <filter
            id="prefix__c"
            width="158.9%"
            height="149.4%"
            x="-29.4%"
            y="-16.5%"
            filterUnits="objectBoundingBox"
          >
            <feOffset
              dy="3"
              in="SourceAlpha"
              result="shadowOffsetOuter1"
            ></feOffset>
            <feGaussianBlur
              in="shadowOffsetOuter1"
              result="shadowBlurOuter1"
              stdDeviation="2.5"
            ></feGaussianBlur>
            <feColorMatrix
              in="shadowBlurOuter1"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.164963942 0"
            ></feColorMatrix>
          </filter>
          <circle id="prefix__a" cx="40" cy="40" r="40"></circle>
          <path
            id="prefix__d"
            d="M56.45 37.752L31.993 22.577c-.944-.589-2.13-.616-3.103-.082-.972.537-1.574 1.55-1.574 2.656V55.5c0 1.105.602 2.119 1.574 2.656.465.252.972.38 1.483.38.562 0 1.125-.155 1.62-.462L56.45 42.9c.893-.556 1.437-1.527 1.437-2.574s-.544-2.018-1.437-2.574"
          ></path>
        </defs>
        <g fill="none">
          <use fill="#FFF" fillOpacity=".4" xlinkHref="#prefix__a"></use>
          <use
            fill="#000"
            filter="url(#prefix__b)"
            xlinkHref="#prefix__a"
          ></use>
          <use
            fill="#000"
            filter="url(#prefix__c)"
            xlinkHref="#prefix__d"
          ></use>
          <use fill="#FFF" xlinkHref="#prefix__d"></use>
          <path
            fill="#FFF"
            d="M40 0C17.909 0 0 17.909 0 40s17.909 40 40 40 40-17.909 40-40S62.091 0 40 0zm.325 3.902c20.116 0 36.423 16.307 36.423 36.423 0 20.116-16.307 36.423-36.423 36.423-20.116 0-36.423-16.307-36.423-36.423 0-20.116 16.307-36.423 36.423-36.423z"
          ></path>
        </g>
      </svg>
      {isOpen &&
        createPortal(
          <div className={coursePlayerOwlClass}>
            <div className={`${coursePlayerOwlClass}__container`}>
              <div
                className={`${coursePlayerOwlClass}__container__close`}
                onClick={() => setIsOpen(false)}
              >
                <Text size="xlg-24" color="white">
                  ĐÓNG
                </Text>
              </div>
              {/* <video id="videoPlayer" width="100%" controls muted autoPlay>
                <source src="http://localhost:8000/api/video" type="video/mp4" />
              </video> */}
              <ReactPlayer
                url={linkUrl}
                controls
                muted={false}
                width="100vw"
                height="100vh"
              />
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default Player;
