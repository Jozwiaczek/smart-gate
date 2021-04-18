const isToday = (someDate?: string): boolean => {
  if (!someDate) {
    return false;
  }

  const inputDate = new Date(someDate);
  const today = new Date();
  return (
    inputDate.getDate() === today.getDate() &&
    inputDate.getMonth() === today.getMonth() &&
    inputDate.getFullYear() === today.getFullYear()
  );
};

const getReleasePRTitle = (currentDayCounterRelease: number): string => {
  const formatter = new Intl.DateTimeFormat('en', {
    dateStyle: 'short',
  });
  const currentFormattedDate = formatter.format(new Date());
  const counterTag = currentDayCounterRelease > 0 ? ` - #${currentDayCounterRelease}` : '';

  return `Release - ${currentFormattedDate}${counterTag}`;
};

const getMergedTodayReleasePRs = async (
  github: OctoGithub,
  context: OctoContext,
): Promise<Array<OctoPullRequest>> => {
  const prs = await github.pulls.list({
    owner: context.repo.owner,
    repo: context.repo.repo,
    state: 'closed',
    sort: 'updated',
  });
  return prs.data.filter(({ merged_at, title }) => isToday(merged_at) && title.includes('Release'));
};

const setReleasePrWarning = async (github: OctoGithub, context: OctoContext): Promise<void> => {
  const baseRequest = {
    owner: context.repo.owner,
    repo: context.repo.repo,
  };

  const baseCommentRequest = {
    ...baseRequest,
    issue_number: context.issue.number,
  };
  const commentSignature = 'via Smart Gate GitHub Actions 🔑';
  const comment = {
    ...baseCommentRequest,
    body: `This pull request will trigger new Release. Request code owners for code review.\n${commentSignature}`,
  };

  const pullRequestComments = (await github.issues.listComments(baseCommentRequest)).data;
  const alreadyExistCommentId = pullRequestComments.find(
    (existedComment) =>
      existedComment.user.type === 'Bot' && existedComment.body.includes(commentSignature),
  )?.id;

  if (alreadyExistCommentId) {
    await github.issues.updateComment({
      ...baseRequest,
      comment_id: alreadyExistCommentId,
      body: comment.body,
    });
  }

  if (!alreadyExistCommentId) {
    await github.issues.createComment(comment);
  }
};

const updateReleasePrTitle = async (
  github: OctoGithub,
  context: OctoContext,
  releasedPrsTodayTotal: number,
): Promise<void> => {
  const updatedPRTitle = getReleasePRTitle(releasedPrsTodayTotal);
  await github.pulls.update({
    owner: context.repo.owner,
    repo: context.repo.repo,
    pull_number: context.issue.number,
    title: updatedPRTitle,
  });
};

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
