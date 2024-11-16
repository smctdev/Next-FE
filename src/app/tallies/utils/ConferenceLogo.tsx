import { ConferenceLogoProps } from "../types/LogoType";

const teamLogos: { [key: string]: string } = {
  East: "https://loodibee.com/wp-content/uploads/nba-Eastern_Conference_logo-300x300.png",
  West: "https://loodibee.com/wp-content/uploads/nba-Western_Conference_logo-300x300.png",
};

const ConferenceLogo = ({ conferenceName }: ConferenceLogoProps) => {
  const logo =
    teamLogos[conferenceName] ||
    "https://loodibee.com/wp-content/uploads/nba-logo-transparent-300x300.png";

  return <img src={logo} alt={`${conferenceName} logo`} className="w-8 h-8" />;
};

export default ConferenceLogo;
