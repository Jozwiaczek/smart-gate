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

export const prepareReleasePR = async ({
  github,
  context,
}: {
  github: OctoGithub;
  context: OctoContext;
}) => {
  const baseRequest = {
    owner: context.repo.owner,
    repo: context.repo.repo,
  };

  const prs = await github.pulls.list({
    ...baseRequest,
    state: 'closed',
    sort: 'updated',
  });
  const prsReleasedToday = prs.data.filter(
    ({ merged_at, title }) => isToday(merged_at) && title.includes('Release'),
  );

  const updatedPRTitle = getReleasePRTitle(prsReleasedToday.length);
  await github.pulls.update({
    ...baseRequest,
    pull_number: context.issue.number,
    title: updatedPRTitle,
  });

  const newMessage =
    'This pull request will trigger new Release. Request code owners for code review.';

  const commentInfo = {
    ...baseRequest,
    issue_number: context.issue.number,
  };
  const signature = 'via Smart Gate GitHub Actions 🔑';
  const comment = {
    ...commentInfo,
    body: `${newMessage}\n${signature}`,
  };

  const comments = (await github.issues.listComments(commentInfo)).data;
  const commentId = comments.find((c) => c.user.type === 'Bot' && c.body.includes(signature))?.id;

  if (commentId) {
    await github.issues.updateComment({
      ...baseRequest,
      comment_id: commentId,
      body: comment.body,
    });
  }

  if (!commentId) {
    await github.issues.createComment(comment);
  }
};
