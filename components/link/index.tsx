import { FC } from 'react';
import NextLink, { LinkProps } from 'next/link';

type AdditionalLinkProps = {
  className?: string;
  style?: object;
};
type LinkType = LinkProps & AdditionalLinkProps;

const Link: FC<LinkType> = ({ className = '', style, ...props }) => {
  const baseClassName = 'cursor-pointer text-secondary';
  const finalClassName = `${baseClassName} ${className}`;

  return (
    <span className={finalClassName} style={style}>
      <NextLink {...props} />
    </span>
  );
};

export default Link;
