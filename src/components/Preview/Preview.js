import "../../App.scss";
import styled from "styled-components";
import { useContext } from "react";
import { AppContext } from "../AppContext/AppContext";
import { mediaQuery } from "../../constants/MediaQueries";

const PreviewWrapper = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  overflow-y: scroll;
  min-width: 1180px;
  max-width: 1180px;
  max-height: 80vh;
  margin: 10px;
  padding: 20px;
  box-sizing: border-box;

  ${mediaQuery.LG} {
    min-width: 940px;
    max-width: 940px;
    margin: 0;
    padding: 0;
  }

  ${mediaQuery.MD} {
    min-width: 700px;
    max-width: 700px;
  }

  ${mediaQuery.SM} {
    min-width: unset;
    max-width: unset;
    width: 100%;
    margin: 0;
  }
`;

export const Preview = () => {
  const {
    producer,
    topHeader,
    middleHeader,
    bottomHeader,
    paragraph,
    enabledListSection,
    listSection,
    bannerSection,
    enabledBannerSection,
    enabledPicturesSection,
    pictureItems,
    pictureSectionTitle,
    enabledVideoSection,
    videoSection,
  } = useContext(AppContext);

  return (
    <PreviewWrapper id="preview">
      <div class="description-container">
        <div class="top-bar"></div>
        {producer && (
          <div class="producer-logo">
            <a href={`https://www.brillar-sklep.pl/` + producer}>
              <img
                src={"https://www.brillar-sklep.pl/userdata/public/assets/producer-" + producer + ".png"}
                alt="Logo producenta"
                width="auto"
              />
            </a>
          </div>
        )}
        {(topHeader || middleHeader || bottomHeader) && (
          <div class="section headers-section">
            {topHeader && <h2>{topHeader}</h2>}
            {middleHeader && <h3>{middleHeader}</h3>}
            {bottomHeader && <h4>{bottomHeader}</h4>}
          </div>
        )}
        <div class="section description-section">
          {paragraph && <p dangerouslySetInnerHTML={{ __html: paragraph }}></p>}
        </div>
        {enabledListSection && listSection.listItems.length > 0 && (
          <div class="section list-section">
            {listSection.title && <h4 class="header">{listSection.title}</h4>}
            <ul class="list">{listSection.listItems.map((el) => (el ? <li>{el}</li> : null))}</ul>
          </div>
        )}
        {enabledBannerSection && (
          <div class="section banner-section">
            {bannerSection.imgFileName && (
              <img
                class="img-frame"
                src={"https://www.brillar-sklep.pl/userdata/public/assets/" + bannerSection.imgFileName}
                alt={bannerSection.imgAltTag}
                width="auto"
              />
            )}
          </div>
        )}
        {enabledPicturesSection && (
          <div class="section">
            {pictureSectionTitle && <h4 class="header">{pictureSectionTitle}</h4>}
            <div class="image-section">
              {pictureItems.map((el, index) => (
                <div key={index} class="image-container">
                  <img
                    src={"https://www.brillar-sklep.pl/userdata/public/assets/" + el.url}
                    alt={el.alt}
                    width="auto"
                  />
                  {el.title && <h5>{el.title}</h5>}
                  {el.description && <p>{el.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
        {enabledVideoSection && (
          <>
            <div class="section video-section">
              {videoSection.sectionTitle && <h4 class="header">{videoSection.sectionTitle}</h4>}
              {videoSection.description && (
                <p class="section-description" dangerouslySetInnerHTML={{ __html: videoSection.description }}></p>
              )}
              <div class="video-wrapper">
                <iframe
                  width="100%"
                  src={videoSection.videoUrl}
                  title={videoSection.videoTitle}
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </>
        )}
      </div>
    </PreviewWrapper>
  );
};
