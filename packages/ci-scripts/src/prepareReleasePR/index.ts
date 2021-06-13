import {
  getMergedTodayReleasePRs,
  setReleasePrWarning,
  updateReleasePrTitle,
} from './prepareReleasePR.utils';

export const prepareReleasePR = async ({
  github,
  context,
}: {
  github: OctoGithub;
  context: OctoContext;
}) => {
  const prsReleasedToday = await getMergedTodayReleasePRs(github, context);
  const releasedPrsTodayTotal = prsReleasedToday.length;
  await updateReleasePrTitle(github, context, releasedPrsTodayTotal);

  await setReleasePrWarning(github, context);
};
