import { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import styled from 'styled-components';
import { MappedOffer } from 'modules/DescriptionCreator/DescriptionCreator';
import { BannerSection } from '../Sections/BannerSection/BannerSection';
import { DescriptionSection } from '../Sections/DescriptionSection/DescriptionSection';
import { ListSection } from '../Sections/ListSection/ListSection';
import { PicturesSection } from '../Sections/PicturesSection/PicturesSection';
import { ProducerSection } from '../Sections/ProducerSection/ProducerSection';
import { TopHeaderSection } from '../Sections/TopHeaderSection/TopHeaderSection';
import { VideoSection } from '../Sections/VideoSection/VideoSection';

const FormWrapper = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  width: 100%;
  margin: 10px;
  max-height: 90vh;
  overflow-y: scroll;
  padding: 10px;
  margin: 10px;
`;

const StyledAccordionDetails = styled(AccordionDetails)`
  /* display: block; */
  flex-wrap: wrap;
`;
interface Props {
  editedOffer?: MappedOffer;
}

export const Form = ({ editedOffer }: Props) => {
  const [expanded, setExpanded] = useState<string>();

  const handleExpandedChange =
    (section: any) => (event: any, isExpanded: boolean) => {
      setExpanded(isExpanded ? section : '');
    };

  useEffect(() => {
    if (!editedOffer) {
      setExpanded('');
    }
  }, [editedOffer]);

  return (
    <FormWrapper>
      <Accordion
        disabled={!editedOffer}
        expanded={expanded === 'section_1'}
        onChange={handleExpandedChange('section_1')}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <h3>Nazwa producenta</h3>
        </AccordionSummary>
        <StyledAccordionDetails>
          <ProducerSection />
        </StyledAccordionDetails>
      </Accordion>
      <Accordion
        disabled={!editedOffer}
        expanded={expanded === 'section_2'}
        onChange={handleExpandedChange('section_2')}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <h3>Górna sekcja z nagłówkami</h3>
        </AccordionSummary>
        <StyledAccordionDetails>
          <TopHeaderSection />
        </StyledAccordionDetails>
      </Accordion>
      <Accordion
        disabled={!editedOffer}
        expanded={expanded === 'section_3'}
        onChange={handleExpandedChange('section_3')}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel2bh-header"
        >
          <h3>Sekcja z opisami</h3>
        </AccordionSummary>
        <StyledAccordionDetails>
          <DescriptionSection />
        </StyledAccordionDetails>
      </Accordion>

      <Accordion
        disabled={!editedOffer}
        expanded={expanded === 'section_4'}
        onChange={handleExpandedChange('section_4')}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <h3>Sekcja z banerem</h3>
        </AccordionSummary>
        <StyledAccordionDetails>
          <BannerSection />
        </StyledAccordionDetails>
      </Accordion>
      <Accordion
        disabled={!editedOffer}
        expanded={expanded === 'section_5'}
        onChange={handleExpandedChange('section_5')}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <h3>Sekcja z listą</h3>
        </AccordionSummary>
        <StyledAccordionDetails>
          <ListSection />
        </StyledAccordionDetails>
      </Accordion>
      <Accordion
        disabled={!editedOffer}
        expanded={expanded === 'section_6'}
        onChange={handleExpandedChange('section_6')}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <h3>Sekcja ze zdjęciami</h3>
        </AccordionSummary>
        <StyledAccordionDetails>
          <PicturesSection />
        </StyledAccordionDetails>
      </Accordion>
      <Accordion
        disabled={!editedOffer}
        expanded={expanded === 'section_7'}
        onChange={handleExpandedChange('section_7')}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <h3>Sekcja z video</h3>
        </AccordionSummary>
        <StyledAccordionDetails>
          <VideoSection />
        </StyledAccordionDetails>
      </Accordion>
    </FormWrapper>
  );
};
