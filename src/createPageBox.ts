/**
 * Returns detailed layout and visibility information for a given DOM element.
 *
 * This includes:
 * - Dimensions (width, height)
 * - Position on page (top, left, bottom, right, centerX, centerY)
 * - Scroll offsets
 * - Bounding rectangles (viewport-relative and page-relative)
 * - Viewport visibility status (isInViewport, isFullyVisible)
 * - Viewport coverage ratios (viewportRatioX, viewportRatioY)
 *
 * @param el - The target DOM element to measure.
 * @returns An object containing geometry and visibility metadata, or `null` if the element is not provided.
 **/
export interface PageBox {
  width: number;
  height: number;
  top: number;
  left: number;
  right: number;
  bottom: number;
  x: number;
  y: number;
  centerX: number;
  centerY: number;
  scrollX: number;
  scrollY: number;
  relativeToViewport: DOMRect;
  relativeToPage: DOMRect & {
    top: number;
    left: number;
    bottom: number;
    right: number;
  };
  isInViewport: boolean;
  isFullyVisible: boolean;
  viewportRatioX: number;
  viewportRatioY: number;
}
export function createPageBox(el: Element | null): PageBox | null {
  if (!el) return null;
  const rect = el.getBoundingClientRect();
  const scrollX = window.scrollX || window.pageXOffset;
  const scrollY = window.scrollY || window.pageYOffset;
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const top = rect.top + scrollY;
  const left = rect.left + scrollX;
  const right = rect.right + scrollX;
  const bottom = rect.bottom + scrollY;
  const centerX = left + rect.width / 2;
  const centerY = top + rect.height / 2;
  // Calculate intersection with viewport
  const visibleX = Math.max(0, Math.min(rect.right, windowWidth) - Math.max(rect.left, 0));
  const visibleY = Math.max(0, Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0));
  const viewportRatioX = rect.width > 0 ? visibleX / rect.width : 0;
  const viewportRatioY = rect.height > 0 ? visibleY / rect.height : 0;
  const isInViewport = rect.bottom > 0 && rect.right > 0 && rect.top < windowHeight && rect.left < windowWidth;
  const isFullyVisible = rect.top >= 0 && rect.left >= 0 && rect.bottom <= windowHeight && rect.right <= windowWidth;
  return {
    width: rect.width,
    height: rect.height,
    top,
    left,
    right,
    bottom,
    x: left,
    y: top,
    centerX,
    centerY,
    scrollX,
    scrollY,
    relativeToViewport: rect,
    relativeToPage: {
      ...rect,
      top,
      left,
      right,
      bottom,
    },
    isInViewport,
    isFullyVisible,
    viewportRatioX,
    viewportRatioY,
  };
}
