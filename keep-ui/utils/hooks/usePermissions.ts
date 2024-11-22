import { Permission } from "@/app/(keep)/settings/models";
import { useHydratedSession as useSession } from "@/shared/lib/hooks/useHydratedSession";
import { SWRConfiguration } from "swr";
import useSWRImmutable from "swr/immutable";
import { useApiUrl } from "./useConfig";
import { fetcher } from "utils/fetcher";

export const usePermissions = (options: SWRConfiguration = {}) => {
  const apiUrl = useApiUrl();
  const { data: session } = useSession();

  return useSWRImmutable<Permission[]>(
    () => (session ? `${apiUrl}/auth/permissions` : null),
    (url) => fetcher(url, session?.accessToken),
    options
  );
};
