import React from "react";

import "./style.scss";

interface SkeletonCardProps {}

const owlClass = "skeleton";

const SkeletonCard: React.FC<SkeletonCardProps> = () => (
  <div className={owlClass}>
    <div className={`${owlClass}__title`} />
    <ul>
      <li />
      <li />
      <li />
    </ul>
  </div>
);

export default SkeletonCard;
