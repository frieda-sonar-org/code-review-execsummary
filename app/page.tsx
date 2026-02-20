import PullRequestsPage from './components/PullRequestsPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pull Requests - SonarQube Cloud',
};

export default function Home() {
  return <PullRequestsPage />;
}
