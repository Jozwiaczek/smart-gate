interface OctoPullRequest {
  url: string;
  id: number;
  node_id: string;
  html_url: string;
  diff_url: string;
  patch_url: string;
  issue_url: string;
  number: number;
  state: string;
  locked: boolean;
  title: string;
  user: any;
  created_at: Date;
  updated_at: Date;
  closed_at?: Date;
  merged_at?: Date;
  merge_commit_sha: string;
  assignee?: any;
  assignees: any[];
  requested_reviewers: any[];
  requested_teams: any[];
  labels: any[];
  milestone?: any;
  draft: boolean;
  commits_url: string;
  review_comments_url: string;
  review_comment_url: string;
  comments_url: string;
  statuses_url: string;
  author_association: string;
  auto_merge?: any;
  active_lock_reason?: any;
}

interface OctoResponse<T> {
  status: number;
  url: string;
  headers: any;
  data: T;
}

interface PullsGetOpt {
  owner: string;
  repo: string;
  pull_number: number;
}

interface PullsUpdateOpt extends PullsGetOpt {
  title?: string;
  body?: string;
  state?: 'closed' | 'open';
  base?: string;
  maintainer_can_modify?: boolean;
}

interface PullsListOpt {
  owner: string;
  repo: string;
  state?: 'all' | 'closed' | 'open';
  title?: string;
  head?: string;
  base?: string;
  sort?: 'created' | 'updated' | 'popularity' | 'long-running';
  direction?: 'asc' | 'desc';
  per_page?: number;
  page?: number;
}

interface CommentsListOpt {
  owner: string;
  repo: string;
  issue_number: number;
  since?: Date;
  per_page?: number;
  page?: number;
}

interface CommentUpdateOpt {
  owner: string;
  repo: string;
  comment_id: number;
  body: string;
}

interface CommentCreateOpt {
  owner: string;
  repo: string;
  issue_number: number;
  body: string;
}

interface OctoGithub {
  pulls: {
    get: (opt: PullsGetOpt) => Promise<OctoResponse<OctoPullRequest>>;
    list: (opt: PullsListOpt) => Promise<OctoResponse<Array<OctoPullRequest>>>;
    listCommits: (opt: PullsGetOpt) => Promise<OctoResponse<any>>;
    update: (opt: PullsUpdateOpt) => Promise<OctoResponse<OctoPullRequest>>;
  };
  issues: {
    listComments: (opt: CommentsListOpt) => Promise<OctoResponse<any>>;
    updateComment: (opt: CommentUpdateOpt) => Promise<OctoResponse<any>>;
    createComment: (opt: CommentCreateOpt) => Promise<OctoResponse<any>>;
  };
}
