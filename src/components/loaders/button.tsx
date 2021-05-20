import { FC } from 'react';
import ContentLoader from 'react-content-loader';

const ButtonLoader: FC = props => (
  <ContentLoader viewBox="0 0 96 38" height={38} width={96} {...props}>
    <rect x="0" y="0" rx="5" ry="5" width="96" height="38" />
  </ContentLoader>
)

export default ButtonLoader;
