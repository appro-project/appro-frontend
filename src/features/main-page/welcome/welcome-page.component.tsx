"use client";
import React from "react";
import classes from "./welcome.module.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./carousel-custom.scss";

import { Carousel } from "react-responsive-carousel";
import { ProjectItem } from "./project-item.component";

import SliderPrev from "@/assets/img/main/welcome/slider-prev.svg";
import SliderNext from "@/assets/img/main/welcome/slider-next.svg";
import Link from "next/link";
import Image from "next/image";
import { ProjectDto } from "@/api/model";

interface PropsType {
  mockProjects: ProjectDto[];
}

export const Welcome = ({ mockProjects }: PropsType) => {
  console.log("projects to welcome", mockProjects);
  const renderArrowPrev = (clickHandler: () => void) => {
    const arrowClasses = ["slider-control__prev", "control-arrow"];

    return (
			<button
				onClick={clickHandler}
				aria-label='prev slide / item'
				className={arrowClasses.join(' ')}
			>
				<Image
					src={SliderPrev}
					alt='Previous slide'
					className='control-arrow__image'
				/>
			</button>
		)
  };

  const renderArrowNext = (clickHandler: () => void) => {
    const arrowClasses = ["slider-control__next", "control-arrow"];

    return (
			<button
				onClick={clickHandler}
				aria-label='next slide / item'
				className={arrowClasses.join(' ')}
			>
				<Image
					src={SliderNext}
					alt='Next slide'
					className='control-arrow__image'
				/>
			</button>
		)
  };

  return (
    <section className={classes.welcome}>
      <div className={"welcome-carousel"}>
        <Carousel
          renderArrowNext={renderArrowNext}
          renderArrowPrev={renderArrowPrev}
          infiniteLoop
          interval={4000}
          showThumbs={false}
        >
          {mockProjects.map((project, index) => (
            <div key={index}>
              <ProjectItem project={project} />
            </div>
          ))}
        </Carousel>
      </div>
      <Link href="/#popular-category">
        <div
          aria-label="to bottom"
          className={["slider-control__bottom", "control-arrow"].join(" ")}
        >
          <Image src={SliderNext} alt='Next slide' width={50} height={50}/>
        </div>
      </Link>
    </section>
  );
};
