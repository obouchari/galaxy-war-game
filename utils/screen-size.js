const screenSize = {
  // viewport width dimensions
  vw: Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  ),

  // viewport height dimensions
  vh: Math.max(
    document.documentElement.clientHeight || 0,
    window.innerHeight || 0
  ),
};

export default screenSize;
