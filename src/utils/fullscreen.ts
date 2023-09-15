// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck vendor specific properties

const root = document.documentElement;

export function openFullScreen() {
  if (root.requestFullscreen) {
    root.requestFullscreen();
  } else if (root.webkitRequestFullscreen) {
    root.webkitRequestFullscreen();
  } else if (root.msRequestFullscreen) {
    root.msRequestFullscreen();
  }
}

export function closeFullScreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}

export function isFullScreen() {
  const fullScreenElement =
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement ||
    document.msFullscreenElement ||
    null;

  return Boolean(fullScreenElement);
}
