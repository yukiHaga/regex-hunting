import styled from 'styled-components';

// Colors
import { COLORS } from '../../style_constants.js';

// Icon
import { GoogleIcon } from './index.js';
import { TwitterIcon } from './index.js';
import { GitHubIcon } from './index.js';

// CustomIcon
export const ColoredGoogleIcon = styled(GoogleIcon)`
  color: ${COLORS.WHITE};
`;

export const ColoredTwitterIcon = styled(TwitterIcon)`
  color: ${COLORS.WHITE};
`;

export const ColoredGitHubIcon = styled(GitHubIcon)`
  color: ${COLORS.WHITE};
`;
