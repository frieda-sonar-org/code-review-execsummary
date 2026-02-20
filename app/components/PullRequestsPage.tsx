import PullRequestsPageShared from '../../shared/components/PullRequestsPage';

// basePath for subdirectory in code-review-demos
const basePath = process.env.NODE_ENV === 'production' ? '/v2-public' : '';

export default function PullRequestsPage() {
  return <PullRequestsPageShared basePath={basePath} />;
}
