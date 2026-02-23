"use client";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import Image from "next/image";

import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import classes from "./about.module.scss";
import { Container } from "@/containers/hoc/container/container";
import { Button } from "@/components/ui/button/button.component";

import team_photo from "@/assets/img/about-us/about-main-1.jpg";
import certificate from "@/assets/img/main/about-us/certificate.jpg";

export const About = () => {
  const [isOpen, setOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <section className={classes["about"]}>
      <Container>
        <div className={classes["about__title"]}>
          {t("main.about_us.title")}
        </div>
        <div className={classes["about__body"]}>
          <div className={classes["about__photo"]}>
            <Image src={team_photo} alt="Team photo" className={classes["about__photo-img"]} width={450} height={500}/>
          </div>
          <div
            className={classes["about__certificate"]}
            onClick={() => setOpen(true)}
          >
            {isOpen && (
              <Lightbox
                mainSrc={certificate.src}
                onCloseRequest={() => setOpen(false)}
              />
            )}
            <Image src={certificate} alt="certificate" className={classes["about__certificate-img"]}/>
          </div>
          <div className={classes["about__description"]}>
            <div className={classes["about__description-text"]}>
              <p>{t("main.about_us.description1")}</p>
              <p>{t("main.about_us.description2")}</p>
              <p>{t("main.about_us.description3")}</p>
              <p>{t("main.about_us.description4")}</p>
              <p>{t("main.about_us.description5")}</p>
            </div>
            <div className={classes["about__description-details"]}>
              <Link href="/about">
                <Button title={t("main.about_us.details")} />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
