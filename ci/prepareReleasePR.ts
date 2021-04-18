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
  const prs = await github.pulls.list({
    owner: context.repo.owner,
    repo: context.repo.repo,
    state: 'closed',
    sort: 'updated',
  });
  const prsReleasedToday = prs.data.filter(
    ({ merged_at, title }) => isToday(merged_at) && title.includes('Release'),
  );

  const updatedPRTitle = getReleasePRTitle(prsReleasedToday.length);
  await github.pulls.update({
    owner: context.repo.owner,
    repo: context.repo.repo,
    pull_number: context.issue.number,
    title: updatedPRTitle,
  });

  const newMessage = 'This pull request will trigger new Release. Request code owners for review.';

  const commentInfo = {
    ...context.repo,
    issue_number: context.issue.number,
  };
  const signature = 'via Smart Gate GitHub Actions 🔑';
  const comment = {
    ...commentInfo,
    body: `${newMessage}\n\n${signature}`,
  };

  let commentId;
  const comments = (await github.issues.listComments(commentInfo)).data;
  for (let i = comments.length; i--; ) {
    const c = comments[i];
    if (c.user.type === 'Bot' && c.body.includes(signature)) {
      commentId = c.id;
      break;
    }
  }

  if (commentId) {
    await github.issues.updateComment({
      ...context.repo,
      comment_id: commentId,
      body: comment.body,
    });
  }

  if (!commentId) {
    await github.issues.createComment(comment);
  }
};
