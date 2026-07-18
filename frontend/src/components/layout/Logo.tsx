import LogoSvg from "../../assets/logo.svg?react";

type LogoProps = {
  className?: string;
};

export default function Logo({
  className = "",
}: LogoProps) {
  return <LogoSvg className={className} />;
}