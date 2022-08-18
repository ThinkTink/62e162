import { useMemo } from "react";
import { range } from "../helpers/helpers";
import { DOTS, MIN_ELLIPSES_LENGTH } from "../helpers/constants";

export const usePaginationRange = ({ totalCount, pageSize, currentPage }) => {
  /*
    This is a custom hook which handles the range of pagination values which the pagination
    component should render.

    It depends on the total number of blog posts, the number of blog posts rendered per page,
    and the currentPage the user has selected. All these values are passed in as props.

    We store the values to display in an array we're calling paginationRange. We track this
    array with React's useMemo, which rerenders any time the value of our props have changed.

    First we find the number of pages by dividing our total blogs by the number of blogs per
    page.

    If the total pages is less than 5 (min, plus three siblings, plus max), we don't have
    to deal with elipses, so we simply return the values from 1 to pageCount in an array.

    If the total pages is more than 5, we check if we're going to need either left or right
    ellipses. We need left ellipses if we are at page 3 or more, and right elipses if there
    is at least one value between current page and the last page.

    We then create our return array. This is done in three steps - 

        1 - if we need left ellipses, we start the array with [1, DOTS]

        2 - independent of the ellipses we will show 3 'sibling' values. These are the
        current page and its immediate neighbors, unless we are at either the start or
        the end of our total pages.

        3 - if we need right ellipses, we end the array with [DOTS, pageCount]

    
    For many of these operations we are using the helper function range() which can be found
    in "../helpers/helpers"
    */
  const paginationRange = useMemo(() => {
    const pageCount = Math.ceil(totalCount / pageSize);

    //no ellipses
    if (pageCount <= MIN_ELLIPSES_LENGTH) {
      return range(pageCount);
    }

    //check for ellipses
    const showLeftDots = currentPage > 2;
    const showRightDots = currentPage < pageCount - 1;

    let returnRange = [];

    if (showLeftDots) {
      returnRange = returnRange.concat([1, DOTS]);
    }

    const middleValues = showRightDots
      ? range(3, Math.max(currentPage - 1, 1))
      : range(3, pageCount - 2);

    returnRange = returnRange.concat(middleValues);

    if (showRightDots) {
      returnRange = returnRange.concat([DOTS, pageCount]);
    }

    return returnRange;
  }, [totalCount, pageSize, currentPage]);

  return paginationRange;
};
