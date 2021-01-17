import { FC } from 'react';
import NextLink, { LinkProps } from 'next/link';

type AdditionalLinkProps = {
  className?: string;
  style?: object;
};
type LinkType = LinkProps & AdditionalLinkProps;

const Link: FC<LinkType> = ({ className, style, ...props }) => {
  const baseClassName: string = 'cursor-pointer ';
  const finalClassName: string = className
    ? baseClassName + className
    : baseClassName;
  return (
    <div className={finalClassName} style={style}>
      <NextLink {...props} />
    </div>
  );
};

export default Link;
