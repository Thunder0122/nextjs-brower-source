import { decodeBase64 } from "../../utils/common";
import { PaginationParamsType } from "../../utils/github";
import { PageInfo } from "../../libs/graphql";

export type AppSearchPaginationProps = {
  onUpdate: ({ after, before }: PaginationParamsType) => void;
  pageInfo: Pick<
    PageInfo,
    "endCursor" | "startCursor" | "hasNextPage" | "hasPreviousPage"
  >;
  loading: boolean;
};

export default function AppSearchPagination({
  pageInfo: { startCursor, endCursor, hasPreviousPage, hasNextPage },
  loading,
  onUpdate,
}: AppSearchPaginationProps): JSX.Element {
  return (
    <div className="">
      <p>
        <button
          className={`${!hasPreviousPage ? "text-secondary" : ""}`}
          type="button"
          onClick={() => {
            if (startCursor)
              onUpdate({ before: startCursor, after: undefined });
          }}
          disabled={!hasPreviousPage}
        >
          &lt; Previous {startCursor} ({decodeBase64(startCursor)})
        </button>{" "}
        -{" "}
        <button
          className={`${!hasNextPage ? "text-secondary" : ""}`}
          type="button"
          onClick={() => {
            if (endCursor) onUpdate({ after: endCursor, before: undefined });
          }}
          disabled={!hasNextPage}
        >
          {endCursor} ({decodeBase64(endCursor)}) Next &gt;
        </button>
        {loading ? " ..." : ""}
      </p>
    </div>
  );
}
