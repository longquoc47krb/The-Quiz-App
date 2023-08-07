import withAuth from '@/hocs/withAuth';
import type { DecodedUser } from '@/interfaces';

const ProtectedPage = ({ user }: { user: DecodedUser | undefined }) => {
  return (
    <div className="flex w-screen h-full justify-center items-center">
      <h1 className="text-gray-300 text-xl">
        Welcome, {user?.name}! This is a protected page.
      </h1>
    </div>
  );
};

export default withAuth(ProtectedPage);
