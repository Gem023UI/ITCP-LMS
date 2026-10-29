import * as React from "react";
import { ApiError, authApi, type User } from "../services/authApi";

export function useAuth() {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<ApiError | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    authApi
      .me()
      .then(({ user }) => !cancelled && setUser(user))
      .catch((e) => !cancelled && setError(e instanceof ApiError ? e : new ApiError(0, "Something went wrong")))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  return { user, loading, error };
}