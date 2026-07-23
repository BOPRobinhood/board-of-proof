/**
 * URL prefix for a board under `/forums/…`, from DB `forum_boards.section` or `board_id` heuristics.
 */
export function forumBoardBasePath(boardId: string, section?: string | null): string {
  const sec = section?.trim().toUpperCase();
  if (sec === 'BOP GOVERNANCE') return '/forums/bop-governance';
  if (sec === 'BOP GENERAL') return '/forums/bop-general';
  if (sec === 'BOP TECHNICAL') return '/forums/bop-technical';
  if (sec === 'BOP OFFICIAL') return '/forums/bop-official';
  if (boardId.startsWith('bop-governance-')) return '/forums/bop-governance';
  if (boardId.startsWith('bop-general-')) return '/forums/bop-general';
  if (boardId.startsWith('bop-technical-')) return '/forums/bop-technical';
  return '/forums/bop-official';
}

/** First `/forums/bop-…` segment from the current path (for board + thread pages). */
export function forumBoardBaseFromPathname(pathname: string): string {
  const m = pathname.match(/^(\/forums\/bop-[^/]+)/);
  return m ? m[1] : '/forums/bop-official';
}

/** Breadcrumb label for the section landing link (← …). */
export function forumSectionLabelFromBase(boardBase: string): string {
  switch (boardBase) {
    case '/forums/bop-general':
      return 'BOP General';
    case '/forums/bop-governance':
      return 'BOP Governance';
    case '/forums/bop-technical':
      return 'BOP Technical';
    case '/forums/bop-official':
    default:
      return 'BOP Official';
  }
}
