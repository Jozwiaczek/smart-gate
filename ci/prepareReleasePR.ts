const isToday = (someDate: Date): boolean => {
  const today = new Date();
  return (
    someDate.getDate() === today.getDate() &&
    someDate.getMonth() === today.getMonth() &&
    someDate.getFullYear() === today.getFullYear()
  );
};

const getReleasePRTitle = (currentDayCounterRelease: number): string => {
  const formatter = new Intl.DateTimeFormat('pl', {
    dateStyle: 'short',
  });
  const currentFormattedDate = formatter.format(new Date());

  const counterTag = currentDayCounterRelease > 0 ? ` - #${currentDayCounterRelease}` : null;

  return `Release - ${currentFormattedDate}${counterTag}`;
};

export const prepareReleasePR = async ({
  github,
  context,
}: {
  github: OctoGithub;
  context: OctoContext;
}) => {
  const request = {
    owner: context.repo.owner,
    repo: context.repo.repo,
    pull_number: context.issue.number,
  };
  const currentPR = await github.pulls.get(request);
  const prTitle = currentPR.data.title;
  console.log(prTitle);

  console.log('\n\n---------------\n\n');

  const prs = await github.pulls.list({
    owner: context.repo.owner,
    repo: context.repo.repo,
    state: 'closed',
    sort: 'updated',
  });
  console.log('L:18 | prs: ', prs);
  const prsReleasedToday = prs.data.filter(
    ({ merged_at }) => merged_at && isToday(new Date(merged_at)),
  );
  console.log('L:40 | prsReleasedToday: ', prsReleasedToday);

  const updatedPRTitle = getReleasePRTitle(0);
  await github.pulls.update({ ...request, title: updatedPRTitle });

  const newMessage = `
	👋 Thanks for testing#1!
  `;

  console.log(context.issue);

  const commentInfo = {
    ...context.repo,
    issue_number: context.issue.number,
  };
  const signature = 'via JJ GitHub Actions 🇵🇱';
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
