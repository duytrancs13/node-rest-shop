import React from "react";

import Text from "components/text";
import Button from "components/button";

import "./style.scss";

interface SectionHeroProps {}

const owlClass = "section-hero";

const SectionHero: React.FC<SectionHeroProps> = () => (
  <div className={owlClass}>
    <div className={`${owlClass}__overlay`}>
      <video width="100%" height="auto" autoPlay loop muted>
        <source src="" type="video/webm" />
        <source
          src="https://cdn.motiondesign.school/uploads/2023/05/preview-3d-beast.mp4"
          type="video/mp4"
        />
      </video>
    </div>
    <div className={`${owlClass}__container`}>
      <Text color="primary" strong size="xlg-18">
        Khoá học mới
      </Text>
      <Text size="xlg-32" color="primary" strong>
        MOTION & AFTER EFFECT
      </Text>
      <Text color="white" size="xlg-18">
        {`Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut eveniet
        corporis exercitationem vero, sequi possimus alias sint facere itaque
        tenetur repudiandae earum eum deleniti obcaecati, hic, vel officiis.
        Sint, obcaecati.`}
      </Text>
      <Button>Get $100 off</Button>
    </div>
  </div>
);

export default SectionHero;
