import styled from "styled-components";

import IconClose from "components/common/IconClose";

const PROJECTS = [
  {
    link: "https://jiro.estellegresillon.fr",
    name: "Jiro",
  },
  {
    link: "https://elden.estellegresillon.fr",
    name: "Elden Delivery",
  },
  {
    link: "https://flow.estellegresillon.fr",
    name: "Flow",
  },
  {
    link: "https://chat.estellegresillon.fr",
    name: "Firebase Chat",
  },
  {
    link: "https://zest.estellegresillon.fr",
    name: "Zest Neobank",
  },
  {
    link: "https://iptracker.estellegresillon.fr",
    name: "IP Tracker",
  },
  {
    link: "https://foodlab.estellegresillon.fr",
    name: "Foodlab",
  },
  {
    link: "https://estellegresillon.fr",
    name: "Go back to website",
  },
];

const ProjectsModal = ({ onClose }) => (
  <ProjectsModalWrapper>
    <CloseButton onClick={onClose}>
      <IconClose />
    </CloseButton>
    <LinkWrapper>
      {PROJECTS.map((project) => (
        <a href={project.link} key={project.name}>
          {project.name}
        </a>
      ))}
    </LinkWrapper>
  </ProjectsModalWrapper>
);

export default ProjectsModal;

const ProjectsModalWrapper = styled.div`
  align-items: flex-start;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 1px 60px 0 rgb(69 129 192 / 15%);
  display: flex;
  flex-direction: column;
  left: 0px;
  position: absolute;
  top: 50px;
  width: 200px;
  z-index: 1;

  svg {
    color: #365ed2;
    height: 10px;
    width: 10px;
    margin: 5px;

    &:hover {
      color: #092578;
    }
  }
`;

const CloseButton = styled.div`
  border-radius: 10px;
  margin: 10px;
  text-align: center;
`;

const LinkWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100%;

  a {
    color: #365ed3 !important;
    margin-bottom: 20px;

    &:hover {
      color: #092578;
    }
  }
`;
