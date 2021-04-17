export const prepareReleasePR = async ({
  github,
  context,
  core,
}: {
  github: any;
  context: any;
  core: any;
}) => {
  const request = {
    owner: context.repo.owner,
    repo: context.repo.repo,
    pull_number: context.issue.number,
  };
  core.info(`Getting PR #${request.pull_number} from ${request.owner}/${request.repo}`);
  const PR = await github.pulls.get(request);
  const prs = await github.pulls.list({ owner: context.repo.owner, repo: context.repo.repo });
  console.log('L:18 | prs: ', prs);
  console.log('\n\n---------------\n\n');
  const prTitle = PR.data.title;
  console.log(prTitle);

  await github.pulls.update({ ...request, title: 'Hello world' });

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
