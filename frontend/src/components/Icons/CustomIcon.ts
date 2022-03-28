import styled from 'styled-components';

// Colors
import { COLORS } from '../../style_constants';

// Icon
import { GoogleIcon } from './index';
import { TwitterIcon } from './index';
import { GitHubIcon } from './index';

// CustomIcon
export const ColoredGoogleIcon = styled(GoogleIcon)`
  color: ${COLORS.WHITE};
`;

export const ColoredTwitterIcon = styled(TwitterIcon)`
  color: ${COLORS.LIGHT_BLUE};
`;

export const ColoredGitHubIcon = styled(GitHubIcon)`
  color: ${COLORS.WHITE};
`;
