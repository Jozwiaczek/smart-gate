interface OctoRepo {
  owner: string;
  repo: string;
}

interface OctoIssue {
  number: number;
}

interface OctoContext {
  repo: OctoRepo;
  issue: OctoIssue;
}
